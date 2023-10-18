import { UserContext, useProviderUserContext } from "@/context/UserContext"
import "../styles/globals.css"
import { ThemeProvider } from "next-themes"

import type { AppProps } from "next/app"
import { QueryClient, QueryClientProvider } from "react-query"
const queryClient = new QueryClient()

function MyApp({ Component, pageProps }: AppProps) {
  const userContext = useProviderUserContext()
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <UserContext.Provider value={userContext}>
          <Component {...pageProps} />
        </UserContext.Provider>
      </ThemeProvider>
    </QueryClientProvider>
  )
}

export default MyApp
