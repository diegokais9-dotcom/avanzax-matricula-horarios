// Cálculo de pensión (mock). Reglas:
//  1. monto con descuento = montoBase * (1 - descuentoPct / 100)
//  2. mora = 2 % del monto con descuento por cada mes de atraso
//  3. el resultado se redondea a 2 decimales
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else Object.assign(root, factory());
})(typeof self !== 'undefined' ? self : this, function () {
  const TASA_MORA = 0.2;

  function calcularPension(montoBase, descuentoPct = 0, mesesAtraso = 0) {
    if (typeof montoBase !== 'number' || !(montoBase > 0)) {
      throw new RangeError('El monto base debe ser mayor a 0.');
    }
    if (typeof descuentoPct !== 'number' || !(descuentoPct >= 0 && descuentoPct <= 100)) {
      throw new RangeError('El descuento debe estar entre 0 y 100.');
    }
    if (!Number.isInteger(mesesAtraso) || mesesAtraso < 0) {
      throw new RangeError('Los meses de atraso deben ser un entero mayor o igual a 0.');
    }
    const conDescuento = montoBase * (1 - descuentoPct / 100);
    const mora = conDescuento * TASA_MORA * mesesAtraso;
    return Math.round((conDescuento + mora) * 100) / 100;
  }

  return { calcularPension, TASA_MORA };
});
