export default function DepartamentiList({ departamentet, onEdito, onFshi }) {
  return (
    <>
      <h2>Lista e Departmenteve</h2> {/* ★ NDRRO: Departmenteve → Ligjeruesve */}
      {departamentet.length === 0 ? (
        <p>Nuk ka departamente.</p> /* ★ NDRRO: teksti kur lista është bosh */
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Emri i Departmentit</th>  {/* ★ NDRRO: header kolona 1 */}
              <th>Vendi i Departmentit</th> {/* ★ NDRRO: header kolona 2 */}
              <th>Përshkrimi</th>           {/* ★ NDRRO: header kolona 3 */}
              <th>Veprimet</th>
            </tr>
          </thead>
          <tbody>
            {departamentet.map(d => (
              <tr key={d.ID}>
                <td>{d.ID}</td>
                <td>{d.EmriDepartamentit}</td>  {/* ★ NDRRO: kolona 1 nga DB */}
                <td>{d.VendiDepartamentit}</td> {/* ★ NDRRO: kolona 2 nga DB */}
                <td>{d.Pershkrimi}</td>         {/* ★ NDRRO: kolona 3 nga DB */}
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
