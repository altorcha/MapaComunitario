/**
 * ========================================================
 * Datos Oficiales y Respaldo Local - Ejido Mochis
 * Directorio Comercial y de Servicios Comunitarios
 * Archivo: js/datos-ejido.js
 * Codificación: UTF-8 sin BOM
 * ========================================================
 */

const DATOS_EJIDO_PUNTOS = [
    {
        id: 1,
        nombre: 'Centro de Salud Rural Disperso (SSA)',
        categoria: 'salud',
        subcategoria: 'Salud y Farmacia',
        latitud: 25.828500,
        longitud: -109.052800,
        descripcion: 'Unidad médica de primer nivel con atención de medicina general, programas preventivos de vacunación, control prenatal, curaciones y toma de signos vitales. Habilitado como punto de auxilio y refugio temporal oficial por Protección Civil de Ahome.',
        horario: 'Lunes a Viernes 08:00 - 15:30 (Guardia de Urgencias 24h)',
        direccion: 'Av. 16 de Septiembre y Calle Manuel Ávila Camacho s/n',
        telefono: '(668) 812-4011',
        servicios: 'Consulta médica general, Vacunación, Farmacia básica comunitaria, Curaciones y control de signos, Primeros auxilios',
        referencia: 'A dos cuadras al norte de la Plazuela Cívica Central'
    },
    {
        id: 2,
        nombre: 'Escuela Secundaria Técnica No. 13',
        categoria: 'educacion',
        subcategoria: 'Educación y Servicios Cívicos',
        latitud: 25.830200,
        longitud: -109.054200,
        descripcion: 'Principal plantel de nivel secundario en el Ejido Mochis. Cuenta con amplias aulas climatizadas, talleres tecnológicos, canchas deportivas, techumbre de usos múltiples y cisterna. Centro clave de reunión comunitaria.',
        horario: 'Lunes a Viernes 07:00 - 14:00 (Turno Matutino)',
        direccion: 'Av. Francisco I. Madero y Calle Venustiano Carranza s/n',
        telefono: '(668) 812-0540',
        servicios: 'Educación secundaria técnica, Talleres tecnológicos, Techumbre comunitaria, Canchas deportivas, Sanitarios completos',
        referencia: 'Sector poniente, acceso directo por calle pavimentada'
    },
    {
        id: 3,
        nombre: 'Escuela Primaria Gral. Ángel Flores',
        categoria: 'educacion',
        subcategoria: 'Educación y Servicios Cívicos',
        latitud: 25.827200,
        longitud: -109.054200,
        descripcion: 'Institución de educación básica primaria con amplia trayectoria en la formación de las familias ejidales. Dispone de canchas techadas, biblioteca escolar y espacio para eventos comunitarios y cívicos.',
        horario: 'Lunes a Viernes 08:00 - 13:00',
        direccion: 'Av. Guadalupe Victoria #55 entre Carranza y Madero',
        telefono: '(668) 813-1120',
        servicios: 'Educación primaria pública, Biblioteca comunitaria, Cancha cívica techada, Actividades recreativas',
        referencia: 'Frente al área verde poniente del ejido'
    },
    {
        id: 4,
        nombre: 'Papelería y Centro de Copiado San Ángel',
        categoria: 'comercio',
        subcategoria: 'Papelería y Trámites',
        latitud: 25.826800,
        longitud: -109.052800,
        descripcion: 'Centro de papelería, copiado e impresiones rápidas. Venta de material escolar y de oficina, impresiones a color y láser, enmicados, engargolados y apoyo en trámites oficiales digitales como CURP, actas de nacimiento y recibos CFE.',
        horario: 'Lunes a Sábado 08:00 - 20:00 (Domingos 09:00 - 14:00)',
        direccion: 'Av. Guadalupe Victoria #40 entre 16 de Septiembre y Carranza',
        telefono: '(668) 814-7730',
        servicios: 'Copias e impresiones láser, Útiles escolares, Trámites digitales (CURP/CFE/Actas), Enmicados y engargolados, Artículos de oficina',
        referencia: 'A media cuadra de la Escuela Primaria Gral. Ángel Flores'
    },
    {
        id: 5,
        nombre: 'Súper Ávila / Abarrotes y Carnes Frías',
        categoria: 'comercio',
        subcategoria: 'Abarrotes y Minisúper',
        latitud: 25.828000,
        longitud: -109.050500,
        descripcion: 'Tienda de autoservicio comunitaria con gran surtido de abarrotes de canasta básica, enlatados, carnes frías, quesos regionales de rancho, botanas, lácteos, hielo, pago de servicios públicos y recargas de telefonía móvil.',
        horario: 'Lunes a Domingo 07:00 - 22:00',
        direccion: 'Calle 16 de Septiembre #110 entre Victoria y Colón',
        telefono: '(668) 815-2010',
        servicios: 'Canasta básica, Carnes frías y embutidos, Quesos de rancho, Pago de servicios, Recargas electrónicas, Pago con tarjeta bancaria',
        referencia: 'Sobre la avenida principal de comercio ejidal'
    },
    {
        id: 6,
        nombre: 'Abarrotes y Carnicería La Esquina',
        categoria: 'comercio',
        subcategoria: 'Carnicerías y Mercados',
        latitud: 25.826000,
        longitud: -109.050800,
        descripcion: 'Carnicería tradicional con carnes de res y puerco de primera calidad seleccionadas diariamente, carne molida al instante, cortes para asar, menudo fresco en fines de semana y surtido completo de abarrotes para la mesa familiar.',
        horario: 'Lunes a Sábado 07:00 - 20:00 (Domingos 07:00 - 14:00)',
        direccion: 'Av. Alfonso G. Calderón y Calle Venustiano Carranza #85',
        telefono: '(668) 813-4420',
        servicios: 'Cortes frescos de res y puerco, Menudo preparado en fin de semana, Chicharrón prensado, Verduras del día, Abarrotes generales',
        referencia: 'En la esquina de Av. Calderón frente al paradero de transporte'
    },
    {
        id: 7,
        nombre: 'Ferretería y Materiales del Ejido',
        categoria: 'comercio',
        subcategoria: 'Ferreterías y Construcción',
        latitud: 25.824800,
        longitud: -109.052500,
        descripcion: 'Comercio especializado en ferretería general, cemento, varilla, arena, grava, tubería de PVC hidráulico y sanitario, conexiones de gas, conductores eléctricos, bombas de agua sumergibles y servicio de fletes a domicilio en el ejido.',
        horario: 'Lunes a Sábado 07:30 - 18:30',
        direccion: 'Av. Manuel Ávila Camacho #12 entre Carranza y 16 de Septiembre',
        telefono: '(668) 818-3310',
        servicios: 'Materiales para construcción, Plomería y grifería, Electricidad residencial, Herramienta manual y eléctrica, Entrega a domicilio',
        referencia: 'A 100 metros del entronque de salida hacia Los Mochis'
    },
    {
        id: 8,
        nombre: 'Cenaduría Doña Tere',
        categoria: 'comercio',
        subcategoria: 'Restaurantes y Comida',
        latitud: 25.826500,
        longitud: -109.048800,
        descripcion: 'Cenaduría de tradición y ambiente 100% familiar. Tostadas sinaloenses de pierna y pollo horneadas, pozole tradicional en plato hondo, enchiladas de suelo, chimichangas doradas, tacos y aguas frescas naturales de horchata y cebada.',
        horario: 'Martes a Domingo 18:00 - 23:30',
        direccion: 'Av. Cristóbal Colón #35 entre Zaragoza y 25 de Mayo',
        telefono: '(668) 819-0520',
        servicios: 'Cenas típicas sinaloenses, Pozole tradicional, Tostadas doradas, Chimichangas y tacos, Comedor familiar, Servicio para llevar',
        referencia: 'Frente al área arbolada de la Av. Cristóbal Colón'
    },
    {
        id: 9,
        nombre: 'Taller Mecánico y Refaccionaria El Güero',
        categoria: 'comercio',
        subcategoria: 'Talleres y Servicios',
        latitud: 25.828200,
        longitud: -109.048200,
        descripcion: 'Taller mecánico automotriz con diagnóstico computarizado por escáner, afinaciones mayores y menores, servicio integral de frenos, suspensión, cambio de aceite y filtros, venta de refacciones de rotación rápida y auxilio vial.',
        horario: 'Lunes a Sábado 08:00 - 18:30',
        direccion: 'Av. 20 de Noviembre #145 entre Madero y Zaragoza',
        telefono: '(668) 812-9901',
        servicios: 'Mecánica general automotriz, Diagnóstico por escáner, Afinaciones y frenos, Suspensión y amortiguadores, Auxilio vial local',
        referencia: 'Sector oriente, a espaldas del parque deportivo ejidal'
    },
    {
        id: 10,
        nombre: 'Farmacia Comunitaria Ejidal con Consultorio',
        categoria: 'salud',
        subcategoria: 'Salud y Farmacia',
        latitud: 25.827600,
        longitud: -109.051900,
        descripcion: 'Dispensario farmacéutico con amplio catálogo de medicamentos de patente y genéricos a precios accesibles. Cuenta con médico general en consultorio adjunto para toma de signos vitales, aplicación de inyecciones y atención de salud familiar.',
        horario: 'Lunes a Domingo 07:00 - 23:00',
        direccion: 'Calle 16 de Septiembre #44 entre Victoria y Madero',
        telefono: '(668) 816-3022',
        servicios: 'Medicamentos de patente y genéricos, Médico general en consultorio, Toma de presión y glucosa, Aplicación de inyecciones y sueros, Curaciones menores',
        referencia: 'Zona centro del ejido, frente al portal comercial'
    },
    {
        id: 11,
        nombre: 'Taquería y Tortería El Paisa',
        categoria: 'comercio',
        subcategoria: 'Restaurantes y Comida',
        latitud: 25.825600,
        longitud: -109.049800,
        descripcion: 'Taquería nocturna con especialidad en tacos de asada de res al carbón, carne adobada al trompo, quesadillas con queso menonita fundido, vampiros crujientes y tortas calientes con aguacate fresco y cebollita asada.',
        horario: 'Lunes a Domingo 17:00 - 01:00',
        direccion: 'Calle Emiliano Zapata #22 entre Colón y Calderón',
        telefono: '(668) 817-6644',
        servicios: 'Tacos al carbón de asada y adobada, Vampiros y quesadillas, Tortas gigantes, Salsas tatemadas caseras, Servicio para cenar y para llevar',
        referencia: 'Cerca del entronque con la salida a campos agrícolas sur'
    },
    {
        id: 12,
        nombre: 'Tortillería y Molino La Guadalupana',
        categoria: 'comercio',
        subcategoria: 'Abarrotes y Minisúper',
        latitud: 25.826200,
        longitud: -109.052000,
        descripcion: 'Elaboración y venta diaria de tortillas de maíz 100% nixtamalizado calientes, masa fresca para tamales y gorditas, totopos fritos en bolsa, salsas caseras y chicharrón crujiente de puerco.',
        horario: 'Lunes a Domingo 06:00 - 15:00',
        direccion: 'Av. Guadalupe Victoria #18 entre 16 de Septiembre y Carranza',
        telefono: '(668) 813-9080',
        servicios: 'Tortillas de maíz nixtamalizado calientes, Masa fresca para tamales y gorditas, Totopos artesanales fritos, Salsas caseras rojas y verdes',
        referencia: 'A escasos pasos del consultorio médico ejidal'
    },
    {
        id: 13,
        nombre: 'Vulcanizadora y Llantera Ejido Mochis',
        categoria: 'comercio',
        subcategoria: 'Talleres y Servicios',
        latitud: 25.829000,
        longitud: -109.047500,
        descripcion: 'Servicio rápido de parchado de llantas para automóviles, motocicletas, camionetas de carga y maquinaria agrícola. Venta de cámaras, válvulas de aire, neumáticos usados y nuevos, calibración y auxilio de emergencia.',
        horario: 'Lunes a Sábado 07:30 - 21:00 (Guardia de Auxilio Nocturno)',
        direccion: 'Av. 20 de Noviembre y Carretera Principal s/n',
        telefono: '(668) 811-5520',
        servicios: 'Parche de neumáticos en frío y vulcanizado, Venta de llantas nuevas y de media vida, Calibración de aire digital, Auxilio vial para vehículos varados',
        referencia: 'En la curva de incorporación al acceso carretero del ejido'
    },
    {
        id: 14,
        nombre: 'Panadería y Pastelería Los Abuelos',
        categoria: 'comercio',
        subcategoria: 'Restaurantes y Comida',
        latitud: 25.827000,
        longitud: -109.053500,
        descripcion: 'Panadería artesanal con más de 30 años de tradición ejidal. Horneado diario de conchas, empanadas de calabaza y cajeta, coricos sinaloenses de maíz, birote salado crujiente para tortas y pasteles sobre pedido para festejos familiares.',
        horario: 'Lunes a Sábado 06:00 - 21:00 (Domingos 06:30 - 13:00)',
        direccion: 'Av. Francisco I. Madero #80 entre Carranza y 16 de Septiembre',
        telefono: '(668) 814-2200',
        servicios: 'Pan dulce tradicional horneado diario, Bolillo y birote crujiente, Coricos sinaloenses, Pasteles sobre diseño y pedido',
        referencia: 'A media cuadra de la Escuela Primaria Ejidal'
    },
    {
        id: 15,
        nombre: 'Jardín de Niños Ejido Mochis',
        categoria: 'educacion',
        subcategoria: 'Educación y Servicios Cívicos',
        latitud: 25.829500,
        longitud: -109.053600,
        descripcion: 'Plantel público de educación preescolar infantil. Cuenta con salones climatizados, sanitarios adaptados para niños pequeños, patio cívico sombreado y área de juegos infantiles completamente bardeada y segura.',
        horario: 'Lunes a Viernes 08:30 - 12:30',
        direccion: 'Calle Venustiano Carranza #70 entre Madero y Victoria',
        telefono: '(668) 812-7890',
        servicios: 'Educación preescolar oficial, Salones climatizados, Área recreativa infantil segura, Formación cívica temprana',
        referencia: 'A 150 metros al sur de la Secundaria Técnica No. 13'
    },
    {
        id: 16,
        nombre: 'Comisariado Ejidal y Casa Ejidal',
        categoria: 'educacion',
        subcategoria: 'Educación y Servicios Cívicos',
        latitud: 25.827800,
        longitud: -109.051500,
        descripcion: 'Sede del gobierno y representación ejidal de la comunidad. Espacio para asambleas de ejidatarios y avecindados, asesoría sobre certificados agrarios y solares, trámites comunitarios y salón cívico para eventos culturales.',
        horario: 'Lunes a Viernes 08:30 - 15:00',
        direccion: 'Calle 16 de Septiembre entre Victoria y Madero s/n',
        telefono: '(668) 813-0050',
        servicios: 'Gestión y trámites ejidales, Asesoría agraria y títulos solares, Asambleas comunitarias, Salón cívico de usos múltiples',
        referencia: 'A un costado de la Plazuela Cívica Principal'
    },
    {
        id: 17,
        nombre: 'Carnicería y Pollería Don Chema',
        categoria: 'comercio',
        subcategoria: 'Carnicerías y Mercados',
        latitud: 25.828200,
        longitud: -109.049500,
        descripcion: 'Carnes frescas e higiénicas con corte diario. Venta de pollo fresco entero y en piezas por kilo, pechuga deshuesada, milanesas empanizadas listas para cocinar, carne para cocido sinaloense y cortes seleccionados para asar.',
        horario: 'Lunes a Sábado 07:00 - 18:00 (Domingos 07:00 - 13:00)',
        direccion: 'Calle Ignacio Zaragoza #30 entre Madero y Colón',
        telefono: '(668) 814-1199',
        servicios: 'Pollo fresco de granja, Carne de res y puerco para asar y cocido, Milanesas empanizadas, Aserrado y molido al instante',
        referencia: 'Frente al punto de distribución comunitaria'
    },
    {
        id: 18,
        nombre: 'Pescadería y Mariscos Bahía Mochis',
        categoria: 'comercio',
        subcategoria: 'Carnicerías y Mercados',
        latitud: 25.826200,
        longitud: -109.049200,
        descripcion: 'Productos del mar frescos del día traídos desde las costas de Topolobampo. Camarón fresco de bahía para cocer y ceviche, filete fresco de tilapia y botete, curvina y pargo enteros para zarandear, almeja y pulpo fresco.',
        horario: 'Martes a Domingo 07:30 - 16:00',
        direccion: 'Av. Cristóbal Colón #15 entre Zapata y 25 de Mayo',
        telefono: '(668) 816-7280',
        servicios: 'Camarón de bahía fresco, Filete de pescado del día, Pescado entero para zarandear, Mariscos limpios para ceviche',
        referencia: 'A una cuadra de Cenaduría Doña Tere'
    },
    {
        id: 19,
        nombre: 'Tlapalería y Pinturas El Amigo Ejidal',
        categoria: 'comercio',
        subcategoria: 'Ferreterías y Construcción',
        latitud: 25.827300,
        longitud: -109.049800,
        descripcion: 'Comercio de proximidad con soluciones para el mantenimiento y renovación del hogar. Pinturas vinílicas y esmaltes, impermeabilizantes fibratados contra lluvias, brochas, rodillos, cerraduras, candados, tornillería y focos LED ahorradores.',
        horario: 'Lunes a Sábado 08:00 - 18:30',
        direccion: 'Calle 16 de Septiembre #180 entre Colón y Zapata',
        telefono: '(668) 815-4033',
        servicios: 'Pinturas y esmaltes de alta duración, Impermeabilizantes de techos, Cerraduras y candados de seguridad, Tornillería e iluminación LED',
        referencia: 'Crucero intermedio sobre la Calle 16 de Septiembre'
    },
    {
        id: 20,
        nombre: 'Taller de Herrería y Estructuras Metálicas',
        categoria: 'comercio',
        subcategoria: 'Talleres y Servicios',
        latitud: 25.824200,
        longitud: -109.049000,
        descripcion: 'Herrería artística, estructural y soldadura para campo y hogar. Fabricación y mantenimiento de portones corredizos, rejas de protección para casas, tejabanes de lámina para patios, reparación de remolques y aperos agrícolas.',
        horario: 'Lunes a Sábado 08:00 - 18:00',
        direccion: 'Calle 25 de Mayo final sur s/n',
        telefono: '(668) 819-8812',
        servicios: 'Portones y cancelería de herrería, Tejabanes residenciales, Reparación de implementos y remolques agrícolas, Soldadura eléctrica y microalambre',
        referencia: 'Sector sur, a 50 metros del canal de conducción agrícola'
    },
    {
        id: 21,
        nombre: 'Taller de Bicicletas y Motos La Rueda',
        categoria: 'comercio',
        subcategoria: 'Talleres y Servicios',
        latitud: 25.826600,
        longitud: -109.051500,
        descripcion: 'Mantenimiento integral para bicicletas de trabajo diario, montaña e infantiles, y afinación para motocicletas de reparto 125cc/150cc. Venta de refacciones, cámaras, llantas, rayos, cadenas, aceite para motor 4 tiempos y bujías.',
        horario: 'Lunes a Sábado 08:00 - 19:00',
        direccion: 'Av. Guadalupe Victoria #8 entre 16 de Septiembre y Carranza',
        telefono: '(668) 814-5511',
        servicios: 'Ajuste y reparación de bicicletas, Servicio y cambio de aceite a motocicletas, Venta de cámaras y llantas, Ajuste de frenos y engrasado general',
        referencia: 'A escasos metros del consultorio médico ejidal'
    },
    {
        id: 22,
        nombre: 'Ciber y Servicios Digitales Conéctate',
        categoria: 'comercio',
        subcategoria: 'Papelería y Trámites',
        latitud: 25.828600,
        longitud: -109.051000,
        descripcion: 'Centro de conectividad con computadoras con internet de fibra óptica de alta velocidad. Impresiones a color para tareas escolares, escaneo y digitalización de documentos, y asistencia guiada en citas de SAT, becas Benito Juárez e IMSS.',
        horario: 'Lunes a Sábado 09:00 - 20:30',
        direccion: 'Av. Manuel Ávila Camacho #65 entre 16 de Septiembre y Zaragoza',
        telefono: '(668) 817-9022',
        servicios: 'Internet de alta velocidad en computadoras, Impresiones láser y a color, Digitalización y escaneo, Asistencia para citas digitales y becas',
        referencia: 'Frente al área del tanque elevado de agua ejidal'
    },
    {
        id: 23,
        nombre: 'Birriería y Desayunos El Chivo Dorado',
        categoria: 'comercio',
        subcategoria: 'Restaurantes y Comida',
        latitud: 25.827700,
        longitud: -109.049000,
        descripcion: 'Auténtica birria tatemada de res y chivo estilo Sinaloa servida en plato hondo con consomé caliente bien sazonado, tortillas de comal recién hechas a mano, cebolla morada con habanero curtido y desayunos con chilaquiles.',
        horario: 'Lunes a Domingo 07:00 - 14:00',
        direccion: 'Calle Ignacio Zaragoza #72 entre Madero y Colón',
        telefono: '(668) 818-4490',
        servicios: 'Birria tradicional de chivo y res, Tortillas de maíz al comal hechas a mano, Consomé caliente al gusto, Desayunos sinaloenses, Pedidos para llevar',
        referencia: 'A media cuadra de la arboleda de la Zaragoza'
    },
    {
        id: 24,
        nombre: 'Gorditas de Comal y Antojitos La Cabaña',
        categoria: 'comercio',
        subcategoria: 'Restaurantes y Comida',
        latitud: 25.826400,
        longitud: -109.053800,
        descripcion: 'Gorditas de maíz hechas en comal de barro rellenas con guisados caseros tradicionales: deshebrada de res en salsa verde, chicharrón prensado guisado, requesón con rajas de chile poblano, sopes sinaloenses y quesadillas doradas.',
        horario: 'Lunes a Domingo 07:30 - 15:30',
        direccion: 'Av. Francisco I. Madero #105 entre Carranza y Madero Poniente',
        telefono: '(668) 813-8876',
        servicios: 'Gorditas de comal rellenas de guisados caseros, Sopes con asiento y queso fresco, Quesadillas de comal, Café de olla con canela, Guisados para llevar',
        referencia: 'Casi esquina con Calle Carranza, cerca de la primaria'
    },
    {
        id: 25,
        nombre: 'Minisúper y Cremería La Esmeralda',
        categoria: 'comercio',
        subcategoria: 'Abarrotes y Minisúper',
        latitud: 25.827000,
        longitud: -109.048200,
        descripcion: 'Cremería y minisúper con selección destacada de lácteos del norte de Sinaloa: queso oreado, queso fresco de rancho, requesón fresco, crema ácida natural por litro, chilorio norteño empaquetado, huevo fresco por cono y abarrotes generales.',
        horario: 'Lunes a Sábado 07:30 - 21:00 (Domingos 08:00 - 15:00)',
        direccion: 'Calle 25 de Mayo #40 entre Colón y Victoria',
        telefono: '(668) 815-1100',
        servicios: 'Queso fresco de rancho y oreado, Crema de campo por litro, Chilorio sinaloense artesanal, Huevo fresco por cono, Abarrotes y cobro con tarjeta',
        referencia: 'Sobre la Calle 25 de Mayo, sector comercial oriente'
    }
];

