import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Table extends Component {
  render() {
    const { expenses } = this.props;
    console.log('Eu sou o expenses: ', expenses[0]);
    return (
      <table>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          {expenses && expenses.map((coin) => {
            console.log(coin.exchangeRates[coin.currency]);
            const { name, ask } = coin.exchangeRates[coin.currency];
            const teste = name.split('/');
            console.log('coin: ', Number(ask).toFixed(2));
            return (
              <tr key={ expenses.id }>
                <td>{coin.description}</td>
                <td>{coin.tag}</td>
                <td>{coin.method}</td>
                <td>{Number(coin.value).toFixed(2)}</td>
                <td>{name}</td>
                <td>{Number(ask).toFixed(2)}</td>
                <td>{(Number(coin.value) * Number(ask)).toFixed(2)}</td>
                <td>{teste[1]}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}

Table.propTypes = {
  expenses: PropTypes.string,
}.isRequired;

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Table);
