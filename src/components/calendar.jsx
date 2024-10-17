import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import './calendar.css'; // Make sure to include your CSS here

const CalendarComponent = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Fetch events from API with access key in headers
    fetch('http://127.0.0.1:8000/to-do-list/tasks/', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('access')}`,  // Replace 'YOUR_ACCESS_KEY' with your actual key
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const formattedEvents = data.results.map((event) => ({
          title: event.title,
          date: event.due_date, // Ensure the API returns dates in "YYYY-MM-DD" format
        }));
        setEvents(formattedEvents);
      })
      .catch((error) => {
        console.error('Error fetching events:', error);
      });
  }, []);

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
