/**
 * ========================================================
 * Plataforma Cartográfica y Gestión de Riesgos - Ejido Mochis
 * Módulo: Directorio de Comercios, Establecimientos y Mapa SIG
 * Archivo: js/mapa.js
 * ========================================================
 */

// 1. Coordenadas centrales de referencia para el Ejido Mochis, Sinaloa
const CENTRO_EJIDO = [25.827249624521258, -109.05141299774476];
const ZOOM_INICIAL = 15;

// 2. Inicialización del Mapa con Leaflet
const mapa = L.map('map', {
    center: CENTRO_EJIDO,
    zoom: ZOOM_INICIAL,
    zoomControl: false
});

// Control de zoom en posición superior derecha
L.control.zoom({ position: 'topright' }).addTo(mapa);

// 3. Capas Base de Mapa (Esri ArcGIS Online libres y estables)
const capaCalles = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
    maxZoom: 19,
    attribution: 'Tiles &copy; Esri &mdash; Ejido Mochis SIG'
}).addTo(mapa);

const capaSatelite = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    maxZoom: 19,
    attribution: 'Tiles &copy; Esri World Imagery &mdash; Ejido Mochis SIG'
});

const capaTopo = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', {
    maxZoom: 19,
    attribution: 'Tiles &copy; Esri Topo &mdash; Ejido Mochis SIG'
});

// Grupos de capas para Leaflet
const grupoPuntos = L.layerGroup().addTo(mapa);
const grupoZonas = L.layerGroup().addTo(mapa);

// Control de capas
const mapasBase = {
    "Mapa Callejero": capaCalles,
    "Vista Satelital": capaSatelite,
    "Mapa Topográfico": capaTopo
};
const capasSuperpuestas = {
    "Puntos y Comercios": grupoPuntos,
    "Zonas de Riesgo": grupoZonas
};
L.control.layers(mapasBase, capasSuperpuestas, { position: 'topright', collapsed: true }).addTo(mapa);

// 4. Estado Global de Establecimientos y Marcadores
let todosLosEstablecimientos = [];
let marcadoresMap = new Map();
let filtroCategoriaActual = 'todos';
let filtroTextoActual = '';

// 5. Generador de Iconos Personalizados según Categoría
function obtenerIconoCategoria(categoria) {
    const cat = (categoria || '').toLowerCase();
    let colorFondo = '#2563eb';
    let iconoHtml = '📌';

    if (cat === 'biblioteca' || cat === 'cultura') {
        colorFondo = '#7c3aed'; // Violeta vibrante
        iconoHtml = '📚';
    } else if (cat === 'educacion') {
        colorFondo = '#2563eb'; // Azul real
        iconoHtml = '🎓';
    } else if (cat === 'salud') {
        colorFondo = '#059669'; // Verde esmeralda
        iconoHtml = '🏥';
    } else if (cat === 'comercio') {
        colorFondo = '#ea580c'; // Naranja / Ámbar
        iconoHtml = '🏪';
    } else if (cat === 'servicios') {
        colorFondo = '#475569'; // Slate
        iconoHtml = '🛠️';
    }

    return L.divIcon({
        className: 'custom-map-marker',
        html: `<div style="
            background-color: ${colorFondo};
            width: 38px;
            height: 38px;
            border-radius: 50% 50% 50% 0;
            transform: rotate(-45deg);
            display: flex;
            align-items: center;
            justify-content: center;
            border: 2px solid #ffffff;
            box-shadow: 0 4px 12px rgba(0,0,0,0.32);
            cursor: pointer;
            transition: transform 0.2s ease;
        ">
            <span style="transform: rotate(45deg); font-size: 17px; user-select: none;">${iconoHtml}</span>
        </div>`,
        iconSize: [38, 38],
        iconAnchor: [19, 38],
        popupAnchor: [0, -38]
    });
}

