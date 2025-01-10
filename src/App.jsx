import React from 'react'
    import { BrowserRouter, Routes, Route } from 'react-router-dom'
    import Home from './pages/Home'
    import Settings from './pages/Settings'
    import './index.css'

    export default function App() {
      return (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </BrowserRouter>
      )
    }
