// GET /api/horarios → horarios y reseñas del Perfil de Empresa en Google (Places API New).
// La clave va en la variable de entorno GOOGLE_PLACES_KEY de Vercel (nunca en el código).
// Vercel guarda la respuesta 6 h en su CDN: unas 4 consultas a Google por día, sin importar las visitas.
const PLACE_ID = 'ChIJjxgpDG9TtpUR6t3GSvXgrQA';
const CAMPOS = 'regularOpeningHours,currentOpeningHours,rating,userRatingCount';

// [{ open: { day, hour, minute }, close: {...} }] → { 0: [[8.5, 13], ...], ..., 6: [...] } (0 = domingo)
function aTurnos(periodos = []) {
  const dias = { 0: [], 1: [], 2: [], 3: [], 4: [], 5: [], 6: [] };
  for (const { open, close } of periodos) {
    if (!open) continue;
    const desde = open.hour + (open.minute || 0) / 60;
    // Sin cierre = abierto las 24 h; si cierra otro día (pasada la medianoche), se corta a las 24
    const hasta = !close ? 24 : close.day === open.day ? close.hour + (close.minute || 0) / 60 : 24;
    dias[open.day].push([desde, hasta]);
  }
  for (const d in dias) dias[d].sort((a, b) => a[0] - b[0]);
  return dias;
}

module.exports = async (req, res) => {
  const clave = process.env.GOOGLE_PLACES_KEY;
  if (!clave) return res.status(503).json({ error: 'Falta configurar GOOGLE_PLACES_KEY en Vercel' });
  try {
    const r = await fetch(`https://places.googleapis.com/v1/places/${PLACE_ID}?languageCode=es`, {
      headers: { 'X-Goog-Api-Key': clave, 'X-Goog-FieldMask': CAMPOS },
    });
    if (!r.ok) throw new Error(`Google respondió ${r.status}`);
    const lugar = await r.json();
    const regular = lugar.regularOpeningHours?.periods;
    if (!regular?.length) throw new Error('El perfil no tiene horarios cargados');
    res.setHeader('Cache-Control', 's-maxage=21600, stale-while-revalidate=86400');
    res.status(200).json({
      semana: aTurnos(regular),                                       // horario habitual (tabla)
      estaSemana: aTurnos(lugar.currentOpeningHours?.periods || regular), // incluye feriados cargados en Google
      rating: lugar.rating ?? null,
      resenas: lugar.userRatingCount ?? null,
    });
  } catch (e) {
    res.setHeader('Cache-Control', 's-maxage=300');  // reintenta en 5 min
    res.status(502).json({ error: String(e.message || e) });
  }
};
