import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/navbar.jsx';
import Content from './components/content.jsx';
import Footer from './components/footer.jsx';
import Login from './components/login.jsx';
import CalendarComponent from './components/calendar.jsx';
import TaskList from './components/todoList.jsx'
import './App.css'

const Dashboard = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};


function App() {

  return (
    <>
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<Dashboard />}>
              <Route index element={<Content />} />
            </Route>
            <Route path="/login" element={<Dashboard />}>
              <Route index element={<Login />} />
            </Route>
            <Route path="/calendar" element={<Dashboard />}>
              <Route index element={<CalendarComponent />} />
            </Route>
            <Route path="/to-do_list" element={<Dashboard />}>
              <Route index element={<TaskList />} />
            </Route>
          </Routes>
        </div>
      </Router>
    </>
  )
}

export default App
