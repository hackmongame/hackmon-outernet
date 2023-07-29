import { Lato, IBM_Plex_Mono } from 'next/font/google'
import '@/styles/globals.scss'

const lora = Lato({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--sans-serif'
})

const ibmPlexMono = IBM_Plex_Mono({
  weight: ['400'],
  subsets: ['latin'],
  variable: '--monospace'
})

export default function App({ Component, pageProps }) {
  return (
    <main className={`${lora.variable} ${ibmPlexMono.variable}`}>
      <Component {...pageProps} />
    </main>
  )
}
