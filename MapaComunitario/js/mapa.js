/**
 * ========================================================
 * Directorio Comercial y de Servicios - Ejido Mochis
 * Archivo: js/mapa.js
 * Codificación: UTF-8 sin BOM
 * ========================================================
 */

// 1. Coordenadas y Límites Geográficos de Ejido Mochis
const COORDENADAS_EJIDO = [25.8272, -109.0514];
const ZOOM_PREDETERMINADO = 16;

const LIMITES_CUADRO_EJIDO = [
    [25.8220, -109.0580], // Vértice Suroeste
    [25.8328, -109.0440]  // Vértice Noreste
];

const BOUNDS_MAXIMOS_EJIDO = [
    [25.8140, -109.0680],
    [25.8400, -109.0320]
];

// Estado en memoria
let todosLosPuntos = [];
let marcadoresPuntos = [];
let categoriaActiva = 'todos';
let modoSatelital = false;
let puntoSeleccionadoActual = null;

// Grupos de capas
let grupoPuntos = null;
let grupoUbicacion = null;

// ========================================================
// 2. Definición de Secciones Comerciales y Filtros
// ========================================================
const SECCIONES_COMERCIALES = [
    {
        id: 'abarrotes',
        nombre: 'Abarrotes y Minisúper',
        color: '#1a73e8',
        fondoPastel: '#e8f0fe',
        iconoKey: 'abarrotes',
        filtro: CONFIG_CATEGORIAS_DIRECTORIO.abarrotes.filtro
    },
    {
        id: 'comida',
        nombre: 'Restaurantes y Comida',
        color: '#d93025',
        fondoPastel: '#fce8e6',
        iconoKey: 'comida',
        filtro: CONFIG_CATEGORIAS_DIRECTORIO.comida.filtro
    },
    {
        id: 'carniceria',
        nombre: 'Carnicerías y Mercados',
        color: '#c5221f',
        fondoPastel: '#fce8e6',
        iconoKey: 'carniceria',
        filtro: CONFIG_CATEGORIAS_DIRECTORIO.carniceria.filtro
    },
    {
        id: 'ferreteria',
        nombre: 'Ferreterías y Construcción',
        color: '#b06000',
        fondoPastel: '#fef7e0',
        iconoKey: 'ferreteria',
        filtro: CONFIG_CATEGORIAS_DIRECTORIO.ferreteria.filtro
    },
    {
        id: 'papeleria',
        nombre: 'Papelerías y Trámites',
        color: '#7627bb',
        fondoPastel: '#f3e8fd',
        iconoKey: 'papeleria',
        filtro: CONFIG_CATEGORIAS_DIRECTORIO.papeleria.filtro
    },
    {
        id: 'taller',
        nombre: 'Talleres y Servicios',
        color: '#3c4043',
        fondoPastel: '#f1f3f4',
        iconoKey: 'taller',
        filtro: CONFIG_CATEGORIAS_DIRECTORIO.taller.filtro
    },
    {
        id: 'salud',
        nombre: 'Salud y Farmacia',
        color: '#137333',
        fondoPastel: '#e6f4ea',
        iconoKey: 'salud',
        filtro: CONFIG_CATEGORIAS_DIRECTORIO.salud.filtro
    },
    {
        id: 'educacion',
        nombre: 'Educación y Servicios Cívicos',
        color: '#185abc',
        fondoPastel: '#e8f0fe',
        iconoKey: 'educacion',
        filtro: CONFIG_CATEGORIAS_DIRECTORIO.educacion.filtro
    }
];

// ========================================================
// 3. Inicialización del Mapa de Leaflet
// ========================================================
const mapa = L.map('map', {
    center: COORDENADAS_EJIDO,
    zoom: ZOOM_PREDETERMINADO,
    zoomControl: false,
    attributionControl: true,
    maxBounds: BOUNDS_MAXIMOS_EJIDO,
    maxBoundsViscosity: 0.85,
    minZoom: 14,
    maxZoom: 19
});

mapa.fitBounds(LIMITES_CUADRO_EJIDO, { padding: [30, 30] });

// Capa Callejera Libre de OpenStreetMap
const capaCalles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> | Ejido Mochis'
}).addTo(mapa);

// Capa Satelital ESRI de Alta Resolución
const capaSatelital = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    maxZoom: 19,
    attribution: 'Tiles &copy; Esri, Maxar, Earthstar Geographics'
});

const capaEtiquetasSatelital = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}', {
    maxZoom: 19,
    pane: 'overlayPane'
});

const capaTransporteSatelital = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Transportation/MapServer/tile/{z}/{y}/{x}', {
    maxZoom: 19,
    pane: 'overlayPane'
});

