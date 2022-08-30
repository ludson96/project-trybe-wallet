import {
  REQUEST_COIN, REQUEST_COIN_SUCESS, REQUEST_COIN_FAILURE, SAVE_TYPE, DELETE_EXPENSE,
} from '../actions/index';

const INITIAL_STATE = {
  currencies: [],
  error: '',
  expenses: [],
};

// const addId = (expenses) => {
//   if (expenses.length) {
//     return expenses.map((element, i) => {
//       const teste = (element.id = i, element);
//       return teste;
//     });
//   }
// };

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

  default: return state;
  }
};

export default wallet;
