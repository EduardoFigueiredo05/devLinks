import { useContext } from 'react'
import { ThemeContext } from '../context/ThemeContext.jsx'

/** Acesso ao tema atual e às funções para alterá-lo. */
export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) {
    throw new Error('useTheme deve ser usado dentro de <ThemeProvider>')
  }
  return ctx
}
