const ISS_URL_API = 'https://economia.awesomeapi.com.br/json/all';

const getCurrenciesISS = async () => {
  const response = await fetch(ISS_URL_API);
  const data = await response.json();
  console.log(data);
  return data;
};

export default getCurrenciesISS;
