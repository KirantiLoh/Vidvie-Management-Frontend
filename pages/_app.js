import '../styles/globals.css'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false
import { AuthProvider } from '@context/AuthContext'
import Head from 'next/head'
import { AxiosProvider } from '@context/AxiosContext'
import { PWACheckerProvider } from '@context/PWAChecker'

function MyApp({ Component, pageProps }) {

  return (
    <>
      <Head>
        <title>Vidvie Management</title>
        <meta name="description" content="Project Management Website for Vidvie" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PWACheckerProvider>
        <AuthProvider>
          <AxiosProvider>
            <Component {...pageProps} />
          </AxiosProvider>
        </AuthProvider>
      </PWACheckerProvider>
    </>
  )
}

export default MyApp
