import React, { useState } from 'react';
import './ticket_booking.css'


function Login() {
    const [username,setUserName] = useState('');
    const [email,setEmail] = useState('');
    const [numberTicket,setNumberTicket] = useState(0);
    const [isSubmitted,setIsSubmitted] = useState(false);
    function handleChange1(e){
        e.preventDefault()
        setUserName(e.target.value)
    }
    function handleChange2(e){
        e.preventDefault()
        setEmail(e.target.value)
    }
    function handleChange3(e){
        e.preventDefault()
        setNumberTicket(e.target.value)
    }
      async function handleSubmit(e) 
    {
        e.preventDefault()
            setIsSubmitted(true)
            setUserName('');
            setEmail('');
            setNumberTicket('');
    
}
    return (
        <>
        <div className='my-form'>
           <h1 className="heading">Ticket Booking </h1>
           <form onSubmit={handleSubmit}>
                
                <div>
                    <label htmlFor="username">Username</label>
                    <input type="text" placeholder="Enter Username" name="username" value={username} onChange={handleChange1}required/>
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="email" placeholder="Enter email" name="email" value={email} onChange={handleChange2} required/>
                </div>
                <div>
                    <label htmlFor="numberTicket">No. of Ticket</label>
                    <input type="number" placeholder="Enter Number of Tickets" name="numberTicket" value={numberTicket} onChange={handleChange3} required/>
                </div>
               
                <button type="submit">Submit</button>
            </form>
            {isSubmitted && (
        <div>
          <h3>Booking Summary</h3>
          <p>Name: {username}</p>
          <p>Email: {email}</p>
          <p>Number of Tickets: {numberTicket}</p>
        </div>
      )}
            
            </div>
        </>
     
    );
}

export default Login;