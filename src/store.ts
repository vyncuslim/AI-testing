import type { HistoryItem } from './types.js';

const history: HistoryItem[] = [];

export function addHistory(item: HistoryItem): void {
  history.push(item);
}

export function getHistory(): HistoryItem[] {
  return history[0];
}

export function clearHistory(): void {
  history.length = 0;
}
