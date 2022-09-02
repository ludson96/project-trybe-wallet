import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../../App';
import renderWithRouterAndRedux from './renderWith';

describe('Testando o Login', () => {
  it('Verificando se possui um campo email e senha', () => {
    renderWithRouterAndRedux(<App />);
    const inputEmail = screen.getByLabelText(/Email/i);
    expect(inputEmail).toBeInTheDocument();
    expect(inputEmail).toHaveProperty('type', 'email');

    const inputPassword = screen.getByLabelText(/Senha/i);
    expect(inputPassword).toBeInTheDocument();
    expect(inputPassword).toHaveProperty('type', 'text');
  });

  it('Testando se digitar um email e/ou senha invalido', () => {
    renderWithRouterAndRedux(<App />);
    const inputEmail = screen.getByLabelText(/Email/i);
    const inputPassword = screen.getByLabelText(/Senha/i);
    userEvent.type(inputEmail, 'tryber@teste.com');
    userEvent.type(inputPassword, '123456');

    const btnEntrar = screen.getByRole('button', { name: /entrar/i });
    expect(btnEntrar).not.toBeDisabled();
  });

  it('Testando se inicia no "/"', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/');

    const btnEntrar = screen.getByRole('button', { name: /entrar/i });
    userEvent.click(btnEntrar);
  });

  it('Testando se ao clicar no botão é redirecionado para "/carteira"', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const inputEmail = screen.getByLabelText(/Email/i);
    userEvent.type(inputEmail, 'tryber@teste.com');

    const inputPassword = screen.getByLabelText(/Senha/i);
    userEvent.type(inputPassword, '123456');

    const btnEntrar = screen.getByRole('button', { name: /entrar/i });
    userEvent.click(btnEntrar);

    const { location: { pathname } } = history;
    expect(pathname).toBe('/carteira');
  });
});
