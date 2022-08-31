import {
  REQUEST_COIN, REQUEST_COIN_SUCESS, REQUEST_COIN_FAILURE,
  SAVE_TYPE, DELETE_EXPENSE, EDIT_EXPENSE,
} from '../actions/index';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: '',
  error: '',
};

const update = (expense, currencies) => {
  const coinInfo = Object.entries(currencies)
    .reduce((acc, curr) => {
      const [coinName, coinInfos] = curr;
      acc[coinName] = coinInfos;
      return acc;
    }, {});
  expense.exchangeRates = coinInfo;
  return expense;
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_COIN: return {
    ...state,
  };

  case REQUEST_COIN_SUCESS: {
    const coinFilter = Object.keys(action.currencies)
      .filter((coin) => coin !== 'USDT');
    return {
      ...state,
      currencies: coinFilter,
    };
  }

  case REQUEST_COIN_FAILURE: return {
    ...state,
    error: action.error,
  };

  case SAVE_TYPE: {
    const teste = [...state.expenses, update(action.expense, action.currencies)];
    return {
      ...state,
      expenses: teste,
    };
  }

  case DELETE_EXPENSE: return {
    ...state,
    expenses: action.updatedExpenses,
  };

  case EDIT_EXPENSE:
    if (!action.editor) {
      state.editor = true;
    } else {
      state.editor = false;
    }
    console.log(action);
    return {
      ...state,
      editor: state.editor,
      idToEdit: action.idToEdit,
    };

  default: return state;
  }
};

export default wallet;
