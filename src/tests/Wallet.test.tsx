import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from '../redux/store';
import Wallet from '../pages/Wallet';
import * as api from '../services/api';

vi.mock('../services/api', () => ({
  getCurrencies: vi.fn().mockResolvedValue({
    USD: {
      code: 'USD',
      codein: 'BRL',
      name: 'Dólar Americano/Real Brasileiro',
      high: '5.20',
      low: '5.10',
      varBid: '0.01',
      pctChange: '0.19',
      bid: '5.15',
      ask: '5.16',
      timestamp: '1600000000',
      create_date: '2026-09-20 10:00:00',
    },
    EUR: {
      code: 'EUR',
      codein: 'BRL',
      name: 'Euro/Real Brasileiro',
      high: '5.50',
      low: '5.40',
      varBid: '0.02',
      pctChange: '0.20',
      bid: '5.45',
      ask: '5.48',
      timestamp: '1600000000',
      create_date: '2026-09-20 10:00:00',
    },
  }),
}));

const renderWallet = () => {
  return render(
    <Provider store={store}>
      <BrowserRouter>
        <Wallet />
      </BrowserRouter>
    </Provider>
  );
};

describe('Wallet Page Integration', () => {
  it('renderiza o cabeçalho com o saldo inicial e cards de métricas', async () => {
    renderWallet();

    await waitFor(() => {
      expect(screen.getByText(/Finan/i)).toBeInTheDocument();
      expect(screen.getByTestId('total-field')).toBeInTheDocument();
      expect(screen.getByText('Despesas Totais')).toBeInTheDocument();
      expect(screen.getByText('Registros')).toBeInTheDocument();
      expect(screen.getByText('Maior Despesa')).toBeInTheDocument();
    });
  });

  it('carrega e exibe as opções de moedas vindas do mock da API', async () => {
    renderWallet();

    await waitFor(() => {
      expect(api.getCurrencies).toHaveBeenCalled();
      const currencySelect = screen.getByTestId('currency-input');
      expect(currencySelect).toBeInTheDocument();
    });
  });
});
