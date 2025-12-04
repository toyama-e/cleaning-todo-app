"use client";

import { useState, useEffect } from "react";
import { Task } from "@/lib/types";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";

type Props = {
  onSubmit: (task: Omit<Task, "id">) => void;
};

export default function TaskForm({ onSubmit }: Props) {
  const router = useRouter();

  // 認証チェックはここに置く
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push("/404");
      }
    });

    return () => unsub();
  }, [router]);

  const [form, setForm] = useState<Omit<Task, "id">>({
    name: "",
    cleaning_area_id: 1,
    do_at: "",
    done_at: null,
    memo: "",
    status: "未完了",
    user_id: 1,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        background: "white",
        padding: "32px",
        borderRadius: "16px",
        width: "90%",
        maxWidth: "600px",
        margin: "0 auto",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
      }}
    >
      <h2
        style={{ textAlign: "center", fontSize: "24px", marginBottom: "24px", fontWeight: "bold" }}
      >
        お掃除タスクを登録
      </h2>

      <label>お掃除タイトル</label>
      <input name="name" value={form.name} onChange={handleChange} style={inputStyle} required />

      <label>お掃除箇所</label>
      <select
        name="cleaning_area_id"
        value={form.cleaning_area_id}
        onChange={handleChange}
        style={inputStyle}
      >
        <option value={1}>トイレ</option>
        <option value={2}>お風呂</option>
        <option value={3}>コンロ</option>
      </select>

      <label>お掃除予定日</label>
      <input
        type="datetime-local"
        name="do_at"
        value={form.do_at}
        onChange={handleChange}
        style={inputStyle}
        required
      />

      <label>ステータス</label>
      <select name="status" value={form.status} onChange={handleChange} style={inputStyle}>
        <option value="未完了">未完了</option>
        <option value="完了">完了</option>
      </select>

      <label>担当者</label>
      <select name="user_id" value={form.user_id} onChange={handleChange} style={inputStyle}>
        <option value={1}>Aさん</option>
        <option value={2}>Bさん</option>
        <option value={3}>Cさん</option>
      </select>

      <label>メモ</label>
      <input name="memo" value={form.memo} onChange={handleChange} style={inputStyle} />

      <button
        type="submit"
        style={{
          marginTop: "24px",
          padding: "12px 0",
          width: "160px",
          backgroundColor: "#f5c242",
          color: "white",
          fontWeight: "bold",
          borderRadius: "24px",
          border: "none",
          display: "block",
          marginLeft: "auto",
          marginRight: "auto",
          cursor: "pointer",
        }}
      >
        登録
      </button>
    </form>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "12px",
  margin: "8px 0 20px 0",
  borderRadius: "8px",
  border: "1px solid #ccc",
};