grupoPuntos = L.layerGroup().addTo(mapa);
grupoUbicacion = L.layerGroup().addTo(mapa);

// ========================================================
// 4. Pines y Marcadores SVG Profesionales
// ========================================================
function obtenerEstiloComercio(punto) {
    const subcat = (punto.subcategoria || '').toLowerCase();
    const cat = (punto.categoria || '').toLowerCase();
    const nom = (punto.nombre || '').toLowerCase();

    if (cat === 'salud' || subcat.includes('farmacia') || subcat.includes('salud') || nom.includes('salud') || nom.includes('farmacia')) {
        return {
            color: '#137333',
            fondoPastel: '#e6f4ea',
            iconoSvg: ICONOS_SVG.salud,
            label: 'Salud y Farmacia',
            bannerGradient: 'linear-gradient(135deg, #137333 0%, #0d5224 100%)'
        };
    }
    if (cat === 'educacion' || subcat.includes('educación') || nom.includes('escuela') || nom.includes('secundaria') || nom.includes('primaria') || nom.includes('comisariado')) {
        return {
            color: '#185abc',
            fondoPastel: '#e8f0fe',
            iconoSvg: ICONOS_SVG.educacion,
            label: 'Educación y Cívico',
            bannerGradient: 'linear-gradient(135deg, #185abc 0%, #103f82 100%)'
        };
    }
    if (subcat.includes('comida') || subcat.includes('restaurante') || nom.includes('cenaduría') || nom.includes('taquería') || nom.includes('panadería') || nom.includes('birriería') || nom.includes('gorditas')) {
        return {
            color: '#d93025',
            fondoPastel: '#fce8e6',
            iconoSvg: ICONOS_SVG.comida,
            label: 'Restaurante y Comida',
            bannerGradient: 'linear-gradient(135deg, #d93025 0%, #a50e0e 100%)'
        };
    }
    if (subcat.includes('carnicería') || nom.includes('carnicería') || nom.includes('pescadería') || nom.includes('mariscos')) {
        return {
            color: '#c5221f',
            fondoPastel: '#fce8e6',
            iconoSvg: ICONOS_SVG.carniceria,
            label: 'Carnicería / Mercado',
            bannerGradient: 'linear-gradient(135deg, #c5221f 0%, #8c1614 100%)'
        };
    }
    if (subcat.includes('ferretería') || nom.includes('ferretería') || nom.includes('materiales') || nom.includes('tlapalería')) {
        return {
            color: '#b06000',
            fondoPastel: '#fef7e0',
            iconoSvg: ICONOS_SVG.ferreteria,
            label: 'Ferretería y Materiales',
            bannerGradient: 'linear-gradient(135deg, #b06000 0%, #7e4500 100%)'
        };
    }
    if (subcat.includes('papelería') || nom.includes('papelería') || nom.includes('ciber')) {
        return {
            color: '#7627bb',
            fondoPastel: '#f3e8fd',
            iconoSvg: ICONOS_SVG.papeleria,
            label: 'Papelería y Trámites',
            bannerGradient: 'linear-gradient(135deg, #7627bb 0%, #511884 100%)'
        };
    }
    if (subcat.includes('taller') || nom.includes('taller') || nom.includes('vulcanizadora') || nom.includes('herrería') || nom.includes('bicicletas')) {
        return {
            color: '#3c4043',
            fondoPastel: '#f1f3f4',
            iconoSvg: ICONOS_SVG.taller,
            label: 'Taller y Servicios',
            bannerGradient: 'linear-gradient(135deg, #3c4043 0%, #202124 100%)'
        };
    }
    return {
        color: '#1a73e8',
        fondoPastel: '#e8f0fe',
        iconoSvg: ICONOS_SVG.abarrotes,
        label: 'Abarrotes y Minisúper',
        bannerGradient: 'linear-gradient(135deg, #1a73e8 0%, #1557b0 100%)'
    };
}

function crearIconoMarcadorSvg(punto) {
    const estilo = obtenerEstiloComercio(punto);

    const svgTeardrop = `
        <svg class="gmap-pin-svg" viewBox="0 0 32 42" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16 0C7.16344 0 0 7.16344 0 16C0 26.5 14.2 40.5 15.1 41.4C15.6 41.9 16.4 41.9 16.9 41.4C17.8 40.5 32 26.5 32 16C32 7.16344 24.8366 0 16 0Z" fill="${estilo.color}"/>
            <circle cx="16" cy="16" r="11" fill="white" fill-opacity="0.28"/>
        </svg>
    `;

    return L.divIcon({
        className: 'gmap-leaflet-icon',
        html: `
            <div class="gmap-pin-wrap" id="pin-marker-${punto.id}" title="${punto.nombre}">
                ${svgTeardrop}
                <div class="gmap-pin-icon-inner">${estilo.iconoSvg}</div>
            </div>
        `,
        iconSize: [32, 42],
        iconAnchor: [16, 42],
        popupAnchor: [0, -42]
    });
}

