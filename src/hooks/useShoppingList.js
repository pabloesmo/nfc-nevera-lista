import { useState, useEffect } from 'react'
import {
  collection,
  onSnapshot,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
  query,
  orderBy,
} from 'firebase/firestore'
import { db } from '../lib/firebase'

const LIST_COLLECTION = 'shoppingList'

export function useShoppingList() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Real-time listener — any family member's change appears instantly on all devices
  useEffect(() => {
    const q = query(collection(db, LIST_COLLECTION), orderBy('createdAt', 'asc'))
    const unsub = onSnapshot(
      q,
      (snapshot) => {
        const data = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }))
        setItems(data)
        setLoading(false)
      },
      (err) => {
        console.error('Firestore error:', err)
        setError(err.message)
        setLoading(false)
      }
    )
    return () => unsub()
  }, [])

  // Add a product to the list
  async function addItem(product, superId, userId) {
    // Prevent duplicates
    const exists = items.some((i) => i.productId === product.id && !i.done)
    if (exists) return { error: 'Ya está en la lista' }

    await addDoc(collection(db, LIST_COLLECTION), {
      productId:   product.id,
      name:        product.name,
      emoji:       product.emoji,
      brand:       product.brand || '',
      score:       product.score || null,
      nutri:       product.nutri || null,
      superId:     superId,
      addedBy:     userId,
      done:        false,
      createdAt:   serverTimestamp(),
    })
    return { error: null }
  }

  // Toggle done/undone
  async function toggleItem(id, currentDone) {
    await updateDoc(doc(db, LIST_COLLECTION, id), { done: !currentDone })
  }

  // Remove from list
  async function removeItem(id) {
    await deleteDoc(doc(db, LIST_COLLECTION, id))
  }

  // Clear all completed items
  async function clearDone() {
    const doneItems = items.filter((i) => i.done)
    await Promise.all(doneItems.map((i) => deleteDoc(doc(db, LIST_COLLECTION, i.id))))
  }

  const pendingCount = items.filter((i) => !i.done).length
  const doneCount = items.filter((i) => i.done).length

  return {
    items,
    loading,
    error,
    addItem,
    toggleItem,
    removeItem,
    clearDone,
    pendingCount,
    doneCount,
  }
}
