import React, { useState } from 'react';
import './json_data.css'
function Json_data(props) {
  const [data,setdata] = useState([])
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(json => setdata(json))
    return (
      <div className='heading'>
      <h2>Users Data</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Username</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {data.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    );
}

export default Json_data;