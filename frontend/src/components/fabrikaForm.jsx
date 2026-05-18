import { useState, useEffect } from 'react';

// ★ NDRRO: vlerat fillestare → kolonat e tabelës suaj (duhet të përputhen me DB)
const empty = { Emrifabrikes: '', Vendifabrikes: '', Pershkrimi: '' };

export default function FabrikaForm({ editRec, onShto, onPerditeso, onAnulo }) { // ★ SHKRONJË E MADHE: PunetoriForm
  const [form, setForm] = useState(empty);

  useEffect(() => {
    setForm(editRec
      ? {
          Emrifabrikes:  editRec.Emrifabrikes,  // ★ NDRRO: kolona 1 // ★ SHKRONJË E MADHE: Emrifabrikes
          Vendifabrikes: editRec.Vendifabrikes, // ★ NDRRO: kolona 2 // ★ SHKRONJË E MADHE: Pozitapunetorit
          Pershkrimi:      editRec.Pershkrimi,       // ★ NDRRO: kolona 3
        }
      : empty
    );
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
      <h2>{editRec ? 'Edito fabriken' : 'Shto fabriken'}</h2> {/* ★ NDRRO: etiketa e titullit */}
      <form onSubmit={submit}>

        <label>Emri i Fabrikes:</label> {/* ★ NDRRO: etiketa */}
        <input name="Emrifabrikes" value={form.Emrifabrikes} onChange={handle} placeholder="p.sh. Liri " required /> {/* ★ NDRRO: name + placeholder */}

        <label>Vendi i Fabrikes:</label> {/* ★ NDRRO: etiketa */}
        <input name="Vendifabrikes" value={form.Vendifabrikes} onChange={handle} placeholder="p.sh. Ferizaj" required /> {/* ★ SHKRONJË E MADHE: Vendifabrikes */} {/* ★ NDRRO: name + placeholder */}

        <label>Përshkrimi:</label> {/* ★ NDRRO: etiketa */}
        <input name="Pershkrimi" value={form.Pershkrimi} onChange={handle} placeholder="p.sh. Ushqimore " required /> {/* ★ NDRRO: name + placeholder */}

        <button type="submit" className="btn-shto">
          {editRec ? 'Ruaj Ndryshimet' : '+ Shto fabriken'} {/* ★ NDRRO: teksti i butonit */}
        </button>
        {editRec && (
          <button type="button" className="btn-anulo" onClick={onAnulo}>Anulo</button>
        )}
      </form>
    </div>
  );
}


/*
backend/index.js — emri i DB + tabela + kolonat
backend/db.js — emri i DB
backend/routes/departamenti.js — tabela + kolonat në SQL
frontend/src/App.jsx — URL e API + mesazhet
frontend/src/components/departamentiForm.jsx — titujt + etiketat + fushat
frontend/src/components/departamentiList.jsx — titujt e tabelës + kolonat



CREATE DATABASE IF NOT EXISTS `departamenti` CHARACTER SET utf8 COLLATE utf8_general_ci;

USE `departamenti`;

CREATE TABLE IF NOT EXISTS `departamenti` (
  ID INT AUTO_INCREMENT PRIMARY KEY,
  Emridepartamentit  VARCHAR(100) NOT NULL,
  Vendidepartamentit VARCHAR(100) NOT NULL,
  Pershkrimi         VARCHAR(255) NOT NULL
);
*/
