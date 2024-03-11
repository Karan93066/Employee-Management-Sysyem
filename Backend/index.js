const express=require("express");
const path=require("path");
const cors=require("cors");
const app=express();
const mysql = require('mysql2');
const bodyParser = require('body-parser');

app.set('views', path.join(__dirname, 'views'));
app.use(express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Karan@123',
  database: 'employee_management'
});

connection.connect((err) =>{
    if(err) throw err;
    console.log('Mysql Connected...');
  });
//Login api
  app.post('/login', (req, res) => {
    const sql = "SELECT * FROM login WHERE ename = '"+req.body.ename+"' AND password = '"+req.body.password+"'";
    console.log(sql)
    connection.query(sql,  (err, results) => {
        if (err) {
            console.error('Error executing MySQL query: ' + err.stack);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        console.log(results);
        console.log(results.length);
        if (results.length === 0) {
            res.status(401).json({ error: 'Invalid credentials' });
            console.log("running")
        } else {
            res.status(200).json({ message: 'Login successful', user: results[0] });
        }
    });
});
//showing all Employees
app.get('/employees', (req, res) => {
  const query = 'SELECT * FROM employees';
  connection.query(query, (error, results, fields) => {
    if (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Server Error' });
      return;
    }
    console.log(results);
    res.json(results);
  });
});
// Adding a new Employee info
app.post('/add_employees', (req, res) => {
  const { ename, salary, department } = req.body;

  const query = 'INSERT INTO employees (ename, salary, department) VALUES (?, ?, ?)';
  const values = [ename, salary, department];
  connection.query(query, values, (error, results, fields) => {
    if (error) {
      console.error('Error in executing query:', error);
      res.status(500).json({ error: 'Server Error' });
      return;
    }

    res.status(201).json({ message: 'Employee added successfully!' });
  });
});
//Get info of employee for edit
app.get('/edit_employees/:id', (req, res) => {
  const id = req.params.id;
  const query = 'SELECT * FROM employees WHERE employee_id = ?';
  connection.query(query, id, (error, results, fields) => {
    if (error) {
      console.error('Error executing query:', error);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    if (results.length > 0) {
      res.json(results[0]);
    } else {
      res.status(404).json({ error: 'Employee not found' });
    }
  });
});
//Update Api
app.put('/update_employees/:id', (req, res) => {
  const employee_id = req.params.id;
  const { ename, salary, department } = req.body;
  const query = 'UPDATE employees SET ename = ?, salary = ?, department = ? WHERE employee_id = ?';
  const values = [ename, salary, department, employee_id];
  connection.query(query, values, (error, results, fields) => {
    if (error) {
      console.error('Error executing query:', error);
      res.status(500).json({ error: 'Server Error' });
      return;
    }
    res.status(200).json({ message: 'Employee updated successfully' });
  });
});


// Delete Employee details Api
app.delete('/delete_employee/:id', (req, res) => {
  const id = req.params.id;
  const query = 'DELETE FROM employees WHERE employee_id = ?';
  connection.query(query, id, (error, results, fields) => {
    if (error) {
      console.error('Error executing query:', error);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    res.status(200).json({ message: 'Employee deleted successfully' });
  });
});

  app.listen(4200,()=>{
    console.log(`express server running on 4200`);
});
