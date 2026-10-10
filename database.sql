-- ========================================================
-- Base de Datos: Plataforma Cartográfica, Comercios y Gestión de Riesgos
-- Comunidad: Ejido Mochis, Ahome, Sinaloa
-- Coordenadas de Referencia: ~ [25.8272, -109.0514]
-- ========================================================

CREATE TABLE IF NOT EXISTS `puntos_interes` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `nombre` VARCHAR(150) NOT NULL,
  `categoria` VARCHAR(50) NOT NULL COMMENT 'biblioteca, educacion, salud, comercio, servicios',
  `latitud` DECIMAL(11, 8) NOT NULL,
  `longitud` DECIMAL(11, 8) NOT NULL,
  `descripcion` VARCHAR(255) DEFAULT NULL,
  `horario` VARCHAR(150) DEFAULT NULL,
  `direccion` VARCHAR(200) DEFAULT NULL,
  `telefono` VARCHAR(50) DEFAULT NULL,
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

-- 1. Comercios, Establecimientos y Puntos Comunitarios
INSERT INTO `puntos_interes` (`nombre`, `categoria`, `latitud`, `longitud`, `descripcion`, `horario`, `direccion`, `telefono`) VALUES
('Biblioteca Local Ejido Mochis', 'biblioteca', 25.82745489, -109.04922829, 'Biblioteca pública comunitaria. Préstamo de libros, acervo histórico ejidal, sala de lectura y cómputo con acceso a internet.', 'Lunes a Viernes: 8:00 AM - 6:00 PM | Sábados: 9:00 AM - 1:00 PM', 'Av. Álvaro Obregón e Hidalgo s/n, Ejido Mochis', '668 812 3456'),
('Abarrotes y Minisuper El Trébol', 'comercio', 25.82685000, -109.05012000, 'Abarrotes en general, frutas frescas, verduras, lácteos, carnes frías y recargas de tiempo aire.', 'Lunes a Domingo: 7:00 AM - 9:30 PM', 'Calle Lázaro Cárdenas #45, Ejido Mochis', '668 811 2233'),
('Farmacia y Consultorio Comunitario San Martín', 'salud', 25.82620000, -109.05150000, 'Venta de medicamentos genéricos y de patente, consulta médica general a bajo costo y toma de signos vitales.', 'Lunes a Sábado: 8:00 AM - 8:30 PM | Domingos: 9:00 AM - 2:00 PM', 'Av. Principal esq. con Carranza, Ejido Mochis', '668 815 4488'),
('Tortillería y Molino La Espiga', 'comercio', 25.82810000, -109.04875000, 'Tortillas de maíz nixtamalizado calientitas, masa para tamales, totopos y salsas caseras.', 'Lunes a Domingo: 6:00 AM - 3:00 PM', 'Calle Niños Héroes #12, Ejido Mochis', '668 816 7711'),
('Carnicería y Cremería El Novillo Alegre', 'comercio', 25.82792000, -109.05210000, 'Cortes de carne fresca de res y puerco, pollo de granja, quesos regionales sinaloenses y chilorio artesanal.', 'Lunes a Sábado: 7:00 AM - 4:00 PM | Domingos: 7:00 AM - 1:00 PM', 'Calle Emiliano Zapata #38, Ejido Mochis', '668 813 9922'),
('Ferretería y Materiales San Isidro', 'comercio', 25.82580000, -109.04810000, 'Herramientas, material eléctrico, plomería, tornillería y artículos para mantenimiento agrícola y del hogar.', 'Lunes a Viernes: 7:30 AM - 6:30 PM | Sábados: 8:00 AM - 2:00 PM', 'Carretera Ejidal s/n, Ejido Mochis', '668 818 3344'),
('Papelería e Internet Ciber-Mochis', 'comercio', 25.82710000, -109.04830000, 'Artículos escolares y de oficina, impresiones a color, fotocopias, trámites CURP/SAT y renta de computadoras.', 'Lunes a Viernes: 7:30 AM - 8:00 PM | Sábados: 9:00 AM - 3:00 PM', 'Calle Morelos #18, frente a la plazuela, Ejido Mochis', '668 814 5566'),
('Taller Mecánico y Vulcanizadora Los Cuates', 'servicios', 25.82910000, -109.05320000, 'Parche y cambio de llantas de autos y maquinaria agrícola, cambio de aceite y afinaciones mecánicas.', 'Lunes a Sábado: 8:00 AM - 7:00 PM', 'Entrada Norte del Ejido Mochis', '668 819 0011'),
('Escuela Primaria Gral. Ángel Flores', 'educacion', 25.82845000, -109.05050000, 'Institución educativa primaria comunitaria con turno matutino y vespertino.', 'Lunes a Viernes: 7:30 AM - 1:00 PM y 1:30 PM - 6:00 PM', 'Calle Escolar #100, Ejido Mochis', '668 810 1122'),
('Centro de Salud Ejido Mochis', 'salud', 25.82510000, -109.05220000, 'Centro médico de atención primaria y preventiva para las familias del ejido.', 'Lunes a Viernes: 8:00 AM - 3:30 PM | Urgencias 24h', 'Av. de la Salud s/n, Ejido Mochis', '668 817 6655');

-- 2. Zonas de Riesgo Identificadas
INSERT INTO `zonas_riesgo` (`nombre`, `nivel_riesgo`, `coordenadas_poligono`, `descripcion`) VALUES
('Zona de Inundación Dren Ejidal', 'alto', 
 '[[25.8235, -109.0535], [25.8248, -109.0510], [25.8229, -109.0492], [25.8215, -109.0520]]', 
 'Área vulnerable a desbordes y acumulación severa de agua pluvial en temporada de lluvias intensas.'),

('Cruce Carretero de Alta Frecuencia y Tráfico Agrícola', 'medio', 
 '[[25.8295, -109.0460], [25.8308, -109.0445], [25.8290, -109.0432], [25.8278, -109.0448]]', 
 'Intersección con tráfico de transporte de carga y agrícola con alto riesgo de percances viales.'),

('Sector Ribera Canal Lateral - Desgajamiento', 'alto', 
 '[[25.8305, -109.0530], [25.8320, -109.0505], [25.8308, -109.0490], [25.8292, -109.0515]]', 
 'Margen inestable sujeta a erosión de talud y escurrimientos agrícolas continuos.');
