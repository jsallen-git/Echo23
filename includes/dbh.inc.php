<?php

$dsn = "mssql:host=DB1;dbname=echo23";
$dbusername = "serviceSQL";
$dbpassword = "Linkup1J";

try {
    $pdo = new PDO($dsn, $dbusername, $dbpassword);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION)
} catch (PDOException $e) {
    echo "Conneciton failed: " .$e->getMessage();
}