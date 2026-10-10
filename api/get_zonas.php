<?php
// ========================================================
// API Endpoint: get_zonas.php
// Consulta la tabla zonas_riesgo y devuelve un JSON con los polígonos
// ========================================================

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');

require_once __DIR__ . '/conexion.php';

try {
    $sql = "SELECT id, nombre, nivel_riesgo, coordenadas_poligono, descripcion FROM zonas_riesgo ORDER BY id ASC";
    $stmt = $pdo->query($sql);
    $zonas = $stmt->fetchAll();

    $resultado = array_map(function ($zona) {
        // Decodificar el campo coordenadas_poligono si viene como string JSON
        $coords = $zona['coordenadas_poligono'];
        if (is_string($coords)) {
            $decoded = json_decode($coords, true);
            if (json_last_error() === JSON_ERROR_NONE) {
                $coords = $decoded;
            }
        }

        return [
            'id'                   => (int)$zona['id'],
            'nombre'               => $zona['nombre'],
            'nivel_riesgo'         => strtolower(trim($zona['nivel_riesgo'])),
            'coordenadas_poligono' => $coords,
            'descripcion'          => $zona['descripcion'] ?? ''
        ];
    }, $zonas);

    echo json_encode([
        'status' => 'success',
        'total'  => count($resultado),
        'data'   => $resultado
    ], JSON_UNESCAPED_UNICODE);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        'status'  => 'error',
        'mensaje' => 'Error al consultar zonas de riesgo: ' . $e->getMessage()
    ], JSON_UNESCAPED_UNICODE);
}
?>
