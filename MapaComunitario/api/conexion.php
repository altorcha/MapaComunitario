<?php
// ========================================================
// Conexión a Base de Datos MySQL vía PDO
// Directorio Comercial Comunitario - Ejido Mochis
// ========================================================

$host = "localhost";
$user = "root";
$pass = ""; // Por defecto en XAMPP está vacía
$db   = "mapa_ejido";

try {
    $pdo = new PDO("mysql:host={$host};dbname={$db};charset=utf8mb4", $user, $pass, [
        PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES   => false,
    ]);
} catch (PDOException $e) {
    http_response_code(500);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode([
        'status'  => 'error',
        'mensaje' => 'Error de conexión con la base de datos: ' . $e->getMessage()
    ], JSON_UNESCAPED_UNICODE);
    exit;
}
?>