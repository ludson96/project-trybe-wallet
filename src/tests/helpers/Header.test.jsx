import React from 'react';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../../App';
import renderWithRouterAndRedux from './renderWith';
import mockData from './mockData';

const mockInitialState = {
  wallet: {
    currencies: Object.keys(mockData),
    expenses: [{
      id: 0,
      value: '10',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Saúde',
      description: 'Descrição',
      exchangeRates: mockData,
    }],
    editor: false,
    idToEdit: 0,
  },
};

const URLCarteira = '/carteira';

describe('Testando o Header', () => {
  it('Testando se o email digitado aparece no header', () => {
    renderWithRouterAndRedux(<App />);

    const inputEmail = screen.getByLabelText(/Email/i);
    userEvent.type(inputEmail, 'tryber@teste.com');

    const inputPassword = screen.getByLabelText(/Senha/i);
    userEvent.type(inputPassword, '123456');

    const btnEntrar = screen.getByRole('button', { name: /entrar/i });
    userEvent.click(btnEntrar);

    const email = screen.getByText(/tryber@teste.com/i);
    expect(email).toBeInTheDocument();
  });

  it('Teste no WalletForm', () => {
    renderWithRouterAndRedux(<App />, { initialEntries: [URLCarteira] });

    const trybeWallet = screen.getByText(/trybeWallet/i);
    expect(trybeWallet).toBeInTheDocument();

    const value = screen.getByRole('spinbutton', { name: /valor/i });
    const coin = screen.getByRole('combobox', { name: /moeda/i });
    const MWthod = screen.getByRole('combobox', { name: /Método de pagamento:/i });
    const category = screen.getByRole('combobox', { name: /Categoria/i });
    const description = screen.getByRole('textbox', { name: /descrição/i });

    expect(value).toBeInTheDocument();
    expect(coin).toBeInTheDocument();
    expect(MWthod).toBeInTheDocument();
    expect(category).toBeInTheDocument();
    expect(description).toBeInTheDocument();
  });

  it('Testando mock simulada, se retorna a soma correta', () => {
    renderWithRouterAndRedux(
      <App />,
      { initialState: mockInitialState,
        initialEntries: [URLCarteira] },
    );

    const sum = screen.getByText(/despesa total:/i);
    expect(sum).toHaveTextContent('47.53');
    expect(sum).toHaveTextContent('BRL');
  });
});

describe('Testando Table.jsx e WalletForm.jsx', () => {
  it('Verificando se ao excluir uma despesa altera no total no Header', () => {
    renderWithRouterAndRedux(
      <App />,
      { initialState: mockInitialState, initialEntries: [URLCarteira] },
    );
    const sum = screen.getByText(/despesa total:/i);
    expect(sum).toHaveTextContent('47.53');

    const btnDelete = screen.getByRole('button', { name: /excluir/i });
    expect(btnDelete).toBeInTheDocument();

    userEvent.click(btnDelete);

    expect(btnDelete).not.toBeInTheDocument();
    expect(sum).toHaveTextContent('0.00');
  });

  it('Testando se consigo editar os valores da minha despesa', () => {
    renderWithRouterAndRedux(
      <App />,
      { initialState: mockInitialState, initialEntries: [URLCarteira] },
    );
    const sum = screen.getByText(/despesa total:/i);
    const value = screen.getByRole('spinbutton', { name: /valor/i });
    const btnEdit = screen.getByRole('button', { name: 'Editar' });
    const btdAdc = screen.getByRole('button', { name: 'Adicionar despesa' });
    const valueTd = screen.getAllByRole('cell');

    expect(sum).toHaveTextContent('47.53');
    expect(value).toHaveValue(null);
    expect(btnEdit).toBeInTheDocument();
    expect(btdAdc).toBeInTheDocument();
    expect(valueTd[3]).toHaveTextContent('10.00');

    userEvent.click(btnEdit);
    console.log(btnEdit);

    userEvent.type(value, '20');

    const dtnEditExpenses = screen.getByRole('button', { name: 'Editar despesa' });
    expect(dtnEditExpenses).toBeInTheDocument();

    // userEvent.click(dtnEditExpenses);

    // expect(valueTd[3]).toHaveTextContent('20.00');
  });

  it('Testando se ', async () => {
    const { store } = renderWithRouterAndRedux(
      <App />,
      { initialEntries: [URLCarteira] },
    );
    const value = screen.getByRole('spinbutton', { name: /valor/i });
    const MWthod = screen.getByRole('combobox', { name: /Método de pagamento:/i });
    const btnAdc = screen.getByRole('button', { name: /adicionar despesa/i });

    expect(btnAdc).toBeInTheDocument();
    expect(value).toBeInTheDocument();
    expect(MWthod).toBeInTheDocument();

    userEvent.type(value, '40');
    fireEvent.change(MWthod, 'Cartão de crédito');
    userEvent.click(btnAdc);

    console.log(store.getState());
    await waitFor(() => expect(store.getState().wallet.expenses[0].value).toBe('40'));
    expect(value).toHaveValue(null);
  });
});
