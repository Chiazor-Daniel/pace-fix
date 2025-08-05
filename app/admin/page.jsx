"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function Adminpage() {
  const router = useRouter()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()

    if (username === "pacesetteradmin" && password === "paceadmin123") {
      window.open("https://news.pacesetterfrontier.com/enter", "_blank", "noopener,noreferrer")
      router.push("/")
    } else {
      setError("Invalid credentials")
    }
  }

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "linear-gradient(90deg, #f8fafc 0%, #fff 100%)"
    }}>
      <form
        onSubmit={handleSubmit}
        style={{
          background: "#fff",
          borderRadius: "16px",
          padding: "32px",
          boxShadow: "0 12px 24px rgba(0,0,0,0.08)",
          minWidth: "320px"
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "24px" }}>Admin Login</h2>
        {error && (
          <div style={{ color: "#e53e3e", marginBottom: "16px", textAlign: "center", fontSize: "14px" }}>
            {error}
          </div>
        )}
        <div style={{ marginBottom: "16px" }}>
          <label htmlFor="username" style={{ display: "block", marginBottom: "6px", fontWeight: "bold" }}>Username</label>
          <input
            id="username"
            type="text"
            autoComplete="username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid #e2e8f0"
            }}
          />
        </div>
        <div style={{ marginBottom: "24px" }}>
          <label htmlFor="password" style={{ display: "block", marginBottom: "6px", fontWeight: "bold" }}>Password</label>
          <input
            id="password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid #e2e8f0"
            }}
          />
        </div>
        <button
          type="submit"
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: "8px",
            background: "#ef233c",
            color: "#fff",
            fontWeight: "bold",
            border: "none",
            cursor: "pointer",
            fontSize: "16px"
          }}
        >
          Login
        </button>
      </form>
    </div>
  )
}