export default function ServiceCard({ service, isSelected, onSelect }) {
  return (
    <button
      type="button"
      onClick={() => onSelect(service.id)}
      className={`
        group relative w-full text-left p-5 sm:p-6 rounded-lg border transition-all duration-300
        focus:outline-none focus-visible:ring-2 focus-visible:ring-cyber-green/60
        ${
          isSelected
            ? 'border-cyber-green bg-cyber-green/10 shadow-[0_0_30px_rgba(0,255,65,0.15)] scale-[1.02]'
            : 'border-cyber-border bg-cyber-panel/80 hover:border-cyber-green/40 hover:bg-cyber-green/5'
        }
      `}
    >
      {isSelected && (
        <span className="absolute top-3 right-3 flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyber-green opacity-75" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyber-green" />
        </span>
      )}

      <div className="flex items-start justify-between gap-3 mb-3">
        <h3
          className={`font-display text-sm sm:text-base font-semibold tracking-wide uppercase transition-colors ${
            isSelected ? 'text-cyber-green' : 'text-gray-200 group-hover:text-cyber-green'
          }`}
        >
          {service.title}
        </h3>
      </div>

      <p className="text-xs sm:text-sm text-gray-400 leading-relaxed mb-4">
        {service.description}
      </p>

      <div className="flex items-center justify-between pt-3 border-t border-cyber-border/60">
        <span className="text-[10px] sm:text-xs text-gray-500 uppercase tracking-widest">
          Tarif
        </span>
        <span
          className={`font-display text-sm sm:text-base font-bold ${
            isSelected ? 'text-cyber-green' : 'text-gray-300'
          }`}
        >
          {service.price}
        </span>
      </div>
    </button>
  )
}
