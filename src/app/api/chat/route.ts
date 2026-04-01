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
    return new Response("API key is missing", { status: 500 });
  }

  try {
    const { history, userMessage } = await req.json();
    
    if (!userMessage) {
        return new Response("User message is required", { status: 400 });
    }

    // Initialize with explicit version if possible (v1 is more stable for flash)
    const genAI = new GoogleGenerativeAI(apiKey);
    
    // Use gemini-1.5-flash (standard name)
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    let validHistory: Content[] = [];
    if (history && Array.isArray(history)) {
       let lastRole = '';
       for (const msg of history) {
          const role = msg.role === 'model' ? 'model' : 'user';
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
    }

    // For gemini-1.5, systemInstruction can also be passed here in some SDK versions
    // let's try the most compatible way: startChat with history and let system prompt be first message or use special field
    const chat = model.startChat({
      history: validHistory,
      systemInstruction: SYSTEM_PROMPT // System prompt here is usually for v1/v1beta models
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
          controller.error(e);
        }
      }
    });

    return new Response(stream, {
        headers: { 
            'Content-Type': 'text/plain; charset=utf-8',
            'Cache-Control': 'no-cache',
        },
    });

  } catch (error: any) {
    console.error("CHAT API ERROR:", error);
    return new Response(`AI Error: ${error.message || 'Unknown error'}`, { status: 500 });
  }
}
