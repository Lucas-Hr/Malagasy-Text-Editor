// lib/api.ts

export type StatutToken = 'correct' | 'erreur' | 'ponctuation'

export interface TokenResult {
  token: string
  statut: StatutToken
  suggestions: string[]
}

export interface CorrectionResponse {
  resultats: TokenResult[]
}

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'https://adriantsoaa-text-editor-malagasy-back.hf.space'

export async function corrigerPhrase(phrase: string): Promise<CorrectionResponse> {
  const res = await fetch(`${API_URL}/corriger`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ phrase }),
  })
  if (!res.ok) throw new Error(`Erreur API: ${res.status}`)
  return res.json()
}