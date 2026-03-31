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
    return NextResponse.json({ error: "Gemini API key is missing" }, { status: 500 });
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const { history, userMessage } = await req.json();

    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash-latest",
      systemInstruction: SYSTEM_PROMPT
    });

    // Filter history: Gemini requires the first message to be from user, not model
    // We filter out the initial greeting from model and only keep actual conversation
    const filteredHistory = (history || [])
      .filter((msg: any) => msg.text && msg.text.trim().length > 0)
      .map((msg: any) => ({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.text }]
      }));

    // Make sure the first message in history is from user (Gemini requirement)
    // If no valid history or first msg is model, pass empty history
    let validHistory = filteredHistory;
    if (validHistory.length > 0 && validHistory[0].role === 'model') {
      // Skip all leading model messages
      const firstUserIdx = validHistory.findIndex((m: any) => m.role === 'user');
      if (firstUserIdx === -1) {
        validHistory = [];
      } else {
        validHistory = validHistory.slice(firstUserIdx);
      }
    }

    const chat = model.startChat({
      history: validHistory,
    });

    const result = await chat.sendMessageStream(userMessage);

    const stream = new ReadableStream({
      async start(controller) {
        for await (const chunk of result.stream) {
          const chunkText = chunk.text();
          if (chunkText) {
            controller.enqueue(new TextEncoder().encode(chunkText));
          }
        }
        controller.close();
      }
    });

    return new Response(stream, {
        headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    });

  } catch (error: any) {
    console.error("Chat API error:", error);
    return NextResponse.json({ error: error.message || "Failed to generate response" }, { status: 500 });
  }
}
