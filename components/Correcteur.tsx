// 'use client'

// import { useState, useEffect, useRef } from 'react'
// import { corrigerPhrase, TokenResult } from '@/lib/api'

// // ---------- Types ----------
// interface SentimentResult {
//   label: 'Positif' | 'Négatif' | 'Neutre'
//   score: number
//   positifs: number
//   negatifs: number
// }

// // ---------- API sentiment ----------
// async function analyserSentiment(phrase: string): Promise<SentimentResult> {
//   const res = await fetch('https://adriantsoaa-text-editor-malagasy-back.hf.space/sentiment', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({ phrase }),
//   })
//   if (!res.ok) throw new Error('Erreur API sentiment')
//   return res.json()
// }

// // ---------- Token individuel ----------
// function Token({ t, onReplace }: { t: TokenResult; onReplace: (original: string, correction: string) => void }) {
//   const [open, setOpen] = useState(false)
//   const ref = useRef<HTMLSpanElement>(null)

//   useEffect(() => {
//     const handler = (e: MouseEvent) => {
//       if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
//     }
//     document.addEventListener('mousedown', handler)
//     return () => document.removeEventListener('mousedown', handler)
//   }, [])

//   if (t.statut === 'ponctuation') return <span className="text-gray-500">{t.token}</span>
//   if (t.statut === 'correct') return <span className="text-green-700 dark:text-green-400">{t.token}</span>

//   return (
//     <span ref={ref} className="relative inline-block">
//       <span
//         onClick={() => t.suggestions.length > 0 && setOpen(o => !o)}
//         className="
//           underline decoration-wavy decoration-red-500
//           text-red-700 dark:text-red-400
//           cursor-pointer select-none
//           hover:bg-red-50 dark:hover:bg-red-900/30
//           rounded px-0.5 transition-colors
//         "
//       >
//         {t.token}
//       </span>

//       {open && t.suggestions.length > 0 && (
//         <div className="
//           absolute left-0 top-full mt-1 z-20
//           bg-white dark:bg-gray-800
//           border border-gray-200 dark:border-gray-700
//           rounded-lg shadow-lg py-1 min-w-[140px]
//         ">
//           {t.suggestions.map(s => (
//             <button
//               key={s}
//               onClick={() => { onReplace(t.token, s); setOpen(false) }}
//               className="
//                 block w-full text-left px-4 py-1.5 text-sm
//                 hover:bg-gray-100 dark:hover:bg-gray-700
//                 text-gray-800 dark:text-gray-200 transition-colors
//               "
//             >
//               {s}
//             </button>
//           ))}
//         </div>
//       )}
//     </span>
//   )
// }

// // ---------- Sentiment Badge ----------
// function SentimentBadge({ result }: { result: SentimentResult }) {
//   const config = {
//     Positif: {
//       emoji: '😊',
//       bg: 'bg-emerald-50 dark:bg-emerald-900/20',
//       border: 'border-emerald-200 dark:border-emerald-700',
//       text: 'text-emerald-700 dark:text-emerald-400',
//       bar: 'bg-emerald-500',
//       label: 'Tsara',
//     },
//     Négatif: {
//       emoji: '😔',
//       bg: 'bg-red-50 dark:bg-red-900/20',
//       border: 'border-red-200 dark:border-red-700',
//       text: 'text-red-700 dark:text-red-400',
//       bar: 'bg-red-500',
//       label: 'Ratsy',
//     },
//     Neutre: {
//       emoji: '😐',
//       bg: 'bg-gray-50 dark:bg-gray-800/40',
//       border: 'border-gray-200 dark:border-gray-600',
//       text: 'text-gray-600 dark:text-gray-400',
//       bar: 'bg-gray-400',
//       label: 'Tsy misy',
//     },
//   }

//   const c = config[result.label]
//   const total = result.positifs + result.negatifs
//   const posPercent = total > 0 ? Math.round((result.positifs / total) * 100) : 50
//   const negPercent = total > 0 ? Math.round((result.negatifs / total) * 100) : 50

//   return (
//     <div className={`rounded-xl border ${c.bg} ${c.border} p-4 space-y-3`}>
//       {/* Header */}
//       <div className="flex items-center gap-3">
//         <span className="text-2xl">{c.emoji}</span>
//         <div>
//           <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide font-medium">
//             Valiny
//           </p>
//           <p className={`text-lg font-bold ${c.text}`}>
//             {c.label}
//             <span className="ml-2 text-sm font-normal opacity-70">
//               (tarehimarika : {result.score > 0 ? '+' : ''}{result.score})
//             </span>
//           </p>
//         </div>
//       </div>