// Configuración de visualización y paleta corporativa
const CONFIG_CATEGORIAS_DIRECTORIO = {
    abarrotes: {
        id: 'abarrotes',
        nombre: 'Abarrotes y Minisúper',
        color: '#1a73e8', // Azul institucional
        fondoPastel: '#e8f0fe',
        filtro: p => {
            const sub = (p.subcategoria || '').toLowerCase();
            const nom = (p.nombre || '').toLowerCase();
            return sub.includes('abarrotes') || sub.includes('minisúper') || nom.includes('abarrotes') || nom.includes('súper') || nom.includes('tortillería') || nom.includes('cremería') || nom.includes('molino');
        }
    },
    comida: {
        id: 'comida',
        nombre: 'Restaurantes y Comida',
        color: '#d93025', // Rojo cálido / terracota
        fondoPastel: '#fce8e6',
        filtro: p => {
            const sub = (p.subcategoria || '').toLowerCase();
            const nom = (p.nombre || '').toLowerCase();
            return sub.includes('comida') || sub.includes('restaurante') || nom.includes('cenaduría') || nom.includes('taquería') || nom.includes('panadería') || nom.includes('tortería') || nom.includes('birriería') || nom.includes('gorditas') || nom.includes('antojitos');
        }
    },
    carniceria: {
        id: 'carniceria',
        nombre: 'Carnicerías y Mercados',
        color: '#c5221f', // Borgoña oscuro
        fondoPastel: '#fce8e6',
        filtro: p => {
            const sub = (p.subcategoria || '').toLowerCase();
            const nom = (p.nombre || '').toLowerCase();
            return sub.includes('carnicería') || nom.includes('carnicería') || nom.includes('carnes') || nom.includes('pescadería') || nom.includes('mariscos') || nom.includes('pollería');
        }
    },
    ferreteria: {
        id: 'ferreteria',
        nombre: 'Ferreterías y Construcción',
        color: '#b06000', // Ámbar bronce
        fondoPastel: '#fef7e0',
        filtro: p => {
            const sub = (p.subcategoria || '').toLowerCase();
            const nom = (p.nombre || '').toLowerCase();
            return sub.includes('ferretería') || sub.includes('construcción') || nom.includes('ferretería') || nom.includes('materiales') || nom.includes('tlapalería') || nom.includes('pinturas');
        }
    },
    papeleria: {
        id: 'papeleria',
        nombre: 'Papelerías y Trámites',
        color: '#7627bb', // Púrpura sobrio
        fondoPastel: '#f3e8fd',
        filtro: p => {
            const sub = (p.subcategoria || '').toLowerCase();
            const nom = (p.nombre || '').toLowerCase();
            return sub.includes('papelería') || sub.includes('trámites') || nom.includes('papelería') || nom.includes('ciber') || nom.includes('copias');
        }
    },
    taller: {
        id: 'taller',
        nombre: 'Talleres y Servicios',
        color: '#3c4043', // Grafito profesional
        fondoPastel: '#f1f3f4',
        filtro: p => {
            const sub = (p.subcategoria || '').toLowerCase();
            const nom = (p.nombre || '').toLowerCase();
            return sub.includes('taller') || sub.includes('servicios') || nom.includes('taller') || nom.includes('vulcanizadora') || nom.includes('llantera') || nom.includes('soldadura') || nom.includes('herrería') || nom.includes('bicicletas') || nom.includes('motos');
        }
    },
    salud: {
        id: 'salud',
        nombre: 'Salud y Farmacia',
        color: '#137333', // Verde bosque de salud
        fondoPastel: '#e6f4ea',
        filtro: p => {
            const cat = (p.categoria || '').toLowerCase();
            const sub = (p.subcategoria || '').toLowerCase();
            const nom = (p.nombre || '').toLowerCase();
            return cat === 'salud' || sub.includes('salud') || sub.includes('farmacia') || nom.includes('salud') || nom.includes('farmacia') || nom.includes('consultorio');
        }
    },
    educacion: {
        id: 'educacion',
        nombre: 'Educación y Servicios Cívicos',
        color: '#185abc', // Azul cobalto
        fondoPastel: '#e8f0fe',
        filtro: p => {
            const cat = (p.categoria || '').toLowerCase();
            const sub = (p.subcategoria || '').toLowerCase();
            const nom = (p.nombre || '').toLowerCase();
            return cat === 'educacion' || sub.includes('educación') || sub.includes('albergue') || nom.includes('escuela') || nom.includes('secundaria') || nom.includes('primaria') || nom.includes('jardín') || nom.includes('comisariado') || nom.includes('casa ejidal');
        }
    }
};

// Iconografía SVG monocromática profesional (Estilo Feather / Material Symbols)
const ICONOS_SVG = {
    todos: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path><line x1="7" y1="7" x2="7.01" y2="7"></line></svg>`,
    abarrotes: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>`,
    comida: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8h1a4 4 0 0 1 0 8h-1"></path><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path><line x1="6" y1="1" x2="6" y2="4"></line><line x1="10" y1="1" x2="10" y2="4"></line><line x1="14" y1="1" x2="14" y2="4"></line></svg>`,
    carniceria: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18M3 12h18M3 18h18"></path><rect x="4" y="3" width="16" height="18" rx="2"></rect></svg>`,
    ferreteria: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path></svg>`,
    papeleria: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>`,
    taller: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>`,
    salud: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"></path></svg>`,
    educacion: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"></path><path d="M6 12v5c3 3 9 3 12 0v-5"></path></svg>`,
    
    // Iconos de acciones y detalles
    ubicacion: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>`,
    telefono: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>`,
    horario: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>`,
    direcciones: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="3 11 22 2 13 21 11 13 3 11"></polygon></svg>`,
    compartir: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg>`,
    info: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>`,
    servicios: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>`,
    check: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`
};

