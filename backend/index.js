const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
const departamentiRoutes = require('./routes/departamenti');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/departamentet', departamentiRoutes); // ★ NDRRO: /api/departamentet → /api/ligjeruesit

async function startServer() {
  const conn = await mysql.createConnection({ host: '127.0.0.1', user: 'root', password: '' });
  await conn.query("CREATE DATABASE IF NOT EXISTS `departamenti` CHARACTER SET utf8 COLLATE utf8_general_ci"); // ★ NDRRO: departamenti → emri i databazës
  await conn.query(`
    CREATE TABLE IF NOT EXISTS \`departamenti\`.\`departamenti\` ( -- ★ NDRRO: të dy 'departamenti' → emri i tabelës
      ID INT AUTO_INCREMENT PRIMARY KEY,
      EmriDepartamentit  VARCHAR(100) NOT NULL, -- ★ NDRRO: kolona 1 (p.sh. EmriLigjeruesit)
      VendiDepartamentit VARCHAR(100) NOT NULL, -- ★ NDRRO: kolona 2 (p.sh. Titulli)
      Pershkrimi         VARCHAR(255) NOT NULL  -- ★ NDRRO: kolona 3 (ose largo/shto kolona sipas nevojës)
    )
  `);
  await conn.end();
  app.listen(5000, () => console.log('Backend running on http://localhost:5000'));
}

startServer().catch(console.error);
