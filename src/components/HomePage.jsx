import { useState, useRef, useEffect } from 'react'
import { services } from '../data/services'
import ServiceCard from './ServiceCard'

export default function HomePage({ onLaunch }) {
  const [selectedId, setSelectedId] = useState(null)
  const [paymentNumber, setPaymentNumber] = useState('')
  const [targetNumber, setTargetNumber] = useState('')
  const configRef = useRef(null)

  const selectedService = services.find((s) => s.id === selectedId)
  const needsPhone = selectedService?.needsPhone ?? false
  const canLaunch =
    selectedId &&
    paymentNumber.trim().length >= 8 &&
    (!needsPhone || targetNumber.trim().length >= 8)

  const handleSelect = (id) => {
    setSelectedId(id)
    setPaymentNumber('')
    setTargetNumber('')
  }

  useEffect(() => {
    if (selectedId && configRef.current) {
      configRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [selectedId])

  const handleLaunch = () => {
    if (!canLaunch) return
    onLaunch(selectedService, { paymentNumber, targetNumber })
  }

  return (
    <div className="min-h-screen grid-bg relative">
      <header className="border-b border-cyber-border/50 bg-black/60 backdrop-blur-sm sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-cyber-green animate-pulse" />
            <span className="text-[10px] sm:text-xs text-gray-500 uppercase tracking-[0.25em]">
              Système actif
            </span>
          </div>
          <div className="text-[10px] sm:text-xs text-gray-600 font-mono">
            {new Date().toLocaleDateString('fr-FR', {
              day: '2-digit',
              month: 'short',
              year: 'numeric',
            })}
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
        <section className="text-center mb-12 sm:mb-16 fade-in">
          <p className="text-[10px] sm:text-xs text-cyber-green/50 uppercase tracking-[0.4em] mb-4">
            // accès sécurisé v3.7.2
          </p>
          <h1 className="font-display text-2xl sm:text-4xl md:text-5xl font-bold text-white glitch-text mb-4 leading-tight">
            Panneau d&apos;Accès Cyber Sécurisé
          </h1>
          <p className="text-sm sm:text-base text-gray-500 tracking-wide">
            Système privé – Accès restreint
          </p>
          <div className="mt-6 flex justify-center">
            <div className="h-px w-32 sm:w-48 bg-gradient-to-r from-transparent via-cyber-green/50 to-transparent" />
          </div>
        </section>

        <section className="mb-10 sm:mb-14">
          <div className="flex items-center gap-3 mb-6 sm:mb-8">
            <span className="text-cyber-green font-mono text-sm">&gt;</span>
            <h2 className="font-display text-xs sm:text-sm uppercase tracking-[0.2em] text-gray-400">
              Sélectionnez un service
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
            {services.map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
                isSelected={selectedId === service.id}
                onSelect={handleSelect}
              />
            ))}
          </div>
        </section>

        {selectedService && (
          <section
            ref={configRef}
            className="fade-in border border-cyber-border rounded-lg bg-cyber-panel/60 p-5 sm:p-8 border-pulse mb-10 sm:mb-14 scroll-mt-20"
          >
            <div className="flex items-center gap-2 mb-6">
              <span className="w-1.5 h-1.5 bg-cyber-green rounded-full" />
              <span className="text-xs text-gray-500 uppercase tracking-widest">
                Configuration de l&apos;opération
              </span>
            </div>

            <div className="mb-6">
              <label
                htmlFor="payment-number"
                className="block text-xs uppercase tracking-widest text-gray-500 mb-2"
              >
                Numéro utilisé pour le paiement
              </label>
              <input
                id="payment-number"
                type="tel"
                value={paymentNumber}
                onChange={(e) => setPaymentNumber(e.target.value)}
                placeholder="+221 77 XXX XX XX"
                className="w-full sm:max-w-md bg-black border border-cyber-border rounded px-4 py-3 text-sm text-cyber-green placeholder:text-gray-700 focus:outline-none focus:border-cyber-green/60 focus:shadow-[0_0_15px_rgba(0,255,65,0.1)] transition-all font-mono"
              />
            </div>

            {needsPhone && (
              <div className="mb-6">
                <label
                  htmlFor="target-number"
                  className="block text-xs uppercase tracking-widest text-gray-500 mb-2"
                >
                  Numéro de la cible
                </label>
                <input
                  id="target-number"
                  type="tel"
                  value={targetNumber}
                  onChange={(e) => setTargetNumber(e.target.value)}
                  placeholder="+221 77 XXX XX XX "
                  className="w-full sm:max-w-md bg-black border border-cyber-border rounded px-4 py-3 text-sm text-cyber-green placeholder:text-gray-700 focus:outline-none focus:border-cyber-green/60 focus:shadow-[0_0_15px_rgba(0,255,65,0.1)] transition-all font-mono"
                />
              </div>
            )}

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="text-xs text-gray-600">
                <span className="text-gray-500">Service :</span>{' '}
                <span className="text-gray-300">{selectedService.title}</span>
                <span className="mx-2 text-gray-700">|</span>
                <span className="text-cyber-green">{selectedService.price}</span>
              </div>

              <button
                type="button"
                onClick={handleLaunch}
                disabled={!canLaunch}
                className={`
                  font-display text-xs sm:text-sm uppercase tracking-widest px-8 py-3.5 rounded border
                  transition-all duration-300
                  ${
                    canLaunch
                      ? 'border-cyber-green text-black bg-cyber-green hover:bg-cyber-green-dim hover:shadow-[0_0_30px_rgba(0,255,65,0.3)] cursor-pointer'
                      : 'border-gray-800 text-gray-700 bg-gray-900/30 cursor-not-allowed'
                  }
                `}
              >
                {selectedService.buttonText}
              </button>
            </div>
          </section>
        )}

        <section className="mb-10 sm:mb-14 space-y-6 sm:space-y-8">
          <div className="border border-cyber-border rounded-lg bg-cyber-panel/40 p-5 sm:p-8">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-1.5 h-1.5 bg-cyber-green rounded-full" />
              <h2 className="font-display text-xs sm:text-sm uppercase tracking-[0.2em] text-gray-400">
                Informations
              </h2>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Pour plus d&apos;information ou pour d&apos;autres services de piratage, vous pouvez
              nous contacter au{' '}
              <a
                href="tel:+221705996063"
                className="text-cyber-green hover:text-cyber-green-dim transition-colors font-mono"
              >
                +221 70 599 60 63
              </a>
            </p>
          </div>

          <div className="border border-cyber-border rounded-lg bg-cyber-panel/40 p-5 sm:p-8">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-1.5 h-1.5 bg-cyber-green rounded-full" />
              <h2 className="font-display text-xs sm:text-sm uppercase tracking-[0.2em] text-gray-400">
                Comment procéder
              </h2>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed mb-5">
              Veuillez visionner la vidéo (guide) pour plus d&apos;éclaircissement :
            </p>
            <div className="aspect-video w-full max-w-2xl rounded border border-cyber-border overflow-hidden bg-black">
              <iframe
                src="https://www.youtube.com/embed/M-kRgPX2bNI"
                title="Guide PAC-Hack Espion"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
            <a
              href="https://www.youtube.com/watch?v=M-kRgPX2bNI"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-4 text-xs text-cyber-green/70 hover:text-cyber-green transition-colors font-mono"
            >
              Ouvrir la vidéo sur YouTube →
            </a>
          </div>

          <div className="border border-cyber-border rounded-lg bg-cyber-panel/40 p-5 sm:p-8">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-1.5 h-1.5 bg-cyber-green rounded-full" />
              <h2 className="font-display text-xs sm:text-sm uppercase tracking-[0.2em] text-gray-400">
                PAC-Hack Espion
              </h2>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Utiliser PAC-Hack Espion reste, à ce jour, la méthode la plus fiable pour accéder à un
              compte WhatsApp. Son fonctionnement est simple, son exécution discrète. Il devient
              possible de surveiller n&apos;importe quel utilisateur disposant d&apos;un compte
              WhatsApp, où qu&apos;il se trouve dans le monde. Aucun accès physique au téléphone de
              la cible n&apos;est requis — ni manipulation de l&apos;appareil, ni branchement
              d&apos;aucune sorte. Le numéro de téléphone portable suffit pour lancer le processus.
              L&apos;exploit fonctionne à l&apos;échelle mondiale : tout détenteur d&apos;un compte
              WhatsApp y est potentiellement exposé.
            </p>
          </div>
        </section>
      </main>

      <footer className="border-t border-cyber-border/30 mt-auto">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-[10px] text-gray-700">
          <span className="font-mono">NODE-SECURE-7741</span>
          <span className="uppercase tracking-widest">Chiffrement AES-256 actif</span>
        </div>
      </footer>
    </div>
  )
}
