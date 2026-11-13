// Reporte de ocupación de aulas: matriculados / capacidad por aula.
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else Object.assign(root, factory());
})(typeof self !== 'undefined' ? self : this, function () {
  function ocupacionPorAula(secciones) {
    const aulas = {};
    for (const s of secciones) {
      const a = (aulas[s.aula] = aulas[s.aula] || { aula: s.aula, secciones: [], capacidad: 0, matriculados: 0 });
      a.secciones.push(s.codigo);
      a.capacidad += s.capacidad;
      a.matriculados += s.capacidad - s.cupos;
    }
    return Object.values(aulas).map((a) => ({ ...a, porcentaje: Math.round((a.matriculados / a.capacidad) * 100) }));
  }
  return { ocupacionPorAula };
});
