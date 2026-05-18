const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
const mercedesRoutes = require('./routes/mercedes'); // ★ NDRRO: mercedes → emri i fajllit routes

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/mercedes', mercedesRoutes); // ★ NDRRO: mercedes → emri i routes

async function startServer() {
  const conn = await mysql.createConnection({ host: '127.0.0.1', user: 'root', password: '' });
  await conn.query("CREATE DATABASE IF NOT EXISTS `mercedes` CHARACTER SET utf8 COLLATE utf8_general_ci"); // ★ NDRRO: mercedes → emri i databazës
  await conn.query(`
    CREATE TABLE IF NOT EXISTS \`mercedes\`.\`mercedes\` (
      ID INT AUTO_INCREMENT PRIMARY KEY,
      Emrimercedesi    VARCHAR(100) NOT NULL, -- ★ NDRRO: kolona 1
      Modelimercedesi  VARCHAR(100) NOT NULL, -- ★ NDRRO: kolona 2
      Pershkrimi       VARCHAR(255) NOT NULL  -- ★ NDRRO: kolona 3 (mos e ndrro këtë)
    )
  `);
  // ★ NDRRO: të dy 'mercedes' në rreshtin CREATE TABLE → emri i databazës dhe emri i tabelës
  await conn.end();
  app.listen(5000, () => console.log('Backend running on http://localhost:5000'));
}

startServer().catch(console.error);
