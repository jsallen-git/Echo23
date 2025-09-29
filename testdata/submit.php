<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST["username"];

    // SQL Server connection info
    $serverName = "192.168.1.247"; // or your server name
    $connectionOptions = [
        "Database" => "ech23",
        "Uid" => "serviceSQL",
        "PWD" => "Linkup1J"
    ];

    // Connect to SQL Server
    $conn = sqlsrv_connect($serverName, $connectionOptions);

    if ($conn === false) {
        die(print_r(sqlsrv_errors(), true));
    }

    // Prepare and execute the query
    $sql = "INSERT INTO users (username) VALUES (?)";
    $params = [$username];
    $stmt = sqlsrv_query($conn, $sql, $params);

    if ($stmt === false) {
        die(print_r(sqlsrv_errors(), true));
    }

    echo "Username submitted successfully!";
    sqlsrv_close($conn);
}
