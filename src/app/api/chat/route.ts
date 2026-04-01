import { GoogleGenerativeAI, Content } from '@google/generative-ai';
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
    console.error("CRITICAL: GEMINI_API_KEY is missing in env variables");
    return new Response("API key is missing", { status: 500 });
  }

  try {
    const { history, userMessage } = await req.json();
    
    if (!userMessage) {
        return new Response("User message is required", { status: 400 });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      systemInstruction: SYSTEM_PROMPT, // Correct placement for 1.5 models
    });

    // Formatting history correctly for Gemini:
    // Must start with user, alternate user/model
    let validHistory: Content[] = [];
    
    if (history && Array.isArray(history)) {
       // Only start history if the first message is from user
       let lastRole = '';
       
       for (const msg of history) {
          const role = msg.role === 'model' ? 'model' : 'user';
          
          // Ensure we don't start with 'model' and we alternate
          if (validHistory.length === 0 && role !== 'user') continue;
          if (role === lastRole) continue;
          
          if (msg.text && msg.text.trim()) {
              validHistory.push({
                role: role,
                parts: [{ text: msg.text }]
              });
              lastRole = role;
          }
       }
       
       // Ensure context doesn't end with a model response if we are about to add a user message
       // (Gemini startChat will handle the new user message automatically)
       if (validHistory.length > 0 && validHistory[validHistory.length - 1].role === 'user') {
           // If it ends with user, the chat might expect a model response, 
           // but since we are about to call sendMessage(userMessage), 
           // the history should end with model.
           // However, if we pop it, we lose context.
           // Actually, sendMessage adds the message to history.
       }
    }

    const chat = model.startChat({
      history: validHistory,
    });

    const result = await chat.sendMessageStream(userMessage);

    const stream = new ReadableStream({
      async start(controller) {
        try {
          const encoder = new TextEncoder();
          for await (const chunk of result.stream) {
            const chunkText = chunk.text();
            if (chunkText) {
              controller.enqueue(encoder.encode(chunkText));
            }
          }
          controller.close();
        } catch (e: any) {
          console.error("STREAMING ERROR:", e.message);
          controller.error(e);
        }
      }
    });

    return new Response(stream, {
        headers: { 
            'Content-Type': 'text/plain; charset=utf-8',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive',
        },
    });

  } catch (error: any) {
    console.error("CHAT API ROOT ERROR:", error);
    // Return more helpful error for debugging
    return new Response(`AI Error: ${error.message || 'Unknown error'}`, { status: 500 });
  }
}
