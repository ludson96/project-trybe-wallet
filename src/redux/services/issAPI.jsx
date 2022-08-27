const ISS_URL_API = 'https://economia.awesomeapi.com.br/json/all';

export default getCurrenciesISS = async () => {
  const response = await fetch(ISS_URL_API);
  const data = await response.json();
  return data;
};