// ========================================================
// 5. Carga de Datos y Construcción de Marcadores
// ========================================================
async function cargarPuntosDesdeServidor() {
    try {
        const respuesta = await fetch('api/get_puntos.php');
        if (!respuesta.ok) throw new Error(`HTTP ${respuesta.status}`);
        const json = await respuesta.json();

        if (json.status === 'success' && Array.isArray(json.data) && json.data.length > 0) {
            todosLosPuntos = json.data;
            crearMarcadoresPuntos();
            renderizarModuloSecciones();
            actualizarContadores();
            verificarDeepLinking();
        }
    } catch (e) {
        console.warn('Conexión remota con api/get_puntos.php offline. Usando base local íntegra:', e);
    }
}

function crearMarcadoresPuntos() {
    grupoPuntos.clearLayers();
    marcadoresPuntos = [];

    todosLosPuntos.forEach(punto => {
        const lat = parseFloat(punto.latitud);
        const lng = parseFloat(punto.longitud);
        if (isNaN(lat) || isNaN(lng)) return;

        const icono = crearIconoMarcadorSvg(punto);
        const marker = L.marker([lat, lng], { icon: icono, title: punto.nombre });
        const estilo = obtenerEstiloComercio(punto);
        const urlComoLlegar = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;

        const contenidoPopup = `
            <div class="popup-gmap-card">
                <div class="popup-gmap-header" style="background: ${estilo.bannerGradient};">
                    <span class="popup-category-badge">${estilo.label}</span>
                </div>
                <div class="popup-gmap-body">
                    <h4 class="popup-gmap-title">${punto.nombre}</h4>
                    ${punto.direccion ? `<div class="popup-gmap-schedule">${ICONOS_SVG.ubicacion} <span>${punto.direccion}</span></div>` : ''}
                    <div class="popup-gmap-schedule">
                        ${ICONOS_SVG.horario} <span>${punto.horario || 'Lunes a Domingo'}</span>
                    </div>
                    ${punto.descripcion ? `<p class="popup-gmap-desc">${punto.descripcion}</p>` : ''}
                </div>
                <div class="popup-gmap-footer">
                    <button class="btn-popup-view-more" onclick="abrirFichaDetallePorId(${punto.id})">
                        Ver ficha completa
                    </button>
                    <a href="${urlComoLlegar}" target="_blank" rel="noopener noreferrer" class="btn-popup-directions">
                        ${ICONOS_SVG.direcciones}
                        <span>Cómo llegar</span>
                    </a>
                </div>
            </div>
        `;

        marker.bindPopup(contenidoPopup, { maxWidth: 320 });
        marker._datos = punto;

        marker.on('click', () => {
            resaltarTarjetaEnDirectorio(punto.id);
            actualizarUrlConNegocio(punto.id);
        });

        marcadoresPuntos.push(marker);
        grupoPuntos.addLayer(marker);
    });
}

// ========================================================
// 6. Renderizado de Secciones Comerciales en Directorio
// ========================================================
function renderizarModuloSecciones() {
    const contenedor = document.getElementById('drawer-sections-container');
    if (!contenedor) return;

    contenedor.innerHTML = '';
    const textoFiltro = (document.getElementById('gmap-search-input')?.value || '').toLowerCase().trim();

    SECCIONES_COMERCIALES.forEach((seccion, index) => {
        if (categoriaActiva !== 'todos' && categoriaActiva !== seccion.id) {
            return;
        }

        const itemsDeSeccion = todosLosPuntos.filter(p => {
            const coincideSeccion = seccion.filtro(p);
            if (!coincideSeccion) return false;
            if (!textoFiltro) return true;
            return (p.nombre || '').toLowerCase().includes(textoFiltro) || 
                   (p.descripcion || '').toLowerCase().includes(textoFiltro) || 
                   (p.subcategoria || '').toLowerCase().includes(textoFiltro) ||
                   (p.servicios || '').toLowerCase().includes(textoFiltro) ||
                   (p.direccion || '').toLowerCase().includes(textoFiltro) ||
                   (p.referencia || '').toLowerCase().includes(textoFiltro);
        });

        if (itemsDeSeccion.length === 0 && textoFiltro) return;

        const secDiv = document.createElement('div');
        const estaAbierta = index < 3 || textoFiltro.length > 0 || categoriaActiva === seccion.id;
        secDiv.className = `commercial-section ${estaAbierta ? 'open' : ''}`;
        secDiv.id = `sec-${seccion.id}`;

        const iconoSvg = ICONOS_SVG[seccion.iconoKey] || ICONOS_SVG.todos;

        secDiv.innerHTML = `
            <div class="section-accordion-header" onclick="alternarAcordeon('${secDiv.id}')">
                <div class="section-title-wrap">
                    <div class="section-icon-box" style="background: ${seccion.fondoPastel}; color: ${seccion.color};">
                        ${iconoSvg}
                    </div>
                    <span class="section-name">${seccion.nombre}</span>
                </div>
                <div style="display: flex; align-items: center; gap: 8px;">
                    <span class="section-badge-count">${itemsDeSeccion.length}</span>
                    <span class="section-chevron">▼</span>
                </div>
            </div>
            <div class="section-cards-list" id="cards-list-${seccion.id}"></div>
        `;

        const cardsContainer = secDiv.querySelector(`#cards-list-${seccion.id}`);

        if (itemsDeSeccion.length === 0) {
            cardsContainer.innerHTML = `<p style="padding: 12px; font-size: 13px; color: #5f6368;">No hay establecimientos registrados en esta categoría.</p>`;
        } else {
            itemsDeSeccion.forEach(item => {
                cardsContainer.appendChild(crearTarjetaPunto(item));
            });
        }

        contenedor.appendChild(secDiv);
    });
}

