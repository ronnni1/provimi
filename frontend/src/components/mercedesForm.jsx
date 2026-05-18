import { useState, useEffect } from 'react';

const empty = { Emrimercedesi: '', Modelimercedesi: '', Pershkrimi: '' }; // ★ NDRRO: kolona 1, kolona 2

export default function MercedesForm({ editRec, onShto, onPerditeso, onAnulo }) { // ★ NDRRO: MercedesForm (SHKRONJË E MADHE)
  const [form, setForm] = useState(empty);

  useEffect(() => {
    setForm(editRec ? {
      Emrimercedesi:   editRec.Emrimercedesi,   // ★ NDRRO: kolona 1
      Modelimercedesi: editRec.Modelimercedesi,  // ★ NDRRO: kolona 2
      Pershkrimi:      editRec.Pershkrimi,       // ★ NDRRO: kolona 3 (mos e ndrro)
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
      <h2>{editRec ? 'Edito mercedesin' : 'Shto mercedesin'}</h2> {/* ★ NDRRO: titulli */}
      <form onSubmit={submit}>

        <label>Emri i Mercedesit:</label> {/* ★ NDRRO: etiketa 1 */}
        <input name="Emrimercedesi" value={form.Emrimercedesi} onChange={handle} placeholder="p.sh. Mercedes A" required /> {/* ★ NDRRO: kolona 1 — name dhe value duhet njëjtë */}

        <label>Modeli i Mercedesit:</label> {/* ★ NDRRO: etiketa 2 */}
        <input name="Modelimercedesi" value={form.Modelimercedesi} onChange={handle} placeholder="p.sh. 2024" required /> {/* ★ NDRRO: kolona 2 — name dhe value duhet njëjtë */}

        <label>Përshkrimi:</label>
        <input name="Pershkrimi" value={form.Pershkrimi} onChange={handle} placeholder="p.sh. Veture luksoze" required />

        <button type="submit" className="btn-shto">
          {editRec ? 'Ruaj Ndryshimet' : '+ Shto mercedesin'} {/* ★ NDRRO: teksti i butonit */}
        </button>
        {editRec && <button type="button" className="btn-anulo" onClick={onAnulo}>Anulo</button>}
      </form>
    </div>
  );
}
