"use client";

import TaskForm from "@/components/TaskForm";
import { useRouter } from "next/navigation";
import { Task } from "@/lib/types";
import { useState, useEffect } from "react";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";

export default function CreateTaskPage() {
  const router = useRouter();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      // 未ログイン → 404 へ
      if (user === null) {
        router.push("/404");
      }
    });

    return () => unsub();
  }, [auth, router]);

  const handleSubmit = async (task: Omit<Task, "id">) => {
    const res = await fetch("http://localhost:4000/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ task }),
    });

    if (!res.ok) {
      alert("登録に失敗しました");
      return;
    }

    alert("登録しました！");
    router.push("/calendar");
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom, #4fb5c9, #79d3b6)",
        paddingTop: "40px",
        paddingBottom: "40px",
      }}
    >
      <TaskForm onSubmit={handleSubmit} />
    </main>
  );
}
