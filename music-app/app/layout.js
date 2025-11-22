import './globals.css'

export const metadata = {
  title: 'PurpleWave — Music App',
  description: 'Gradient purple-blue music app prototype',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  )
}
