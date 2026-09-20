import { describe, it, expect } from 'vitest';
import walletReducer from '../redux/reducers/wallet';
import {
  requestCoinSuccess,
  saveExpense,
  deleteExpense,
} from '../redux/actions';
import { Expense } from '../types/wallet';

const mockCurrencies = {
  USD: {
    code: 'USD',
    codein: 'BRL',
    name: 'Dólar Americano/Real Brasileiro',
    high: '5.20',
    low: '5.10',
    varBid: '0.01',
    pctChange: '0.19',
    bid: '5.15',
    ask: '5.16',
    timestamp: '1600000000',
    create_date: '2026-09-20 10:00:00',
  },
  USDT: {
    code: 'USDT',
    codein: 'BRL',
    name: 'Tether/Real Brasileiro',
    high: '5.20',
    low: '5.10',
    varBid: '0.01',
    pctChange: '0.19',
    bid: '5.15',
    ask: '5.16',
    timestamp: '1600000000',
    create_date: '2026-09-20 10:00:00',
  },
};

const mockExpense: Expense = {
  id: 0,
  value: '10',
  description: 'Almoço',
  currency: 'USD',
  method: 'Dinheiro',
  tag: 'Alimentação',
  exchangeRates: mockCurrencies,
};

describe('Wallet Reducer with Vitest', () => {
  it('filtra USDT da lista de moedas ao disparar REQUEST_COIN_SUCCESS', () => {
    const initialState = {
      currencies: [],
      expenses: [],
      editor: false,
      idToEdit: null,
      loading: false,
      error: null,
    };

    const nextState = walletReducer(initialState, requestCoinSuccess(mockCurrencies));
    expect(nextState.currencies).toContain('USD');
    expect(nextState.currencies).not.toContain('USDT');
  });

  it('adiciona uma despesa ao estado global com SAVE_EXPENSE', () => {
    const initialState = {
      currencies: ['USD'],
      expenses: [],
      editor: false,
      idToEdit: null,
      loading: false,
      error: null,
    };

    const nextState = walletReducer(initialState, saveExpense(mockExpense));
    expect(nextState.expenses).toHaveLength(1);
    expect(nextState.expenses[0].description).toBe('Almoço');
  });

  it('remove uma despesa ao disparar DELETE_EXPENSE', () => {
    const stateWithExpense = {
      currencies: ['USD'],
      expenses: [mockExpense],
      editor: false,
      idToEdit: null,
      loading: false,
      error: null,
    };

    const nextState = walletReducer(stateWithExpense, deleteExpense(0));
    expect(nextState.expenses).toHaveLength(0);
  });
});
