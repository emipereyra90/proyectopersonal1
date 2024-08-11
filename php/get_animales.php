<?php
include 'db_connect.php'; // Incluye tu archivo de conexión a la base de datos

header('Content-Type: application/json'); // Establece el tipo de contenido como JSON

// Asegúrate de que el nombre del campo de fecha coincida con el que usas en el JS
$sql = "SELECT tipo, descripcion, telefono, foto, latitud, longitud, fecha AS fecha_publicacion FROM mascotas";
$result = $conn->query($sql);

$mascotas = array();

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $mascotas[] = $row;
    }
}

echo json_encode($mascotas); // Devuelve los datos en formato JSON

$conn->close(); // Cierra la conexión a la base de datos
?>
