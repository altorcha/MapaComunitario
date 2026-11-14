# Directorio Comercial y de Servicios - Ejido Mochis

Directorio web interactivo con mapa para encontrar comercios, talleres, farmacias, tiendas y escuelas en el **Ejido Mochis (Ahome, Sinaloa)**.

---

## Características

* **Mapa interactivo**: Explora las calles del Ejido Mochis con vista estándar o satelital (sin APIs de pago).
* **Ubicaciones bajo demanda**: El mapa inicia limpio; el pin de ubicación aparece únicamente al seleccionar un negocio.
* **Búsqueda inteligente**:
  * Funciona con o sin acentos (`avila` encuentra `Ávila`, `mecanico` encuentra `mecánico`).
  * Busca por nombre, giro comercial o por calle y domicilio (*16 de Septiembre*, *Ávila Camacho*, *Carranza*, etc.).
  * Al presionar `Enter` en el buscador, enfoca de inmediato el primer resultado coincidente.
* **Ficha de detalle**: Muestra dirección, teléfono con llamada directa, horarios, servicios y botón *"Cómo llegar"*.
* **Compartir negocio**: Copia el enlace directo del lugar con notificación flotante elegante en pantalla.
* **Diseño para celular y computadora**: Panel deslizable (*bottom sheet*) cómodo y espacioso.

---

## Cómo usar el proyecto (XAMPP)

1. **Colocar en servidor**: Copia o vincula la carpeta `MapaComunitario` dentro de `C:\xampp\htdocs\`.
2. **Iniciar servicios**: Abre el Panel de Control de XAMPP e inicia **Apache** y **MySQL**.
3. **Cargar la base de datos**:
   * Entra a [http://localhost/phpmyadmin/](http://localhost/phpmyadmin/), crea una base de datos llamada `mapa_ejido` e importa el archivo `database.sql`.
   * *O bien*, visita en tu navegador: `http://localhost/MapaComunitario/api/seed_puntos.php` para crearla y poblarla en automático.
4. **Abrir el mapa**:
   * Entra en tu navegador a: [http://localhost/MapaComunitario/](http://localhost/MapaComunitario/)

---

## Estructura de archivos

```text
MapaComunitario/
├── index.html          # Interfaz principal del directorio
├── css/
│   └── estilos.css     # Estilos visuales y diseño adaptable
├── js/
│   ├── mapa.js         # Lógica de mapa, filtros y buscador
│   └── datos-ejido.js  # Datos locales maestros e iconos SVG
├── api/
│   ├── conexion.php    # Conexión limpia a MySQL mediante PDO
│   ├── get_puntos.php  # Endpoint que entrega los lugares en JSON
│   └── seed_puntos.php # Creador/sembrador de datos en MySQL
├── database.sql        # Script SQL para importar en phpMyAdmin
└── README.md
```

---

## Tecnologías
* **Frontend**: HTML5, CSS3, JavaScript (ES6+), Leaflet JS
* **Backend**: PHP 8+ (PDO con UTF-8)
* **Base de Datos**: MySQL / MariaDB
