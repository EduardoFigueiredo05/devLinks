/**
 * Avatar com borda em gradiente + nome de usuário.
 * @param {{ avatar: string, alt?: string, username: string }} props
 */
export default function Profile({ avatar, alt = 'Foto de perfil', username }) {
  return (
    <header className="flex flex-col items-center gap-2">
      <div className="rounded-full bg-gradient-to-br from-fuchsia-500 via-violet-500 to-sky-400 p-[2px]">
        <img
          src={avatar}
          alt={alt}
          width={112}
          height={112}
          className="h-28 w-28 rounded-full bg-zinc-200 object-cover dark:bg-zinc-800"
        />
      </div>
      <p className="text-sm font-medium" data-testid="username">
        {username}
      </p>
    </header>
  )
}
