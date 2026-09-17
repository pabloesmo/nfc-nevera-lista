import { useState } from 'react'
import { useUser } from './hooks/useUser'
import { useShoppingList } from './hooks/useShoppingList'
import { useToast } from './hooks/useToast'

import LoginScreen from './components/LoginScreen'
import Header from './components/Header'
import ShoppingList from './components/ShoppingList'
import Catalog from './components/Catalog'
import BottomNav from './components/BottomNav'
import Toast from './components/Toast'

import './index.css'

export default function App() {
  const { user, login, logout } = useUser()
  const { items, loading, addItem, toggleItem, removeItem, clearDone, pendingCount } = useShoppingList()
  const { toast, show: showToast } = useToast()
  const [view, setView] = useState('list')

  // Not logged in — show login screen
  if (!user) {
    return <LoginScreen onLogin={login} />
  }

  async function handleAdd(product, superId) {
    const { error } = await addItem(product, superId, user.id)
    if (error) {
      showToast('⚠️ ' + error, 'warning')
    } else {
      showToast('✅ ' + product.name + ' añadido')
      setView('list')
    }
  }

  async function handleToggle(id, done) {
    await toggleItem(id, done)
  }

  async function handleRemove(id) {
    await removeItem(id)
    showToast('🗑 Producto eliminado')
  }

  async function handleClearDone() {
    await clearDone()
    showToast('✅ Lista limpiada')
  }

  return (
    <div style={{ maxWidth: 480, margin: '0 auto', minHeight: '100vh' }}>
      <Header user={user} onLogout={logout} pendingCount={pendingCount} />

      {view === 'list' && (
        <ShoppingList
          items={items}
          loading={loading}
          user={user}
          onToggle={handleToggle}
          onRemove={handleRemove}
          onAdd={handleAdd}
          onClearDone={handleClearDone}
        />
      )}

      {view === 'catalog' && (
        <Catalog
          listItems={items}
          onAdd={handleAdd}
        />
      )}

      <BottomNav active={view} onChange={setView} pendingCount={pendingCount} />
      <Toast toast={toast} />
    </div>
  )
}
