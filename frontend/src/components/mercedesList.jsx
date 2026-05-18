export default function MercedesList({ mercedesat, onEdito, onFshi }) { // ★ NDRRO: MercedesList (SHKRONJË E MADHE), mercedesat → njëjtë me App.jsx
  return (
    <>
      <h2>Lista e Mercedesave</h2> {/* ★ NDRRO: titulli i listës */}
      {mercedesat.length === 0 ? (
        <p>Nuk ka mercedes.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Emri</th>    {/* ★ NDRRO: header i kolonës 1 */}
              <th>Modeli</th>  {/* ★ NDRRO: header i kolonës 2 */}
              <th>Përshkrimi</th>
              <th>Veprimet</th>
            </tr>
          </thead>
          <tbody>
            {mercedesat.map(d => ( // ★ NDRRO: mercedesat → njëjtë me parametrin lart
              <tr key={d.ID}>
                <td>{d.ID}</td>
                <td>{d.Emrimercedesi}</td>   {/* ★ NDRRO: kolona 1 — njëjtë me DB */}
                <td>{d.Modelimercedesi}</td> {/* ★ NDRRO: kolona 2 — njëjtë me DB */}
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
