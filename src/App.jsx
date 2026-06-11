import { useState, useCallback } from 'react'
import HomePage from './components/HomePage'
import LoadingScreen from './components/LoadingScreen'
import PaymentScreen from './components/PaymentScreen'

const VIEWS = {
  HOME: 'home',
  LOADING: 'loading',
  PAYMENT: 'payment',
}

export default function App() {
  const [view, setView] = useState(VIEWS.HOME)
  const [activeService, setActiveService] = useState(null)

  const handleLaunch = useCallback((service) => {
    setActiveService(service)
    setView(VIEWS.LOADING)
  }, [])

  const handleLoadingComplete = useCallback(() => {
    setView(VIEWS.PAYMENT)
  }, [])

  const handleBack = useCallback(() => {
    setView(VIEWS.HOME)
    setActiveService(null)
  }, [])

  return (
    <div className="scanlines vignette min-h-screen">
      {view === VIEWS.HOME && <HomePage onLaunch={handleLaunch} />}

      {view === VIEWS.LOADING && activeService && (
        <LoadingScreen
          serviceTitle={activeService.title}
          onComplete={handleLoadingComplete}
        />
      )}

      {view === VIEWS.PAYMENT && (
        <PaymentScreen onBack={handleBack} />
      )}
    </div>
  )
}