// 6. Cargar Puntos y Comercios desde la API (con Fallback Local Completo)
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
        })
        .catch(error => {
            console.warn('Cargando catálogo comunitario local de muestra.', error);
            // Catálogo representativo con la Biblioteca Local y comercios del Ejido Mochis
            const mockPuntos = [
                {
                    id: 1,
                    nombre: 'Biblioteca Local Ejido Mochis',
                    categoria: 'biblioteca',
                    latitud: 25.827454885330553,
                    longitud: -109.04922829304805,
                    descripcion: 'Biblioteca pública comunitaria. Préstamo de libros, acervo histórico ejidal, sala de lectura y cómputo con acceso a internet.',
                    horario: 'Lunes a Viernes: 8:00 AM - 6:00 PM | Sábados: 9:00 AM - 1:00 PM',
                    direccion: 'Av. Álvaro Obregón e Hidalgo s/n, Ejido Mochis',
                    telefono: '668 812 3456'
                },
                {
                    id: 2,
                    nombre: 'Abarrotes y Minisuper El Trébol',
                    categoria: 'comercio',
                    latitud: 25.826850,
                    longitud: -109.050120,
                    descripcion: 'Abarrotes en general, frutas frescas, verduras, lácteos, carnes frías y recargas de tiempo aire.',
                    horario: 'Lunes a Domingo: 7:00 AM - 9:30 PM',
                    direccion: 'Calle Lázaro Cárdenas #45, Ejido Mochis',
                    telefono: '668 811 2233'
                },
                {
                    id: 3,
                    nombre: 'Farmacia y Consultorio Comunitario San Martín',
                    categoria: 'salud',
                    latitud: 25.826200,
                    longitud: -109.051500,
                    descripcion: 'Venta de medicamentos genéricos y de patente, consulta médica general a bajo costo y toma de signos vitales.',
                    horario: 'Lunes a Sábado: 8:00 AM - 8:30 PM | Domingos: 9:00 AM - 2:00 PM',
                    direccion: 'Av. Principal esq. con Carranza, Ejido Mochis',
                    telefono: '668 815 4488'
                },
                {
                    id: 4,
                    nombre: 'Tortillería y Molino La Espiga',
                    categoria: 'comercio',
                    latitud: 25.828100,
                    longitud: -109.048750,
                    descripcion: 'Tortillas de maíz nixtamalizado calientitas, masa para tamales, totopos y salsas caseras.',
                    horario: 'Lunes a Domingo: 6:00 AM - 3:00 PM',
                    direccion: 'Calle Niños Héroes #12, Ejido Mochis',
                    telefono: '668 816 7711'
                },
                {
                    id: 5,
                    nombre: 'Carnicería y Cremería El Novillo Alegre',
                    categoria: 'comercio',
                    latitud: 25.827920,
                    longitud: -109.052100,
                    descripcion: 'Cortes de carne fresca de res y puerco, pollo de granja, quesos regionales sinaloenses y chilorio.',
                    horario: 'Lunes a Sábado: 7:00 AM - 4:00 PM | Domingos: 7:00 AM - 1:00 PM',
                    direccion: 'Calle Emiliano Zapata #38, Ejido Mochis',
                    telefono: '668 813 9922'
                },
                {
                    id: 6,
                    nombre: 'Ferretería y Materiales San Isidro',
                    categoria: 'comercio',
                    latitud: 25.825800,
                    longitud: -109.048100,
                    descripcion: 'Herramientas, material eléctrico, plomería, tornillería y artículos para mantenimiento agrícola y del hogar.',
                    horario: 'Lunes a Viernes: 7:30 AM - 6:30 PM | Sábados: 8:00 AM - 2:00 PM',
                    direccion: 'Carretera Ejidal s/n, Ejido Mochis',
                    telefono: '668 818 3344'
                },
                {
                    id: 7,
                    nombre: 'Papelería e Internet Ciber-Mochis',
                    categoria: 'comercio',
                    latitud: 25.827100,
                    longitud: -109.048300,
                    descripcion: 'Artículos escolares y de oficina, impresiones a color, fotocopias, trámites CURP/SAT e internet de alta velocidad.',
                    horario: 'Lunes a Viernes: 7:30 AM - 8:00 PM | Sábados: 9:00 AM - 3:00 PM',
                    direccion: 'Calle Morelos #18, frente a la plazuela, Ejido Mochis',
                    telefono: '668 814 5566'
                },
                {
                    id: 8,
                    nombre: 'Taller Mecánico y Vulcanizadora Los Cuates',
                    categoria: 'servicios',
                    latitud: 25.829100,
                    longitud: -109.053200,
                    descripcion: 'Parche y cambio de llantas de autos y maquinaria agrícola, cambio de aceite y afinaciones mecánicas.',
                    horario: 'Lunes a Sábado: 8:00 AM - 7:00 PM',
                    direccion: 'Entrada Norte del Ejido Mochis',
                    telefono: '668 819 0011'
                },
                {
                    id: 9,
                    nombre: 'Escuela Primaria Gral. Ángel Flores',
                    categoria: 'educacion',
                    latitud: 25.828450,
                    longitud: -109.050500,
                    descripcion: 'Institución educativa primaria comunitaria con turno matutino y vespertino.',
                    horario: 'Lunes a Viernes: 7:30 AM - 1:00 PM y 1:30 PM - 6:00 PM',
                    direccion: 'Calle Escolar #100, Ejido Mochis',
                    telefono: '668 810 1122'
                },
                {
                    id: 10,
                    nombre: 'Centro de Salud Ejido Mochis',
                    categoria: 'salud',
                    latitud: 25.825100,
                    longitud: -109.052200,
                    descripcion: 'Centro médico de atención primaria y preventiva para las familias del ejido.',
                    horario: 'Lunes a Viernes: 8:00 AM - 3:30 PM | Urgencias 24h',
                    direccion: 'Av. de la Salud s/n, Ejido Mochis',
                    telefono: '668 817 6655'
                }
            ];
            renderizarPuntos(mockPuntos);
            mostrarAvisoModoLocal();
        });
}

