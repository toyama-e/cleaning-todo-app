export default function TaskItem({ task, onEdit, onDelete }) {
  return (
    <div
      style={{
        background: "white",
        width: "80%",
        maxWidth: "600px",
        padding: "24px",
        borderRadius: "16px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
        marginBottom: "24px",
      }}
    >
      <h2 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "8px" }}>{task.name}</h2>

      <p>掃除箇所：{task.cleaning_area_name}</p>
      <p>予定日：{task.do_at.replace("T", " ").slice(0, 16)}</p>

      {task.done_at ? (
        <p style={{ color: "green", fontWeight: "bold" }}>
          完了日：{task.done_at.replace("T", " ").slice(0, 16)}
        </p>
      ) : (
        <p style={{ color: "orange", fontWeight: "bold" }}>未完了</p>
      )}

      <p>担当：{task.user_name}</p>
      {task.memo && <p>メモ：{task.memo}</p>}

      {/* ⭐ ボタン配置を横並び中央寄せに改善 */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        <button
          onClick={() => onEdit(task.id)}
          style={{
            padding: "12px 28px",
            backgroundColor: "#f8d348",
            borderRadius: "24px",
            border: "none",
            color: "#007b83",
            fontWeight: "bold",
            cursor: "pointer",
            boxShadow: "0 3px 6px rgba(0,0,0,0.15)",
          }}
        >
          編集
        </button>

        <button
          onClick={() => onDelete(task.id)}
          style={{
            padding: "12px 28px",
            backgroundColor: "lightgray",
            borderRadius: "24px",
            border: "none",
            color: "#555",
            fontWeight: "bold",
            cursor: "pointer",
            boxShadow: "0 3px 6px rgba(0,0,0,0.15)",
          }}
        >
          削除
        </button>
      </div>
    </div>
  );
}
