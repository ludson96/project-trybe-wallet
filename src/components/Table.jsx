import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteExpense, editExpense } from '../redux/actions';

class Table extends Component {
  constructor() {
    super();

    this.clickDelete = this.clickDelete.bind(this);
    this.clickEdit = this.clickEdit.bind(this);
  }

  clickEdit({ target }) {
    const { editDespesa, editor } = this.props;

    const idToEdit = Number(target.id);

    editDespesa(editor, idToEdit);
  }

  clickDelete({ target }) {
    const { expenses, delExpense } = this.props;

    const updatedExpenses = expenses.filter((coin) => coin.id !== Number(target.id));
    delExpense(updatedExpenses);
  }

  render() {
    const { expenses } = this.props;
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
            const { name, ask } = coin.exchangeRates[coin.currency];
            const filtro = name.split('/');
            return (
              <tr key={ coin.id }>
                <td>{coin.description}</td>
                <td>{coin.tag}</td>
                <td>{coin.method}</td>
                <td>{Number(coin.value).toFixed(2)}</td>
                <td>{name}</td>
                <td>{Number(ask).toFixed(2)}</td>
                <td>{(Number(coin.value) * Number(ask)).toFixed(2)}</td>
                <td>{filtro[1]}</td>
                <td>
                  <button
                    type="button"
                    id={ coin.id }
                    data-testid="edit-btn"
                    onClick={ this.clickEdit }
                  >
                    Editar
                  </button>
                  <button
                    type="button"
                    id={ coin.id }
                    data-testid="delete-btn"
                    onClick={ this.clickDelete }
                  >
                    Excluir
                  </button>
                </td>
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
  editor: state.wallet.editor,
});

const mapDispatchToProps = (dispatch) => ({
  delExpense: (updatedExpenses) => dispatch(deleteExpense(updatedExpenses)),
  editDespesa: (editor, idToEdit) => dispatch(editExpense(editor, idToEdit)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);
