const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM mercedes ORDER BY ID DESC'); // ★ NDRRO: mercedes → emri i tabelës
    res.json(rows);
  } catch (e) { res.status(500).json({ gabim: e.message }); }
});

router.post('/', async (req, res) => {
  try {
    const { Emrimercedesi, Modelimercedesi, Pershkrimi } = req.body; // ★ NDRRO: kolona 1, kolona 2
    await db.query(
      'INSERT INTO mercedes (Emrimercedesi, Modelimercedesi, Pershkrimi) VALUES (?, ?, ?)', // ★ NDRRO: mercedes → tabela, pastaj kolona 1, kolona 2
      [Emrimercedesi, Modelimercedesi, Pershkrimi]
    );
    res.json({ sukses: true });
  } catch (e) { res.status(500).json({ gabim: e.message }); }
});

router.put('/:id', async (req, res) => {
  try {
    const { Emrimercedesi, Modelimercedesi, Pershkrimi } = req.body; // ★ NDRRO: kolona 1, kolona 2
    await db.query(
      'UPDATE mercedes SET Emrimercedesi=?, Modelimercedesi=?, Pershkrimi=? WHERE ID=?', // ★ NDRRO: mercedes → tabela, pastaj kolona 1, kolona 2
      [Emrimercedesi, Modelimercedesi, Pershkrimi, req.params.id]
    );
    res.json({ sukses: true });
  } catch (e) { res.status(500).json({ gabim: e.message }); }
});

router.delete('/:id', async (req, res) => {
  try {
    await db.query('DELETE FROM mercedes WHERE ID=?', [req.params.id]); // ★ NDRRO: mercedes → emri i tabelës
    res.json({ sukses: true });
  } catch (e) { res.status(500).json({ gabim: e.message }); }
});

module.exports = router;
