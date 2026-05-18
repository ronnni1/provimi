export default function FabrikaList({ fabrikat, onEdito, onFshi }) { // ★ SHKRONJË E MADHE: FabrikaList
  return (
    <>
      <h2>Lista e fabrikave</h2> {/* ★ NDRRO: titulli i listës */}
      {fabrikat.length === 0 ? (
        <p>Nuk ka fabrika.</p> /* ★ NDRRO: teksti kur lista është bosh */
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Emri i fabrikes</th>  {/* ★ NDRRO: header kolona 1 */}
              <th>Vendi i fabrikes</th> {/* ★ NDRRO: header kolona 2 */}
              <th>Përshkrimi</th>       {/* ★ NDRRO: header kolona 3 */}
              <th>Veprimet</th>
            </tr>
          </thead>
          <tbody>
            {fabrikat.map(d => (
              <tr key={d.ID}>
                <td>{d.ID}</td>
                <td>{d.Emrifabrikes}</td>  {/* ★ NDRRO: kolona 1 nga DB */}
                <td>{d.Vendifabrikes}</td> {/* ★ NDRRO: kolona 2 nga DB // ★ SHKRONJË E MADHE: Pozitafabrikat */}
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
