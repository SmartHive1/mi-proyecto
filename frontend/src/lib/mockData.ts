export const colmenares = [
  { id: 1, nombre: 'Colmenar Norte', ubicacion: 'Sector Norte - Campo A', cantidadColmenas: 8 },
  { id: 2, nombre: 'Colmenar Sur', ubicacion: 'Sector Sur - Campo B', cantidadColmenas: 6 },
  { id: 3, nombre: 'Colmenar Vivero', ubicacion: 'Vivero Principal', cantidadColmenas: 10 },
  { id: 4, nombre: 'Colmenar Pradera', ubicacion: 'Pradera Este', cantidadColmenas: 5 },
];

export const colmenas = [
  { id: 1, numero: 'C-01', colmenarId: 1, peso: 38.4, nivelAlimento: 72 },
  { id: 2, numero: 'C-02', colmenarId: 1, peso: 41.2, nivelAlimento: 45 },
  { id: 3, numero: 'C-03', colmenarId: 1, peso: 29.8, nivelAlimento: 88 },
  { id: 4, numero: 'C-04', colmenarId: 2, peso: 52.1, nivelAlimento: 30 },
  { id: 5, numero: 'C-05', colmenarId: 2, peso: 44.7, nivelAlimento: 61 },
  { id: 6, numero: 'C-06', colmenarId: 3, peso: 36.5, nivelAlimento: 55 },
  { id: 7, numero: 'C-07', colmenarId: 3, peso: 48.3, nivelAlimento: 20 },
  { id: 8, numero: 'C-08', colmenarId: 3, peso: 33.1, nivelAlimento: 78 },
  { id: 9, numero: 'C-09', colmenarId: 4, peso: 42.0, nivelAlimento: 65 },
  { id: 10, numero: 'C-10', colmenarId: 4, peso: 39.7, nivelAlimento: 40 },
];

export const cosechasData = [
  { mes: 'Enero', colmenar: 'Colmenar Norte', kg: 42, variacion: 8 },
  { mes: 'Febrero', colmenar: 'Colmenar Norte', kg: 38, variacion: -4 },
  { mes: 'Marzo', colmenar: 'Colmenar Sur', kg: 55, variacion: 17 },
  { mes: 'Abril', colmenar: 'Colmenar Vivero', kg: 61, variacion: 6 },
  { mes: 'Mayo', colmenar: 'Colmenar Norte', kg: 49, variacion: -12 },
  { mes: 'Junio', colmenar: 'Colmenar Pradera', kg: 33, variacion: -16 },
];

export const produccionMensual = [
  { mes: 'Ene', kg: 42 },
  { mes: 'Feb', kg: 38 },
  { mes: 'Mar', kg: 55 },
  { mes: 'Abr', kg: 61 },
  { mes: 'May', kg: 49 },
  { mes: 'Jun', kg: 33 },
  { mes: 'Jul', kg: 58 },
  { mes: 'Ago', kg: 52 },
  { mes: 'Sep', kg: 67 },
  { mes: 'Oct', kg: 71 },
  { mes: 'Nov', kg: 45 },
  { mes: 'Dic', kg: 39 },
];

export const comparativoData = [
  { colmenar: 'Norte', '2023': 380, '2024': 420, '2025': 460 },
  { colmenar: 'Sur', '2023': 290, '2024': 340, '2025': 370 },
  { colmenar: 'Vivero', '2023': 450, '2024': 490, '2025': 530 },
  { colmenar: 'Pradera', '2023': 210, '2024': 250, '2025': 280 },
];

export const prediccionesData = [
  { mes: 'Jul', prediccionAnterior: 52, prediccionActual: 55 },
  { mes: 'Ago', prediccionAnterior: 48, prediccionActual: 51 },
  { mes: 'Sep', prediccionAnterior: 60, prediccionActual: 63 },
  { mes: 'Oct', prediccionAnterior: 57, prediccionActual: 59 },
  { mes: 'Nov', prediccionAnterior: 44, prediccionActual: 46 },
  { mes: 'Dic', prediccionAnterior: 40, prediccionActual: 42 },
];

export const notificaciones = [
  {
    id: 1,
    tipo: 'alimento',
    colmena: 'C-02 - Colmenar Norte',
    descripcion: 'Nivel de alimento bajo (45%)',
    fecha: 'Hoy, 10:45 AM',
    estado: 'ALERTA',
    leida: false,
  },
  {
    id: 2,
    tipo: 'peso',
    colmena: 'C-04 - Colmenar Sur',
    descripcion: 'Variación de peso inusual (+3.2kg en 24hs)',
    fecha: 'Hoy, 09:12 AM',
    estado: 'CRÍTICO',
    leida: false,
  },
  {
    id: 3,
    tipo: 'señal',
    colmena: 'C-07 - Colmenar Vivero',
    descripcion: 'Sin señal del sensor hace 2 horas',
    fecha: 'Ayer, 06:30 PM',
    estado: 'CRÍTICO',
    leida: false,
  },
  {
    id: 4,
    tipo: 'alimento',
    colmena: 'C-01 - Colmenar Norte',
    descripcion: 'Nivel de alimento bajo (30%)',
    fecha: 'Ayer, 04:15 PM',
    estado: 'ALERTA',
    leida: false,
  },
];
