export interface Quote {
  id: string;
  quote: string;
  author: string;
  type: string;
  totalSaves?: number;
  isSavedByUser?: boolean
}


export interface QuoteState {
  totalTodayViews: number,
  totalTodaySaved: number
}