//       {/* Barre pos/neg */}
//       {total > 0 && (
//         <div className="space-y-1.5">
//           <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
//             <span>😊 teny{result.positifs > 1 ? 's' : ''} tsara{result.positifs > 1 ? 's' : ''} {result.positifs}</span>
//             <span>😔 teny{result.negatifs > 1 ? 's' : ''} ratsy{result.negatifs > 1 ? 's' : ''} {result.negatifs}</span>
//           </div>
//           <div className="flex h-2 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700">
//             <div
//               className="bg-emerald-400 transition-all duration-500"
//               style={{ width: `${posPercent}%` }}
//             />
//             <div
//               className="bg-red-400 transition-all duration-500"
//               style={{ width: `${negPercent}%` }}
//             />
//           </div>
//         </div>
//       )}

//       {total === 0 && (
//         <p className="text-xs text-gray-400 italic">
//           Tsy misy fehezanteny mazava.
//         </p>
//       )}
//     </div>
//   )
// }

// // ---------- Hook debounce ----------
// function useDebounce<T>(value: T, delay: number): T {
//   const [debounced, setDebounced] = useState(value)
//   useEffect(() => {
//     const timer = setTimeout(() => setDebounced(value), delay)
//     return () => clearTimeout(timer)
//   }, [value, delay])
//   return debounced
// }

// // ---------- Composant principal ----------
// export default function Correcteur() {
//   const [phrase, setPhrase]         = useState('')
//   const [tokens, setTokens]         = useState<TokenResult[]>([])
//   const [loading, setLoading]       = useState(false)
//   const [erreur, setErreur]         = useState<string | null>(null)
//   const [stats, setStats]           = useState({ total: 0, erreurs: 0 })

//   // Sentiment
//   const [sentiment, setSentiment]         = useState<SentimentResult | null>(null)
//   const [loadingSentiment, setLoadingSentiment] = useState(false)
//   const [erreurSentiment, setErreurSentiment]   = useState<string | null>(null)

//   const phraseDebounced = useDebounce(phrase, 100)

//   // Correction automatique à chaque espace
//   useEffect(() => {
//     if (!phraseDebounced.trim()) {
//       setTokens([])
//       setStats({ total: 0, erreurs: 0 })
//       return
//     }

//     const dernierCaractere = phraseDebounced.at(-1)
//     if (dernierCaractere !== ' ') return

//     const lancer = async () => {
//       setLoading(true)
//       setErreur(null)
//       try {
//         const data = await corrigerPhrase(phraseDebounced)
//         setTokens(data.resultats)
//         const mots    = data.resultats.filter(t => t.statut !== 'ponctuation')
//         const erreurs = data.resultats.filter(t => t.statut === 'erreur')
//         setStats({ total: mots.length, erreurs: erreurs.length })
//       } catch {
//         setErreur("Impossible de joindre l'API.")
//       } finally {
//         setLoading(false)
//       }
//     }

//     lancer()
//   }, [phraseDebounced])

//   const handleReplace = (original: string, correction: string) => {
//     setTokens(prev =>
//       prev.map(t =>
//         t.token === original && t.statut === 'erreur'
//           ? { ...t, token: correction, statut: 'correct', suggestions: [] }
//           : t
//       )
//     )
//     setStats(s => ({ ...s, erreurs: Math.max(0, s.erreurs - 1) }))
//   }

//   // Analyse de sentiment manuelle (bouton)
//   const handleSentiment = async () => {
//     if (!phrase.trim()) return
//     setLoadingSentiment(true)
//     setErreurSentiment(null)
//     setSentiment(null)
//     try {
//       const result = await analyserSentiment(phrase)
//       setSentiment(result)
//     } catch {
//       setErreurSentiment("Impossible d'analyser le sentiment.")
//     } finally {
//       setLoadingSentiment(false)
//     }
//   }

//   return (
//     <div className="space-y-6">
//       {/* Zone de saisie */}
//       <div>
//         <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//           Fehezanteny
//         </label>
//         <textarea
//           value={phrase}
//           onChange={e => {
//             setPhrase(e.target.value)
//             // Réinitialise le sentiment si le texte change
//             setSentiment(null)
//             setErreurSentiment(null)
//           }}
//           rows={4}
//           placeholder="Soraty eto ny fehezanteny malagasy..."
//           className="
//             w-full rounded-xl border border-gray-300 dark:border-gray-600
//             bg-white dark:bg-gray-900
//             text-gray-900 dark:text-gray-100
//             px-4 py-3 text-base
//             focus:outline-none focus:ring-2 focus:ring-blue-500
//             resize-none transition
//           "
//         />
//         {/* <div className="h-4 mt-1">
//           {loading && (
//             <p className="text-xs text-gray-400 animate-pulse">Analyse orthographique en cours…</p>
//           )}
//         </div> */}
//       </div>

