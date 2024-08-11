<?php
include 'db_connect.php';

$conn = new mysqli($servername, $username, $password, $dbname);

$sql = "SELECT * FROM mascotas";
$result = $conn->query($sql);
$mascotas = [];

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $mascotas[] = $row;
    }
}

echo json_encode($mascotas);
$conn->close();
?>
