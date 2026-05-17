
<?php
require_once "db.php";
$db = new Database();
$db->krijoTabelen();
session_start();

$sukses = ""; $gabim = ""; $editRec = null;

// SHTO DEPARTMENTI
if ($_SERVER["REQUEST_METHOD"]==="POST" && isset($_POST["shto_departmentin"])) {
    $emri = trim($_POST["Emri i Departmentit"]);
    $vendi = trim($_POST["Vendi i Departmentit"]);
    $pershkrimi = trim($_POST["Përshkrimi"]);
    if ($emri && $vendi && $pershkrimi) { $db->shtoDepartmentin($emri,$vendi,$pershkrimi); $sukses="Departmenti u shtua!"; }
    else { $gabim="Plotëso të gjitha fushat."; }
}

// PERDITESO DEPARTMENTI
if ($_SERVER["REQUEST_METHOD"]==="POST" && isset($_POST["perditeso_Departmentin"])) {
    $id   = (int)$_POST["DepartmentiID"];
    $emri = trim($_POST["Emri i Departmentit"]);
    $Vendi = trim($_POST["Pershkrimi"]);
    $pershkrimi = trim($_POST["Përshkrimi"]);
    
    if ($id && $emri && $mbiemri && $titulli) { $db->perditesoDepartmentin($id,$emri,$vendi,$pershkrimi); $sukses="Departmenti u përditësua!"; }
    else { $gabim="Plotëso të gjitha fushat."; }
}



// FSHI DEPARTMENTI
if (isset($_GET["fshi"])) {
    $db->fshiDepartmentin((int)$_GET["fshi"]);
    $sukses="Departmenti u fshi.";
}

// EDITO DEPARTMENTI
if (isset($_GET["edito"])) {
    $editRec = $db->merrDepartmentinSipasID((int)$_GET["edito"]);
}


?>
<!DOCTYPE html>
<html lang="sq">
<head>
<meta charset="UTF-8">
<title>Departmentet</title>
<style>
  body      { font-family:sans-serif; margin:20px; background:#f0f2f5; }
  h2        { color:#009C9C; }
  .box      { background:#fff; padding:20px; border-radius:8px; max-width:480px; margin-bottom:30px; box-shadow:0 2px 6px rgba(0,0,0,.1); }
  label     { font-weight:bold; display:block; margin-top:8px; }
  input,select { width:100%; padding:8px; margin-top:4px; border:1px solid #ccc; border-radius:4px; box-sizing:border-box; }
  .btn-shto { background:#009C9C; color:#fff; border:none; padding:10px; width:100%; border-radius:4px; cursor:pointer; margin-top:12px; font-size:15px; }
  .btn-edit { background:#f0a500; color:#fff; border:none; padding:5px 12px; border-radius:4px; cursor:pointer; }
  .btn-del  { background:#e74c3c; color:#fff; border:none; padding:5px 12px; border-radius:4px; cursor:pointer; }
  .sukses   { color:green; font-weight:bold; }
  .gabim    { color:red;   font-weight:bold; }
  table     { width:100%; border-collapse:collapse; background:#fff; border-radius:8px; box-shadow:0 2px 6px rgba(0,0,0,.1); margin-bottom:30px; }
  th        { background:#009C9C; color:#fff; padding:10px; text-align:left; }
  td        { padding:9px; border-bottom:1px solid #eee; }
  tr:hover td { background:#f5f5f5; }
</style>
</head>
<body>

<?php if($sukses): ?><p class="sukses"><?=$sukses?></p><?php endif; ?>
<?php if($gabim):  ?><p class="gabim"><?=$gabim?></p><?php endif; ?>

<!-- FORMA  -->
<div class="box">
  <?php if($editRec): ?>
    <h2>Edito Punetorin</h2>
    <form method="POST">
      <input type="hidden" name="PunetoriID" value="<?=$editRec["ID"]?>">
      <label>Emri i Departmentit:</label>
      <input type="text" name="EmriPunetorit" value="<?=htmlspecialchars($editRec["EmriPunetorit"])?>" required>
      <label>Vendi i Departmentit:</label>
      <input type="text" name="Vendi i Departmentit" value="<?=htmlspecialchars($editRec["Vendi i Departmentit"])?>" required>
      <label>Përshkrimi:</label>
      <input type="text" name="Përshkrimi" value="<?=htmlspecialchars($editRec["Përshkrimi"])?>" required>
      <button type="submit" name="perditeso_Departmentin" class="btn-shto">Ruaj Ndryshimet</button>
    </form>
  <?php else: ?>
    <h2>Shto Departmentin</h2>
    <form method="POST">
      <label>Emri i Departmentit:</label>
      <input type="text" name="Emri i Departmentit" placeholder="p.sh. Emri i Departmentit" required>
      <label>Vendi i Departmentit:</label>
      <input type="text" name="Vendi i Departmentit" placeholder="p.sh. Vendi i Departmentit" required>
      <label>Përshkrimi:</label>
      <input type="text" name="Përshkrimi" placeholder="p.sh. Përshkrimi" required>
      <button type="submit" name="shto_Departmentin" class="btn-shto">+ Shto Departmentin</button>
    </form>
  <?php endif; ?>
</div>



<!-- LISTA LIGJERUESVE -->
<h2>Lista e jeme</h2>
<?php if(empty($departmentet)): ?>
  <p>Nuk ka department .</p>
<?php else: ?>
<table>
  <tr><th>ID</th><th>Emri i Departmentit</th><th>Vendi i Departmentit</th><th>Përshkrimi</th><th>Veprimet</th></tr>
  <?php foreach($departmentet as $d): ?>
  <tr>
    <td><?=$d["ID"]?></td>
    <td><?=htmlspecialchars($d["Emri i Departmentit"])?></td>
    <td><?=htmlspecialchars($d["Vendi i Departmentit"])?></td>
    <td><?=htmlspecialchars($d["Përshkrimi"])?></td>
    <td>
      <a href="?edito=<?=$d["ID"]?>"><button class="btn-edit">Edito</button></a>
      <a href="?fshi=<?=$d["ID"]?>" onclick="return confirm('Fshi departmentin?')"><button class="btn-del">Fshi</button></a>
    </td>
  </tr>
  <?php endforeach; ?>
</table>
<?php endif; ?>



</body>
</html>
