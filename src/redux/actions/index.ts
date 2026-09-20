import { Dispatch } from 'redux';
import { getCurrencies } from '../../services/api';
import { Expense, CurrenciesResponse } from '../../types/wallet';

// Action Types
export const EMAIL_TYPE = 'EMAIL_TYPE' as const;
export const REQUEST_COIN = 'REQUEST_COIN' as const;
export const REQUEST_COIN_SUCCESS = 'REQUEST_COIN_SUCCESS' as const;
export const REQUEST_COIN_FAILURE = 'REQUEST_COIN_FAILURE' as const;
export const SAVE_EXPENSE = 'SAVE_EXPENSE' as const;
export const DELETE_EXPENSE = 'DELETE_EXPENSE' as const;
export const EDIT_EXPENSE = 'EDIT_EXPENSE' as const;
export const UPDATE_EXPENSE = 'UPDATE_EXPENSE' as const;

// Action Creators
export const actionEmail = (email: string) => ({
  type: EMAIL_TYPE,
  payload: email,
});

export const requestCoin = () => ({
  type: REQUEST_COIN,
});

export const requestCoinSuccess = (currencies: CurrenciesResponse) => ({
  type: REQUEST_COIN_SUCCESS,
  payload: currencies,
});

export const requestCoinFailure = (error: string) => ({
  type: REQUEST_COIN_FAILURE,
  payload: error,
});

export const saveExpense = (expense: Expense) => ({
  type: SAVE_EXPENSE,
  payload: expense,
});

export const deleteExpense = (id: number) => ({
  type: DELETE_EXPENSE,
  payload: id,
});

export const editExpense = (editor: boolean, idToEdit: number | null = null) => ({
  type: EDIT_EXPENSE,
  payload: { editor, idToEdit },
});

export const updateExpense = (expense: Expense) => ({
  type: UPDATE_EXPENSE,
  payload: expense,
});

// Thunk Actions using Axios
export const fetchCurrencies = () => async (dispatch: Dispatch) => {
  dispatch(requestCoin());
  try {
    const data = await getCurrencies();
    dispatch(requestCoinSuccess(data));
  } catch (error: any) {
    dispatch(requestCoinFailure(error.message || 'Erro ao carregar moedas'));
  }
};

export const fetchSaveExpense = (
  expenseData: Omit<Expense, 'exchangeRates'>
) => async (dispatch: Dispatch) => {
  dispatch(requestCoin());
  try {
    const rates = await getCurrencies();
    const newExpense: Expense = {
      ...expenseData,
      exchangeRates: rates,
    };
    dispatch(saveExpense(newExpense));
  } catch (error: any) {
    dispatch(requestCoinFailure(error.message || 'Erro ao salvar despesa'));
  }
};

export type WalletActionTypes =
  | ReturnType<typeof actionEmail>
  | ReturnType<typeof requestCoin>
  | ReturnType<typeof requestCoinSuccess>
  | ReturnType<typeof requestCoinFailure>
  | ReturnType<typeof saveExpense>
  | ReturnType<typeof deleteExpense>
  | ReturnType<typeof editExpense>
  | ReturnType<typeof updateExpense>;