function alternarAcordeon(secId) {
    const el = document.getElementById(secId);
    if (el) el.classList.toggle('open');
}

function limpiarTelefonoParaLlamar(tel) {
    if (!tel) return '';
    return tel.replace(/[^0-9]/g, '');
}

function crearTarjetaPunto(punto) {
    const card = document.createElement('div');
    card.className = 'place-card';
    card.id = `card-place-${punto.id}`;

    const estilo = obtenerEstiloComercio(punto);
    const urlComoLlegar = `https://www.google.com/maps/dir/?api=1&destination=${punto.latitud},${punto.longitud}`;
    const telLimpio = limpiarTelefonoParaLlamar(punto.telefono);

    const listaServicios = (punto.servicios || '').split(',').map(s => s.trim()).filter(Boolean);
    const tagsPreviewHtml = listaServicios.slice(0, 3).map(s => `<span class="place-mini-service-tag">${s}</span>`).join('');

    card.innerHTML = `
        <div class="place-card-top">
            <div class="place-card-title-wrap">
                <div class="place-card-mini-icon" style="color: ${estilo.color};">
                    ${estilo.iconoSvg}
                </div>
                <h4 class="place-card-name">${punto.nombre}</h4>
            </div>
        </div>
        <div class="place-card-tags">
            <span class="tag-subcat" style="background: ${estilo.fondoPastel}; color: ${estilo.color};">${punto.subcategoria || estilo.label}</span>
            <span class="tag-open-badge">Abierto</span>
        </div>
        <div class="place-card-address" title="${punto.direccion || 'Ejido Mochis'}">
            ${ICONOS_SVG.ubicacion}
            <span>${punto.direccion || 'Cuadro Urbano, Ejido Mochis'}</span>
        </div>
        ${punto.horario ? `
        <div class="place-card-schedule">
            ${ICONOS_SVG.horario}
            <span>${punto.horario}</span>
        </div>` : ''}
        ${tagsPreviewHtml ? `<div class="place-card-services-preview">${tagsPreviewHtml}</div>` : ''}
        ${punto.descripcion ? `<p class="place-card-desc">${punto.descripcion}</p>` : ''}
        <div class="place-card-actions">
            <button class="btn-card-action btn-enfocar" onclick="event.stopPropagation(); enfocarPuntoEnMapa(${punto.id})">
                ${ICONOS_SVG.ubicacion}
                <span>Ver en mapa</span>
            </button>
            ${telLimpio ? `
            <a href="tel:${telLimpio}" class="btn-card-action" onclick="event.stopPropagation();" title="Llamar a ${punto.nombre}">
                ${ICONOS_SVG.telefono}
                <span>Llamar</span>
            </a>` : ''}
            <a href="${urlComoLlegar}" target="_blank" rel="noopener noreferrer" class="btn-card-action" onclick="event.stopPropagation();">
                ${ICONOS_SVG.direcciones}
                <span>Cómo llegar</span>
            </a>
            <button class="btn-card-action" onclick="event.stopPropagation(); abrirFichaDetallePorId(${punto.id})">
                ${ICONOS_SVG.info}
                <span>Ficha</span>
            </button>
        </div>
    `;

    card.addEventListener('click', () => {
        enfocarPuntoEnMapa(punto.id);
        abrirFichaDetalle(punto);
    });

    return card;
}

