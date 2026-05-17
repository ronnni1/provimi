import { useState, useEffect } from 'react';

// ★ NDRRO: vlerat fillestare → kolonat e tabelës suaj (duhet të përputhen me DB)
const empty = { EmriDepartamentit: '', VendiDepartamentit: '', Pershkrimi: '' };

export default function DepartamentiForm({ editRec, onShto, onPerditeso, onAnulo }) {
  const [form, setForm] = useState(empty);

  useEffect(() => {
    setForm(editRec
      ? {
          EmriDepartamentit:  editRec.EmriDepartamentit,  // ★ NDRRO: kolona 1
          VendiDepartamentit: editRec.VendiDepartamentit, // ★ NDRRO: kolona 2
          Pershkrimi:         editRec.Pershkrimi,         // ★ NDRRO: kolona 3
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
      <h2>{editRec ? 'Edito Departmentin' : 'Shto Departmentin'}</h2> {/* ★ NDRRO: Departmentin → Ligjeruesin */}
      <form onSubmit={submit}>

        <label>Emri i Departmentit:</label> {/* ★ NDRRO: etiketa */}
        <input name="EmriDepartamentit" value={form.EmriDepartamentit} onChange={handle} placeholder="p.sh. IT" required /> {/* ★ NDRRO: name + placeholder */}

        <label>Vendi i Departmentit:</label> {/* ★ NDRRO: etiketa */}
        <input name="VendiDepartamentit" value={form.VendiDepartamentit} onChange={handle} placeholder="p.sh. Prishtinë" required /> {/* ★ NDRRO: name + placeholder */}

        <label>Përshkrimi:</label> {/* ★ NDRRO: etiketa */}
        <input name="Pershkrimi" value={form.Pershkrimi} onChange={handle} placeholder="p.sh. Departmenti i IT-së" required /> {/* ★ NDRRO: name + placeholder */}

        <button type="submit" className="btn-shto">
          {editRec ? 'Ruaj Ndryshimet' : '+ Shto Departmentin'} {/* ★ NDRRO: teksti i butonit */}
        </button>
        {editRec && (
          <button type="button" className="btn-anulo" onClick={onAnulo}>Anulo</button>
        )}
      </form>
    </div>
  );
}
