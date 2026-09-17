import { useState } from 'react'
import { SUPERMARKETS, CATALOG, NUTRI_COLORS } from '../lib/constants'
import styles from './Catalog.module.css'

function Stars({ score }) {
  if (!score) return null
  const full = Math.round(score / 2)
  return (
    <div className={styles.stars} aria-label={`Puntuación: ${score} de 10`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <span key={i} className={i <= full ? styles.starFull : styles.starEmpty}>★</span>
      ))}
      <span className={styles.score}>{score}</span>
    </div>
  )
}

function NutriBadge({ grade }) {
  if (!grade) return null
  return (
    <span
      className={styles.nutri}
      style={{ background: NUTRI_COLORS[grade] }}
      title={`Nutriscore ${grade}`}
    >
      {grade}
    </span>
  )
}

const CATALOG_SUPERS = SUPERMARKETS.filter((s) => s.id !== 'custom')

export default function Catalog({ onAdd, listItems }) {
  const [activeSuper, setActiveSuper] = useState('mercadona')
  const [search, setSearch] = useState('')

  const products = (CATALOG[activeSuper] || []).filter((p) => {
    if (!search) return true
    const q = search.toLowerCase()
    return p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q)
  })

  const inList = (id) => listItems.some((i) => i.productId === id && !i.done)

  function handleAdd(product) {
    if (inList(product.id)) return
    onAdd(product, activeSuper)
  }

  return (
    <div className={styles.wrap}>
      {/* Supermarket tabs */}
      <div className={styles.tabs} role="tablist">
        {CATALOG_SUPERS.map((s) => (
          <button
            key={s.id}
            role="tab"
            aria-selected={activeSuper === s.id}
            className={`${styles.tab} ${activeSuper === s.id ? styles.tabActive : ''}`}
            onClick={() => { setActiveSuper(s.id); setSearch('') }}
          >
            {s.emoji} {s.name}
          </button>
        ))}
      </div>

      <div className={styles.content}>
        {/* Search */}
        <div className={styles.searchWrap}>
          <i className="ti ti-search" aria-hidden="true" style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: '#aaa', fontSize: 17 }} />
          <input
            className={styles.search}
            type="search"
            placeholder={`Buscar en ${CATALOG_SUPERS.find((s) => s.id === activeSuper)?.name}...`}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Buscar productos"
          />
        </div>

        {/* Grid */}
        {products.length === 0 ? (
          <div className={styles.empty}>
            <span style={{ fontSize: 36 }}>🔍</span>
            <p>Sin resultados para «{search}»</p>
          </div>
        ) : (
          <div className={styles.grid}>
            {products.map((p) => {
              const added = inList(p.id)
              return (
                <div
                  key={p.id}
                  className={`${styles.card} ${added ? styles.cardAdded : ''}`}
                  onClick={() => handleAdd(p)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && handleAdd(p)}
                  aria-label={`${added ? 'Ya en lista: ' : 'Añadir: '}${p.name}`}
                >
                  <div className={styles.imgWrap}>
                    <span className={styles.img}>{p.emoji}</span>
                    <NutriBadge grade={p.nutri} />
                    <div className={`${styles.addBtn} ${added ? styles.addBtnDone : ''}`}>
                      <i className={`ti ti-${added ? 'check' : 'plus'}`} aria-hidden="true" />
                    </div>
                  </div>
                  <div className={styles.info}>
                    <span className={styles.name}>{p.name}</span>
                    <span className={styles.brand}>{p.brand}</span>
                    <Stars score={p.score} />
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
