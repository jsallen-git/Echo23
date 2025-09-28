<?php

$dsn = "sqlsrv:Server=DB1;Database=echo23";
$dbusername = "serviceSQL";
$dbpassword = "Linkup1J";

try {
    $pdo = new PDO($dsn, $dbusername, $dbpassword);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION); // ← semicolon added
} catch (PDOException $e) {
    echo "Connection failed: " . $e->getMessage(); // ← typo fixed
}
