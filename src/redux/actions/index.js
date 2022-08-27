import getCurrenciesISS from '../services/issAPI';

export const EMAIL_TYPE = 'EMAIL_TYPE';
export const REQUEST_COIN = 'REQUEST_COIN';
export const REQUEST_COIN_SUCESS = 'REQUEST_COIN_SUCESS';
export const REQUEST_COIN_FAILURE = 'REQUEST_COIN_FAILURE';

export const actionEmail = (email) => ({
  type: EMAIL_TYPE, email });

const requestISSCurrencies = () => ({ type: REQUEST_COIN });

const receiveISSCurrenciesSucess = (coin) => ({ type: REQUEST_COIN_SUCESS, coin });

const receiveISSCurrenciesFailure = (error) => ({ type: REQUEST_COIN_FAILURE, error });

export const fetchISSCurrencies = () => async (dispatch) => {
  dispatch(requestISSCurrencies());

  try {
    const response = await getCurrenciesISS();
    console.log(response);
    dispatch(receiveISSCurrenciesSucess(response));
  } catch (error) {
    dispatch(receiveISSCurrenciesFailure(error));
  }
};
