import React, { useState } from 'react';
import './login.css'
import { useNavigate } from 'react-router-dom';


function Login() {
    const [ename,setUserName] = useState('');
    const [password,setPassword] = useState('');
    
    const navigate = useNavigate();
    function handleChange1(e){
        e.preventDefault()
        setUserName(e.target.value)
    }
    function handleChange2(e){
        e.preventDefault()
        setPassword(e.target.value)
    }

      async function handleSubmit(e) 
    {
        e.preventDefault()
        const data = { ename,password };
        console.log(data)
        const config = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        };
    
            const response = await fetch('http://localhost:4200/login', config);
            const json = await response.json();
            console.log(json)
            if (json.error) {
                console.log("Invalid user. Please try again.");
            } else {
                console.log("Welcome admin");
                navigate("/home");
            }
        

  setUserName('');
  setPassword('');
    
}
    return (
        <>
           <div className='container'>
           <h1 className="heading">Login Page </h1>
           <form onSubmit={handleSubmit}>
                
                <div>
                    <label htmlFor="username">Username</label>
                    <input type="text" placeholder="Enter Username" name="username" value={ename} onChange={handleChange1}required/>
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" placeholder="Enter Password" name="password" value={password} onChange={handleChange2} required/>
                </div>
                    
               
                <button type="submit">Login</button>
            </form>
            </div>
        
        </>
     
    );
}

export default Login;