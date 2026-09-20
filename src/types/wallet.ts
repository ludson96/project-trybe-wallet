export interface CurrencyDetail {
  code: string;
  codein: string;
  name: string;
  high: string;
  low: string;
  varBid: string;
  pctChange: string;
  bid: string;
  ask: string;
  timestamp: string;
  create_date: string;
}

export type CurrenciesResponse = Record<string, CurrencyDetail>;

export interface Expense {
  id: number;
  value: string;
  description: string;
  currency: string;
  method: string;
  tag: string;
  exchangeRates: CurrenciesResponse;
}

export interface WalletState {
  currencies: string[];
  expenses: Expense[];
  editor: boolean;
  idToEdit: number | null;
  loading: boolean;
  error: string | null;
}

export interface UserState {
  email: string;
}

export interface RootState {
  user: UserState;
  wallet: WalletState;
}
