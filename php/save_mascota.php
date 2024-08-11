<?php
include 'db_connect.php';

// Obtener datos del formulario
$tipo = $_POST['tipo'];
$descripcion = $_POST['descripcion'];
$telefono = isset($_POST['telefono']) ? $_POST['telefono'] : ''; // Campo opcional para encontrados
$latitud = isset($_POST['latitud']) ? $_POST['latitud'] : '0.00000000'; // Valor predeterminado si está vacío
$longitud = isset($_POST['longitud']) ? $_POST['longitud'] : '0.00000000'; // Valor predeterminado si está vacío
$foto = $_FILES['foto'];

// Directorio para subir archivos
$target_dir = "../uploads/"; // Ruta absoluta desde la carpeta 'php'
$target_file = $target_dir . basename($foto["name"]);

// Mover archivo
if (move_uploaded_file($foto["tmp_name"], $target_file)) {
    echo "El archivo " . htmlspecialchars(basename($foto["name"])) . " ha sido subido.";
} else {
    echo "Lo siento, hubo un error al subir tu archivo.";
}

// Insertar en la base de datos
$sql = "INSERT INTO mascotas (tipo, descripcion, telefono, foto, latitud, longitud)
        VALUES ('$tipo', '$descripcion', '$telefono', '$target_file', '$latitud', '$longitud')";

if ($conn->query($sql) === TRUE) {
    echo "Registro guardado correctamente";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>
