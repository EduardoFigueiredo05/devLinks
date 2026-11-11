import LinkButton from './LinkButton.jsx'

/**
 * Lista de links principais.
 * @param {{ links: { id: string, label: string, href: string }[], className?: string }} props
 */
export default function LinkList({ links, className = '' }) {
  return (
    <nav aria-label="Links principais" className={`w-full ${className}`}>
      <ul className="flex flex-col gap-4">
        {links.map((link) => (
          <li key={link.id}>
            <LinkButton href={link.href}>{link.label}</LinkButton>
          </li>
        ))}
      </ul>
    </nav>
  )
}
