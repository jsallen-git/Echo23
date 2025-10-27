const express = require('express');
const sql = require('mssql');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json()); // to parse JSON body

const config = {
  user: 'serviceSQL',
  password: 'Linkup1J',
  server: 'DB1',
  database: 'echo23',
  options: {
    encrypt: false,
    trustServerCertificate: true
  }
};

app.post('/insert-user', async (req, res) => {
    const { fullName, userName, password, phoneNumber, creationDate } = req.body;

    console.log("Received POST request with data:", req.body);

    try {
        console.log("Connecting to SQL Server...");
        await sql.connect(config);

        const query = `
      INSERT INTO Users (
        FullName, UserName, PasswordHash, PhoneNumber, CreationDate
      ) VALUES (
        @fullName, @userName, @password, @phoneNumber, @creationDate
      )
    `;

        const request = new sql.Request();
        request.input('fullName', sql.NVarChar, fullName);
        request.input('userName', sql.NVarChar, userName);
        request.input('password', sql.NVarChar, password);
        request.input('phoneNumber', sql.BigInt, phoneNumber);
        request.input('creationDate', sql.Date, creationDate);

        const result = await request.query(query);
        console.log("Insert result:", result);

        await sql.close();
        res.json({ success: true, rowsAffected: result.rowsAffected });
    } catch (err) {
        console.error("SQL Error:", err);
        res.status(500).json({ success: false, error: err.message });
    }
});

app.listen(3000, () => console.log(' Server running on http://localhost:3000'));