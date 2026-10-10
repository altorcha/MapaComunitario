/**
 * ========================================================
 * Plataforma Cartográfica y Gestión de Riesgos - Ejido Mochis
 * Archivo: js/mapa.js
 * ========================================================
 */

// 1. Coordenadas centrales de referencia para el Ejido Mochis, Sinaloa
const CENTRO_EJIDO = [25.8200, -109.0400];
const ZOOM_INICIAL = 15;

// 2. Inicialización del Mapa con Leaflet
const mapa = L.map('map', {
    center: CENTRO_EJIDO,
    zoom: ZOOM_INICIAL,
    zoomControl: false // Lo recolocaremos para mejor estética en la esquina superior derecha
});

// Control de zoom en posición superior derecha
L.control.zoom({ position: 'topright' }).addTo(mapa);

// 3. Capa Base de Mapa (OpenStreetMap en alta resolución)
const capaOSM = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | Ejido Mochis SIG'
}).addTo(mapa);

// Capa Satelital Alternativa (Esri World Imagery)
const capaSatelite = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    maxZoom: 19,
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
});

// Grupos de capas para organización y filtro dinámico
const grupoPuntos = L.layerGroup().addTo(mapa);
const grupoZonas = L.layerGroup().addTo(mapa);

// Control de capas para alternar mapas y capas
const mapasBase = {
    "Mapa Callejero": capaOSM,
    "Vista Satelital": capaSatelite
};
const capasSuperpuestas = {
    "Puntos de Interés": grupoPuntos,
    "Zonas de Riesgo": grupoZonas
};
L.control.layers(mapasBase, capasSuperpuestas, { position: 'topright', collapsed: true }).addTo(mapa);

// 4. Generador de Iconos Personalizados según Categoría
function obtenerIconoCategoria(categoria) {
    const cat = (categoria || '').toLowerCase();
    let colorFondo = '#2563eb'; // Azul estándar
    let iconoHtml = '📌';

    if (cat === 'educacion') {
        colorFondo = '#3b82f6'; // Azul
        iconoHtml = '🎓';
    } else if (cat === 'salud') {
        colorFondo = '#10b981'; // Verde esmeralda
        iconoHtml = '🏥';
    } else if (cat === 'comercio') {
        colorFondo = '#f59e0b'; // Ámbar / naranja
        iconoHtml = '🏪';
    }

    return L.divIcon({
        className: 'custom-map-marker',
        html: `<div style="
            background-color: ${colorFondo};
            width: 36px;
            height: 36px;
            border-radius: 50% 50% 50% 0;
            transform: rotate(-45deg);
            display: flex;
            align-items: center;
            justify-content: center;
            border: 2px solid #ffffff;
            box-shadow: 0 4px 10px rgba(0,0,0,0.3);
            cursor: pointer;
        ">
            <span style="transform: rotate(45deg); font-size: 16px; user-select: none;">${iconoHtml}</span>
        </div>`,
        iconSize: [36, 36],
        iconAnchor: [18, 36],
        popupAnchor: [0, -36]
    });
}

