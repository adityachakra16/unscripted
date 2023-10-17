import "../styles/globals.css"
import { ThemeProvider } from "next-themes"

import type { AppProps } from "next/app"
import { QueryClient, QueryClientProvider } from "react-query"
const queryClient = new QueryClient()

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <Component {...pageProps} />
      </ThemeProvider>
    </QueryClientProvider>
  )
}

export default MyApp
