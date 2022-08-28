import {
  REQUEST_COIN, REQUEST_COIN_SUCESS, REQUEST_COIN_FAILURE,
} from '../actions/index';

const INITIAL_STATE = {
  currencies: [],
  error: '',
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_COIN: return {
    ...state,
  };
  case REQUEST_COIN_SUCESS: return {
    ...state,
    currencies: action.currencies.filter((coin) => coin !== 'USDT'),
  };
  case REQUEST_COIN_FAILURE: return {
    ...state,
    error: action.error,
  };
  default: return state;
  }
};

export default wallet;
