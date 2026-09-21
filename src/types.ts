export interface AnalysisResult {
  characters: number;
  words: number;
  normalized: string;
}

export interface HistoryItem {
  requestId: string;
  result: AnalysisResult;
  createdAt: string;
}

export interface ApiErrorBody {
  error: {
    code: string;
    message: string;
  };
}
