import react,{useState} from 'react'
import { useNavigate } from 'react-router-dom';

 function AddEmployee () {
    const [employeeName,setEmployeeName] = useState('');
    const [employeeSalary,setEmployeeSalary] = useState('');
    const [department, setDepartment] = useState('IT');
    const navigate = useNavigate();


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
            const response = await fetch('http://localhost:4200/add_employees', {
                method: 'POST',
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
            alert('Employee Added Successfully!');
            navigate("/home");
        } catch (error) {
            console.error('Error submitting data:', error);
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
        <h1 className="heading">Add Employee</h1>
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
    )
};
export default AddEmployee;