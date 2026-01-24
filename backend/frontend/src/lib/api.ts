const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

if (!API_BASE_URL) {
  throw new Error("NEXT_PUBLIC_API_BASE_URL is not defined")
}

export async function sendMessage(sessionId: string, message: string): Promise<string> {
  const res = await fetch(`${API_BASE_URL}/chat`, {
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

  const data = await res.json()
  return data.response   // ✅ STRING (matches your page.tsx)
}

