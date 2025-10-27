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

app.post('/insert-device', async (req, res) => {
  const {
    make, model, hostname, serialNumber,
    purchaseDate, cost, department, status, location
    } = req.body;

    console.log(" Received POST request with data:", req.body);

    try {
        console.log(" Connecting to SQL Server...");
        await sql.connect(config);

        const query = `
        INSERT INTO Devices (
            deviceMake, deviceModel, deviceHostname, deviceSerialNumber,
            devicePurchaseDate, deviceCost, deviceDepartment,
            deviceStatus, deviceLocation
        ) VALUES (
            @make, @model, @hostname, @serialNumber,
            @purchaseDate, @cost, @department,
            @status, @location
        )
        `;

        console.log(" SQL Query:", query);

        const request = new sql.Request();
        request.input('make', sql.NVarChar, req.body.make);
        request.input('model', sql.NVarChar, req.body.model);
        request.input('hostname', sql.NVarChar, req.body.hostname);
        request.input('serialNumber', sql.NVarChar, req.body.serialNumber);
        request.input('purchaseDate', sql.Date, req.body.purchaseDate);
        request.input('cost', sql.Decimal(10, 2), parseFloat(req.body.cost));
        request.input('department', sql.NVarChar, req.body.department);
        request.input('status', sql.NVarChar, req.body.status);
        request.input('location', sql.NVarChar, req.body.location);

        const result = await request.query(query);
        console.log(" Insert result:", result);

        await sql.close();
        res.json({ success: true, rowsAffected: result.rowsAffected });
    } catch (err) {
        console.error(" SQL Error:", err);
        res.status(500).json({ success: false, error: err.message });
    }
});
app.listen(3000, () => console.log(' Server running on http://localhost:3000'));