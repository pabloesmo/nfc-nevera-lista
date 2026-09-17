# 🧲 Nevera — Lista de la compra familiar

Lista de la compra en tiempo real para toda la familia, con soporte NFC, catálogo por supermercado y seguimiento de quién añadió cada producto.

---

## Stack

- **React 18** + **Vite**
- **Firebase Firestore** (tiempo real)
- **GitHub Pages** (deploy)

---

## Setup en 5 pasos

### 1. Instalar dependencias

```bash
npm install
```

### 2. Crear el proyecto Firebase

1. Ve a [console.firebase.google.com](https://console.firebase.google.com)
2. Crea un nuevo proyecto (ej. `nevera-lista`)
3. En **Build → Firestore Database**, crea la base de datos en modo producción
4. En **Project Settings → Your apps**, registra una Web App y copia la config

### 3. Pegar tu config de Firebase

Edita `src/lib/firebase.js` y reemplaza los valores:

```js
const firebaseConfig = {
  apiKey: "TU_API_KEY",
  authDomain: "TU_PROJECT.firebaseapp.com",
  projectId: "TU_PROJECT_ID",
  ...
}
```

### 4. Ajustar el nombre del repositorio

En `vite.config.js`, cambia `'nevera-lista'` por el nombre exacto de tu repo de GitHub:

```js
base: '/nombre-de-tu-repo/',
```

### 5. Arrancar en local

```bash
npm run dev
```

---

## Deploy a GitHub Pages

```bash
# Primera vez: crear el repo en GitHub y subirlo
git init
git remote add origin https://github.com/TU_USUARIO/nevera-lista.git
git add . && git commit -m "Initial commit"
git push -u origin main

# Deploy (cada vez que quieras publicar cambios)
npm run deploy
```

Esto construye la app y la publica en la rama `gh-pages` automáticamente.
Tu app estará en: `https://pabloesmo.github.io/nevera-lista/`

---

## NFC — cómo funciona

La app detecta el parámetro `?user=papa` en la URL. El chip NFC de la nevera debe apuntar a:

```
https://pabloesmo.github.io/nevera-lista/?user=papa
https://pabloesmo.github.io/nevera-lista/?user=mama
https://pabloesmo.github.io/nevera-lista/?user=pablo
https://pabloesmo.github.io/nevera-lista/?user=hermana
```

Para escribir el chip NFC usa cualquier app como **NFC Tools** (Android) o **NFC for iPhone**.

> 💡 Para activar el auto-login por NFC, añade esto al inicio de `App.jsx`:
> ```js
> useEffect(() => {
>   const params = new URLSearchParams(window.location.search)
>   const nfcUser = params.get('user')
>   if (nfcUser && !user) login(nfcUser)
> }, [])
> ```

---

## Personalizar la familia

Edita `src/lib/constants.js` → array `MEMBERS`:

```js
export const MEMBERS = [
  { id: 'papa',    name: 'Papá',    emoji: '👨', color: '#1a5276', bg: '#d6eaf8' },
  { id: 'mama',    name: 'Mamá',    emoji: '👩', color: '#7d3c98', bg: '#e8daef' },
  // añade o cambia los que necesites
]
```

---

## Próximas fases

- [ ] Integración Open Food Facts API (fotos e info nutricional real)
- [ ] Firebase Auth con PIN por miembro de la familia
- [ ] Historial de compras por mes
- [ ] Notificaciones push (Firebase Cloud Messaging)
- [ ] Modo oscuro manual
