import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from '../redux/store';
import Login from '../pages/Login';

const renderWithProviders = (ui: React.ReactElement) => {
  return render(
    <Provider store={store}>
      <BrowserRouter>{ui}</BrowserRouter>
    </Provider>
  );
};

describe('Login Component', () => {
  it('renderiza os campos de email, senha e botão de entrar', () => {
    renderWithProviders(<Login />);
    
    expect(screen.getByTestId('email-input')).toBeInTheDocument();
    expect(screen.getByTestId('password-input')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Acessar Carteira/i })).toBeInTheDocument();
  });

  it('o botão permanece desabilitado com credenciais inválidas', () => {
    renderWithProviders(<Login />);
    const submitBtn = screen.getByRole('button', { name: /Acessar Carteira/i });
    expect(submitBtn).toBeDisabled();

    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');

    // Email inválido e senha curta
    fireEvent.change(emailInput, { target: { value: 'invalido' } });
    fireEvent.change(passwordInput, { target: { value: '123' } });
    expect(submitBtn).toBeDisabled();
  });

  it('habilita o botão quando o email e a senha são válidos', () => {
    renderWithProviders(<Login />);
    const submitBtn = screen.getByRole('button', { name: /Acessar Carteira/i });
    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');

    fireEvent.change(emailInput, { target: { value: 'ludson@teste.com' } });
    fireEvent.change(passwordInput, { target: { value: '123456' } });

    expect(submitBtn).toBeEnabled();
  });
});
