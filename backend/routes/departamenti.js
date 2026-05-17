const express = require('express');
const router = express.Router();
const db = require('../db');

// ★ NDRRO (të gjitha): 'departamenti' në queries → emri i tabelës suaj
// ★ NDRRO (të gjitha): EmriDepartamentit, VendiDepartamentit, Pershkrimi → emrat e kolonave tuaja

router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM departamenti ORDER BY ID DESC'); // ★ NDRRO: departamenti
    res.json(rows);
  } catch (e) { res.status(500).json({ gabim: e.message }); }
});

router.post('/', async (req, res) => {
  try {
    const { EmriDepartamentit, VendiDepartamentit, Pershkrimi } = req.body; // ★ NDRRO: kolonat
    await db.query(
      'INSERT INTO departamenti (EmriDepartamentit, VendiDepartamentit, Pershkrimi) VALUES (?, ?, ?)', // ★ NDRRO: tabela + kolonat
      [EmriDepartamentit, VendiDepartamentit, Pershkrimi]
    );
    res.json({ sukses: true });
  } catch (e) { res.status(500).json({ gabim: e.message }); }
});

router.put('/:id', async (req, res) => {
  try {
    const { EmriDepartamentit, VendiDepartamentit, Pershkrimi } = req.body; // ★ NDRRO: kolonat
    await db.query(
      'UPDATE departamenti SET EmriDepartamentit=?, VendiDepartamentit=?, Pershkrimi=? WHERE ID=?', // ★ NDRRO: tabela + kolonat
      [EmriDepartamentit, VendiDepartamentit, Pershkrimi, req.params.id]
    );
    res.json({ sukses: true });
  } catch (e) { res.status(500).json({ gabim: e.message }); }
});

router.delete('/:id', async (req, res) => {
  try {
    await db.query('DELETE FROM departamenti WHERE ID=?', [req.params.id]); // ★ NDRRO: departamenti
    res.json({ sukses: true });
  } catch (e) { res.status(500).json({ gabim: e.message }); }
});

module.exports = router;
