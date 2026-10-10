-- ========================================================
-- Base de Datos: Plataforma Cartográfica y Gestión de Riesgos
-- Comunidad: Ejido Mochis, Ahome, Sinaloa
-- Coordenadas de Referencia: ~ [25.8200, -109.0400]
-- ========================================================

CREATE TABLE IF NOT EXISTS `puntos_interes` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `nombre` VARCHAR(150) NOT NULL,
  `categoria` ENUM('educacion', 'salud', 'comercio') NOT NULL,
  `latitud` DECIMAL(10, 8) NOT NULL,
  `longitud` DECIMAL(11, 8) NOT NULL,
  `descripcion` VARCHAR(255) DEFAULT NULL,
  `creado_en` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `zonas_riesgo` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `nombre` VARCHAR(150) NOT NULL,
  `nivel_riesgo` ENUM('alto', 'medio') NOT NULL,
  `coordenadas_poligono` LONGTEXT NOT NULL COMMENT 'Arreglo JSON de coordenadas [[lat, lng], [lat, lng], ...]',
  `descripcion` TEXT DEFAULT NULL,
  `creado_en` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ========================================================
-- DATOS DE PRUEBA (MOCK DATA)
-- ========================================================

-- 1. Puntos de Interés Comunitario
INSERT INTO `puntos_interes` (`nombre`, `categoria`, `latitud`, `longitud`, `descripcion`) VALUES
('Escuela Primaria Gral. Ángel Flores', 'educacion', 25.82145000, -109.04120000, 'Centro educativo principal del Ejido Mochis con turno matutino y vespertino.'),
('Centro de Salud Ejido Mochis', 'salud', 25.81920000, -109.03880000, 'Atención médica comunitaria y módulo de primeros auxilios.'),
('Abarrotes y Mercado Ejidal El Trébol', 'comercio', 25.82280000, -109.03750000, 'Punto central de abastecimiento de víveres y productos locales.');

-- 2. Zonas de Riesgo Identificadas
INSERT INTO `zonas_riesgo` (`nombre`, `nivel_riesgo`, `coordenadas_poligono`, `descripcion`) VALUES
('Zona de Inundación Dren Ejidal', 'alto', 
 '[[25.8175, -109.0435], [25.8188, -109.0410], [25.8169, -109.0392], [25.8155, -109.0420]]', 
 'Área vulnerable a desbordes y acumulación severa de agua pluvial en temporada de lluvias intensas.'),

('Cruce Carretero de Alta Frecuencia y Visibilidad Reducida', 'medio', 
 '[[25.8235, -109.0360], [25.8248, -109.0345], [25.8230, -109.0332], [25.8218, -109.0348]]', 
 'Intersección con tráfico de transporte de carga y agrícola con alto riesgo de percances viales.'),

('Sector Ribera Canal Lateral - Desgajamiento', 'alto', 
 '[[25.8245, -109.0430], [25.8260, -109.0405], [25.8248, -109.0390], [25.8232, -109.0415]]', 
 'Margen inestable sujeta a erosión de talud y escurrimientos agrícolas continuos.');
