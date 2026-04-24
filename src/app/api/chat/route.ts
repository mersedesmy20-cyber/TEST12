import { GoogleGenerativeAI, Content } from '@google/generative-ai';
import { NextRequest, NextResponse } from 'next/server';

const apiKey = process.env.GEMINI_API_KEY;

const SYSTEM_PROMPT = `Ви — "Glorious AI Agent", персональний експерт преміальної туристичної компанії Glorious Travel.
Ваша мета: допомагати клієнтам обирати найкращі подорожі, планувати маршрути та відповідати на запитання.

Правила відповіді:
1. Тон: Професійний, надихаючий, але дружній.
2. Мова: Завжди відповідайте тією ж мовою, якою звернувся клієнт (зазвичай українська).
3. Контент: Пропонуйте конкретні напрямки (Туреччина, Єгипет, Мальдіви тощо).
4. Заклик до дії: Якщо клієнт вагається, пропонуйте зв'язатися з менеджером у Telegram для бронювання.
5. Форматування: Використовуйте списки та емодзі, щоб текст було легко читати.`;

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
    
    // Use gemini-3-flash-preview
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      systemInstruction: {
        role: 'system',
        parts: [{ text: SYSTEM_PROMPT }]
      }
    });

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
