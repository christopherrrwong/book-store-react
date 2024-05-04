import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.tsx"
import "./index.css"
import { BrowserRouter } from "react-router-dom"
import { QueryClientProvider, QueryClient } from "@tanstack/react-query"
import AuthProvider from "./context/AuthProvider.tsx"
import PageProvider from "./context/PageProvider.tsx"
import { Toaster } from "@/components/ui/toaster"

export const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <PageProvider>
          <AuthProvider>
            <App />
            <Toaster />
          </AuthProvider>
        </PageProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>
)
