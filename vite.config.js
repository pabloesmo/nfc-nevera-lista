import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Cambia 'nevera-lista' por el nombre de tu repositorio en GitHub
export default defineConfig({
  plugins: [react()],
  base: '/nfc-nevera-lista/',
})