// 7. Renderizar Puntos en el Mapa y Preparar Drawer
function renderizarPuntos(listaPuntos) {
    todosLosEstablecimientos = listaPuntos;
    grupoPuntos.clearLayers();
    marcadoresMap.clear();

    listaPuntos.forEach(punto => {
        const marker = L.marker([punto.latitud, punto.longitud], {
            icon: obtenerIconoCategoria(punto.categoria)
        });

        // Etiqueta legible de categoría
        const etiquetaCat = punto.categoria.charAt(0).toUpperCase() + punto.categoria.slice(1);
        const horarioTexto = punto.horario || 'Horario a consultar';
        const direccionTexto = punto.direccion || 'Ejido Mochis, Sinaloa';

        // Popup enriquecido con horarios y botón de cómo llegar
        const popupContent = `
            <div class="popup-card">
                <div class="popup-header">
                    <span class="badge badge-${punto.categoria}">${etiquetaCat}</span>
                </div>
                <h3 class="popup-title">${punto.nombre}</h3>
                
                <div class="popup-schedule-box">
                    <span class="popup-schedule-icon">🕒</span>
                    <div>
                        <div class="popup-schedule-label">Horario de Atención</div>
                        <div class="popup-schedule-val">${horarioTexto}</div>
                    </div>
                </div>

                ${punto.descripcion ? `<p class="popup-desc">${punto.descripcion}</p>` : ''}
                
                <div class="popup-info-row">
                    <span>📍</span> <span>${direccionTexto}</span>
                </div>

                ${punto.telefono ? `<div class="popup-info-row"><span>📞</span> <a href="tel:${punto.telefono}" style="color: #2563eb; text-decoration: none;">${punto.telefono}</a></div>` : ''}

                <div class="popup-coords-row">
                    🌐 Lat: ${punto.latitud.toFixed(6)}, Lng: ${punto.longitud.toFixed(6)}
                </div>

                <a href="https://www.google.com/maps/dir/?api=1&destination=${punto.latitud},${punto.longitud}" 
                   target="_blank" rel="noopener noreferrer" class="popup-directions-btn">
                   🗺️ Cómo llegar (Google Maps)
                </a>
            </div>
        `;

        marker.bindPopup(popupContent, { maxWidth: 300 });
        grupoPuntos.addLayer(marker);
        marcadoresMap.set(punto.id, marker);
    });

    // Actualizar contadores de la UI
    const total = listaPuntos.length;
    actualizarContador('count-puntos', total);
    actualizarContador('badge-total-comercios', total);
    actualizarContador('chip-count-todos', total);

    // Renderizar lista en el menú lateral
    aplicarFiltrosYRenderizar();
}

