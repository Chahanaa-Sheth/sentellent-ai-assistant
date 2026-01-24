"use client"

import { useState } from "react"
import { sendMessage } from "@/lib/api"

export default function Home() {
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState<string[]>([])

  const handleSend = async () => {
    console.log("Button clicked")
    if (!message) return

    setMessages((prev) => [...prev, "You: " + message])

    try {
      const res = await sendMessage("test-session", message)
      console.log("API response:", res)
      setMessages((prev) => [...prev, "AI: " + res])
    } catch (err) {
      console.error(err)
      setMessages((prev) => [...prev, "❌ Error contacting server"])
    }

    setMessage("")
  }

  return (
    <main style={{ padding: 20 }}>
      <h1>Sentellent Chat</h1>

      <div style={{ marginBottom: 10 }}>
        {messages.map((m, i) => (
          <div key={i}>{m}</div>
        ))}
      </div>

      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message"
      />

      <button onClick={handleSend}>Send</button>
    </main>
  )
}

