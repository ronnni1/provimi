<?php
class Database {
    private $host = "127.0.0.1";
    private $user = "root";
    private $pass = "";
    private $db   = "departamenti";
    public  $conn;

    public function __construct() {
        try {
            $pdo = new PDO("mysql:host=$this->host;charset=utf8", $this->user, $this->pass);
            $pdo->exec("CREATE DATABASE IF NOT EXISTS `$this->db` CHARACTER SET utf8 COLLATE utf8_general_ci");

            $this->conn = new PDO(
                "mysql:host=$this->host;dbname=$this->db;charset=utf8",
                $this->user, $this->pass
            );
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch (PDOException $e) {
            die("Gabim: " . $e->getMessage());
        }
    }

    public function krijoTabelen() {
        $this->conn->exec("CREATE TABLE IF NOT EXISTS departamenti (
            ID                INT AUTO_INCREMENT PRIMARY KEY,
            EmriDepartamentit VARCHAR(100) NOT NULL,
            VendiDepartamentit VARCHAR(100) NOT NULL,
            Pershkrimi        VARCHAR(255) NOT NULL
        )");
    }

    public function shtoDepartamentin($emri, $vendi, $pershkrimi) {
        $stmt = $this->conn->prepare("INSERT INTO departamenti (EmriDepartamentit, VendiDepartamentit, Pershkrimi) VALUES (?, ?, ?)");
        return $stmt->execute([$emri, $vendi, $pershkrimi]);
    }

    public function shfaqDepartamentin() {
        return $this->conn->query("SELECT * FROM departamenti ORDER BY ID DESC")->fetchAll(PDO::FETCH_ASSOC);
    }

    public function merrDepartaminSipasID($id) {
        $stmt = $this->conn->prepare("SELECT * FROM departamenti WHERE ID = ?");
        $stmt->execute([$id]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function perditesoDepartamentin($id, $emri, $vendi, $pershkrimi) {
        $stmt = $this->conn->prepare("UPDATE departamenti SET EmriDepartamentit=?, VendiDepartamentit=?, Pershkrimi=? WHERE ID=?");
        return $stmt->execute([$emri, $vendi, $pershkrimi, $id]);
    }

    public function fshiDepartamentin($id) {
        $stmt = $this->conn->prepare("DELETE FROM departamenti WHERE ID = ?");
        return $stmt->execute([$id]);
    }
}
