const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"

export async function sendMessage(
  sessionId: string,
  message: string
): Promise<{ response: string }> {
  const res = await fetch(`${API_URL}/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      session_id: sessionId,
      message,
    }),
  })

  if (!res.ok) {
    throw new Error("Failed to send message")
  }

  return res.json()
}

