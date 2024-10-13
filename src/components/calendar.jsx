// CalendarComponent.js
import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import './calendar.css'; // Make sure to include your CSS here

const CalendarComponent = () => {
  const [events, setEvents] = useState([
    //{ title: 'Event 1', date: '2024-10-15' },
    //{ title: 'Event 2', date: '2024-10-20' },
    //{ title: 'Event 3', date: '2024-10-25' },
  ]);

  const handleDateClick = (arg) => {
    const title = prompt('Enter Event Title:');
    if (title) {
      setEvents([...events, { title, date: arg.dateStr }]);
    }
  };

  return (
    <div className="calendar-container">
      <h1>Calendar</h1>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={events}
        dateClick={handleDateClick}
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,dayGridWeek,dayGridDay',
        }}
      />
    </div>
  );
};

export default CalendarComponent;
