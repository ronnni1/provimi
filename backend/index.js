const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
const fabrikaRoutes = require('./routes/fabrika');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/fabrika', fabrikaRoutes); // ★ NDRRO: /api/fabrika → emri i routes

async function startServer() {
  const conn = await mysql.createConnection({ host: '127.0.0.1', user: 'root', password: '' });
  await conn.query("CREATE DATABASE IF NOT EXISTS `fabrika` CHARACTER SET utf8 COLLATE utf8_general_ci"); // ★ NDRRO: fabrika → emri i databazës
  await conn.query(`
    CREATE TABLE IF NOT EXISTS \`fabrika\`.\`fabrika\` ( -- ★ NDRRO: të dy 'fabrika' → emri i tabelës
      ID INT AUTO_INCREMENT PRIMARY KEY,
      Emrifabrikes VARCHAR(100) NOT NULL, -- ★ NDRRO: kolona 1 (p.sh. EmriLigjeruesit)
      Vendifabrikes VARCHAR(100) NOT NULL, -- ★ NDRRO: kolona 2 // ★ SHKRONJË E MADHE: Pozitafabrikat
      Pershkrimi         VARCHAR(255) NOT NULL  -- ★ NDRRO: kolona 3 (ose largo/shto kolona sipas nevojës)
    )
  `);
  await conn.end();
  app.listen(5000, () => console.log('Backend running on http://localhost:5000'));
}

startServer().catch(console.error);