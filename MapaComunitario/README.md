# Directorio Comercial y de Servicios - Ejido Mochis

Plataforma cartográfica interactiva y directorio web comunitario diseñado para localizar rápidamente comercios, talleres, consultorios, tiendas, escuelas y servicios esenciales en el **Ejido Mochis (Ahome, Sinaloa)**.

---

## 📌 Estado Actual del Proyecto (Implementado)

* **Cartografía interactiva moderna**: Mapa basado en Leaflet con capa satelital y de calles de alta resolución (sin APIs de pago).
* **Visualización bajo demanda**: El mapa inicia limpio; el pin de ubicación aparece únicamente al seleccionar un negocio.
* **Motor de búsqueda inteligente**:
  * Insensible a acentos (`avila` encuentra `Ávila`, `mecanico` encuentra `mecánico`).
  * Indexación combinada: busca por nombre comercial, giro, servicios, calle y entrecalles (*16 de Septiembre, Ávila Camacho, Carranza, Madero*, etc.).
  * Atajo con la tecla `Enter` para enfocar de inmediato el primer resultado coincidente.
* **Ficha de detalle del comercio**: Dirección exacta, referencias barriales, llamada telefónica directa, horarios de atención, listado de productos/servicios y coordenadas geográficas.
* **Deep Linking y Compartir**: Enlace directo por negocio (`?negocio=ID`) con copia al portapapeles y notificación flotante (*Toast*) en pantalla.
* **Diseño responsivo**: Formato *Bottom Sheet* con agarrador táctil (*drag handle*) optimizado para dispositivos móviles y panel espacioso en escritorio.
* **Iconografía SVG 100% vectorial**: Sustitución total de emojis por iconos limpios monocromáticos (estilo Material Symbols / Feather Icons).
* **Arquitectura dual**: Backend con PHP 8+ (PDO/MySQL en UTF-8) y respaldo local offline en `js/datos-ejido.js`.

---

## 🚀 Sugerencias, Ideas y Próximas Implementaciones (Roadmap)

Este apartado reúne las propuestas de mejora y módulos candidatos a desarrollarse para escalar el proyecto y maximizar su utilidad para los habitantes y comerciantes del Ejido Mochis:

### 1. Conexión Comercial y Experiencia de Usuario (Inmediato)
* **Botón Directo de WhatsApp**:
  * Integrar un botón de contacto por WhatsApp en la ficha del negocio con mensaje de bienvenida predeterminado (ej: *"Hola, vi su negocio en el Directorio del Ejido Mochis y quisiera información sobre..."*).
* **Indicador en Tiempo Real de "Abierto / Cerrado"**:
  * Algoritmo que compare la hora y día actual del dispositivo del usuario con el horario del negocio para mostrar un distintivo dinámico: `Abierto ahora` (verde) o `Cerrado en este momento` (gris).
* **Fotografía de Fachada y Productos**:
  * Incorporar un campo de imagen por negocio para mostrar la fachada real del local, facilitando que personas locales o foráneas lo reconozcan visualmente al transitar por la calle.
* **Enlaces a Redes Sociales y Menú Digital**:
  * Accesos directos a perfiles de Facebook, Instagram o enlaces a menús digitales en PDF/fotos (especialmente útil para taquerías, cenadurías y restaurantes).

---

### 2. Autogestión y Participación Comunitaria
* **Formulario Público *"Registra tu Negocio"***:
  * Permitir que cualquier dueño de negocio o prestador de servicios del ejido envíe su solicitud con sus datos desde la página web.
* **Panel de Administración (CRUD Web)**:
  * Interfaz administrativa protegida con usuario y contraseña donde el administrador pueda:
    * Aprobar o rechazar solicitudes de registro.
    * Agregar nuevos comercios seleccionando directamente el punto en el mapa (*Pin-Picker* con captura automática de latitud/longitud).
    * Modificar números telefónicos, horarios o descripciones sin tocar la base de datos manualmente.
    * Dar de baja o pausar comercios inactivos.
