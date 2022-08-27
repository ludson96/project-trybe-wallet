import React, { Component } from 'react';

class WalletForm extends Component {
  render() {
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
            <select name="coin" id="coim" data-testid="currency-input" />
            <option value=""></option>
          </label>
        </form>
      </div>
    );
  }
}

export default WalletForm;
