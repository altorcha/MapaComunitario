# Directorio Comercial y de Servicios - Ejido Mochis

Plataforma cartográfica y directorio web para la localización y consulta de comercios, talleres, consultorios, centros educativos y servicios en el Ejido Mochis, Ahome, Sinaloa.

---

## Funcionalidades del Sistema

* **Cartografía Vectorial**: Visualización cartográfica interactiva mediante Leaflet con soporte para capas de calles y satelital de alta resolución sin dependencia de APIs de pago.
* **Marcadores bajo Demanda**: Carga limpia del mapa base; los marcadores georreferenciados se renderizan únicamente cuando el usuario selecciona un establecimiento.
* **Motor de Búsqueda Normalizado**:
  * Insensibilidad diacrítica completa (normalización Unicode NFD para coincidencias con o sin acento).
  * Indexación concurrente de nombre, domicilio, calle principal, entrecalles, puntos de referencia y servicios.
  * Navegación por teclado con ejecución directa mediante la tecla Enter.
* **Ficha Técnica Comercial**: Despliegue de datos de contacto directo, horarios de operación, clasificación de giro comercial, catálogo de servicios y coordenadas geográficas decimales.
* **Deep Linking**: Enrutamiento mediante parámetros URL (`?negocio=ID`) para posicionamiento automático y compartición limpia sin recarga de página.
* **Interfaz Adaptativa (Bottom Sheet)**: Panel deslizante con controlador táctil para dispositivos móviles y visualización expandida en escritorio.
* **Iconografía SVG**: Sistema iconográfico monocromático vectorial integrado en línea con trazo uniforme (estilo Feather / Material Symbols).
* **Persistencia Dual**: Soporte de sincronización asíncrona mediante API PHP/PDO conectada a MySQL y respaldo en memoria local para operación fuera de línea.

---

## Propuestas de Implementación y Roadmap

### 1. Integraciones Comerciales
* **Enlace Directo a WhatsApp**: Integración del protocolo `https://wa.me/` en la ficha técnica con mensaje contextualizado predefinido.
* **Evaluación de Horarios en Tiempo Real**: Función lógica en cliente para contrastar la estampa de tiempo del dispositivo contra los rangos horarios del comercio, determinando el estado operativo (Abierto / Cerrado).
* **Registro Fotográfico de Fachadas**: Asociación de activos gráficos por identificador de negocio para identificación visual en campo.
* **Catálogos y Enlaces Externos**: Vinculación a perfiles comerciales de redes sociales y menús digitales.

### 2. Módulos de Gestión Administrativa
* **Portal de Solicitud de Registro**: Formulario público para recepción y validación de altas comerciales por parte de los propietarios.
* **Panel de Administración (CRUD)**:
  * Control de acceso autenticado para operadores del directorio.
  * Selector cartográfico de coordenadas (Pin-Picker) con cálculo inverso de latitud y longitud mediante eventos de clic en el mapa.
  * Mantenimiento de registros (altas, bajas lógicas y modificaciones de campos estructurados).
* **Canal de Retroalimentación de Datos**: Módulo para reporte de discrepancias en números telefónicos o domicilios por parte de los usuarios.

### 3. Progressive Web App (PWA)
* **Manifiesto de Aplicación**: Definición de `manifest.json` y conjunto de iconos adaptativos para habilitar la instalación directa en dispositivos móviles sin intermediación de tiendas de aplicaciones.
* **Estrategia de Almacenamiento en Caché**: Implementación de Service Worker para consulta íntegra de la base de datos sin conectividad de red.

### 4. Servicios de Proximidad y Geolocalización
* **Cálculo de Distancia**: Algoritmo de distancia geodésica (fórmula de Haversine) entre las coordenadas del usuario y el comercio seleccionado.
* **Ordenamiento Espacial**: Clasificación dinámica del listado comercial por radio de proximidad.

### 5. Infraestructura y Despliegue
* **Alojamiento en Servidor Web**: Publicación en infraestructura con soporte PHP 8+ y motor de base de datos relacional.
* **Protocolo Seguro TLS/HTTPS**: Implementación de certificados SSL requeridos para el consumo de la API de Geolocalización del navegador en entornos móviles.

---

## Estructura de Archivos

```text
MapaComunitario/
├── index.html         # Documento estructural de la interfaz
├── css/
│   └── estilos.css    # Arquitectura de estilos y diseño responsivo
├── js/
│   ├── mapa.js        # Lógica de renderizado Leaflet, búsqueda y eventos
│   └── datos-ejido.js # Almacén de datos estructurados y catálogo SVG
├── api/
│   ├── conexion.php   # Capa de abstracción de datos PDO (charset utf8mb4)
│   ├── get_puntos.php # Endpoint REST para consulta de registros
│   └── seed_puntos.php# Generador de estructura y sembrado de datos
├── database.sql       # Definición DDL y registros relacionales
└── README.md          # Documentación técnica interna
```

---

## Especificaciones Técnicas

* **Capa de Presentación**: HTML5 semántico, CSS3 estructurado (CSS Grid, Flexbox, variables CSS), JavaScript ECMAScript 6+.
* **Motor Cartográfico**: Leaflet JS v1.9.4, fuentes cartográficas OpenStreetMap y ESRI World Imagery.
* **Capa de Servicio**: PHP 8.x con controlador PDO y codificación UTF-8 sin BOM.
* **Capa de Persistencia**: MySQL / MariaDB (motor InnoDB, cotejamiento `utf8mb4_unicode_ci`).
