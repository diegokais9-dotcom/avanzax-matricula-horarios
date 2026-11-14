// Validación de cruces de horario.
// Dos secciones se cruzan si sus horarios se solapan el mismo día
// Y comparten aula o docente.
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else Object.assign(root, factory());
})(typeof self !== 'undefined' ? self : this, function () {
  function aMinutos(hhmm) {
    const m = /^([01]\d|2[0-3]):([0-5]\d)$/.exec(hhmm);
    if (!m) throw new Error('Hora inválida: ' + hhmm + '. Usa el formato HH:MM.');
    return Number(m[1]) * 60 + Number(m[2]);
  }

  function haySolape(a, b) {
    if (a.dia !== b.dia) return false;
    const [ai, af, bi, bf] = [aMinutos(a.inicio), aMinutos(a.fin), aMinutos(b.inicio), aMinutos(b.fin)];
    if (ai >= af || bi >= bf) throw new Error('La hora de inicio debe ser menor que la de fin.');
    return ai < bf && bi < af;
  }

  // Devuelve ['aula'], ['docente'], ['aula','docente'] o null si no hay cruce.
  function motivoCruce(s1, s2) {
    if (!haySolape(s1.horario, s2.horario)) return null;
    const motivos = [];
    if (s1.aula === s2.aula) motivos.push('aula');
    if (s1.docente === s2.docente) motivos.push('docente');
    return motivos.length ? motivos : null;
  }

  function detectarCruces(secciones) {
    const cruces = [];
    for (let i = 0; i < secciones.length; i++) {
      for (let j = i + 1; j < secciones.length; j++) {
        const motivos = motivoCruce(secciones[i], secciones[j]);
        if (motivos) cruces.push({ a: secciones[i].codigo, b: secciones[j].codigo, motivos });
      }
    }
    return cruces;
  }

  return { aMinutos, haySolape, motivoCruce, detectarCruces };
});
