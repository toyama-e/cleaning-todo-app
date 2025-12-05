'use client';
import CleaningCalendar from "@/components/CleaningCalendar";

export default function CalendarPage() {
    return (
        <div className='min-h-screen bg-gray-100 py-8'>
            <div className='max-w-7xl mx-auto px-4'>
                <h1 className='text-3xl font-bold mb-6'>お掃除カレンダー🧹</h1>

                <CleaningCalendar />
            </div>
        </div>
    )
