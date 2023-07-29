import localFont from 'next/font/local'
import styles from '@/styles/Landing.module.scss'

const calSans = localFont({
  src: '../public/fonts/CalSans.otf',
  display: 'swap'
})

const pokemonSans = localFont({
  src: '../public/fonts/Pokemon.ttf',
  display: 'swap'
})

export default function Landing() {
  return (
    <div className={styles.container}>
      <h1 className={pokemonSans.className}>Hackmon</h1>
      <h2 className={calSans.className}>Coming Fall 2023</h2>
      <form></form>
    </div>
  )
}
