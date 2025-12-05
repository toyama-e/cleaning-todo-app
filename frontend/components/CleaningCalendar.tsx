'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Task } from '@/lib/types';

export default function CleaningCalendar() {
  const router = useRouter();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchTasks();
  }, []);


  const fetchTasks = async () => {
    try {
      setLoading(true);
      setError(null);

      const mockTasks: Task[] = [
        {
          id: 1,
          name: 'キッチン掃除',
          cleaning_area_id: 1,
          do_at: '2025-12-03T09:00:00',
          done_at: null,
          memo: '油汚れ強め',
          status: '完了',
          user_id: 1,
        },
        {
          id: 2,
          name: 'お風呂掃除',
          cleaning_area_id: 2,
          do_at: '2025-12-03T10:00:00',
          done_at: '2025-12-03T10:30:00',
          memo: '',
          status: '未完了',
          user_id: 2,
        },
      ];
      setTasks(mockTasks);

      // ---------------------------
      // API呼び出し（本番用）
      // ---------------------------
      // const response = await fetch('http://localhost:4000/api/tasks');
      // if (!response.ok) {
      //   throw new Error(`HTTP Error: ${response.status}`);
      // }
      // const data: Task[] = await response.json();
      // setTasks(data);

    } catch (err) {
      console.error('タスク取得エラー:', err);
      setError('タスクの取得に失敗しました');
    } finally {
      setLoading(false);
    }
  };

  const events = tasks.map((task) => ({
    id: String(task.id),
    start: task.do_at.split('T')[0],
    allDay: true,
    backgroundColor: task.status === '未完了' ? '#10b981' : '#eab308',
    borderColor: task.status === '未完了' ? '#10b981' : '#eab308',
    extendedProps: {
      task,
    },
  }));



  const renderEventContent = (eventInfo: any) => {
    const task: Task = eventInfo.event.extendedProps.task;
    const areaName = task.cleaning_area_id === 1 ? '換気扇' : '浴槽';
    const userName = task.user_id === 1 ? 'Aさん' : 'Bさん';

    return (
      <div className="p-1 cursor-pointer">
          🏠 {areaName} 👤 {userName} 
        </div>
    );
  };


  const handleEventClick = (info: any) => {
    alert('タスクがクリックされました！');
  };


  const handleDateClick = (info: any) => {
    const clickedDate = info.dateStr;
    router.push(`/tasks/create?date=${clickedDate}`);
  };

  if (loading) {
    return (
      <div className="max-w-2xl bg-white p-6 rounded-lg shadow-lg">
        <div className="flex items-center justify-center h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="ml-4 text-gray-600">読み込み中...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-2xl bg-white p-6 rounded-lg shadow-lg">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800">{error}</p>
          <button
            onClick={fetchTasks}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            再試行
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl bg-white p-6 rounded-lg shadow-lg">
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        locale="ja"
        events={events}
        eventContent={renderEventContent}
        eventClick={handleEventClick}
        dateClick={handleDateClick}
        headerToolbar={{
          left: '',
          center: 'title',
        }}
        height="auto"
      />
    </div>
  );
} 