// 8. Filtrar y Renderizar Tarjetas en el Menú Lateral
function aplicarFiltrosYRenderizar() {
    const listaContenedor = document.getElementById('lista-establecimientos');
    const labelConteo = document.getElementById('label-conteo-filtrados');
    if (!listaContenedor) return;

    const texto = (filtroTextoActual || '').toLowerCase().trim();
    const catFiltro = (filtroCategoriaActual || 'todos').toLowerCase();

    const filtrados = todosLosEstablecimientos.filter(item => {
        // Filtro por categoría
        const coincideCat = (catFiltro === 'todos') || (item.categoria.toLowerCase() === catFiltro);

        // Filtro por texto libre (nombre, descripción, horarios, dirección)
        const camposTexto = `${item.nombre} ${item.descripcion || ''} ${item.horario || ''} ${item.direccion || ''} ${item.categoria}`.toLowerCase();
        const coincideTexto = !texto || camposTexto.includes(texto);

        return coincideCat && coincideTexto;
    });

    // Actualizar contador
    if (labelConteo) {
        labelConteo.textContent = `Mostrando ${filtrados.length} de ${todosLosEstablecimientos.length} establecimientos`;
    }

    // Renderizar tarjetas
    if (filtrados.length === 0) {
        listaContenedor.innerHTML = `
            <div class="empty-results-msg">
                <p style="font-size: 1.5rem; margin-bottom: 8px;">🔍</p>
                <p>No se encontraron establecimientos que coincidan con la búsqueda.</p>
                <button onclick="limpiarBusqueda()" style="margin-top: 10px; background: #e2e8f0; border: none; padding: 6px 12px; border-radius: 8px; cursor: pointer; font-size: 0.78rem;">Ver todos</button>
            </div>
        `;
        return;
    }

    listaContenedor.innerHTML = filtrados.map(item => {
        const catNombre = item.categoria.charAt(0).toUpperCase() + item.categoria.slice(1);
        const horarioTexto = item.horario || 'Horario no especificado';
        const direccionTexto = item.direccion || 'Ejido Mochis, Sinaloa';

        return `
            <div class="drawer-card cat-${item.categoria}" onclick="centrarEnEstablecimiento(${item.id})">
                <div class="drawer-card-top">
                    <span class="badge badge-${item.categoria}">${catNombre}</span>
                    <button class="btn-card-ubicar" onclick="event.stopPropagation(); centrarEnEstablecimiento(${item.id})" title="Ubicar en el mapa">
                        🎯 Ubicar
                    </button>
                </div>
                
                <h4 class="drawer-card-title">${item.nombre}</h4>
                
                ${item.descripcion ? `<p class="drawer-card-desc">${item.descripcion}</p>` : ''}
                
                <div class="drawer-card-horario">
                    <span>🕒</span>
                    <div>
                        <strong>Horario:</strong> ${horarioTexto}
                    </div>
                </div>

                <div class="drawer-card-meta">
                    <div class="drawer-card-location">
                        <span>📍</span> <span>${direccionTexto}</span>
                    </div>
                    <div style="font-size: 0.7rem; color: #94a3b8;">
                        GPS: ${item.latitud.toFixed(4)}, ${item.longitud.toFixed(4)}
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// 9. Centrar Mapa y Mostrar Popup al Clicar un Establecimiento
function centrarEnEstablecimiento(id) {
    const item = todosLosEstablecimientos.find(p => p.id === id);
    if (!item) return;

    // Volar a las coordenadas
    mapa.flyTo([item.latitud, item.longitud], 17, {
        duration: 1.2
    });

    // Abrir el popup correspondiente
    const marker = marcadoresMap.get(id);
    if (marker) {
        setTimeout(() => {
            marker.openPopup();
        }, 500);
    }

    // En pantallas pequeñas, cerrar el menú para ver el mapa
    if (window.innerWidth <= 640) {
        cerrarMenuComercios();
    }
}

// 10. Control de Interfaz del Menú Lateral (Drawer)
function alternarMenuComercios() {
    const drawer = document.getElementById('drawer-comercios');
    const backdrop = document.getElementById('drawer-backdrop');
    if (!drawer) return;

    const estaAbierto = drawer.classList.contains('open');
    if (estaAbierto) {
        cerrarMenuComercios();
    } else {
        abrirMenuComercios();
    }
}

function abrirMenuComercios() {
    const drawer = document.getElementById('drawer-comercios');
    const backdrop = document.getElementById('drawer-backdrop');
    if (drawer) drawer.classList.add('open');
    if (backdrop) backdrop.classList.add('open');
}

function cerrarMenuComercios() {
    const drawer = document.getElementById('drawer-comercios');
    const backdrop = document.getElementById('drawer-backdrop');
    if (drawer) drawer.classList.remove('open');
    if (backdrop) backdrop.classList.remove('open');
}

function filtrarPorCategoria(categoria) {
    filtroCategoriaActual = categoria;

    // Actualizar botones de chips
    const chips = document.querySelectorAll('.filter-chip');
    chips.forEach(chip => {
        if (chip.getAttribute('data-categoria') === categoria) {
            chip.classList.add('active');
        } else {
            chip.classList.remove('active');
        }
    });

    aplicarFiltrosYRenderizar();
}

function filtrarEstablecimientos() {
    const input = document.getElementById('input-busqueda');
    const btnLimpiar = document.getElementById('btn-clear-search');
    filtroTextoActual = input ? input.value : '';

    if (btnLimpiar) {
        btnLimpiar.style.display = filtroTextoActual.length > 0 ? 'block' : 'none';
    }

    aplicarFiltrosYRenderizar();
}

function limpiarBusqueda() {
    const input = document.getElementById('input-busqueda');
    const btnLimpiar = document.getElementById('btn-clear-search');
    if (input) {
        input.value = '';
        input.focus();
    }
    if (btnLimpiar) {
        btnLimpiar.style.display = 'none';
    }
    filtroTextoActual = '';
    aplicarFiltrosYRenderizar();
}

// 11. Cargar Zonas de Riesgo desde la API (get_zonas.php)
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
            console.warn('Cargando polígonos de zonas de riesgo de muestra locales.', error);
            const mockZonas = [
                {
                    id: 1,
                    nombre: 'Zona de Inundación Dren Ejidal',
                    nivel_riesgo: 'alto',
                    coordenadas_poligono: [[25.8235, -109.0535], [25.8248, -109.0510], [25.8229, -109.0492], [25.8215, -109.0520]],
                    descripcion: 'Área vulnerable a desbordes y acumulación severa de agua pluvial en temporada de lluvias intensas.'
                },
                {
                    id: 2,
                    nombre: 'Cruce Carretero de Alta Frecuencia y Tráfico Agrícola',
                    nivel_riesgo: 'medio',
                    coordenadas_poligono: [[25.8295, -109.0460], [25.8308, -109.0445], [25.8290, -109.0432], [25.8278, -109.0448]],
                    descripcion: 'Intersección con tráfico de transporte de carga y agrícola con alto riesgo de percances viales.'
                },
                {
                    id: 3,
                    nombre: 'Sector Ribera Canal Lateral - Desgajamiento',
                    nivel_riesgo: 'alto',
                    coordenadas_poligono: [[25.8305, -109.0530], [25.8320, -109.0505], [25.8308, -109.0490], [25.8292, -109.0515]],
                    descripcion: 'Margen inestable sujeta a erosión de talud y escurrimientos agrícolas continuos.'
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

        const estiloPoligono = {
            color: esRiesgoAlto ? '#dc2626' : '#d97706',
            fillColor: esRiesgoAlto ? '#ef4444' : '#f59e0b',
            fillOpacity: 0.45,
            weight: 2.5,
            dashArray: esRiesgoAlto ? null : '4, 4'
        };

        const poligono = L.polygon(coords, estiloPoligono);

        poligono.on('mouseover', function () {
            this.setStyle({ fillOpacity: 0.7, weight: 3.5 });
        });
        poligono.on('mouseout', function () {
            this.setStyle({ fillOpacity: 0.45, weight: 2.5 });
        });

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
                    <small>Sector delimitado de prevención comunitaria</small>
                </div>
            </div>
        `;

        poligono.bindPopup(popupContent, { maxWidth: 300 });
        grupoZonas.addLayer(poligono);
    });
}

// 12. Utilidades Generales
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
function centrarMapa() {
    mapa.flyTo(CENTRO_EJIDO, ZOOM_INICIAL, { duration: 1.2 });
}

// Exponer funciones globales para interacción en HTML
window.centrarMapa = centrarMapa;
window.alternarMenuComercios = alternarMenuComercios;
window.abrirMenuComercios = abrirMenuComercios;
window.cerrarMenuComercios = cerrarMenuComercios;
window.filtrarPorCategoria = filtrarPorCategoria;
window.filtrarEstablecimientos = filtrarEstablecimientos;
window.limpiarBusqueda = limpiarBusqueda;
window.centrarEnEstablecimiento = centrarEnEstablecimiento;

// 13. Inicializar al cargar el DOM
document.addEventListener('DOMContentLoaded', () => {
    cargarPuntosInteres();
    cargarZonasRiesgo();
});
