"use client";

import { useState, useEffect } from "react";
import TaskItem from "@/components/TaskItem";
import { Task } from "@/lib/types";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";

export default function TodayTasksPage() {
  const router = useRouter();

  //onAuthStateChanged　ユーザーの認証状態の変化をリアルタイムに監視するための関数
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push("/404");
      }
    });

    return () => unsub();
  }, [auth, router]);

  // ⭐ 新規登録ページへ遷移
  const handleCreate = () => {
    router.push("/tasks/create");
  };

  // ⭐ mock データ（API 完成まで一時使用）
  // const mockTasks: Task[] = [
  //   {
  //     id: 1,
  //     name: "キッチン掃除",
  //     cleaning_area_id: 1,
  //     do_at: "2025-12-03T09:00:00",
  //     done_at: null,
  //     memo: "油汚れ強め",
  //     status: "not_started",
  //     user_id: 1,
  //   },
  //   {
  //     id: 2,
  //     name: "お風呂掃除",
  //     cleaning_area_id: 2,
  //     do_at: "2025-12-03T10:00:00",
  //     done_at: "2025-12-03T10:30:00",
  //     memo: "",
  //     status: "done",
  //     user_id: 2,
  //   },
  // ];

  const [tasks, setTasks] = useState<Task[]>([]);

  const areaNameMap: Record<number, string> = {
    1: "トイレ",
    2: "お風呂",
    3: "換気扇",
  };

  const userNameMap: Record<number, string> = {
    1: "Aさん",
    2: "Bさん",
  };

  useEffect(() => {
    const fetchTasks = async () => {
      const res = await fetch("http://localhost:4000/api/tasks/today");
      if (!res.ok) {
        console.error("APIエラー:", res.status);
        return;
      }
      const data = await res.json();
      setTasks(data);
    };
    fetchTasks();

    //   // ⭐ mock をセット
    //   setTasks(mockTasks);
  }, []);

  const handleEdit = (id: number) => {
    router.push(`/tasks/${id}/edit`);
  };

  const handleDelete = async (id: number) => {
    const ok = confirm("本当に削除しますか？");
    if (!ok) return;

    const res = await fetch(`http://localhost:4000/api/tasks/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      alert("削除に失敗しました");
      return;
    }
    setTasks((prev) => prev.filter((t) => t.id !== id));

    alert("削除しました");
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
          marginBottom: "20px",
        }}
      >
        今日のお掃除タスク
      </h1>

      {/* ⭐ 新規登録ボタン */}
      <div style={{ display: "flex", justifyContent: "center" }}>
        <button
          onClick={handleCreate}
          style={{
            padding: "12px 28px",
            backgroundColor: "#f8d348",
            border: "2px solid white",
            borderRadius: "24px",
            color: "#007b83",
            fontWeight: "bold",
            marginBottom: "30px",
            cursor: "pointer",
            boxShadow: "0 3px 6px rgba(0,0,0,0.15)",
          }}
        >
          新規登録
        </button>
      </div>

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
              cleaning_area_name: areaNameMap[task.cleaning_area_id] ?? "不明",
              user_name: userNameMap[task.user_id] ?? "不明",
            }}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </main>
  );
}
