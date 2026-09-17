import { MEMBERS } from '../lib/constants'
import styles from './LoginScreen.module.css'

export default function LoginScreen({ onLogin }) {
  return (
    <div className={styles.wrap}>
      <div className={styles.logo}>🧲</div>
      <div className={styles.titles}>
        <h1 className={styles.title}>Lista de la Nevera</h1>
        <p className={styles.sub}>¿Quién eres?</p>
      </div>
      <div className={styles.grid}>
        {MEMBERS.map((m) => (
          <button key={m.id} className={styles.card} onClick={() => onLogin(m.id)}>
            <div className={styles.avatar} style={{ background: m.color }}>
              {m.emoji}
            </div>
            <span className={styles.name}>{m.name}</span>
          </button>
        ))}
      </div>
      <p className={styles.hint}>
        <i className="ti ti-wifi" aria-hidden="true" /> Simula escanear el NFC de la nevera eligiendo tu perfil
      </p>
    </div>
  )
}
