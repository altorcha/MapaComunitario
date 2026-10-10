<?php
// ========================================================
// API Endpoint: get_puntos.php
// Consulta la tabla puntos_interes y devuelve un JSON limpio
// ========================================================

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');

require_once __DIR__ . '/conexion.php';

try {
    if (!$pdo) {
        throw new PDOException("No hay conexión activa a la base de datos MySQL.");
    }

    $sql = "SELECT id, nombre, categoria, latitud, longitud, descripcion, horario, direccion, telefono FROM puntos_interes ORDER BY id ASC";
    $stmt = $pdo->query($sql);
    $puntos = $stmt->fetchAll();

    // Asegurar tipos de datos adecuados para Leaflet y la interfaz
    $resultado = array_map(function ($punto) {
        return [
            'id'          => (int)$punto['id'],
            'nombre'      => $punto['nombre'],
            'categoria'   => strtolower(trim($punto['categoria'])),
            'latitud'     => (float)$punto['latitud'],
            'longitud'    => (float)$punto['longitud'],
            'descripcion' => $punto['descripcion'] ?? '',
            'horario'     => $punto['horario'] ?? 'Horario no especificado',
            'direccion'   => $punto['direccion'] ?? 'Ejido Mochis, Sinaloa',
            'telefono'    => $punto['telefono'] ?? ''
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
        'mensaje' => 'Error al consultar comercios y puntos de interés: ' . $e->getMessage()
    ], JSON_UNESCAPED_UNICODE);
}
?>