//       {/* Bouton Analyse de sentiment */}
//       <div className="flex items-center gap-3">
//         <button
//           onClick={handleSentiment}
//           disabled={!phrase.trim() || loadingSentiment}
//           className="
//             inline-flex items-center gap-2
//             px-5 py-2.5 rounded-xl
//             bg-indigo-600 hover:bg-indigo-700
//             disabled:opacity-40 disabled:cursor-not-allowed
//             text-white font-medium text-sm
//             shadow-md hover:shadow-lg
//             transition-all duration-200
//             active:scale-95
//           "
//         >
//           {loadingSentiment ? (
//             <>
//               <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
//                 <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
//                 <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
//               </svg>
//               Famakafakana…
//             </>
//           ) : (
//             <>
//               <span>🔍</span>
//               Hamakafaka fihetseham-po
//             </>
//           )}
//         </button>

//         {sentiment && (
//           <button
//             onClick={() => { setSentiment(null); setErreurSentiment(null) }}
//             className="text-xs text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 underline transition-colors"
//           >
//             Hamafa ny valiny
//           </button>
//         )}
//       </div>

//       {/* Erreur sentiment */}
//       {erreurSentiment && (
//         <div className="rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 p-4 text-sm text-red-700 dark:text-red-400">
//           {erreurSentiment}
//         </div>
//       )}

//       {/* Résultat sentiment */}
//       {sentiment && <SentimentBadge result={sentiment} />}

//       {/* Erreur API correction */}
//       {erreur && (
//         <div className="rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 p-4 text-sm text-red-700 dark:text-red-400">
//           {erreur}
//         </div>
//       )}

//       {/* Résultats correction */}
//       {tokens.length > 0 && (
//         <div className="space-y-4">
//           <div className="flex gap-3 text-sm">
//             <span className="px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400">
//                teny {stats.total}
//             </span>
//             <span className={`px-3 py-1 rounded-full ${
//               stats.erreurs === 0
//                 ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
//                 : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
//             }`}>
//               {stats.erreurs === 0 ? 'Tsy misy diso' : ` diso ${stats.erreurs} ${stats.erreurs > 1 ? 's' : ''}`}
//             </span>
//           </div>

//           <div className="
//             rounded-xl border border-gray-200 dark:border-gray-700
//             bg-gray-50 dark:bg-gray-900/50
//             p-4 text-base leading-9 space-x-1
//           ">
//             {tokens.map((t, i) => (
//               <Token key={i} t={t} onReplace={handleReplace} />
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }

// components/Correcteur.tsx
'use client'

import { useState, useEffect, useRef } from 'react'
import { corrigerPhrase, TokenResult } from '@/lib/api'

// ============================================================
// TYPES
// ============================================================
interface SentimentResult {
  label: 'Positif' | 'Négatif' | 'Neutre'
  score: number
  positifs: number
  negatifs: number
}

interface WordAnalysis {
  mot: string
  prefixe: string
  infixe: string
  racine: string
  suffixe: string
  est_stop_word: boolean
}

interface LemmaResult {
  resultats: WordAnalysis[]
}

// ============================================================
// API CALLS
// ============================================================
async function analyserSentiment(phrase: string): Promise<SentimentResult> {
  const res = await fetch('https://adriantsoaa-text-editor-malagasy-back.hf.space/sentiment', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ phrase }),
  })
  if (!res.ok) throw new Error('Erreur API sentiment')
  return res.json()
}

async function lemmatiserPhrase(phrase: string): Promise<LemmaResult> {
  const res = await fetch('https://adriantsoaa-text-editor-malagasy-back.hf.space/lemmatiser', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ phrase }),
  })
  if (!res.ok) throw new Error('Erreur API lemmatisation')
  return res.json()
}

