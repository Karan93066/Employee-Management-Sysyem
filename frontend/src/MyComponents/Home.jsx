import React, { useState,useEffect } from 'react';
import './home.css'; 
const EmployeeTable = ({ data, itemsPerPage ,handleDelete}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchItem, setSearchItem] = useState('');
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handleClick = (page) => {
    setCurrentPage(page);
  };

  const TableData = () => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    let filteredData = data;

    if (searchItem !== '') {
        filteredData = filteredData.filter(employee =>
            employee.name.toLowerCase().includes(searchItem.toLowerCase()) ||
            employee.department.toLowerCase().includes(searchItem.toLowerCase())
          );
    }
    return filteredData.slice(start, end).map((employee, index) => (
      <tr key={index}>
        <td>{employee.employee_id}</td>
        <td>{employee.ename}</td>
        <td>{employee.salary}</td>
        <td>{employee.department}</td>
        <td>
          <div className='btns'>
              <div >
              <button className="btn btn_delete"  onClick={() => handleDelete(employee.employee_id)}>Delete</button>
              </div>
              <div>
              <button className="btn"><a href={`/edit_employee/${employee.employee_id}`}>Edit</a></button>
              </div>
          </div>
        </td>
      </tr>
    ));
  };
  const Pagination = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handleClick(i)}
          className={currentPage === i ? 'active' : ''}
        >
          {i}
        </button>
      );
    }
    return pages;
  };

  return (
    <div className="employee-table">
      <div className='button_div'>
              <button className="btn"><a href='/add_employee'>Add Employee</a></button>
      </div>
      <div>
        <input
          type="text"
          placeholder="Search by Name or Department"
          value={searchItem}
          onChange={(e) => setSearchItem(e.target.value)}
        />
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Salary</th>
            <th>Department</th>
            <th>Opertions</th>
          </tr>
        </thead>
        <tbody>{TableData()}</tbody>
      </table>
      <div className="pagination">
        <span>Page: </span>
        {Pagination()}
      </div>
    </div>
  );
};



const Home = () => {
  const [employees, setEmployees] = useState([]);

  const fetchEmployees = async () => {
    try {
      const response = await fetch('http://localhost:4200/employees');
      if (!response.ok) {
        throw new Error('Network Error');
      }
      const data = await response.json();
      setEmployees(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleDelete = async (employeeId) => {
    try {
      const response = await fetch(`http://localhost:4200/delete_employee/${employeeId}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error('Network Error');
      }
      alert('Employee deleted successfully');
      fetchEmployees();
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };
    return(
        <>
            <nav className="navbar">
      <div className="nav_container">
        <div className="logo">
          <h1>EMPLOYEEE MANAGEMENT SYSTEM</h1>
        </div>
      </div>
    </nav>
    <EmployeeTable data={employees} itemsPerPage={5} handleDelete={handleDelete}/>
        </>
    )
};
export default Home;
