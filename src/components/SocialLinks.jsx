import SocialIcon from './SocialIcon.jsx'

/**
 * Linha de ícones de redes sociais.
 * @param {{ items: { network: string, label: string, href: string }[], className?: string }} props
 */
export default function SocialLinks({ items, className = '' }) {
  return (
    <ul aria-label="Redes sociais" className={`flex items-center justify-center gap-4 ${className}`}>
      {items.map((item) => (
        <li key={item.network}>
          <a
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={item.label}
            className="flex h-10 w-10 items-center justify-center rounded-full transition-colors duration-200 hover:bg-zinc-900/10 focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:outline-none dark:hover:bg-white/10"
          >
            <SocialIcon network={item.network} />
          </a>
        </li>
      ))}
    </ul>
  )
}
