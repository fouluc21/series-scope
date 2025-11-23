import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {BrowserRouter} from "react-router";
import {ThemeProvider} from "@mui/material";
import {Theme} from "./theme.ts";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <ThemeProvider theme={Theme}>
          <BrowserRouter>
              <App />
          </BrowserRouter>
      </ThemeProvider>
  </StrictMode>,
)
