const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM punetori ORDER BY ID DESC'); // ★ NDRRO: punetori → emri i tabelës
    res.json(rows);
  } catch (e) { res.status(500).json({ gabim: e.message }); }
});

router.post('/', async (req, res) => {
  try {
    const { Emripunetorit, Mbiemripunetorit, Pershkrimi } = req.body; // ★ NDRRO: kolona 1, kolona 2 (Pershkrimi mos e ndrro)
    await db.query(
      'INSERT INTO punetori (Emripunetorit, Mbiemripunetorit, Pershkrimi) VALUES (?, ?, ?)', // ★ NDRRO: punetori → tabela, pastaj kolona 1, kolona 2
      [Emripunetorit, Mbiemripunetorit, Pershkrimi]
    );
    res.json({ sukses: true });
  } catch (e) { res.status(500).json({ gabim: e.message }); }
});

router.put('/:id', async (req, res) => {
  try {
    const { Emripunetorit, Mbiemripunetorit, Pershkrimi } = req.body; // ★ NDRRO: kolona 1, kolona 2 (Pershkrimi mos e ndrro)
    await db.query(
      'UPDATE punetori SET Emripunetorit=?, Mbiemripunetorit=?, Pershkrimi=? WHERE ID=?', // ★ NDRRO: punetori → tabela, pastaj kolona 1, kolona 2
      [Emripunetorit, Mbiemripunetorit, Pershkrimi, req.params.id]
    );
    res.json({ sukses: true });
  } catch (e) { res.status(500).json({ gabim: e.message }); }
});

router.delete('/:id', async (req, res) => {
  try {
    await db.query('DELETE FROM punetori WHERE ID=?', [req.params.id]); // ★ NDRRO: punetori → emri i tabelës
    res.json({ sukses: true });
  } catch (e) { res.status(500).json({ gabim: e.message }); }
});

module.exports = router;
