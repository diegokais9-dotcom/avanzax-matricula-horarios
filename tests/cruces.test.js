const test = require('node:test');
const assert = require('node:assert');
const { haySolape, motivoCruce, detectarCruces } = require('../horarios/cruces.js');

const sec = (codigo, dia, inicio, fin, aula, docente) => ({ codigo, horario: { dia, inicio, fin }, aula, docente });

test('horarios consecutivos no se solapan', () => {
  assert.strictEqual(haySolape({ dia: 'Lun', inicio: '08:00', fin: '10:00' }, { dia: 'Lun', inicio: '10:00', fin: '12:00' }), false);
});
test('horarios parcialmente superpuestos se solapan', () => {
  assert.strictEqual(haySolape({ dia: 'Lun', inicio: '08:00', fin: '10:00' }, { dia: 'Lun', inicio: '09:00', fin: '11:00' }), true);
});
test('el mismo horario en distinto día no se solapa', () => {
  assert.strictEqual(haySolape({ dia: 'Lun', inicio: '08:00', fin: '10:00' }, { dia: 'Mar', inicio: '08:00', fin: '10:00' }), false);
});
test('detecta cruce por aula', () => {
  assert.deepStrictEqual(motivoCruce(sec('A', 'Lun', '08:00', '10:00', 'A-1', 'X'), sec('B', 'Lun', '09:00', '11:00', 'A-1', 'Y')), ['aula']);
});
test('detecta cruce por docente', () => {
  assert.deepStrictEqual(motivoCruce(sec('A', 'Lun', '08:00', '10:00', 'A-1', 'X'), sec('B', 'Lun', '09:00', '11:00', 'A-2', 'X')), ['docente']);
});
test('detecta cruce por aula y docente a la vez', () => {
  assert.deepStrictEqual(motivoCruce(sec('A', 'Lun', '08:00', '10:00', 'A-1', 'X'), sec('B', 'Lun', '09:00', '11:00', 'A-1', 'X')), ['aula', 'docente']);
});
test('solape de horario con distinta aula y docente no es cruce', () => {
  assert.strictEqual(motivoCruce(sec('A', 'Lun', '08:00', '10:00', 'A-1', 'X'), sec('B', 'Lun', '09:00', '11:00', 'A-2', 'Y')), null);
});
test('detectarCruces lista solo los pares en conflicto', () => {
  const lista = [
    sec('S1', 'Lun', '08:00', '10:00', 'A-1', 'X'),
    sec('S2', 'Lun', '10:00', '12:00', 'A-1', 'X'),
    sec('S3', 'Lun', '09:00', '11:00', 'A-1', 'Z'),
  ];
  assert.deepStrictEqual(detectarCruces(lista), [
    { a: 'S1', b: 'S3', motivos: ['aula'] },
    { a: 'S2', b: 'S3', motivos: ['aula'] },
  ]);
});
test('rechaza horas con formato inválido', () => {
  assert.throws(() => haySolape({ dia: 'Lun', inicio: '8:00', fin: '10:00' }, { dia: 'Lun', inicio: '09:00', fin: '11:00' }));
});
test('rechaza inicio mayor o igual que fin', () => {
  assert.throws(() => haySolape({ dia: 'Lun', inicio: '10:00', fin: '08:00' }, { dia: 'Lun', inicio: '09:00', fin: '11:00' }));
});
