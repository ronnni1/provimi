const express = require('express');
const router = express.Router();
const db = require('../db');

// ★ NDRRO (të gjitha): 'fabrika' në queries → emri i tabelës suaj
// ★ NDRRO (të gjitha): Emridepartamentit, Vendidepartamentit, Pershkrimi → emrat e kolonave tuaja

router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM fabrika ORDER BY ID DESC'); // ★ NDRRO: fabrika
    res.json(rows);
  } catch (e) { res.status(500).json({ gabim: e.message }); }
});

router.post('/', async (req, res) => {
  try {
    const { Emrifabrikes, Vendifabrikes, Pershkrimi } = req.body; // ★ SHKRONJË E MADHE: Emrifabrikes, Vendifabrikes
    await db.query(
      'INSERT INTO fabrika (Emrifabrikes, Vendifabrikes, Pershkrimi) VALUES (?, ?, ?)', // ★ SHKRONJË E MADHE: Emrifabrikes, Vendifabrikes
      [Emrifabrikes, Vendifabrikes, Pershkrimi]
    );
    res.json({ sukses: true });
  } catch (e) { res.status(500).json({ gabim: e.message }); }
});

router.put('/:id', async (req, res) => {
  try {
    const { Emrifabrikes, Vendifabrikes, Pershkrimi } = req.body; // ★ SHKRONJË E MADHE: Emrifabrikes, Vendifabrikes
    await db.query(
      'UPDATE fabrika SET Emrifabrikes=?, Vendifabrikes=?, Pershkrimi=? WHERE ID=?', // ★ SHKRONJË E MADHE: Emrifabrikes, Vendifabrikes
      [Emrifabrikes, Vendifabrikes, Pershkrimi, req.params.id]
    );
    res.json({ sukses: true });
  } catch (e) { res.status(500).json({ gabim: e.message }); }
});

router.delete('/:id', async (req, res) => {
  try {
    await db.query('DELETE FROM fabrika WHERE ID=?', [req.params.id]); // ★ NDRRO: fabrika
    res.json({ sukses: true });
  } catch (e) { res.status(500).json({ gabim: e.message }); }
});

module.exports = router;


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
  Emridepartamentit  VARCHAR(100) NOT NULL,
  Vendidepartamentit VARCHAR(100) NOT NULL,
  Pershkrimi         VARCHAR(255) NOT NULL
);
*/
