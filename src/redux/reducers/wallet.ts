import { WalletState, Expense } from '../../types/wallet';
import {
  REQUEST_COIN,
  REQUEST_COIN_SUCCESS,
  REQUEST_COIN_FAILURE,
  SAVE_EXPENSE,
  DELETE_EXPENSE,
  EDIT_EXPENSE,
  UPDATE_EXPENSE,
  WalletActionTypes,
} from '../actions/index';

const loadExpensesFromStorage = (): Expense[] => {
  try {
    const saved = localStorage.getItem('financetrack_expenses');
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

const saveExpensesToStorage = (expenses: Expense[]) => {
  try {
    localStorage.setItem('financetrack_expenses', JSON.stringify(expenses));
  } catch (e) {
    console.error('Falha ao salvar no localStorage', e);
  }
};

const INITIAL_STATE: WalletState = {
  currencies: [],
  expenses: loadExpensesFromStorage(),
  editor: false,
  idToEdit: null,
  loading: false,
  error: null,
};

const wallet = (state = INITIAL_STATE, action: WalletActionTypes): WalletState => {
  switch (action.type) {
    case REQUEST_COIN:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case REQUEST_COIN_SUCCESS: {
      const filteredCurrencies = Object.keys(action.payload).filter(
        (coin) => coin !== 'USDT'
      );
      return {
        ...state,
        loading: false,
        currencies: filteredCurrencies,
      };
    }

    case REQUEST_COIN_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case SAVE_EXPENSE: {
      const updatedExpenses = [...state.expenses, action.payload];
      saveExpensesToStorage(updatedExpenses);
      return {
        ...state,
        loading: false,
        expenses: updatedExpenses,
      };
    }

    case DELETE_EXPENSE: {
      const remainingExpenses = state.expenses.filter(
        (expense) => expense.id !== action.payload
      );
      saveExpensesToStorage(remainingExpenses);
      return {
        ...state,
        expenses: remainingExpenses,
      };
    }

    case EDIT_EXPENSE:
      return {
        ...state,
        editor: action.payload.editor,
        idToEdit: action.payload.idToEdit,
      };

    case UPDATE_EXPENSE: {
      const updatedExpenses = state.expenses.map((expense) =>
        expense.id === action.payload.id ? action.payload : expense
      );
      saveExpensesToStorage(updatedExpenses);
      return {
        ...state,
        editor: false,
        idToEdit: null,
        expenses: updatedExpenses,
      };
    }

    default:
      return state;
  }
};

export default wallet;
