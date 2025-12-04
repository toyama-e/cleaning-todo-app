"use client";

import TaskForm from "@/components/TaskForm";
import { useRouter } from "next/navigation";
import { Task } from "@/lib/types";

export default function CreateTaskPage() {
  const router = useRouter();

  const handleSubmit = async (task: Omit<Task, "id">) => {
    const res = await fetch("http://localhost:4000/api/v1/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ task }),
    });

    if (!res.ok) {
      alert("登録に失敗しました");
      return;
    }

    alert("登録しました！");
    router.push("/tasks");
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
