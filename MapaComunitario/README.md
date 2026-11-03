# Directorio Comercial y de Servicios - Ejido Mochis

Plataforma cartográfica interactiva y directorio georreferenciado moderno de comercios, talleres, consultorios, centros educativos y servicios comunitarios del **Ejido Mochis (Ahome, Sinaloa)**.

---

## Características Principales

* **Mapa Interactivo con Leaflet**: Visualización dinámica de calles y vista satelital de alta resolución (ESRI / OpenStreetMap) sin necesidad de API keys de pago.
* **Georreferenciación Precisa**: Ubicación exacta y fichas completas de 25 comercios y servicios locales sobre la traza urbana real del Ejido Mochis.
* **Deep Linking en Web**: Enlace directo para cada negocio (`?negocio=ID`). Al abrirlo o compartirlo, centra el mapa automáticamente en el lugar y despliega su ficha.
* **Compartir Inteligente y Toast**: Copia limpia de URLs al portapapeles con notificación flotante sutil, sin alertas intrusivas.
* **Diseño UI/UX Espacioso y Respirable**: Tarjetas cómodas (padding 16px-18px), tipografía jerarquizada y badges diferenciados por categoría comercial.
* **Experiencia Móvil (Bottom Sheet)**: Panel inferior táctil deslizable con agarrador táctil (*drag handle*) que permite expandir y colapsar suavemente.
* **Iconografía SVG 100% Vectorial**: Diseño limpio y profesional estilo Material Symbols / Feather Icons sin emojis desaliñados.
* **Arquitectura Dual (Online / Offline)**: Respaldo modular en `js/datos-ejido.js` con carga instantánea y sincronización asíncrona vía API PHP/PDO con MySQL.

---

## Categorías Disponibles

1. **Abarrotes y Minisúper**
2. **Restaurantes y Comida**
3. **Carnicerías y Mercados**
4. **Ferreterías y Construcción**
5. **Papelerías y Trámites**
6. **Talleres y Servicios**
7. **Salud y Farmacia**
8. **Educación y Servicios Cívicos**

---

## Estructura del Proyecto

```
MapaComunitario/
├── api/
│   ├── conexion.php       # Conexión limpia a MySQL mediante PDO (utf8mb4)
│   ├── get_puntos.php     # Endpoint JSON de comercios y servicios
│   └── seed_puntos.php    # Script de sembrado inicial de datos
├── css/
│   └── estilos.css        # Estilos modernos, responsive y bottom sheet
├── js/
│   ├── datos-ejido.js     # Datos locales maestros y catálogo SVG
│   └── mapa.js            # Lógica cartográfica, deep linking y UI
├── database.sql           # Script SQL para importar en phpMyAdmin / MySQL
├── index.html             # Estructura principal de la interfaz
└── README.md
```

---

## Instalación y Puesta en Marcha

### Con XAMPP:
1. Clona o copia la carpeta `MapaComunitario` dentro de `C:\xampp\htdocs\`.
2. Inicia los servicios de **Apache** y **MySQL** desde el Panel de Control de XAMPP.
3. Abre **phpMyAdmin** (`http://localhost/phpmyadmin/`) y crea una base de datos llamada `mapa_ejido`.
4. Importa el archivo `database.sql` o ejecuta en tu navegador el sembrador:
   ```
   http://localhost/MapaComunitario/api/seed_puntos.php
   ```
5. Abre la aplicación en tu navegador:
   ```
   http://localhost/MapaComunitario/
   ```

---

## Tecnologías Utilizadas
* **HTML5 / CSS3** (Flexbox, CSS Grid, Variables CSS, Bottom Sheet)
* **JavaScript Moderno** (ES6+, Leaflet API, History API)
* **PHP 8+** (PDO, Prepared Statements, JSON UTF-8)
* **MySQL / MariaDB** (InnoDB, utf8mb4_unicode_ci)
* **Leaflet JS** & **OpenStreetMap / Esri World Imagery**