// ========================================================
// 7. Ficha Detallada del Establecimiento y Deep Linking
// ========================================================
function abrirFichaDetallePorId(id) {
    const punto = todosLosPuntos.find(p => p.id === id);
    if (punto) {
        abrirFichaDetalle(punto);
    }
}

function abrirFichaDetalle(punto) {
    puntoSeleccionadoActual = punto;
    actualizarUrlConNegocio(punto.id);

    const sheet = document.getElementById('place-detail-sheet');
    const mainView = document.getElementById('drawer-main-view');
    if (!sheet || !mainView) return;

    const estilo = obtenerEstiloComercio(punto);

    // Actualizar Hero Banner
    const heroBanner = document.getElementById('detail-hero-icon');
    const heroSvgWrap = document.getElementById('detail-hero-svg-wrap');
    if (heroBanner) heroBanner.style.background = estilo.bannerGradient;
    if (heroSvgWrap) heroSvgWrap.innerHTML = estilo.iconoSvg;

    document.getElementById('detail-name').textContent = punto.nombre;
    document.getElementById('detail-category-row').innerHTML = `
        <span style="color: ${estilo.color}; font-weight: 600;">${estilo.label}</span> &bull; 
        <span style="color: #137333; font-weight: 500;">Abierto</span> &bull; 
        <span>Ejido Mochis</span>
    `;

    // Botones de acción principales
    const btnDirections = document.getElementById('detail-btn-directions');
    if (btnDirections) {
        btnDirections.href = `https://www.google.com/maps/dir/?api=1&destination=${punto.latitud},${punto.longitud}`;
    }

    const btnCall = document.getElementById('detail-btn-call');
    const telLimpio = limpiarTelefonoParaLlamar(punto.telefono);
    if (btnCall) {
        if (telLimpio && telLimpio.length >= 7) {
            btnCall.href = `tel:${telLimpio}`;
            btnCall.style.display = 'flex';
        } else {
            btnCall.style.display = 'none';
        }
    }

    const btnCenter = document.getElementById('detail-btn-center');
    if (btnCenter) {
        btnCenter.onclick = () => enfocarPuntoEnMapa(punto.id);
    }

    const btnShare = document.getElementById('detail-btn-share');
    if (btnShare) {
        btnShare.onclick = () => compartirNegocio(punto);
    }

    // Datos detallados
    const elAddress = document.getElementById('detail-address');
    if (elAddress) elAddress.textContent = punto.direccion || 'Cuadro Urbano, Ejido Mochis, Ahome, Sin.';

    const elRef = document.getElementById('detail-reference');
    if (elRef) elRef.textContent = punto.referencia ? punto.referencia : 'Comunidad Ejido Mochis, Ahome, Sinaloa';

    const elPhone = document.getElementById('detail-phone');
    if (elPhone) {
        if (telLimpio && telLimpio.length >= 7) {
            elPhone.innerHTML = `<a href="tel:${telLimpio}" style="color: #1a73e8; text-decoration: none; font-weight: 600;">${punto.telefono}</a> <span style="font-size: 12px; color: #137333; margin-left: 6px; font-weight: 500;">(Llamada directa)</span>`;
        } else {
            elPhone.textContent = 'Atención directa en el establecimiento ejidal';
        }
    }

    const elSchedule = document.getElementById('detail-schedule');
    if (elSchedule) elSchedule.textContent = punto.horario || 'Lunes a Domingo (Horario habitual de la comunidad)';

    // Servicios en pills
    const elServices = document.getElementById('detail-services-tags');
    if (elServices) {
        elServices.innerHTML = '';
        const tags = (punto.servicios || '').split(',').map(s => s.trim()).filter(Boolean);
        if (tags.length === 0) {
            elServices.innerHTML = '<span class="detail-tag-pill">Atención y comercio ejidal</span>';
        } else {
            tags.forEach(t => {
                const pill = document.createElement('span');
                pill.className = 'detail-tag-pill';
                pill.textContent = t;
                elServices.appendChild(pill);
            });
        }
    }

    const elDesc = document.getElementById('detail-desc');
    if (elDesc) elDesc.textContent = punto.descripcion || 'Establecimiento y servicio comunitario en el Ejido Mochis, Ahome, Sinaloa.';

    const elRole = document.getElementById('detail-commercial-role');
    if (elRole) elRole.textContent = `${punto.subcategoria || estilo.label} (${punto.categoria.toUpperCase()})`;

    const elCoords = document.getElementById('detail-location-coords');
    if (elCoords) elCoords.textContent = `${parseFloat(punto.latitud).toFixed(5)}, ${parseFloat(punto.longitud).toFixed(5)}`;

    mainView.style.display = 'none';
    sheet.classList.add('active');

    // Desplegar bottom sheet si estamos en dispositivo móvil
    if (window.innerWidth <= 768) {
        const drawer = document.getElementById('places-drawer');
        if (drawer) {
            drawer.classList.remove('collapsed');
            drawer.classList.add('expanded');
        }
    }
}

