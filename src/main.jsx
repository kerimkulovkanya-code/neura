import React from 'react'
import ReactDOM from 'react-dom/client'
import { WagmiProvider } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { config } from '@/lib/web3'
import App from './App'
import './index.css'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <WagmiProvider config={config}>
    <QueryClientProvider client={queryClient}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </QueryClientProvider>
  </WagmiProvider>
)