* **Buzón de Actualizaciones / Reportes Comunitarios**:
  * Botón discreto en la ficha: *"¿La información está desactualizada?"* para que los vecinos puedan reportar si un teléfono cambió o el local se cambió de cuadra.

---

### 3. Movilidad y Aplicación Móvil (PWA)
* **Progressive Web App (Instalable en Celular)**:
  * Configuración de `manifest.json`, iconos adaptativos y *Service Worker*.
  * Los vecinos podrán presionar **"Instalar aplicación"** directamente desde Chrome/Safari en Android o iPhone, teniéndola como app nativa en su pantalla de inicio sin depender de tiendas como Google Play.
* **Modo Fuera de Línea (Offline)**:
  * Cacheo de la base de datos local para que los teléfonos y direcciones se puedan consultar aún en zonas del ejido con baja señal celular o sin datos móviles.

---

### 4. Geolocalización y Navegación Avanzada
* **Cálculo de Distancia ("A cuántos metros estoy")**:
  * Utilizar la ubicación GPS del usuario para calcular la distancia en metros o minutos caminando hacia el negocio seleccionado.
* **Ordenamiento por Proximidad**:
  * Opción para ordenar la lista de comercios mostrando primero los más cercanos a la ubicación actual del usuario.

---

### 5. Despliegue en la Nube y Lanzamiento
* **Migración de Localhost a Servidor Público**:
  * Publicación en un hosting con soporte PHP/MySQL (cPanel, Hostinger o VPS).
  * Conexión con un dominio propio (ej: `mapaejidomochis.com` o `directorioejidomochis.mx`).
* **Certificado de Seguridad SSL (HTTPS)**:
  * Indispensable para que los navegadores móviles autoricen el uso del GPS y la geolocalización sin restricciones.

---

## 🛠️ Instalación y Uso en Servidor Local (XAMPP)

1. **Ubicación de archivos**: Copia o vincula la carpeta `MapaComunitario` dentro de `C:\xampp\htdocs\`.
2. **Iniciar servicios**:
   * Mediante terminal: `C:\xampp\xampp_start.exe`
   * O abriendo el panel gráfico: `C:\xampp\xampp-control.exe` y encendiendo **Apache** y **MySQL**.
3. **Base de Datos**:
   * Entra a [http://localhost/phpmyadmin/](http://localhost/phpmyadmin/), crea la base de datos `mapa_ejido` e importa `database.sql`.
   * *Opcional:* Ejecuta el script de sembrado automático en tu navegador: `http://localhost/MapaComunitario/api/seed_puntos.php`.
4. **Acceso**:
   * Abre tu navegador en: [http://localhost/MapaComunitario/](http://localhost/MapaComunitario/).

---

## 📁 Estructura de Archivos

```text
MapaComunitario/
├── index.html         # Interfaz web principal
├── css/
│   └── estilos.css    # Diseño responsivo y Google Maps UI
├── js/
│   ├── mapa.js        # Lógica cartográfica, búsqueda y filtros
│   └── datos-ejido.js # Base de datos local y catálogo SVG
├── api/
│   ├── conexion.php   # Conexión PDO segura en UTF-8
│   ├── get_puntos.php # Endpoint API JSON
│   └── seed_puntos.php# Sembrador inicial de base de datos
├── database.sql       # Esquema y datos iniciales para MySQL
└── README.md          # Documentación y roadmap
```

---

## 💻 Tecnologías
* **Frontend**: HTML5 Semántico, CSS3 (Variables, Grid, Flexbox), JavaScript Moderno (ES6+), Leaflet Cartography.
* **Backend**: PHP 8+ con PDO y manejo estructurado de excepciones.
* **Base de Datos**: MySQL / MariaDB (`utf8mb4_unicode_ci`).
* **Mapas**: OpenStreetMap Cartography & ESRI World Imagery.
