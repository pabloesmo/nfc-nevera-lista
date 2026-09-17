export const MEMBERS = [
  { id: 'papa',    name: 'Papá',    emoji: '👨', color: '#1a5276', bg: '#d6eaf8' },
  { id: 'mama',    name: 'Mamá',    emoji: '👩', color: '#7d3c98', bg: '#e8daef' },
  { id: 'pablo',   name: 'Pablo',   emoji: '🧑', color: '#1a7a3c', bg: '#d5f5e3' },
  { id: 'maria', name: 'María', emoji: '👧', color: '#c0392b', bg: '#fadbd8' },
]

export const SUPERMARKETS = [
  { id: 'mercadona', name: 'Mercadona', emoji: '🟡', color: '#1a5276' },
  { id: 'lidl',      name: 'Lidl',      emoji: '🔵', color: '#c0392b' },
  { id: 'carrefour', name: 'Carrefour', emoji: '🔴', color: '#1a6bbf' },
  { id: 'dia',       name: 'Dia',       emoji: '🟠', color: '#e67e22' },
  { id: 'custom',    name: 'Varios',    emoji: '🛒', color: '#7d3c98' },
]

export const NUTRI_COLORS = {
  A: '#27ae60',
  B: '#8bc34a',
  C: '#ff9800',
  D: '#f44336',
  E: '#9c27b0',
}

// Catálogo estático inicial — se ampliará con Open Food Facts en la siguiente fase
export const CATALOG = {
  mercadona: [
    { id: 'm1', name: 'Leche Entera Hacendado',    emoji: '🥛', brand: 'Hacendado', score: 8.4, nutri: 'B' },
    { id: 'm2', name: 'Pan de Molde Integral',     emoji: '🍞', brand: 'Hacendado', score: 7.9, nutri: 'B' },
    { id: 'm3', name: 'Tomates Cherry',            emoji: '🍅', brand: 'Fresco',    score: 9.1, nutri: 'A' },
    { id: 'm4', name: 'Pechuga de Pollo',          emoji: '🍗', brand: 'Mercadona', score: 8.7, nutri: 'A' },
    { id: 'm5', name: 'Aceite Oliva Virgen Extra', emoji: '🫒', brand: 'Hacendado', score: 9.0, nutri: 'A' },
    { id: 'm6', name: 'Huevos M Camperos',         emoji: '🥚', brand: 'Mercadona', score: 8.2, nutri: 'A' },
    { id: 'm7', name: 'Queso Manchego Curado',     emoji: '🧀', brand: 'El Ventero',score: 8.8, nutri: 'C' },
    { id: 'm8', name: 'Cerveza 0.0 Pack 6',        emoji: '🍺', brand: 'Amstel',    score: 7.5, nutri: 'C' },
  ],
  lidl: [
    { id: 'l1', name: 'Salmón Noruego',       emoji: '🐟', brand: 'Lidl',       score: 8.9, nutri: 'A' },
    { id: 'l2', name: 'Mantequilla Milbona',  emoji: '🧈', brand: 'Milbona',    score: 8.3, nutri: 'D' },
    { id: 'l3', name: 'Muesli Crunch',        emoji: '🥣', brand: 'Crownfield', score: 7.8, nutri: 'C' },
    { id: 'l4', name: 'Vino Rioja Joven',     emoji: '🍷', brand: 'Lidl',       score: 8.0, nutri: 'D' },
    { id: 'l5', name: 'Detergente Cápsulas',  emoji: '🧺', brand: 'W5',         score: 8.5, nutri: null },
    { id: 'l6', name: 'Sopa de Verduras',     emoji: '🍲', brand: 'Vitasia',    score: 7.2, nutri: 'B' },
  ],
  carrefour: [
    { id: 'c1', name: 'Fresas Andaluzas 500g',   emoji: '🍓', brand: 'Bio',       score: 9.2, nutri: 'A' },
    { id: 'c2', name: 'Pasta Penne Integral',    emoji: '🍝', brand: 'Carrefour', score: 7.6, nutri: 'B' },
    { id: 'c3', name: 'Zumo Naranja Exprimido',  emoji: '🍊', brand: 'Don Simón', score: 8.1, nutri: 'B' },
    { id: 'c4', name: 'Jamón Serrano Lonchas',   emoji: '🥩', brand: 'Carrefour', score: 8.4, nutri: 'C' },
    { id: 'c5', name: 'Chocolate Negro 85%',     emoji: '🍫', brand: 'Lindt',     score: 9.0, nutri: 'C' },
  ],
  dia: [
    { id: 'd1', name: 'Arroz Largo Grano',    emoji: '🍚', brand: 'Dia', score: 7.8, nutri: 'B' },
    { id: 'd2', name: 'Garbanzos Cocidos',    emoji: '🫘', brand: 'Dia', score: 8.0, nutri: 'A' },
    { id: 'd3', name: 'Papel Higiénico x12', emoji: '🧻', brand: 'Dia', score: 7.2, nutri: null },
    { id: 'd4', name: 'Lentejas Pardinas',    emoji: '🥗', brand: 'Dia', score: 8.3, nutri: 'A' },
  ],
}