function volverADirectorio() {
    puntoSeleccionadoActual = null;
    actualizarUrlConNegocio(null);

    const sheet = document.getElementById('place-detail-sheet');
    const mainView = document.getElementById('drawer-main-view');
    if (sheet && mainView) {
        sheet.classList.remove('active');
        mainView.style.display = 'flex';
    }
}

// Deep Linking en URL (Actualizar parámetro ?negocio=ID sin recargar)
function actualizarUrlConNegocio(id) {
    const url = new URL(window.location.href);
    if (id) {
        url.searchParams.set('negocio', id);
    } else {
        url.searchParams.delete('negocio');
    }
    window.history.replaceState({ negocioId: id }, '', url.toString());
}

function verificarDeepLinking() {
    const params = new URLSearchParams(window.location.search);
    const negocioId = parseInt(params.get('negocio'), 10);
    if (negocioId && !isNaN(negocioId)) {
        setTimeout(() => {
            const punto = todosLosPuntos.find(p => p.id === negocioId);
            if (punto) {
                enfocarPuntoEnMapa(punto.id);
                abrirFichaDetalle(punto);
            }
        }, 300);
    }
}

// ========================================================
// 8. Compartir y Notificación Toast Flotante
// ========================================================
function mostrarToast(mensaje) {
    const toast = document.getElementById('toast-notification');
    const toastMsg = document.getElementById('toast-message');
    if (!toast || !toastMsg) return;

    toastMsg.textContent = mensaje;
    toast.classList.add('show');

    clearTimeout(toast._timeout);
    toast._timeout = setTimeout(() => {
        toast.classList.remove('show');
    }, 2800);
}

function compartirNegocio(punto) {
    const urlDirecta = `${window.location.origin}${window.location.pathname}?negocio=${punto.id}`;

    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(urlDirecta)
            .then(() => {
                mostrarToast(`Enlace de ${punto.nombre} copiado al portapapeles`);
            })
            .catch(() => {
                copiarFallback(urlDirecta, punto.nombre);
            });
    } else {
        copiarFallback(urlDirecta, punto.nombre);
    }
}

function copiarFallback(texto, nombre) {
    const textarea = document.createElement('textarea');
    textarea.value = texto;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    try {
        document.execCommand('copy');
        mostrarToast(`Enlace de ${nombre} copiado al portapapeles`);
    } catch (err) {
        prompt('Copia el enlace directo:', texto);
    }
    document.body.removeChild(textarea);
}

// ========================================================
// 9. Interacción Mapa y Directorio
// ========================================================
function enfocarPuntoEnMapa(id) {
    const marker = marcadoresPuntos.find(m => m._datos.id === id);
    if (!marker) return;

    const lat = parseFloat(marker._datos.latitud);
    const lng = parseFloat(marker._datos.longitud);

    mapa.flyTo([lat, lng], 17.5, {
        duration: 1.2,
        easeLinearity: 0.25
    });

    setTimeout(() => {
        marker.openPopup();
    }, 800);

    resaltarTarjetaEnDirectorio(id);
}

