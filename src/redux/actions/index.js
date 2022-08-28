export const EMAIL_TYPE = 'EMAIL_TYPE';
export const REQUEST_COIN = 'REQUEST_COIN';
export const REQUEST_COIN_SUCESS = 'REQUEST_COIN_SUCESS';
export const REQUEST_COIN_FAILURE = 'REQUEST_COIN_FAILURE';

export const actionEmail = (email) => ({ type: EMAIL_TYPE, email });

const requestISSCurrencies = () => ({ type: REQUEST_COIN });

const receiveISSCurrenciesSucess = (currencies) => ({
  type: REQUEST_COIN_SUCESS, currencies,
});

const receiveISSCurrenciesFailure = (error) => ({ type: REQUEST_COIN_FAILURE, error });

export const fetchISSCurrencies = () => async (dispatch) => {
  dispatch(requestISSCurrencies());

  try {
    const ISS_URL_API = 'https://economia.awesomeapi.com.br/json/all';
    const response = await fetch(ISS_URL_API);
    const data = await response.json();
    const currencies = Object.keys(data);
    dispatch(receiveISSCurrenciesSucess(currencies));
  } catch (error) {
    console.log('error: ', error);
    dispatch(receiveISSCurrenciesFailure(error.message));
  }
};
