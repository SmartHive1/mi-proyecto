export const colmenares = [
  { id: 1, nombre: "Colmenar Norte", ubicacion: "Sector Norte - Campo A", cantidadColmenas: 8 },
  { id: 2, nombre: "Colmenar Sur", ubicacion: "Sector Sur - Campo B", cantidadColmenas: 6 },
  { id: 3, nombre: "Colmenar Vivero", ubicacion: "Vivero Principal", cantidadColmenas: 10 },
  { id: 4, nombre: "Colmenar Pradera", ubicacion: "Pradera Este", cantidadColmenas: 5 },
];

export const colmenas = [
  { id: 1, numero: "C-01", colmenarId: 1, peso: 38.4, nivelAlimento: 72 },
  { id: 2, numero: "C-02", colmenarId: 1, peso: 41.2, nivelAlimento: 45 },
  { id: 3, numero: "C-03", colmenarId: 1, peso: 29.8, nivelAlimento: 88 },
  { id: 4, numero: "C-04", colmenarId: 2, peso: 52.1, nivelAlimento: 30 },
  { id: 5, numero: "C-05", colmenarId: 2, peso: 44.7, nivelAlimento: 61 },
  { id: 6, numero: "C-06", colmenarId: 3, peso: 36.5, nivelAlimento: 78 },
  { id: 7, numero: "C-07", colmenarId: 3, peso: 39.1, nivelAlimento: 22 },
  { id: 8, numero: "C-08", colmenarId: 4, peso: 47.3, nivelAlimento: 55 },
];

export const cosechasData = [
  { mes: "Enero", colmenar: "Colmenar Norte", kg: 42, variacion: 8 },
  { mes: "Febrero", colmenar: "Colmenar Norte", kg: 38, variacion: -4 },
  { mes: "Marzo", colmenar: "Colmenar Sur", kg: 55, variacion: 17 },
  { mes: "Abril", colmenar: "Colmenar Vivero", kg: 61, variacion: 6 },
  { mes: "Mayo", colmenar: "Colmenar Norte", kg: 49, variacion: -12 },
  { mes: "Junio", colmenar: "Colmenar Pradera", kg: 33, variacion: -16 },
];

export const produccionMensual = [
  { mes: "Ene", kg: 142 },
  { mes: "Feb", kg: 138 },
  { mes: "Mar", kg: 175 },
  { mes: "Abr", kg: 201 },
  { mes: "May", kg: 189 },
  { mes: "Jun", kg: 163 },
  { mes: "Jul", kg: 178 },
  { mes: "Ago", kg: 192 },
  { mes: "Sep", kg: 210 },
  { mes: "Oct", kg: 198 },
  { mes: "Nov", kg: 167 },
  { mes: "Dic", kg: 152 },
];

export const comparativoColmenares = [
  { colmenar: "Norte", kg: 420 },
  { colmenar: "Sur", kg: 360 },
  { colmenar: "Vivero", kg: 510 },
  { colmenar: "Pradera", kg: 280 },
];

export const prediccionesData = [
  { mes: "Jul", real: 178, prediccionAnterior: 170, prediccionActual: 185 },
  { mes: "Ago", real: 192, prediccionAnterior: 180, prediccionActual: 200 },
  { mes: "Sep", real: 210, prediccionAnterior: 195, prediccionActual: 218 },
  { mes: "Oct", real: 198, prediccionAnterior: 190, prediccionActual: 205 },
  { mes: "Nov", real: 167, prediccionAnterior: 175, prediccionActual: 172 },
  { mes: "Dic", real: 152, prediccionAnterior: 160, prediccionActual: 158 },
];

export const prediccionFutura = [
  { mes: "Ene", kg: 155 },
  { mes: "Feb", kg: 148 },
  { mes: "Mar", kg: 182 },
  { mes: "Abr", kg: 215 },
  { mes: "May", kg: 198 },
  { mes: "Jun", kg: 175 },
];

export const notificaciones = [
  { id: 1, tipo: "alimento" as const, colmena: "C-02 - Colmenar Norte", descripcion: "Nivel de alimento bajo (45%)", fecha: "Hoy, 10:45 AM", estado: "ALERTA" as const, leida: false },
  { id: 2, tipo: "peso" as const, colmena: "C-04 - Colmenar Sur", descripcion: "Variación de peso inusual (+3.2kg en 24hs)", fecha: "Hoy, 09:12 AM", estado: "CRÍTICO" as const, leida: false },
  { id: 3, tipo: "señal" as const, colmena: "C-07 - Colmenar Vivero", descripcion: "Sin señal del sensor hace 2 horas", fecha: "Ayer, 06:30 PM", estado: "CRÍTICO" as const, leida: false },
  { id: 4, tipo: "alimento" as const, colmena: "C-01 - Colmenar Norte", descripcion: "Nivel de alimento bajo (30%)", fecha: "Ayer, 04:15 PM", estado: "ALERTA" as const, leida: true },
];
