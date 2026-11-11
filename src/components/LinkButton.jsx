/**
 * Botão de link reutilizável (efeito "vidro").
 * @param {{ href: string, children: React.ReactNode, external?: boolean }} props
 */
export default function LinkButton({ href, children, external = true }) {
  return (
    <a
      href={href}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className="block w-full rounded-lg border border-zinc-900/10 bg-white/50 px-6 py-4 text-center text-sm font-medium backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5 hover:border-zinc-900/20 hover:bg-white/70 focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:outline-none dark:border-white/20 dark:bg-white/5 dark:hover:border-white/40 dark:hover:bg-white/10"
    >
      {children}
    </a>
  )
}
