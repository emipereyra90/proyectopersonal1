<?php
$servername = "localhost"; // O la IP del servidor de base de datos si estás usando un servidor remoto
$username = "root"; // Reemplaza con tu nombre de usuario de base de datos
$password = ""; // Reemplaza con tu contraseña de base de datos
$dbname = "mascotas_db";

// Crear conexión
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}
?>
