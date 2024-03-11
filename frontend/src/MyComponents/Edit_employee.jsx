
import React ,{useState, useEffect} from 'react';
import { useParams,useNavigate } from 'react-router-dom';

function Edit_employee(props) {
    var { id } = useParams();
    const [employeeName,setEmployeeName] = useState('');
    const [employeeSalary,setEmployeeSalary] = useState('');
    const [department, setDepartment] = useState('IT');
    const navigate = useNavigate();

    useEffect(() => {
        fetchEmployee(id);
      }, [id]);

      const fetchEmployee = async (id) => {
        try {
          const response = await fetch(`http://localhost:4200/edit_employees/${id}`);
          if (!response.ok) {
            throw new Error('Network Error');
          }
          const data = await response.json();
          setEmployeeName(data.ename);
          setEmployeeSalary(data.salary);
          setDepartment(data.department);
        } catch (error) {
          console.error('Error fetching employee:', error);
        }
      };
    function handleChange1(e){
        e.preventDefault()
        setEmployeeName(e.target.value)
    }
    function handleChange2(e){
        e.preventDefault()
        setEmployeeSalary(e.target.value)
    }
    function handleChange3(e){
        e.preventDefault()
        setDepartment(e.target.value)
    }

      const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {
            ename: employeeName,
            salary: employeeSalary,
            department: department
        };

        try {
            const response = await fetch(`http://localhost:4200/update_employees/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error('Network Error');
            }
            setEmployeeName('');
            setEmployeeSalary('');
            setDepartment('IT');
            const responseData = await response.json();
            alert('Employee updated successfully');
            navigate("/home");
        } catch (error) {
            console.error('Error submitting data:', error);
        }
    };
    return (
        <>
                   <nav className="navbar">
      <div className="nav_container">
        <div className="logo">
          <h1>EMPLOYEEE MANAGEMENT SYSTEM</h1>
        </div>
      </div>
    </nav>
           <div>
            <h1 className='heading'>Edit Employee</h1>
          </div>
          <form onSubmit={handleSubmit} class="my-form">
                
                <div>
                    <label htmlFor="ename">Employee Name</label>
                    <input type="text" placeholder="Enter Employee Name" name="ename" value={employeeName} onChange={handleChange1}required/>
                </div>
                <div>
                    <label htmlFor="esalary">Salary</label>
                    <input type="number" placeholder="Enter Employee Salary" name="esalary" value={employeeSalary} onChange={handleChange2} required/>
                </div>
                <div>
                    <label htmlFor="Department">Choose a Department:</label>
                    <select name="Department" onChange={handleChange3} required>
                    <option  value="IT" >IT</option>
                    <option value="HR">HR</option>
                    <option value="Finance">Finance</option>
                    </select>
                </div>  
               
                <button type="submit">Submit</button>
            </form>
        </>
     
    );
}

export default Edit_employee;