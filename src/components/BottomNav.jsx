import styles from './BottomNav.module.css'

const TABS = [
  { id: 'list',    label: 'Lista',    icon: 'ti-shopping-cart' },
  { id: 'catalog', label: 'Catálogo', icon: 'ti-grid' },
]

export default function BottomNav({ active, onChange, pendingCount }) {
  return (
    <nav className={styles.nav} aria-label="Navegación principal">
      {TABS.map((t) => (
        <button
          key={t.id}
          className={`${styles.btn} ${active === t.id ? styles.active : ''}`}
          onClick={() => onChange(t.id)}
          aria-current={active === t.id ? 'page' : undefined}
        >
          <span className={styles.iconWrap}>
            <i className={`ti ${t.icon}`} aria-hidden="true" style={{ fontSize: 22 }} />
            {t.id === 'list' && pendingCount > 0 && (
              <span className={styles.dot} aria-label={`${pendingCount} pendientes`} />
            )}
          </span>
          <span className={styles.label}>
            {t.label}
            {t.id === 'list' && pendingCount > 0 && ` (${pendingCount})`}
          </span>
        </button>
      ))}
    </nav>
  )
}
