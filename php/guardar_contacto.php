<?php
header('Content-Type: application/json');

// Conectar a la base de datos (ajusta los parámetros según sea necesario)
$mysqli = new mysqli('localhost', 'root', '', 'mascotas_db');

// Verificar conexión
if ($mysqli->connect_error) {
    echo json_encode(['status' => 'error', 'message' => 'Error de conexión a la base de datos']);
    exit();
}

// Obtener datos del formulario
$nombre = $_POST['nombre'];
$email = $_POST['email'];
$telefono = $_POST['telefono'];
$mensaje = $_POST['mensaje'];

// Insertar datos en la base de datos
$sql = "INSERT INTO contacto (nombre, email, telefono, mensaje) VALUES (?, ?, ?, ?)";
$stmt = $mysqli->prepare($sql);
$stmt->bind_param('ssss', $nombre, $email, $telefono, $mensaje);

if ($stmt->execute()) {
    echo json_encode(['status' => 'success']);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Error al guardar los datos']);
}

$stmt->close();
$mysqli->close();
?>


