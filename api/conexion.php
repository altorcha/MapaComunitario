<?php
// ========================================================
// Conexión a Base de Datos MySQL (compatible PDO y MySQLi)
// ========================================================

$host = "localhost";
$user = "root";
$pass = ""; // En XAMPP viene vacía por defecto
$db   = "mapa_ejido"; // Nombre de la base de datos

// 1. Inicialización de PDO (usado por get_puntos.php y get_zonas.php)
try {
    $pdo = new PDO("mysql:host={$host};dbname={$db};charset=utf8mb4", $user, $pass, [
        PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES   => false,
    ]);
} catch (PDOException $e) {
    // Si la conexión PDO falla, los endpoints manejarán el error correspondientemente
    $pdo = null;
}

// 2. Inicialización de MySQLi (por compatibilidad hacia atrás)
$conn = @new mysqli($host, $user, $pass, $db);
if (!$conn->connect_error) {
    $conn->set_charset("utf8mb4");
}
?>