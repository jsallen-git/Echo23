<?php
$serverName = "localhost"; // or your server IP
$connectionOptions = array(
    "Database" => "TestDB",
    "Uid" => "serviceSQL",
    "PWD" => "Linkup1J"
);

// Connect to SQL Server
$conn = sqlsrv_connect($serverName, $connectionOptions);

if ($conn === false) {
    die(print_r(sqlsrv_errors(), true));
}

// Get form data
$name = $_POST['name'];
$email = $_POST['email'];

// Prepare and execute insert query
$sql = "INSERT INTO Users (Name, Email) VALUES (?, ?)";
$params = array($name, $email);
$stmt = sqlsrv_query($conn, $sql, $params);

if ($stmt === false) {
    die(print_r(sqlsrv_errors(), true));
} else {
    echo "Record inserted successfully!";
}

sqlsrv_close($conn);
?>