// ============================================================
// TOKEN (correction orthographique)
// ============================================================
function Token({ t, onReplace }: { t: TokenResult; onReplace: (original: string, correction: string) => void }) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  if (t.statut === 'ponctuation') return <span className="text-gray-400">{t.token}</span>
  if (t.statut === 'correct')     return <span className="text-emerald-600 dark:text-emerald-400 font-medium">{t.token}</span>

  return (
    <span ref={ref} className="relative inline-block">
      <span
        onClick={() => t.suggestions.length > 0 && setOpen(o => !o)}
        className="underline decoration-wavy decoration-red-500 text-red-600 dark:text-red-400 cursor-pointer select-none hover:bg-red-50 dark:hover:bg-red-900/30 rounded px-0.5 transition-colors"
      >
        {t.token}
      </span>
      {open && t.suggestions.length > 0 && (
        <div className="absolute left-0 top-full mt-1 z-20 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl py-1 min-w-[150px]">
          {t.suggestions.map(s => (
            <button
              key={s}
              onClick={() => { onReplace(t.token, s); setOpen(false) }}
              className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 transition-colors"
            >
              {s}
            </button>
          ))}
        </div>
      )}
    </span>
  )
}

// ============================================================
// SENTIMENT BADGE
// ============================================================
function SentimentBadge({ result }: { result: SentimentResult }) {
  const cfg = {
    Positif: { emoji: '😊', bg: 'bg-emerald-50 dark:bg-emerald-900/20', border: 'border-emerald-200 dark:border-emerald-700', text: 'text-emerald-700 dark:text-emerald-400' },
    Négatif: { emoji: '😔', bg: 'bg-red-50 dark:bg-red-900/20',         border: 'border-red-200 dark:border-red-700',         text: 'text-red-700 dark:text-red-400'         },
    Neutre:  { emoji: '😐', bg: 'bg-gray-50 dark:bg-gray-800/40',       border: 'border-gray-200 dark:border-gray-600',       text: 'text-gray-600 dark:text-gray-400'       },
  }
  const c = cfg[result.label]
  const total = result.positifs + result.negatifs
  const posP  = total > 0 ? Math.round((result.positifs / total) * 100) : 50
  const negP  = total > 0 ? Math.round((result.negatifs / total) * 100) : 50

  return (
    <div className={`rounded-2xl border ${c.bg} ${c.border} p-4 space-y-3`}>
      <div className="flex items-center gap-3">
        <span className="text-2xl">{c.emoji}</span>
        <div>
          <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Fihetseham-po</p>
          <p className={`text-lg font-bold ${c.text}`}>
            {result.label}
            <span className="ml-2 text-sm font-normal opacity-60">(tarehimarika : {result.score > 0 ? '+' : ''}{result.score})</span>
          </p>
        </div>
      </div>
      {total > 0 && (
        <div className="space-y-1">
          <div className="flex justify-between text-xs text-gray-400">
            <span>😊 tsara{result.positifs > 1 ? 's' : ''} {result.positifs}</span>
            <span>😔 ratsy{result.negatifs > 1 ? 's' : ''} {result.negatifs} </span>
          </div>
          <div className="flex h-1.5 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700">
            <div className="bg-emerald-400 transition-all duration-700" style={{ width: `${posP}%` }} />
            <div className="bg-red-400 transition-all duration-700"     style={{ width: `${negP}%` }} />
          </div>
        </div>
      )}
      {total === 0 && <p className="text-xs text-gray-400 italic">Tsy misy teny afaka anaovana famakafakana.</p>}
    </div>
  )
}

// ============================================================
// LEMMA CARD — une carte par mot
// ============================================================
function LemmaCard({ w }: { w: WordAnalysis }) {
  if (w.est_stop_word) {
    return (
      <div className="flex flex-col items-center gap-1 px-3 py-2 rounded-xl bg-gray-100 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 opacity-55">
        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">{w.mot}</span>
        <span className="text-[10px] uppercase tracking-widest text-gray-400">stop word</span>
      </div>
    )
  }

  const hasMorphology = w.prefixe || w.infixe || w.suffixe

  return (
    <div className="flex flex-col items-center gap-1.5 px-3 py-3 rounded-xl bg-white dark:bg-gray-800 border border-violet-100 dark:border-violet-900/50 shadow-sm hover:shadow-md transition-shadow">
      {/* Mot original */}
      <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">{w.mot}</span>

      {/* Flèche vers le bas */}
      <svg className="w-3 h-3 text-violet-400" viewBox="0 0 12 12" fill="none">
        <path d="M6 2v8M6 10l-3-3M6 10l3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>

      {/* Racine */}
      <span className="px-2 py-0.5 rounded-lg bg-violet-100 dark:bg-violet-900/40 text-violet-700 dark:text-violet-300 text-sm font-bold tracking-wide">
        {w.racine}
      </span>

      {/* Tags morphologiques */}
      {hasMorphology && (
        <div className="flex flex-wrap justify-center gap-1 mt-0.5">
          {w.prefixe && (
            <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-sky-100 dark:bg-sky-900/30 text-sky-600 dark:text-sky-400 font-mono">
              {w.prefixe}–
            </span>
          )}
          {w.infixe && (
            <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 font-mono">
              –{w.infixe}–
            </span>
          )}
          {w.suffixe && (
            <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-rose-100 dark:bg-rose-900/30 text-rose-500 dark:text-rose-400 font-mono">
              –{w.suffixe}
            </span>
          )}
        </div>
      )}
    </div>
  )
}