// 5. Cargar Puntos de Interés desde la API (get_puntos.php)
function cargarPuntosInteres() {
    fetch('api/get_puntos.php')
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status} al consultar get_puntos.php`);
            }
            return response.json();
        })
        .then(resultado => {
            const puntos = Array.isArray(resultado) ? resultado : (resultado.data || []);
            renderizarPuntos(puntos);
            actualizarContador('count-puntos', puntos.length);
        })
        .catch(error => {
            console.warn('No se pudo conectar a api/get_puntos.php. Cargando datos de muestra locales.', error);
            // Fallback con datos de prueba si la base de datos aún no está configurada
            const mockPuntos = [
                { id: 1, nombre: 'Escuela Primaria Gral. Ángel Flores', categoria: 'educacion', latitud: 25.82145, longitud: -109.0412, descripcion: 'Centro educativo principal del Ejido Mochis.' },
                { id: 2, nombre: 'Centro de Salud Ejido Mochis', categoria: 'salud', latitud: 25.8192, longitud: -109.0388, descripcion: 'Atención médica comunitaria y primeros auxilios.' },
                { id: 3, nombre: 'Abarrotes y Mercado Ejidal El Trébol', categoria: 'comercio', latitud: 25.8228, longitud: -109.0375, descripcion: 'Abastecimiento de víveres y productos esenciales.' }
            ];
            renderizarPuntos(mockPuntos);
            actualizarContador('count-puntos', mockPuntos.length);
            mostrarAvisoModoLocal();
        });
}

function renderizarPuntos(listaPuntos) {
    grupoPuntos.clearLayers();

    listaPuntos.forEach(punto => {
        const marker = L.marker([punto.latitud, punto.longitud], {
            icon: obtenerIconoCategoria(punto.categoria)
        });

        // Formato elegante para popup
        const etiquetaCat = punto.categoria.charAt(0).toUpperCase() + punto.categoria.slice(1);
        const popupContent = `
            <div class="popup-card">
                <div class="popup-header">
                    <span class="badge badge-${punto.categoria}">${etiquetaCat}</span>
                </div>
                <h3 class="popup-title">${punto.nombre}</h3>
                ${punto.descripcion ? `<p class="popup-desc">${punto.descripcion}</p>` : ''}
                <div class="popup-footer">
                    <small>📍 Lat: ${punto.latitud.toFixed(4)}, Lng: ${punto.longitud.toFixed(4)}</small>
                </div>
            </div>
        `;

        marker.bindPopup(popupContent, { maxWidth: 280 });
        grupoPuntos.addLayer(marker);
    });
}

// 6. Cargar Zonas de Riesgo desde la API (get_zonas.php)
function cargarZonasRiesgo() {
    fetch('api/get_zonas.php')
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status} al consultar get_zonas.php`);
            }
            return response.json();
        })
        .then(resultado => {
            const zonas = Array.isArray(resultado) ? resultado : (resultado.data || []);
            renderizarZonas(zonas);
            actualizarContador('count-zonas', zonas.length);
        })
        .catch(error => {
            console.warn('No se pudo conectar a api/get_zonas.php. Cargando polígonos de muestra locales.', error);
            // Fallback con zonas de prueba
            const mockZonas = [
                {
                    id: 1,
                    nombre: 'Zona de Inundación Dren Ejidal',
                    nivel_riesgo: 'alto',
                    coordenadas_poligono: [[25.8175, -109.0435], [25.8188, -109.0410], [25.8169, -109.0392], [25.8155, -109.0420]],
                    descripcion: 'Área vulnerable a desbordes pluviales en temporada de lluvias intensas.'
                },
                {
                    id: 2,
                    nombre: 'Cruce Carretero de Alta Frecuencia',
                    nivel_riesgo: 'medio',
                    coordenadas_poligono: [[25.8235, -109.0360], [25.8248, -109.0345], [25.8230, -109.0332], [25.8218, -109.0348]],
                    descripcion: 'Intersección con tráfico agrícola y de carga pesada.'
                },
                {
                    id: 3,
                    nombre: 'Sector Ribera Canal Lateral',
                    nivel_riesgo: 'alto',
                    coordenadas_poligono: [[25.8245, -109.0430], [25.8260, -109.0405], [25.8248, -109.0390], [25.8232, -109.0415]],
                    descripcion: 'Margen vulnerable a erosión y reblandecimiento de talud.'
                }
            ];
            renderizarZonas(mockZonas);
            actualizarContador('count-zonas', mockZonas.length);
        });
}

function renderizarZonas(listaZonas) {
    grupoZonas.clearLayers();

    listaZonas.forEach(zona => {
        let coords = zona.coordenadas_poligono;

        // Si viene en string JSON, se parsea
        if (typeof coords === 'string') {
            try {
                coords = JSON.parse(coords);
            } catch (e) {
                console.error("Error al parsear coordenadas del polígono:", zona.nombre, e);
                return;
            }
        }

        if (!Array.isArray(coords) || coords.length === 0) return;

        const esRiesgoAlto = (zona.nivel_riesgo || '').toLowerCase() === 'alto';

        // Estilos para polígonos: rojo semitransparente para alto, ámbar para medio
        const estiloPoligono = {
            color: esRiesgoAlto ? '#dc2626' : '#d97706',
            fillColor: esRiesgoAlto ? '#ef4444' : '#f59e0b',
            fillOpacity: 0.45,
            weight: 2.5,
            dashArray: esRiesgoAlto ? null : '4, 4'
        };

        const poligono = L.polygon(coords, estiloPoligono);

        // Interactividad: resaltar al pasar el cursor
        poligono.on('mouseover', function () {
            this.setStyle({ fillOpacity: 0.7, weight: 3.5 });
        });
        poligono.on('mouseout', function () {
            this.setStyle({ fillOpacity: 0.45, weight: 2.5 });
        });

        // Popup al hacer clic
        const etiquetaNivel = esRiesgoAlto ? 'Riesgo Alto' : 'Riesgo Medio';
        const claseBadge = esRiesgoAlto ? 'badge-riesgo-alto' : 'badge-riesgo-medio';

        const popupContent = `
            <div class="popup-card">
                <div class="popup-header">
                    <span class="badge ${claseBadge}">⚠️ ${etiquetaNivel}</span>
                </div>
                <h3 class="popup-title">${zona.nombre}</h3>
                ${zona.descripcion ? `<p class="popup-desc">${zona.descripcion}</p>` : ''}
                <div class="popup-footer">
                    <small>Sector delimitado de prevención y monitoreo</small>
                </div>
            </div>
        `;

        poligono.bindPopup(popupContent, { maxWidth: 300 });
        grupoZonas.addLayer(poligono);
    });
}

// 7. Utilidades de UI
function actualizarContador(idElemento, total) {
    const el = document.getElementById(idElemento);
    if (el) el.textContent = total;
}

function mostrarAvisoModoLocal() {
    const banner = document.getElementById('local-data-banner');
    if (banner) {
        banner.style.display = 'block';
    }
}

// Botón para recentrar mapa
window.centrarMapa = function () {
    mapa.flyTo(CENTRO_EJIDO, ZOOM_INICIAL, { duration: 1.2 });
};

// 8. Inicializar carga al arrancar el DOM
document.addEventListener('DOMContentLoaded', () => {
    cargarPuntosInteres();
    cargarZonasRiesgo();
});
