import './App.css'
import Login from './MyComponents/Login.jsx'
import Home from './MyComponents/Home.jsx'
import Add_employee from './MyComponents/Add_employee.jsx'
import Edit_employee from './MyComponents/Edit_employee.jsx'
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/add_employee" element={<Add_employee />} />
        <Route path="/edit_employee/:id" element={<Edit_employee/>}/>
      </Routes>
    </>
  )
}

export default App;
