const test = require('node:test');
const assert = require('node:assert');
const { calcularPension } = require('../matricula/pension.js');

test('pensión sin descuento ni atraso es el monto base', () => {
  assert.strictEqual(calcularPension(450), 450);
});
test('aplica el descuento', () => {
  assert.strictEqual(calcularPension(450, 10), 405);
});
test('aplica 2 % de mora por mes de atraso', () => {
  assert.strictEqual(calcularPension(450, 0, 2), 468);
});
test('combina descuento y mora', () => {
  assert.strictEqual(calcularPension(450, 10, 1), 413.1);
});
test('descuento de 100 % da 0', () => {
  assert.strictEqual(calcularPension(450, 100), 0);
});
test('rechaza monto no positivo', () => {
  assert.throws(() => calcularPension(0), RangeError);
  assert.throws(() => calcularPension(-50), RangeError);
});
test('rechaza descuento fuera de rango', () => {
  assert.throws(() => calcularPension(450, -1), RangeError);
  assert.throws(() => calcularPension(450, 101), RangeError);
});
test('rechaza meses de atraso inválidos', () => {
  assert.throws(() => calcularPension(450, 0, -1), RangeError);
  assert.throws(() => calcularPension(450, 0, 1.5), RangeError);
});
