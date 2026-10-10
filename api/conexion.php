<?php
$host = "localhost";
$user = "root";
$pass = ""; // En XAMPP viene vacía por defecto
$db   = "mapa_ejido"; // El nombre que le pusiste en phpMyAdmin

$conn = new mysqli($host, $user, $pass, $db);

if ($conn->connect_error) {
    die("Error de conexión: " . $conn->connect_error);
}
$conn->set_charset("utf8");
?>