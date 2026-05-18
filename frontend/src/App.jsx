import { useState, useEffect } from 'react';
import MercedesForm from './components/mercedesForm'; // ★ NDRRO: MercedesForm → emri i komponentit (SHKRONJË E MADHE)
import MercedesList from './components/mercedesList'; // ★ NDRRO: MercedesList → emri i komponentit (SHKRONJË E MADHE)
import './App.css';

const API = 'http://localhost:5000/api/mercedes'; // ★ NDRRO: mercedes → duhet të jetë njëjtë me index.js

export default function App() {
  const [mercedesat, setMercedesat] = useState([]); // ★ NDRRO: mercedesat, setMercedesat → emri i listës
  const [editRec, setEditRec] = useState(null);
  const [msg, setMsg] = useState({ sukses: '', gabim: '' });

  const fetchData = async () => {
    try {
      const res = await fetch(API);
      const data = await res.json();
      setMercedesat(Array.isArray(data) ? data : []); // ★ NDRRO: setMercedesat → njëjtë me useState
    } catch (e) {
      setMercedesat([]); // ★ NDRRO: setMercedesat → njëjtë me useState
    }
  };

  useEffect(() => { fetchData(); }, []);

  const showMsg = (sukses = '', gabim = '') => {
    setMsg({ sukses, gabim });
    setTimeout(() => setMsg({ sukses: '', gabim: '' }), 3000);
  };

  const shto = async (data) => {
    await fetch(API, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
    showMsg('Mercedes u shtua!'); // ★ NDRRO: teksti i mesazhit
    fetchData();
  };

  const perditeso = async (id, data) => {
    await fetch(`${API}/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
    setEditRec(null);
    showMsg('Mercedes u perditesua!'); // ★ NDRRO: teksti i mesazhit
    fetchData();
  };

  const fshi = async (id) => {
    if (!window.confirm('A je i sigurt?')) return;
    await fetch(`${API}/${id}`, { method: 'DELETE' });
    showMsg('Mercedes u fshi.'); // ★ NDRRO: teksti i mesazhit
    fetchData();
  };

  return (
    <div className="container">
      {msg.sukses && <p className="sukses">{msg.sukses}</p>}
      {msg.gabim  && <p className="gabim">{msg.gabim}</p>}
      {/* ★ NDRRO: MercedesForm → njëjtë me importin lart (SHKRONJË E MADHE) */}
      <MercedesForm
        editRec={editRec}
        onShto={shto}
        onPerditeso={perditeso}
        onAnulo={() => setEditRec(null)}
      />
      {/* ★ NDRRO: MercedesList → njëjtë me importin lart (SHKRONJË E MADHE) */}
      {/* ★ NDRRO: mercedesat → njëjtë me useState lart */}
      <MercedesList
        mercedesat={mercedesat}
        onEdito={setEditRec}
        onFshi={fshi}
      />
    </div>
  );
}
