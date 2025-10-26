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

  try {
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

    const request = new sql.Request();
    request.input('make', sql.NVarChar, make);
    request.input('model', sql.NVarChar, model);
    request.input('hostname', sql.NVarChar, hostname);
    request.input('serialNumber', sql.NVarChar, serialNumber);
    request.input('purchaseDate', sql.Date, purchaseDate);
    request.input('cost', sql.Decimal(10, 2), cost);
    request.input('department', sql.NVarChar, department);
    request.input('status', sql.NVarChar, status);
    request.input('location', sql.NVarChar, location);

    const result = await request.query(query);
    await sql.close();

    res.json({ success: true, rowsAffected: result.rowsAffected });
  } catch (err) {
    console.error('Insert failed:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

app.listen(3000, () => console.log(' Server running on http://localhost:3000'));