import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchISSCurrencies } from '../redux/actions/index';

class WalletForm extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchISSCurrencies());
  }

  render() {
    const { currencies } = this.props;
    return (
      <div>
        <form>
          <label htmlFor="value">
            Valor:
            <input type="number" name="value" data-testid="value-input" />
          </label>

          <label htmlFor="description">
            Descrição:
            <input type="text" name="description" data-testid="description-input" />
          </label>

          <label htmlFor="coim">
            Moeda:
            <select
              name="coin"
              id="coin"
              data-testid="currency-input"
            >
              {currencies.map((coin) => (
                <option key={ coin } value={ coin }>{ coin }</option>
              ))}
            </select>
          </label>

          <label htmlFor="payment">
            Método de pagemento:
            <select name="payment" data-testid="method-input">
              <option value="dinheiro">Dinheiro</option>
              <option value="cartao-credito">Cartão de crédito</option>
              <option value="cartao-debito">Cartão de débito</option>
            </select>
          </label>

          <label htmlFor="category">
            Categoria:
            <select name="category" data-testid="tag-input">
              <option value="alimentacao">Alimentação</option>
              <option value="lazer">Lazer</option>
              <option value="trabalho">Trabalho</option>
              <option value="transporte">Transporte</option>
              <option value="saude">Saúde</option>
            </select>
          </label>
        </form>
      </div>
    );
  }
}

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

export default connect(mapStateToProps)(WalletForm);
