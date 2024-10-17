import { Outlet } from 'react-router-dom';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/navbar.jsx';
import Content from './components/content.jsx';
import Footer from './components/footer.jsx';
import Login from './components/login.jsx';
import CalendarComponent from './components/calendar.jsx';
import TaskList from './components/todoList.jsx';
import TaskDetail from './components/TaskDetail.jsx';  // Don't forget to import this!
import CategoryList from './components/category.jsx';
import './App.css';


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
              <Route path="login" element={<Login />} />
              <Route path="calendar" element={<CalendarComponent />} />
              <Route path="to-do_list" element={<TaskList />} />
              <Route path="tasks/:id" element={<TaskDetail />} />
              <Route path="categories" element={<CategoryList />} />
            </Route>
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