// ============================================================
// LEMMA PANEL
// ============================================================
function LemmaPanel({ result }: { result: LemmaResult }) {
  const vrais = result.resultats.filter(w => !w.est_stop_word)
  const stops = result.resultats.filter(w =>  w.est_stop_word)

  return (
    <div className="rounded-2xl border border-violet-200 dark:border-violet-800 bg-violet-50/50 dark:bg-violet-950/20 p-4 space-y-4">
      {/* Header */}
      <div className="flex items-center gap-2">
        <span className="text-xl">🌿</span>
        <div>
          <p className="text-xs text-violet-400 uppercase tracking-wider font-semibold">Lemmatisation</p>
          <p className="text-sm text-violet-700 dark:text-violet-300 font-medium">
            {vrais.length} mot{vrais.length > 1 ? 's' : ''} analysé{vrais.length > 1 ? 's' : ''}
            {stops.length > 0 && (
              <span className="opacity-60"> · {stops.length} stop word{stops.length > 1 ? 's' : ''} ignoré{stops.length > 1 ? 's' : ''}</span>
            )}
          </p>
        </div>
      </div>

      {/* Grille de cartes */}
      <div className="flex flex-wrap gap-2">
        {result.resultats.map((w, i) => (
          <LemmaCard key={i} w={w} />
        ))}
      </div>

      {/* Légende */}
      <div className="flex flex-wrap gap-4 pt-2 border-t border-violet-100 dark:border-violet-800/50">
        {[
          { dot: 'bg-violet-400',  label: 'Racine'   },
          { dot: 'bg-sky-400',     label: 'Préfixe'  },
          { dot: 'bg-amber-400',   label: 'Infixe'   },
          { dot: 'bg-rose-400',    label: 'Suffixe'  },
        ].map(({ dot, label }) => (
          <span key={label} className="flex items-center gap-1.5 text-xs text-gray-400">
            <span className={`inline-block w-2 h-2 rounded-full ${dot}`} />
            {label}
          </span>
        ))}
      </div>
    </div>
  )
}

// ============================================================
// DEBOUNCE HOOK
// ============================================================
function useDebounce<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState(value)
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay)
    return () => clearTimeout(t)
  }, [value, delay])
  return debounced
}

