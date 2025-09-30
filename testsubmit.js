const express = require('express');
const sql = require('mssql');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

const config = {
    user: 'serviceSQL',
    password: 'Linkup1J',
    server: '192.168.1.247',
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
