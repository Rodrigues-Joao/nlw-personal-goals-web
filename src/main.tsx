import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './app'
import './index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
const queryClient = new QueryClient()
import dayjs from "dayjs";
import ptBR from 'dayjs/locale/pt-BR'
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone'

dayjs.extend( utc );
dayjs.extend( timezone );


dayjs.locale( ptBR );
const tz = "America/Sao_Paulo";
dayjs.tz.setDefault( tz );
createRoot( document.getElementById( 'root' )! ).render(
  <QueryClientProvider client={queryClient}>

    <StrictMode>
      <App />
    </StrictMode>,
  </QueryClientProvider>
)
