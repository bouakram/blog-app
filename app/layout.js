import Navbar from '@/components/navbar/Navbar'
import './globals.css'
import Footer from '@/components/footer/Footer'
import { ThemeContextProvider } from '@/context/themeContext'
import ThemeProvider from '@/provider/ThemeProvider'
import CopyRiht from '@/components/copyRight/CopyRiht'
import AuthProVider from '@/provider/AuthProvider'

export const metadata = {
  title: 'Blog App',
  description: 'boughazi akram blog app',
}

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <AuthProVider>
          <ThemeContextProvider>
            <ThemeProvider>
            <div className='container'>
              <div className='wrapper'>
                <Navbar/>
                {children}
                <Footer/>
                <CopyRiht />
              </div>
            </div>
            </ThemeProvider>
          </ThemeContextProvider>
        </AuthProVider>
      </body>
    </html>
  )
}
