import { useState, useEffect } from 'react';
import DepartamentiForm from './components/DepartamentiForm';
import DepartamentiList from './components/DepartamentiList';
import './App.css';

const API = 'http://localhost:5000/api/departamentet'; // ★ NDRRO: /api/departamentet → /api/ligjeruesit

export default function App() {
  const [departamentet, setDepartamentet] = useState([]);
  const [editRec, setEditRec] = useState(null);
  const [msg, setMsg] = useState({ sukses: '', gabim: '' });

  const fetchDepartamentet = async () => {
    const res = await fetch(API);
    setDepartamentet(await res.json());
  };

  useEffect(() => { fetchDepartamentet(); }, []);

  const showMsg = (sukses = '', gabim = '') => {
    setMsg({ sukses, gabim });
    setTimeout(() => setMsg({ sukses: '', gabim: '' }), 3000);
  };

  const shto = async (data) => {
    await fetch(API, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
    showMsg('Departmenti u shtua!'); // ★ NDRRO: teksti i mesazhit
    fetchDepartamentet();
  };

  const perditeso = async (id, data) => {
    await fetch(`${API}/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
    setEditRec(null);
    showMsg('Departmenti u përditësua!'); // ★ NDRRO: teksti i mesazhit
    fetchDepartamentet();
  };

  const fshi = async (id) => {
    if (!window.confirm('A je i sigurt që dëshiron ta fshish?')) return;
    await fetch(`${API}/${id}`, { method: 'DELETE' });
    showMsg('Departmenti u fshi.'); // ★ NDRRO: teksti i mesazhit
    fetchDepartamentet();
  };

  return (
    <div className="container">
      {msg.sukses && <p className="sukses">{msg.sukses}</p>}
      {msg.gabim  && <p className="gabim">{msg.gabim}</p>}
      <DepartamentiForm
        editRec={editRec}
        onShto={shto}
        onPerditeso={perditeso}
        onAnulo={() => setEditRec(null)}
      />
      <DepartamentiList
        departamentet={departamentet}
        onEdito={setEditRec}
        onFshi={fshi}
      />
    </div>
  );
}
