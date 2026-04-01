import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextRequest, NextResponse } from 'next/server';

const apiKey = process.env.GEMINI_API_KEY;

const SYSTEM_PROMPT = `Ти - професійний, ввічливий та дружній тур-агент-консультант компанії Glorious Travel (знаходитесь у Києві). 
Твоє завдання: вітати користувачів, допомагати з вибором туру (розпитувати про дати, бюджет, напрямки - Туреччина, Єгипет, Греція, ОАЕ, Іспанія, Мальдіви), радити та обов'язково намагатись отримати у клієнта контактний номер телефону або ім'я для броні. 
Пиши коротко, емоційно (використовуй емодзі), розбивай текст на короткі абзаци. 
Не пропонуй відвідати офіс, пропонуй зв'язатись у Telegram або Viber. 
Ніколи не згадуй, що ти штучний інтелект або AI. Говори як реальний менеджер.
Якщо користувач дає номер телефону, скажи що передав його менеджеру Лізі і вона зв'яжеться найближчим часом.
Відповідай тільки українською мовою.`;

export async function POST(req: NextRequest) {
  if (!apiKey) {
    console.error("GEMINI_API_KEY is missing");
    return NextResponse.json({ error: "Gemini API key is missing" }, { status: 500 });
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const { history, userMessage } = await req.json();

    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
    });

    // Gemini requirements for history:
    // 1. Must start with a 'user' message.
    // 2. Roles must alternate: user, model, user, model...
    // 3. User message from history should have role 'user' and model response should have role 'model'.
    
    let validHistory = [];
    if (history && Array.isArray(history)) {
      // Find the first user message
      const firstUserIdx = history.findIndex((m: any) => m.role === 'user');
      
      if (firstUserIdx !== -1) {
        const rawHistory = history.slice(firstUserIdx);
        // Ensure alternating roles
        let expectedRole = 'user';
        for (const msg of rawHistory) {
           if (msg.role === expectedRole && msg.text && msg.text.trim()) {
              validHistory.push({
                role: msg.role === 'user' ? 'user' : 'model',
                parts: [{ text: msg.text }]
              });
              expectedRole = expectedRole === 'user' ? 'model' : 'user';
           }
        }
      }
    }

    const chat = model.startChat({
      history: validHistory,
      systemInstruction: {
        role: 'system',
        parts: [{ text: SYSTEM_PROMPT }]
      }
    });

    const result = await chat.sendMessageStream(userMessage);

    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of result.stream) {
            const chunkText = chunk.text();
            if (chunkText) {
              controller.enqueue(new TextEncoder().encode(chunkText));
            }
          }
          controller.close();
        } catch (e) {
          console.error("Streaming error:", e);
          controller.error(e);
        }
      }
    });

    return new Response(stream, {
        headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    });

  } catch (error: any) {
    console.error("Chat API error details:", error);
    return NextResponse.json({ 
      error: "Service unavailable",
      details: error.message 
    }, { status: 500 });
  }
}
