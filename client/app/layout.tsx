import { Inter, Roboto_Mono, Roboto_Serif, DynaPuff, Pacifico, Rowdies, Urbanist} from 'next/font/google'
import './globals.css'
 
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})
 
const roboto_mono = Roboto_Mono({
  subsets: ['latin'],
  variable: '--font-roboto-mono',
  display: 'swap',
})

const roboto_serif = Roboto_Serif({
  subsets: ['latin'],
  variable: '--font-roboto-serif',
  display: 'swap',
})

const dyna_puff = DynaPuff({
  subsets: ['latin'],
  variable: '--font-dyna-puff',
  display: 'swap',
  style: ['normal'],
  weight: '400',
})

const pacifico = Pacifico({
  subsets: ['latin'],
  variable: '--font-pacifico',
  display: 'swap',
  style: ['normal'],
  weight: '400',
})

const rowdies = Rowdies({
  subsets: ['latin'],
  variable: '--font-rowdies',
  display: 'swap',
  style: ['normal'],
  weight: '300',
})

const urbanist = Urbanist({
  subsets: ['latin'],
  variable: '--font-indie-flower',
  display: 'swap',
  style: ['normal'],
  weight: '100',
})
 
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${roboto_mono.variable} ${roboto_serif.variable} ${dyna_puff.variable} ${pacifico.variable} ${rowdies.variable} ${urbanist.variable}`}>
      <body>
        <h1>My App</h1>
        <div>{children}</div>
      </body>
    </html>
  )
}