// ============================================================
// BOUTON GÉNÉRIQUE
// ============================================================
function ActionButton({
  onClick, loading, disabled, emoji, label, color,
}: {
  onClick: () => void; loading: boolean; disabled: boolean
  emoji: string; label: string; color: string
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm text-white shadow-md hover:shadow-lg transition-all duration-200 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed ${color}`}
    >
      {loading ? (
        <>
          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
          </svg>
          Analyse…
        </>
      ) : (
        <><span>{emoji}</span>{label}</>
      )}
    </button>
  )
}

// ============================================================
// COMPOSANT PRINCIPAL
// ============================================================
export default function Correcteur() {
  const [phrase, setPhrase] = useState('')
  const [tokens, setTokens] = useState<TokenResult[]>([])
  const [loading, setLoading] = useState(false)
  const [erreur, setErreur] = useState<string | null>(null)
  const [stats, setStats] = useState({ total: 0, erreurs: 0 })

  const [sentiment, setSentiment]               = useState<SentimentResult | null>(null)
  const [loadingSentiment, setLoadingSentiment] = useState(false)
  const [erreurSentiment, setErreurSentiment]   = useState<string | null>(null)

  const [lemma, setLemma]               = useState<LemmaResult | null>(null)
  const [loadingLemma, setLoadingLemma] = useState(false)
  const [erreurLemma, setErreurLemma]   = useState<string | null>(null)

  const phraseDebounced = useDebounce(phrase, 600)

  // Correction automatique à chaque fin de mot (espace)
  useEffect(() => {
    if (!phraseDebounced.trim()) {
      setTokens([])
      setStats({ total: 0, erreurs: 0 })
      return
    }
    if (phraseDebounced.at(-1) !== ' ') return

    const run = async () => {
      setLoading(true); setErreur(null)
      try {
        const data = await corrigerPhrase(phraseDebounced)
        setTokens(data.resultats)
        setStats({
          total:   data.resultats.filter(t => t.statut !== 'ponctuation').length,
          erreurs: data.resultats.filter(t => t.statut === 'erreur').length,
        })
      } catch { setErreur("Impossible de joindre l'API de correction.") }
      finally { setLoading(false) }
    }
    run()
  }, [phraseDebounced])

  const handleReplace = (original: string, correction: string) => {
    setTokens(prev => prev.map(t =>
      t.token === original && t.statut === 'erreur'
        ? { ...t, token: correction, statut: 'correct', suggestions: [] }
        : t
    ))
    setStats(s => ({ ...s, erreurs: Math.max(0, s.erreurs - 1) }))
  }

  const handleSentiment = async () => {
    if (!phrase.trim()) return
    setLoadingSentiment(true); setErreurSentiment(null); setSentiment(null)
    try { setSentiment(await analyserSentiment(phrase)) }
    catch { setErreurSentiment("Impossible d'analyser le sentiment.") }
    finally { setLoadingSentiment(false) }
  }

  const handleLemma = async () => {
    if (!phrase.trim()) return
    setLoadingLemma(true); setErreurLemma(null); setLemma(null)
    try { setLemma(await lemmatiserPhrase(phrase)) }
    catch { setErreurLemma("Impossible de lemmatiser la phrase.") }
    finally { setLoadingLemma(false) }
  }

  const handleChange = (val: string) => {
    setPhrase(val)
    setSentiment(null); setErreurSentiment(null)
    setLemma(null);    setErreurLemma(null)
  }

  const isEmpty = !phrase.trim()

  return (
    <div className="space-y-5">

      {/* ── Textarea ── */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Fehezanteny
        </label>
        <textarea
          value={phrase}
          onChange={e => handleChange(e.target.value)}
          rows={4}
          placeholder="Soraty eto ny fehezanteny malagasy…"
          className="w-full rounded-2xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-indigo-400 resize-none transition"
        />
        <div className="h-4 mt-1">
          {loading && <p className="text-xs text-gray-400 animate-pulse">Correction en cours…</p>}
        </div>
      </div>

      {/* ── Boutons ── */}
      <div className="flex flex-wrap gap-3">
        <ActionButton
          onClick={handleSentiment}
          loading={loadingSentiment}
          disabled={isEmpty}
          emoji="🔍"
          label="Analyser le sentiment"
          color="bg-indigo-600 hover:bg-indigo-700"
        />
        <ActionButton
          onClick={handleLemma}
          loading={loadingLemma}
          disabled={isEmpty}
          emoji="🌿"
          label="Lemmatiser"
          color="bg-violet-600 hover:bg-violet-700"
        />
      </div>

      {/* ── Résultat sentiment ── */}
      {erreurSentiment && (
        <div className="rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 p-3 text-sm text-red-600 dark:text-red-400">{erreurSentiment}</div>
      )}
      {sentiment && <SentimentBadge result={sentiment} />}

      {/* ── Résultat lemmatisation ── */}
      {erreurLemma && (
        <div className="rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 p-3 text-sm text-red-600 dark:text-red-400">{erreurLemma}</div>
      )}
      {lemma && <LemmaPanel result={lemma} />}

      {/* ── Résultat correction orthographique ── */}
      {erreur && (
        <div className="rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 p-3 text-sm text-red-600 dark:text-red-400">{erreur}</div>
      )}
      {tokens.length > 0 && (
        <div className="space-y-3">
          <div className="flex gap-2 text-sm">
            <span className="px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500">{stats.total} mots</span>
            <span className={`px-3 py-1 rounded-full ${
              stats.erreurs === 0
                ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400'
                : 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'
            }`}>
              {stats.erreurs === 0 ? 'Aucune erreur' : `${stats.erreurs} erreur${stats.erreurs > 1 ? 's' : ''}`}
            </span>
          </div>
          <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 p-4 text-base leading-9 space-x-1">
            {tokens.map((t, i) => <Token key={i} t={t} onReplace={handleReplace} />)}
          </div>
        </div>
      )}
    </div>
  )
}

