import { useEffect, useState } from 'react'

/**
 * Hook genérico que funciona como useState, mas persiste o valor no localStorage.
 *
 * @param {string} key - chave usada no localStorage
 * @param {*} initialValue - valor (ou função que retorna o valor) usado quando não há nada salvo
 * @param {(value: unknown) => boolean} [validate] - opcional, descarta valores salvos inválidos
 */
export function useLocalStorage(key, initialValue, validate) {
  const [value, setValue] = useState(() => {
    const fallback = typeof initialValue === 'function' ? initialValue() : initialValue
    try {
      const raw = window.localStorage.getItem(key)
      if (raw === null) return fallback
      const parsed = JSON.parse(raw)
      if (validate && !validate(parsed)) return fallback
      return parsed
    } catch {
      return fallback
    }
  })

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch {
      // localStorage indisponível (modo privado, cota cheia...) — segue só em memória
    }
  }, [key, value])

  return [value, setValue]
}
