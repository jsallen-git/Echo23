const express = require('express');
const bodyParser = require('body-parser');
const sql = require('mssql');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

// SQL Server config
const config = {
  user: 'serviceSQL',
  password: 'Linkup1J',
  server: 'localhost', // or your SQL Server name
  database: 'echo23',
  options: {
    encrypt: false,
    trustServerCertificate: true
  }
};

// Handle form submission
app.post('/submit', async (req, res) => {
  const { name, email } = req.body;

  try {
    await sql.connect(config);
    await sql.query`INSERT INTO Users (Name, Email) VALUES (${name}, ${email})`;
    res.send('Record inserted successfully!');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error inserting record');
  }
});

// Start server
app.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});