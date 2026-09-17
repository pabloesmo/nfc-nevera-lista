import { useState } from 'react'
import { MEMBERS } from '../lib/constants'

const USER_KEY = 'nevera_user'

export function useUser() {
  const [userId, setUserId] = useState(() => localStorage.getItem(USER_KEY) || null)

  const user = MEMBERS.find((m) => m.id === userId) || null

  function login(id) {
    localStorage.setItem(USER_KEY, id)
    setUserId(id)
  }

  function logout() {
    localStorage.removeItem(USER_KEY)
    setUserId(null)
  }

  return { user, login, logout }
}
