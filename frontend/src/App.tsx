import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { TurmaProvider } from './contexts/TurmaContext'
import LandingPage from './pages/LandingPage'
import Dashboard from './pages/Dashboard'
import Studio from './pages/Studio'

function App() {
  return (
    <TurmaProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/studio" element={<Studio />} />
          </Routes>
        </div>
      </Router>
    </TurmaProvider>
  )
}

export default App
