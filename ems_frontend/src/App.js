import './App.css';
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import ListEmployeeComponent from './components/ListEmployeeComponent';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import EmployeeComponent from './components/EmployeeComponent';
function App() {
  return (
    <div>
      <BrowserRouter>
        <HeaderComponent />
        <div className="container pb-5">
          <Routes>
            {/* http://localhost:3000 */}
            <Route path="/" element={<ListEmployeeComponent />} />
            {/* http://localhost:3000/employees */}
            <Route path="/employees" element={<ListEmployeeComponent />} />
            <Route path="/add-employee" element={<EmployeeComponent />} />
            <Route path="/edit-employee/:id" element={<EmployeeComponent />} />
          </Routes>
        </div>
        <FooterComponent />
      </BrowserRouter>
    </div>
  );
}

export default App;
