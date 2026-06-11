import { useState } from 'react'

export default function PaymentScreen({ onBack }) {
  const [verifying, setVerifying] = useState(false)
  const [verified, setVerified] = useState(false)

  const handlePaymentClick = () => {
    if (verifying || verified) return
    setVerifying(true)

    setTimeout(() => {
      setVerifying(false)
      setVerified(true)
    }, 3000)
  }

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/95 backdrop-blur-sm p-4">
      <div className="w-full max-w-lg border border-cyber-red/40 rounded-lg bg-cyber-panel/95 shadow-[0_0_60px_rgba(255,0,64,0.1)] fade-in overflow-hidden">
        <div className="bg-cyber-red/10 border-b border-cyber-red/30 px-6 py-4 flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-cyber-red animate-pulse" />
          <span className="text-xs uppercase tracking-[0.2em] text-cyber-red font-display">
            Accès bloqué
          </span>
        </div>

        <div className="p-6 sm:p-8">
          <div className="mb-6 p-4 border border-cyber-red/20 rounded bg-cyber-red/5">
            <p className="text-sm sm:text-base text-gray-200 leading-relaxed">
              Aucun paiement confirmé.
            </p>
            <p className="text-sm sm:text-base text-gray-400 mt-2 leading-relaxed">
              L&apos;accès ne peut pas être finalisé sans validation.
            </p>
          </div>

          <div className="mb-8 p-5 border border-cyber-border rounded bg-black/40">
            <p className="text-[10px] uppercase tracking-widest text-gray-500 mb-4">
              Instructions de paiement
            </p>
            <p className="text-sm text-gray-300 mb-2">
              Effectuer le paiement via{' '}
              <span className="text-cyber-green font-semibold">Wave</span>
            </p>
            <p className="text-lg sm:text-xl font-display text-cyber-green tracking-wider">
              Numéro : 70 599 60 63
            </p>
          </div>

          {verifying && (
            <div className="mb-6 p-4 border border-cyber-green/20 rounded bg-cyber-green/5 fade-in">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 border-2 border-cyber-green border-t-transparent rounded-full animate-spin" />
                <p className="text-sm text-cyber-green">
                  Vérification de la transaction en cours…
                </p>
              </div>
            </div>
          )}

          {verified && (
            <div className="mb-6 p-4 border border-cyber-red/30 rounded bg-cyber-red/5 fade-in">
              <p className="text-sm text-cyber-red font-medium">
                Aucune transaction détectée.
              </p>
              <p className="text-xs text-gray-500 mt-2">
                Réessayez après avoir effectué le paiement Wave.
              </p>
            </div>
          )}

          <button
            type="button"
            onClick={handlePaymentClick}
            disabled={verifying || verified}
            className={`
              w-full py-3.5 px-6 rounded font-display text-xs sm:text-sm uppercase tracking-widest
              transition-all duration-300 border
              ${
                verifying || verified
                  ? 'border-gray-700 text-gray-600 cursor-not-allowed bg-gray-900/50'
                  : 'border-cyber-green text-cyber-green hover:bg-cyber-green/10 hover:shadow-[0_0_20px_rgba(0,255,65,0.2)]'
              }
            `}
          >
            {verifying
              ? 'Vérification…'
              : verified
                ? 'En attente de paiement'
                : "J'ai effectué le paiement"}
          </button>

          <button
            type="button"
            onClick={onBack}
            className="w-full mt-3 py-2 text-xs text-gray-600 hover:text-gray-400 transition-colors uppercase tracking-widest"
          >
            ← Retour au panneau
          </button>
        </div>
      </div>
    </div>
  )
}
