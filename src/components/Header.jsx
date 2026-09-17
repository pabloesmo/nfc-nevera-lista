import styles from './Header.module.css'

export default function Header({ user, onLogout, pendingCount }) {
  return (
    <header className={styles.header}>
      <div className={styles.top}>
        <span className={styles.brand}>🧲 Nevera</span>
        <div className={styles.right}>
          {pendingCount > 0 && (
            <span className={styles.badge}>{pendingCount} pendientes</span>
          )}
          <button className={styles.pill} onClick={onLogout} title="Cambiar usuario">
            <span className={styles.pillAvatar} style={{ background: user.color }}>
              {user.emoji}
            </span>
            <span className={styles.pillName}>{user.name}</span>
            <i className="ti ti-chevron-down" aria-hidden="true" style={{ fontSize: 12, opacity: 0.6 }} />
          </button>
        </div>
      </div>
    </header>
  )
}
