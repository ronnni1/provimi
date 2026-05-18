import { useState, useEffect } from 'react';

const empty = { Emripunetorit: '', Mbiemripunetorit: '', Pershkrimi: '' }; // ★ NDRRO: kolona 1, kolona 2 (Pershkrimi mos e ndrro)

export default function PunetoriForm({ editRec, onShto, onPerditeso, onAnulo }) { // ★ NDRRO: PunetoriForm (SHKRONJË E MADHE)
  const [form, setForm] = useState(empty);

  useEffect(() => {
    setForm(editRec ? {
      Emripunetorit:    editRec.Emripunetorit,    // ★ NDRRO: kolona 1
      Mbiemripunetorit: editRec.Mbiemripunetorit, // ★ NDRRO: kolona 2
      Pershkrimi:       editRec.Pershkrimi,        // ★ NDRRO: kolona 3 (mos e ndrro)
    } : empty);
  }, [editRec]);

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    if (editRec) onPerditeso(editRec.ID, form);
    else onShto(form);
    setForm(empty);
  };

  return (
    <div className="box">
      <h2>{editRec ? 'Edito punetorin' : 'Shto punetorin'}</h2> {/* ★ NDRRO: titulli */}
      <form onSubmit={submit}>

        <label>Emri i Punetorit:</label> {/* ★ NDRRO: etiketa 1 */}
        <input name="Emripunetorit" value={form.Emripunetorit} onChange={handle} placeholder="p.sh. Roni" required /> {/* ★ NDRRO: kolona 1 — name dhe value duhet njëjtë */}

        <label>Mbiemri i Punetorit:</label> {/* ★ NDRRO: etiketa 2 */}
        <input name="Mbiemripunetorit" value={form.Mbiemripunetorit} onChange={handle} placeholder="p.sh. Fetahu" required /> {/* ★ NDRRO: kolona 2 — name dhe value duhet njëjtë */}

        <label>Përshkrimi:</label>
        <input name="Pershkrimi" value={form.Pershkrimi} onChange={handle} placeholder="p.sh. Drejtor" required />

        <button type="submit" className="btn-shto">
          {editRec ? 'Ruaj Ndryshimet' : '+ Shto punetorin'} {/* ★ NDRRO: teksti i butonit */}
        </button>
        {editRec && <button type="button" className="btn-anulo" onClick={onAnulo}>Anulo</button>}
      </form>
    </div>
  );
}
