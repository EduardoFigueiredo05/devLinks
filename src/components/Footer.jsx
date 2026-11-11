/**
 * Rodapé "Feito com ♥ por ...".
 * @param {{ author: string, className?: string }} props
 */
export default function Footer({ author, className = '' }) {
  return (
    <footer className={`text-center text-sm ${className}`}>
      Feito com{' '}
      <svg viewBox="0 0 24 24" fill="currentColor" className="inline h-4 w-4 -translate-y-px" aria-label="amor">
        <path d="M12 21s-7.5-4.6-10-9.3C.3 8.3 2.2 4 6.2 4c2.4 0 4 1.4 5.8 3.5C13.8 5.4 15.4 4 17.8 4c4 0 5.9 4.3 4.2 7.7C19.5 16.4 12 21 12 21Z" />
      </svg>{' '}
      por {author}
    </footer>
  )
}
