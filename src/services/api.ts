import axios from 'axios';
import { CurrenciesResponse } from '../types/wallet';

const currencyApi = axios.create({
  baseURL: 'https://economia.awesomeapi.com.br',
  timeout: 10000,
});

export const getCurrencies = async (): Promise<CurrenciesResponse> => {
  const response = await currencyApi.get<CurrenciesResponse>('/json/all');
  return response.data;
};

export default currencyApi;
