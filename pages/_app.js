import '../styles/globals.css'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false
import { AuthProvider } from '@context/AuthContext'
import Head from 'next/head'
import { AxiosProvider } from '@context/AxiosContext'

function MyApp({ Component, pageProps }) {

  return (
    <>
      <Head>
        <title>Vidvie Management</title>
        <meta name="description" content="Project Management Website for Vidvie" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json"/>
        <link rel="apple-touch-icon" href="/logo-VIDVIE-icon.png"/>
        <meta name="theme-color" content='#F36D25'/>
        <meta name='viewport' content={`width=device-width, initial-scale=1, viewport-fit=cover${typeof window !== 'undefined' && window?.navigator?.userAgentData?.mobile ? ', user-scalable=no' : ''}`} />
      </Head>
        <AuthProvider>
          <AxiosProvider>
            <Component {...pageProps} />
          </AxiosProvider>
        </AuthProvider>
    </>
  )
}

export default MyApp