function resaltarTarjetaEnDirectorio(id) {
    document.querySelectorAll('.place-card').forEach(c => c.classList.remove('selected'));
    const card = document.getElementById(`card-place-${id}`);
    if (card) {
        card.classList.add('selected');
        card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
}

function actualizarContadores() {
    const totalPuntos = todosLosPuntos.length;
    const badge = document.getElementById('total-count-badge');
    if (badge) {
        badge.textContent = `${totalPuntos} Establecimientos`;
    }
}

// ========================================================
// 10. Conmutación Satelital y Controles del Mapa
// ========================================================
function alternarCapaSatelital() {
    modoSatelital = !modoSatelital;
    const label = document.getElementById('layer-switcher-text');
    const preview = document.getElementById('layer-switcher-preview');

    if (modoSatelital) {
        mapa.removeLayer(capaCalles);
        mapa.addLayer(capaSatelital);
        mapa.addLayer(capaTransporteSatelital);
        mapa.addLayer(capaEtiquetasSatelital);
        if (label) label.textContent = 'Mapa';
        if (preview) preview.src = 'https://tile.openstreetmap.org/16/12920/27532.png';
    } else {
        mapa.removeLayer(capaSatelital);
        mapa.removeLayer(capaTransporteSatelital);
        mapa.removeLayer(capaEtiquetasSatelital);
        mapa.addLayer(capaCalles);
        if (label) label.textContent = 'Satélite';
        if (preview) preview.src = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/16/27532/12920';
    }
}

function centrarEjido() {
    mapa.fitBounds(LIMITES_CUADRO_EJIDO, { padding: [30, 30], maxZoom: 17 });
}

function geolocalizarUsuario() {
    grupoUbicacion.clearLayers();

    mapa.locate({
        setView: true,
        maxZoom: 17,
        enableHighAccuracy: true,
        timeout: 10000
    });
}

mapa.on('locationfound', function(e) {
    grupoUbicacion.clearLayers();

    const circulo = L.circle(e.latlng, {
        radius: e.accuracy,
        color: '#1a73e8',
        fillColor: '#1a73e8',
        fillOpacity: 0.15,
        weight: 1.5
    });

    const marcadorGps = L.marker(e.latlng, {
        icon: L.divIcon({
            className: 'user-gps-wrap',
            html: '<div class="user-location-pulse"></div>',
            iconSize: [20, 20],
            iconAnchor: [10, 10]
        })
    });

    marcadorGps.bindPopup(`
        <div style="padding: 6px 10px; font-family: Inter, sans-serif;">
            <strong style="color: #1a73e8;">Tu ubicación actual</strong>
            <p style="font-size: 11px; color: #5f6368; margin-top: 2px;">Precisión estimada: &plusmn;${Math.round(e.accuracy)} m</p>
        </div>
    `).openPopup();

    grupoUbicacion.addLayer(circulo);
    grupoUbicacion.addLayer(marcadorGps);
});

mapa.on('locationerror', function(e) {
    mostrarToast('No se pudo acceder a tu ubicación GPS');
});

// ========================================================
// 11. Configuración de Eventos UI y Bottom Sheet
// ========================================================
function configurarEventosUI() {
    const drawer = document.getElementById('places-drawer');
    const btnToggle = document.getElementById('btn-toggle-drawer');
    const btnOpenFloat = document.getElementById('btn-floating-open-drawer');
    const btnBackDir = document.getElementById('btn-back-to-directory');
    const btnCloseDetail = document.getElementById('btn-close-detail');
    const btnReturnFooter = document.getElementById('btn-return-footer');
    const dragHandle = document.getElementById('drawer-drag-handle');

    // Botones de cierre / apertura de drawer escritorio
    if (btnToggle && drawer) {
        btnToggle.onclick = () => {
            drawer.classList.add('collapsed');
            if (btnOpenFloat) btnOpenFloat.style.display = 'inline-flex';
        };
    }

    if (btnOpenFloat && drawer) {
        btnOpenFloat.onclick = () => {
            drawer.classList.remove('collapsed');
            btnOpenFloat.style.display = 'none';
        };
    }

    // Botón de regreso de ficha detallada
    if (btnBackDir) btnBackDir.onclick = volverADirectorio;
    if (btnCloseDetail) btnCloseDetail.onclick = volverADirectorio;
    if (btnReturnFooter) btnReturnFooter.onclick = volverADirectorio;

    // Manejo de Bottom Sheet táctil / click en móvil
    if (dragHandle && drawer) {
        dragHandle.onclick = () => {
            if (drawer.classList.contains('collapsed')) {
                drawer.classList.remove('collapsed');
                drawer.classList.add('expanded');
            } else if (drawer.classList.contains('expanded')) {
                drawer.classList.remove('expanded');
                drawer.classList.add('collapsed');
            } else {
                drawer.classList.add('expanded');
            }
        };
    }

    // Chips de filtrado
    const chips = document.querySelectorAll('.category-chip');
    chips.forEach(chip => {
        chip.onclick = () => {
            chips.forEach(c => c.classList.remove('active'));
            chip.classList.add('active');
            categoriaActiva = chip.getAttribute('data-category');
            volverADirectorio();
            renderizarModuloSecciones();
            filtrarMarcadoresEnMapa();
        };
    });

    // Desplazamiento horizontal de chips
    const chipsContainer = document.getElementById('category-chips-container');
    const btnScrollLeft = document.getElementById('btn-scroll-chips-left');
    const btnScrollRight = document.getElementById('btn-scroll-chips-right');

    if (chipsContainer) {
        const actualizarEstadoFlechasChips = () => {
            if (!btnScrollLeft || !btnScrollRight) return;
            const scrollLeft = chipsContainer.scrollLeft;
            const maxScroll = chipsContainer.scrollWidth - chipsContainer.clientWidth;
            btnScrollLeft.style.display = scrollLeft > 10 ? 'flex' : 'none';
            btnScrollRight.style.display = scrollLeft < maxScroll - 10 ? 'flex' : 'none';
        };

        chipsContainer.addEventListener('scroll', actualizarEstadoFlechasChips);

        if (btnScrollLeft) {
            btnScrollLeft.onclick = () => {
                chipsContainer.scrollBy({ left: -160, behavior: 'smooth' });
                setTimeout(actualizarEstadoFlechasChips, 300);
            };
        }

        if (btnScrollRight) {
            btnScrollRight.onclick = () => {
                chipsContainer.scrollBy({ left: 160, behavior: 'smooth' });
                setTimeout(actualizarEstadoFlechasChips, 300);
            };
        }

        setTimeout(actualizarEstadoFlechasChips, 200);
        window.addEventListener('resize', actualizarEstadoFlechasChips);
    }

    // Buscador interactivo
    const searchInput = document.getElementById('gmap-search-input');
    const btnClearSearch = document.getElementById('btn-clear-search');

    if (searchInput) {
        searchInput.oninput = () => {
            volverADirectorio();
            const val = searchInput.value.trim();
            if (btnClearSearch) btnClearSearch.style.display = val.length > 0 ? 'flex' : 'none';
            renderizarModuloSecciones();
            filtrarMarcadoresEnMapa();
        };
    }

    if (btnClearSearch && searchInput) {
        btnClearSearch.onclick = () => {
            searchInput.value = '';
            btnClearSearch.style.display = 'none';
            renderizarModuloSecciones();
            filtrarMarcadoresEnMapa();
            searchInput.focus();
        };
    }

    const btnQuickDir = document.getElementById('btn-quick-directions');
    if (btnQuickDir) {
        btnQuickDir.onclick = () => {
            window.open(`https://www.google.com/maps/dir/?api=1&destination=${COORDENADAS_EJIDO[0]},${COORDENADAS_EJIDO[1]}`, '_blank');
        };
    }

    const btnToggleBasemap = document.getElementById('btn-toggle-basemap');
    if (btnToggleBasemap) btnToggleBasemap.onclick = alternarCapaSatelital;

    const btnRecenter = document.getElementById('btn-recenter-ejido');
    if (btnRecenter) btnRecenter.onclick = centrarEjido;

    const btnLocate = document.getElementById('btn-locate-user');
    if (btnLocate) btnLocate.onclick = geolocalizarUsuario;

    const btnZoomIn = document.getElementById('btn-zoom-in');
    if (btnZoomIn) btnZoomIn.onclick = () => mapa.zoomIn();

    const btnZoomOut = document.getElementById('btn-zoom-out');
    if (btnZoomOut) btnZoomOut.onclick = () => mapa.zoomOut();

    // Listener para eventos de historial del navegador (botón atrás/adelante)
    window.addEventListener('popstate', (e) => {
        if (e.state && e.state.negocioId) {
            abrirFichaDetallePorId(e.state.negocioId);
        } else {
            volverADirectorio();
        }
    });
}

function filtrarMarcadoresEnMapa() {
    const textoFiltro = (document.getElementById('gmap-search-input')?.value || '').toLowerCase().trim();

    grupoPuntos.clearLayers();

    marcadoresPuntos.forEach(marker => {
        const punto = marker._datos;

        let pasaCategoria = true;
        if (categoriaActiva !== 'todos') {
            const seccion = SECCIONES_COMERCIALES.find(s => s.id === categoriaActiva);
            if (seccion) {
                pasaCategoria = seccion.filtro(punto);
            }
        }

        let pasaTexto = true;
        if (textoFiltro) {
            pasaTexto = (punto.nombre || '').toLowerCase().includes(textoFiltro) ||
                        (punto.descripcion || '').toLowerCase().includes(textoFiltro) ||
                        (punto.subcategoria || '').toLowerCase().includes(textoFiltro) ||
                        (punto.servicios || '').toLowerCase().includes(textoFiltro) ||
                        (punto.direccion || '').toLowerCase().includes(textoFiltro) ||
                        (punto.referencia || '').toLowerCase().includes(textoFiltro);
        }

        if (pasaCategoria && pasaTexto) {
            grupoPuntos.addLayer(marker);
        }
    });
}

// ========================================================
// 12. Inicialización
// ========================================================
function inicializarApp() {
    configurarEventosUI();

    // 1. Cargar datos de respaldo locales instantáneos desde datos-ejido.js
    if (typeof DATOS_EJIDO_PUNTOS !== 'undefined' && Array.isArray(DATOS_EJIDO_PUNTOS)) {
        todosLosPuntos = DATOS_EJIDO_PUNTOS;
        crearMarcadoresPuntos();
        renderizarModuloSecciones();
        actualizarContadores();
        verificarDeepLinking();
    }

    // 2. Consulta asíncrona a la base de datos MySQL (para cambios en caliente)
    cargarPuntosDesdeServidor();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inicializarApp);
} else {
    inicializarApp();
}
