import { useEffect, useState } from 'react'
import { loadingLogs } from '../data/services'

export default function LoadingScreen({ serviceTitle, onComplete }) {
  const [progress, setProgress] = useState(0)
  const [visibleLogs, setVisibleLogs] = useState([])

  useEffect(() => {
    const duration = 6500
    const startTime = Date.now()
    const logInterval = duration / loadingLogs.length

    const logTimers = loadingLogs.map((log, index) =>
      setTimeout(() => {
        setVisibleLogs((prev) => [...prev, log])
      }, logInterval * index + 300),
    )

    const progressTimer = setInterval(() => {
      const elapsed = Date.now() - startTime
      const next = Math.min(100, Math.round((elapsed / duration) * 100))
      setProgress(next)

      if (next >= 100) {
        clearInterval(progressTimer)
        setTimeout(onComplete, 600)
      }
    }, 50)

    return () => {
      clearInterval(progressTimer)
      logTimers.forEach(clearTimeout)
    }
  }, [onComplete])

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/95 backdrop-blur-sm">
      <div className="w-full max-w-2xl mx-4 p-6 sm:p-10 border border-cyber-green/30 rounded-lg bg-cyber-panel/90 shadow-[0_0_60px_rgba(0,255,65,0.1)] fade-in">
        <div className="mb-8 text-center">
          <p className="text-[10px] sm:text-xs text-cyber-green/60 uppercase tracking-[0.3em] mb-2">
            Opération en cours
          </p>
          <h2 className="font-display text-lg sm:text-xl text-cyber-green glitch-text">
            {serviceTitle}
          </h2>
        </div>

        <div className="mb-2 flex justify-between text-xs text-gray-500">
          <span>Progression</span>
          <span className="text-cyber-green font-mono">{progress}%</span>
        </div>

        <div className="h-2 w-full bg-black rounded-full overflow-hidden border border-cyber-border mb-8">
          <div
            className="h-full bg-gradient-to-r from-cyber-green-dim to-cyber-green progress-glow transition-all duration-150 ease-out rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="bg-black/60 rounded border border-cyber-border/50 p-4 h-48 sm:h-56 overflow-y-auto font-mono text-xs sm:text-sm">
          <div className="text-cyber-green/50 mb-3">
            <span className="text-cyber-green">root@secure-node</span>
            <span className="text-gray-600">:</span>
            <span className="text-cyber-green-dim">~/extraction</span>
            <span className="text-gray-600">$</span>
            <span className="cursor-blink" />
          </div>

          {visibleLogs.map((log, index) => (
            <div
              key={index}
              className="log-line text-gray-400 mb-1.5 flex items-start gap-2"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <span className="text-cyber-green shrink-0">[{String(index + 1).padStart(2, '0')}]</span>
              <span>{log}</span>
              {index === visibleLogs.length - 1 && progress < 100 && (
                <span className="inline-block w-1.5 h-3.5 bg-cyber-green animate-pulse ml-1" />
              )}
            </div>
          ))}
        </div>

        <div className="mt-6 flex items-center justify-center gap-2 text-[10px] sm:text-xs text-gray-600">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-cyber-green animate-pulse" />
          Connexion chiffrée active — Ne pas interrompre
        </div>
      </div>
    </div>
  )
}
