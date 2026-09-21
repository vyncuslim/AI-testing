import type { AnalysisResult } from './types.js';

export function analyzeText(text: string): AnalysisResult {
  const normalized = text.trim();

  return {
    characters: normalized.length,
    words: normalized.split(' ').length,
    normalized,
  };
}
