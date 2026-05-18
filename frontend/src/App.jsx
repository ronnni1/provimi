import { useState, useEffect } from 'react';
import FabrikaForm from './components/fabrikaForm'; // ★ SHKRONJË E MADHE: DepartmentiForm
import FabrikaList from './components/fabrikaList'; // ★ SHKRONJË E MADHE: DepartmentiList
import './App.css';

const API = 'http://localhost:5000/api/fabrika'; // ★ NDRRO: /api/departamentet → /api/ligjeruesit

export default function App() {
  const [fabrikat, setFabrikat] = useState([]); // me te mdhaja te  e dyta
  const [editRec, setEditRec] = useState(null);
  const [msg, setMsg] = useState({ sukses: '', gabim: '' });

  const fetchFabrikat = async () => {
    try {
      const res = await fetch(API);
      const data = await res.json();
      setFabrikat(Array.isArray(data) ? data : []);
    } catch (e) {
      setFabrikat([]);
    }
  };

  useEffect(() => { fetchFabrikat(); }, []);
  

  const showMsg = (sukses = '', gabim = '') => {
    setMsg({ sukses, gabim });
    setTimeout(() => setMsg({ sukses: '', gabim: '' }), 3000);
  };

  const shto = async (data) => {
    await fetch(API, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
    showMsg('fabrika u shtua!'); // ★ NDRRO: teksti i mesazhit
    fetchFabrikat();
  };

  const perditeso = async (id, data) => {
    await fetch(`${API}/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
    setEditRec(null);
    showMsg('fabrika u Perditesua!'); // ★ NDRRO: teksti i mesazhit
    fetchFabrikat();
  };

  const fshi = async (id) => {
    if (!window.confirm('A je i sigurt që dëshiron ta fshish?')) return;
    await fetch(`${API}/${id}`, { method: 'DELETE' });
    showMsg('fabrika u fshi.'); // ★ NDRRO: teksti i mesazhit
    fetchFabrikat();
  };

  return (
    <div className="container">
      {msg.sukses && <p className="sukses">{msg.sukses}</p>}
      {msg.gabim  && <p className="gabim">{msg.gabim}</p>}
      {/* ★ SHKRONJË E MADHE: DepartmentiForm */}
      <FabrikaForm
        editRec={editRec}
        onShto={shto}
        onPerditeso={perditeso}
        onAnulo={() => setEditRec(null)}
      />
      {/* ★ SHKRONJË E MADHE: DepartmentiList */}
      <FabrikaList
        fabrikat={fabrikat}
        onEdito={setEditRec}
        onFshi={fshi}
      />
    </div>
  );
}


/*
backend/index.js — emri i DB + tabela + kolonat
backend/db.js — emri i DB
backend/routes/departmenti.js — tabela + kolonat në SQL
frontend/src/App.jsx — URL e API + mesazhet
frontend/src/components/departmentiForm.jsx — titujt + etiketat + fushat
frontend/src/components/departmentiList.jsx — titujt e tabelës + kolonat



CREATE DATABASE IF NOT EXISTS `departmenti` CHARACTER SET utf8 COLLATE utf8_general_ci;

USE `departmenti`;

CREATE TABLE IF NOT EXISTS `departmenti` (
  ID INT AUTO_INCREMENT PRIMARY KEY,
  Emridepartmentit  VARCHAR(100) NOT NULL,
  Vendidepartmentit VARCHAR(100) NOT NULL,
  Pershkrimi         VARCHAR(255) NOT NULL
);
*/
