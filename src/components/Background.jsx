/**
 * Fundo com "blobs" de gradiente desfocados, como no layout do Figma.
 * Cores diferentes para o tema claro e o escuro.
 */
export default function Background() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* topo direito — roxo */}
      <div className="absolute -top-40 -right-32 h-[34rem] w-[34rem] rounded-full bg-violet-400/60 blur-[120px] transition-colors duration-500 dark:bg-violet-600/50" />
      {/* centro — rosa/magenta */}
      <div className="absolute top-1/4 left-1/3 h-[26rem] w-[26rem] rounded-full bg-pink-300/50 blur-[130px] transition-colors duration-500 dark:bg-fuchsia-900/40" />
      {/* esquerda — azul petróleo (aparece mais no escuro) */}
      <div className="absolute top-1/3 -left-40 h-[30rem] w-[22rem] rounded-full bg-sky-100/40 blur-[120px] transition-colors duration-500 dark:bg-cyan-900/40" />
      {/* base esquerda — magenta */}
      <div className="absolute -bottom-40 -left-24 h-[30rem] w-[30rem] rounded-full bg-fuchsia-400/50 blur-[120px] transition-colors duration-500 dark:bg-fuchsia-700/50" />
    </div>
  )
}
