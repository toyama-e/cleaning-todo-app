'use client';

import { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

export default function CleaningCalendar () {
    return (
    <div className='bg-white p-6 rounded-lg'>
    <FullCalendar
    
      plugins={[ dayGridPlugin ]}
      initialView="dayGridMonth"
      
    />
    </div>
  )
} 
