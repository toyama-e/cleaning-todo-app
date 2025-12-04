"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginWithEmail } from "@/lib/firebase";

export default function HomePage() {
  const router = useRouter();

  // ← 最初からフォームが表示される
  const [showForm] = useState(true);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      await loginWithEmail(email, password);
      router.push("/calendar"); // 今月のカレンダーへ
    } catch (err) {
      setError("メールアドレスまたはパスワードが違います");
    }
  };

  return (
    <main
      style={{
        height: "100vh",
        background: "linear-gradient(to bottom, #4fb5c9, #79d3b6)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        color: "white",
      }}
    >
      <h1 style={{ fontSize: "42px", fontWeight: "bold", marginBottom: "8px" }}>
        お掃除 ToDo アプリ
      </h1>

      <p style={{ fontSize: "20px", marginBottom: "40px" }}>Cleaning task management</p>

      {/* ---- ログインフォーム表示 ---- */}
      <div style={{ marginBottom: "20px" }}>
        <input
          type="email"
          placeholder="メールアドレス"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            padding: "12px",
            width: "260px",
            borderRadius: "10px",
            marginBottom: "12px",
            color: "black",
            fontSize: "16px",
            border: "2px solid #ccc",
          }}
        />
        <br />

        <input
          type="password"
          placeholder="パスワード"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            padding: "12px",
            width: "260px",
            borderRadius: "10px",
            marginBottom: "12px",
            color: "black",
            fontSize: "16px",
            border: "2px solid #ccc",
          }}
        />
        <br />

        <button
          onClick={handleLogin}
          style={{
            marginTop: "12px",
            padding: "14px 40px",
            backgroundColor: "#f8d348",
            borderRadius: "30px",
            fontSize: "20px",
            border: "3px solid white",
            color: "#007b83",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          ログイン
        </button>

        {error && <p style={{ marginTop: "10px", color: "red" }}>{error}</p>}
      </div>

      {/* 閲覧リンク（未ログインでもOK） */}
      <a
        href="/calendar"
        style={{
          color: "white",
          fontSize: "18px",
          textDecoration: "underline",
          marginTop: "15px",
        }}
      >
        お掃除一覧を見る ≫
      </a>
    </main>
  );
}
