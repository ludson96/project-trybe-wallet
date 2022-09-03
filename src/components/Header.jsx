import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  sumTotal = (coin) => (
    coin.reduce((acc, curr) => {
      const { value } = curr;
      const { ask } = curr.exchangeRates[curr.currency];
      const total = value * ask;

      return acc + total;
    }, 0)
  );

  render() {
    const { email, coin } = this.props;
    const total = coin.length ? this.sumTotal(coin) : 0.00;
    return (
      <header>
        <h2>TrybeWallet</h2>
        <div>
          <p data-testid="email-field">{ `Email: ${email}` }</p>

          <p>
            {'Despesa total: '}
            <span data-testid="total-field">
              {total.toFixed(2)}
            </span>

            <span data-testid="header-currency-field">
              {' BRL'}
            </span>
          </p>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string,
  coin: PropTypes.objectOf(PropTypes.number),
}.isRequired;

const mapStateToProps = (state) => ({
  email: state.user.email,
  coin: state.wallet.expenses,
});

export default connect(mapStateToProps)(Header);
