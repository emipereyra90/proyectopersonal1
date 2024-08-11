<?php
header('Content-Type: application/json');

// Conectar a la base de datos (ajusta los parámetros según sea necesario)
$mysqli = new mysqli('localhost', 'root', '', 'mascotas_bd');

// Verificar conexión
if ($mysqli->connect_error) {
    die('Error de conexión a la base de datos: ' . $mysqli->connect_error);
}

// Establecer la consulta para eliminar registros que tengan más de 30 días
$sql = "DELETE FROM animales WHERE DATEDIFF(NOW(), fecha_publicacion) > 30";

if ($mysqli->query($sql) === TRUE) {
    echo "Registros antiguos eliminados exitosamente.";
} else {
    echo "Error al eliminar registros: " . $mysqli->error;
}

$mysqli->close();
?>
