<?php
// ========================================================
// API Endpoint: get_puntos.php
// Consulta la tabla puntos_interes y devuelve un JSON limpio
// ========================================================

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');

require_once __DIR__ . '/conexion.php';

try {
    $sql = "SELECT id, nombre, categoria, latitud, longitud, descripcion FROM puntos_interes ORDER BY id ASC";
    $stmt = $pdo->query($sql);
    $puntos = $stmt->fetchAll();

    // Asegurar tipos de datos adecuados para Leaflet
    $resultado = array_map(function ($punto) {
        return [
            'id'          => (int)$punto['id'],
            'nombre'      => $punto['nombre'],
            'categoria'   => strtolower(trim($punto['categoria'])),
            'latitud'     => (float)$punto['latitud'],
            'longitud'    => (float)$punto['longitud'],
            'descripcion' => $punto['descripcion'] ?? ''
        ];
    }, $puntos);

    echo json_encode([
        'status' => 'success',
        'total'  => count($resultado),
        'data'   => $resultado
    ], JSON_UNESCAPED_UNICODE);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        'status'  => 'error',
        'mensaje' => 'Error al consultar puntos de interés: ' . $e->getMessage()
    ], JSON_UNESCAPED_UNICODE);
}
?>
