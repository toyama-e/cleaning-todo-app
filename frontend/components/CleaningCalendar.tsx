'use client';

import { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { CalendarEvent } from '../lib/types';


export default function CleaningCalendar() {
  const [events, setEvents] = useState<CalendarEvent[]>([]);

  useEffect(() => {
    const sampleEvents: CalendarEvent[] = [
      {
        id: '1',
        title: 'トイレ掃除 - Aさん',
        start: '2025-12-01',
        backgroundColor: '#1C6EA4', 
        borderColor: 'FF9013',
      },
      {
        id: '2',
        title: 'お風呂掃除 - Bさん',
        start: '2025-12-01',
        backgroundColor: '#FF9013', 
        borderColor: '#FF9013',
      },
      {
        id: '3',
        title: 'キッチン掃除 - Aさん',
        start: '2025-12-02',
        backgroundColor: '#1C6EA4',
        borderColor: '#1C6EA4',
      },
    ];
    setEvents(sampleEvents);
  }, []);

  
  const handleEventClick = (info: any) => {
    alert(`タスク: ${info.event.title}`);
  };


  const handleDateClick = (info: any) => {
    alert(`日付: ${info.dateStr} がクリックされました`);
    
  };

  return (
    <div className="max-w-2xl bg-white p-6 rounded-lg shadow-lg">
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        locale="ja"
        events={events}
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