"use client";

import { useState, useEffect } from "react";
import TaskItem from "@/components/TaskItem";
import { Task } from "@/lib/types";
import { useRouter } from "next/navigation";

export default function TodayTasksPage() {
  const router = useRouter();

  // ⭐ ここは mock データ（API 完成まで一時使用）
  const mockTasks: Task[] = [
    {
      id: 1,
      name: "キッチン掃除",
      cleaning_area_id: 1,
      do_at: "2025-12-03T09:00:00",
      done_at: null,
      memo: "油汚れ強め",
      status: "not_started",
      user_id: 1,
    },
    {
      id: 2,
      name: "お風呂掃除",
      cleaning_area_id: 2,
      do_at: "2025-12-03T10:00:00",
      done_at: "2025-12-03T10:30:00",
      memo: "",
      status: "done",
      user_id: 2,
    },
  ];

  const [tasks, setTasks] = useState<Task[]>([]);

  // 🔥 API ができたらこの中を書き換える
  useEffect(() => {
    // ---------------------------
    // 本来の API 処理：いまはコメントアウト
    //
    // const fetchTasks = async () => {
    //   const res = await fetch("http://localhost:4000/tasks/today");
    //   const data = await res.json();
    //   setTasks(data);
    // };
    // fetchTasks();
    // ---------------------------

    // ⭐ mock をセット
    setTasks(mockTasks);
  }, []);

  // 編集ページへ移動
  const handleEdit = (id: number) => {
    router.push(`/tasks/${id}/edit`);
  };

  // 削除（mockなので画面上だけ反映）
  const handleDelete = (id: number) => {
    // ---------------------------
    // 本来の API 処理（いまはコメントアウト）
    //
    // await fetch(`http://localhost:4000/tasks/${id}`, { method: "DELETE" });
    // fetchTasks();
    // ---------------------------

    // ⭐ mock では画面上のデータだけ更新
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom, #4fb5c9, #79d3b6)",
        paddingTop: "40px",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          fontSize: "28px",
          fontWeight: "bold",
          color: "white",
          marginBottom: "30px",
        }}
      >
        今日のお掃除タスク
      </h1>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={{
              ...task,
              cleaning_area_name: task.cleaning_area_id === 1 ? "換気扇" : "浴槽",
              user_name: task.user_id === 1 ? "Aさん" : "Bさん",
            }}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </main>
  );
}
