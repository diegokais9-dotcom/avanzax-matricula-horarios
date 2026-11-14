// Modelo de Sección (compartido por matrícula y horarios).
// Campos: codigo, curso, cupos (disponibles), capacidad, estadoPago
//         ('pagado' | 'parcial' | 'pendiente'), horario {dia, inicio, fin}, aula, docente.
// Datos ficticios con fines académicos. S-104 cruza con S-101 a propósito (misma aula).
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else Object.assign(root, factory());
})(typeof self !== 'undefined' ? self : this, function () {
  const SECCIONES = [
    { codigo: 'S-101', curso: 'Álgebra', cupos: 10, capacidad: 28, estadoPago: 'pagado',
      horario: { dia: 'Lun', inicio: '08:00', fin: '10:00' }, aula: 'A-101', docente: 'Quispe' },
    { codigo: 'S-102', curso: 'Razonamiento', cupos: 4, capacidad: 25, estadoPago: 'pendiente',
      horario: { dia: 'Lun', inicio: '10:00', fin: '12:00' }, aula: 'A-102', docente: 'Mendoza' },
    { codigo: 'S-103', curso: 'Geometría', cupos: 18, capacidad: 30, estadoPago: 'pagado',
      horario: { dia: 'Mar', inicio: '08:00', fin: '10:00' }, aula: 'A-101', docente: 'Quispe' },
    { codigo: 'S-104', curso: 'Física', cupos: 9, capacidad: 20, estadoPago: 'parcial',
      horario: { dia: 'Lun', inicio: '09:00', fin: '11:00' }, aula: 'A-101', docente: 'Rojas' },
  ];
  return { SECCIONES };
});
