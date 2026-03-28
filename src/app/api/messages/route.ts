import type { WishRecord } from "@/lib/messages";
import { WISH_MAX_MESSAGE, WISH_MAX_NAME } from "@/lib/messages";

let messages: WishRecord[] = [];

export async function GET() {
  return Response.json(messages);
}

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (!body || typeof body !== "object") {
    return Response.json({ error: "Invalid payload" }, { status: 400 });
  }

  const rawName = (body as { name?: unknown }).name;
  const rawMessage = (body as { message?: unknown }).message;

  const name = typeof rawName === "string" ? rawName.trim() : "";
  const message = typeof rawMessage === "string" ? rawMessage.trim() : "";

  if (!name) {
    return Response.json({ error: "Name is required" }, { status: 400 });
  }
  if (name.length > WISH_MAX_NAME) {
    return Response.json(
      { error: `Name must be at most ${WISH_MAX_NAME} characters` },
      { status: 400 }
    );
  }
  if (!message) {
    return Response.json({ error: "Message is required" }, { status: 400 });
  }
  if (message.length > WISH_MAX_MESSAGE) {
    return Response.json(
      { error: `Message must be at most ${WISH_MAX_MESSAGE} characters` },
      { status: 400 }
    );
  }

  const newMessage: WishRecord = {
    id: Date.now(),
    name,
    message,
    createdAt: new Date().toISOString(),
  };

  messages = [newMessage, ...messages];

  return Response.json(newMessage);
}
