export default function PunetoriList({ punetorit, onEdito, onFshi }) { // ★ NDRRO: PunetoriList (SHKRONJË E MADHE), punetorit → njëjtë me App.jsx
  return (
    <>
      <h2>Lista e Punetoreve</h2> {/* ★ NDRRO: titulli i listës */}
      {punetorit.length === 0 ? (
        <p>Nuk ka punetore.</p> // ★ NDRRO: teksti kur lista është bosh
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Emri</th>       {/* ★ NDRRO: header i kolonës 1 */}
              <th>Mbiemri</th>    {/* ★ NDRRO: header i kolonës 2 */}
              <th>Përshkrimi</th>
              <th>Veprimet</th>
            </tr>
          </thead>
          <tbody>
            {punetorit.map(d => ( // ★ NDRRO: punetorit → njëjtë me parametrin lart
              <tr key={d.ID}>
                <td>{d.ID}</td>
                <td>{d.Emripunetorit}</td>    {/* ★ NDRRO: kolona 1 — njëjtë me DB */}
                <td>{d.Mbiemripunetorit}</td> {/* ★ NDRRO: kolona 2 — njëjtë me DB */}
                <td>{d.Pershkrimi}</td>
                <td>
                  <button className="btn-edit" onClick={() => onEdito(d)}>Edito</button>
                  <button className="btn-del"  onClick={() => onFshi(d.ID)}>Fshi</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}
