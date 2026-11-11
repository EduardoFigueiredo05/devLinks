import Background from './components/Background.jsx'
import Profile from './components/Profile.jsx'
import ThemeToggle from './components/ThemeToggle.jsx'
import LinkList from './components/LinkList.jsx'
import SocialLinks from './components/SocialLinks.jsx'
import Footer from './components/Footer.jsx'
import { profile, links, socials, footer } from './data/profile.js'

export default function App() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-white text-zinc-900 transition-colors duration-500 dark:bg-zinc-950 dark:text-white">
      <Background />

      <main className="relative z-10 mx-auto flex min-h-screen w-full max-w-[360px] flex-col items-center px-6 pt-14 pb-8 sm:pt-16">
        <Profile avatar={profile.avatar} alt={profile.avatarAlt} username={profile.username} />

        <ThemeToggle className="mt-6" />

        <LinkList links={links} className="mt-5" />

        <SocialLinks items={socials} className="mt-10" />

        <Footer author={footer.author} className="mt-8" />
      </main>
    </div>
  )
}
