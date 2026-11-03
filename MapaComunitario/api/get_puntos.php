<?php
// ========================================================
// API Endpoint: get_puntos.php
// Consulta la tabla puntos_interes y devuelve JSON en UTF-8
// ========================================================

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');

require_once __DIR__ . '/conexion.php';

try {
    $sql = "SELECT 
                id, 
                nombre, 
                categoria, 
                COALESCE(subcategoria, 'General') AS subcategoria, 
                latitud, 
                longitud, 
                COALESCE(descripcion, '') AS descripcion, 
                COALESCE(horario, 'Horario no especificado') AS horario, 
                COALESCE(direccion, 'Cuadro Urbano, Ejido Mochis') AS direccion, 
                COALESCE(telefono, '') AS telefono, 
                COALESCE(servicios, '') AS servicios, 
                COALESCE(referencia, '') AS referencia 
            FROM puntos_interes 
            ORDER BY id ASC";
            
    $stmt = $pdo->query($sql);
    $puntos = $stmt->fetchAll();

    $resultado = array_map(function ($punto) {
        return [
            'id'           => (int)$punto['id'],
            'nombre'       => trim($punto['nombre']),
            'categoria'    => strtolower(trim($punto['categoria'])),
            'subcategoria' => trim($punto['subcategoria'] ?? 'General'),
            'latitud'      => (float)$punto['latitud'],
            'longitud'     => (float)$punto['longitud'],
            'descripcion'  => trim($punto['descripcion'] ?? ''),
            'horario'      => trim($punto['horario'] ?? 'Horario no especificado'),
            'direccion'    => trim($punto['direccion'] ?? 'Cuadro Urbano, Ejido Mochis'),
            'telefono'     => trim($punto['telefono'] ?? ''),
            'servicios'    => trim($punto['servicios'] ?? ''),
            'referencia'   => trim($punto['referencia'] ?? '')
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
        'mensaje' => 'Error al consultar comercios y servicios: ' . $e->getMessage()
    ], JSON_UNESCAPED_UNICODE);
}
?>