const express = require('express');
const sql = require('mssql');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

const config = {
    user: 'serviceSQL',
    password: 'Linkup1J',
    server: 'DB1',
    database: 'echo23',
    options: {
        encrypt: false, // Set to true if using Azure
        trustServerCertificate: true // Required for self-signed certs
    }
};

app.post('/', async (req, res) => {
    const username = req.body.username;

    try {
        await sql.connect(config);
        const result = await sql.query`INSERT INTO users (username) VALUES (${username})`;
        res.send('Username submitted successfully!');
    } catch (err) {
        console.error('SQL error', err);
        res.status(500).send('Database error occurred.');
    } finally {
        await sql.close();
    }
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

document.getElementById('myForm').onsubmit = function(e) {
  e.preventDefault();
  const username = document.getElementById('username').value;

  fetch('/api/saveUser', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username })
  })
  .then(response => response.json())
  .then(data => {
    alert('User saved!');
  })
  .catch(error => {
    alert('Error saving user: ' + error.message);
  });
};
