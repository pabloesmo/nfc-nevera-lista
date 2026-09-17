import { useState } from 'react'
import { MEMBERS, SUPERMARKETS } from '../lib/constants'
import styles from './ShoppingList.module.css'

function memberById(id) { return MEMBERS.find((m) => m.id === id) }
function superById(id) { return SUPERMARKETS.find((s) => s.id === id) }

function groupBySuper(items) {
  return items.reduce((acc, item) => {
    const key = item.superId || 'custom'
    if (!acc[key]) acc[key] = []
    acc[key].push(item)
    return acc
  }, {})
}

export default function ShoppingList({ items, loading, onToggle, onRemove, onAdd, onClearDone, user }) {
  const [customText, setCustomText] = useState('')

  function handleAddCustom() {
    const name = customText.trim()
    if (!name) return
    onAdd({ id: 'custom_' + Date.now(), name, emoji: '📦', brand: '' }, 'custom')
    setCustomText('')
  }

  if (loading) {
    return (
      <div className={styles.loading}>
        <i className="ti ti-loader-2" aria-hidden="true" style={{ fontSize: 28, animation: 'spin 1s linear infinite' }} />
        <span>Cargando lista...</span>
      </div>
    )
  }

  const done = items.filter((i) => i.done).length
  const total = items.length
  const pct = total > 0 ? Math.round((done / total) * 100) : 0
  const grouped = groupBySuper(items)
  const superIds = Object.keys(grouped)

  return (
    <div className={styles.wrap}>
      {/* NFC banner */}
      <div className={styles.nfcBanner}>
        <i className="ti ti-wifi" aria-hidden="true" style={{ color: '#1a7a3c', fontSize: 18 }} />
        <span>
          <strong>NFC detectado</strong> · Sesión de {user.name} · Toca productos para marcarlos
        </span>
      </div>

      {/* Progress */}
      {total > 0 && (
        <div className={styles.progressWrap}>
          <div className={styles.progressBar} style={{ width: `${pct}%` }} />
          <p className={styles.progressLabel}>
            {done} de {total} productos comprados · {pct}% completado
          </p>
        </div>
      )}

      {/* Clear done button */}
      {done > 0 && (
        <button className={styles.clearBtn} onClick={onClearDone}>
          <i className="ti ti-trash" aria-hidden="true" /> Limpiar {done} comprado{done !== 1 ? 's' : ''}
        </button>
      )}

      {/* Empty state */}
      {total === 0 && (
        <div className={styles.empty}>
          <span style={{ fontSize: 40 }}>🛒</span>
          <p>La lista está vacía.<br />Ve al catálogo y añade productos.</p>
        </div>
      )}

      {/* Items grouped by supermarket */}
      {superIds.map((sid) => {
        const sup = superById(sid) || { name: 'Varios', emoji: '🛒' }
        const group = grouped[sid]
        const doneSup = group.filter((i) => i.done).length
        return (
          <div key={sid} className={styles.group}>
            <div className={styles.groupHeader}>
              <span style={{ fontSize: 18 }}>{sup.emoji}</span>
              <span className={styles.groupName}>{sup.name}</span>
              <span className={styles.groupBadge}>{doneSup}/{group.length}</span>
            </div>
            {group.map((item) => {
              const addedBy = memberById(item.addedBy)
              const ts = item.createdAt?.toDate?.()
              const timeStr = ts
                ? ts.toLocaleTimeString('es', { hour: '2-digit', minute: '2-digit' })
                : ''
              return (
                <div key={item.id} className={`${styles.item} ${item.done ? styles.itemDone : ''}`}>
                  <button
                    className={`${styles.check} ${item.done ? styles.checkDone : ''}`}
                    onClick={() => onToggle(item.id, item.done)}
                    aria-label={item.done ? 'Desmarcar' : 'Marcar como comprado'}
                  >
                    {item.done && <i className="ti ti-check" aria-hidden="true" style={{ fontSize: 13 }} />}
                  </button>
                  <span className={styles.emoji}>{item.emoji}</span>
                  <div className={styles.info}>
                    <span className={`${styles.name} ${item.done ? styles.nameDone : ''}`}>
                      {item.name}
                    </span>
                    <span className={styles.meta}>
                      {addedBy && (
                        <>
                          <span
                            className={styles.dot}
                            style={{ background: addedBy.color }}
                            aria-hidden="true"
                          />
                          <span>{addedBy.name}</span>
                        </>
                      )}
                      {timeStr && <span>· {timeStr}</span>}
                    </span>
                  </div>
                  <button
                    className={styles.del}
                    onClick={() => onRemove(item.id)}
                    aria-label={`Eliminar ${item.name}`}
                  >
                    <i className="ti ti-trash" aria-hidden="true" />
                  </button>
                </div>
              )
            })}
          </div>
        )
      })}

      {/* Add custom item */}
      <div className={styles.addCustom}>
        <input
          type="text"
          placeholder="Añadir producto personalizado..."
          value={customText}
          onChange={(e) => setCustomText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAddCustom()}
          className={styles.customInput}
        />
        <button className={styles.customBtn} onClick={handleAddCustom}>
          + Añadir
        </button>
      </div>
    </div>
  )
}
