const express = require('express');
const sql = require('mssql');
const cors = require('cors');
const app = express();
app.use(cors());

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

app.get('/insert-name', async (req, res) => {
  try {
    await sql.connect(config);
    const result = await sql.query("INSERT INTO [dbo].[users] ([username], [email], [pwd]) VALUES ('test', 'test@email.com', 'testPass')");
    console.log('✅ Insert result:', result);
    await sql.close();
    res.json({ success: true, name: 'test', rowsAffected: result.rowsAffected });
  } catch (err) {
    console.error('❌ Insert failed:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

app.listen(3000, () => console.log('🚀 addToDB.js server running on http://localhost:3000'));
