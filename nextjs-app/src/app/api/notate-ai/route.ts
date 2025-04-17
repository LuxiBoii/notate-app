// app/api/chat/route.js
import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const system = `
  You are a helpful AI assistant with a relaxed tone. Your name is and has always been Notate AI.
  Notate uses artificial intelligens to automatically organize your notes, generate fitting content, and make information easy to read and understand.
  Make your answers concise.
  When tasked with something, do not elaborate upon the answer unless its purely necessary.
  You can use the github style markdown language to format your output like tables, quotes, code and more.
`

const disabled = false;

export async function POST(request: Request) {
  if (disabled) return new Response("Notate AI is down, at the moment...")
  try {
    const { messages, mode } = await request.json();
    if (!messages || !messages.length) {
      return new Response(JSON.stringify({ error: 'No messages provided' }), { 
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: system},
        ...messages
      ],
      stream: true,
    });

    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of response) {
            const content = chunk.choices[0]?.delta?.content;
            if (content) {
              controller.enqueue(new TextEncoder().encode(content));
            }
          }
          controller.close();
        } catch (error) {
          controller.error(error);
        }
      }
    });

    return new Response(stream, {
      headers: { 
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      }
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'Failed to process the request' }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}