const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: '127.0.0.1',
  user: 'root',
  password: '',
  database: 'fabrika', // ★ NDRRO: departamenti → emri i databazës
  waitForConnections: true,
  connectionLimit: 10,
});

module.exports = pool;


/*
backend/index.js — emri i DB + tabela + kolonat
backend/db.js — emri i DB
backend/routes/fabrika.js — tabela + kolonat në SQL
frontend/src/App.jsx — URL e API + mesazhet
frontend/src/components/fabrikaForm.jsx — titujt + etiketat + fushat
frontend/src/components/fabrikaList.jsx — titujt e tabelës + kolonat



CREATE DATABASE IF NOT EXISTS `fabrika` CHARACTER SET utf8 COLLATE utf8_general_ci;

USE `fabrika`;

CREATE TABLE IF NOT EXISTS `fabrika` (
  ID INT AUTO_INCREMENT PRIMARY KEY,
  Emrifabrikat  VARCHAR(100) NOT NULL,
  Vendifabrikat VARCHAR(100) NOT NULL,
  Pershkrimi         VARCHAR(255) NOT NULL
);
*/
