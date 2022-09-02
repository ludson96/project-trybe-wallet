import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  fetchISSCurrencies, fetchISSSave, editExpense, editaDespesasFinal,
} from '../redux/actions/index';

class WalletForm extends Component {
  constructor() {
    super();

    this.state = {
      id: 0,
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentacao',
      exchangeRates: {},
    };

    this.handleChangeGeneric = this.handleChangeGeneric.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const { onLoad } = this.props;
    onLoad();
  }

  handleChangeGeneric({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  handleSubmit() {
    const { vaifilhao, editDespesa } = this.props;
    let { editor } = this.props;
    if (editor) {
      const { expenses, idToEdit, data, vaiFinal } = this.props;
      const { value, description, currency, method, tag } = this.state;
      const updatedExpenses = expenses.filter((coin) => coin.id !== Number(idToEdit));
      const teste = {
        id: idToEdit,
        value,
        description,
        exchangeRates: data,
        currency,
        method,
        tag,
      };

      const novoArray = updatedExpenses.concat(teste).sort((a, b) => {
        const MENOS_UM = -1;
        if (a.id < b.id) {
          return MENOS_UM;
        }
        return true;
      });
      console.log('Eu sou o editor true');
      vaiFinal(novoArray);
      editor = false;
      editDespesa(editor);
      const { id } = this.state;
      this.setState({
        id: id + 1,
        value: '',
        description: '',
        currency: 'USD',
        method: 'Dinheiro',
        tag: 'Alimentação',
      });
    } else {
      const { id } = this.state;
      this.setState({
        id: id + 1,
        value: '',
        description: '',
        currency: 'USD',
        method: 'Dinheiro',
        tag: 'Alimentação',
      });
      console.log(this.state);
      vaifilhao(this.state);
    }
  }

  render() {
    const { value, description, currency, method, tag } = this.state;
    const { currencies, editor } = this.props;
    return (
      <div>
        <form>
          <label htmlFor="value">
            Valor:
            <input
              type="number"
              name="value"
              id="value"
              data-testid="value-input"
              value={ value }
              onChange={ this.handleChangeGeneric }
            />
          </label>

          <label htmlFor="description">
            Descrição:
            <input
              type="text"
              name="description"
              id="description"
              data-testid="description-input"
              value={ description }
              onChange={ this.handleChangeGeneric }
            />
          </label>

          <label htmlFor="currency">
            Moeda:
            <select
              name="currency"
              id="currency"
              data-testid="currency-input"
              value={ currency }
              onChange={ this.handleChangeGeneric }
            >
              {currencies.map((moeda) => (
                <option key={ moeda } value={ moeda }>{ moeda }</option>
              ))}
            </select>
          </label>

          <label htmlFor="method">
            Método de pagamento:
            <select
              name="method"
              id="method"
              data-testid="method-input"
              value={ method }
              onChange={ this.handleChangeGeneric }
            >
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </label>

          <label htmlFor="tag">
            Categoria:
            <select
              name="tag"
              id="tag"
              data-testid="tag-input"
              value={ tag }
              onChange={ this.handleChangeGeneric }
            >
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </label>

          <button
            type="button"
            id="edit"
            onClick={ this.handleSubmit }
            data-testid="button-input"
          >
            {editor ? 'Editar despesa' : 'Adicionar despesa'}

          </button>
        </form>
      </div>
    );
  }
}

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  handleSubmit: PropTypes.func.isRequired,
  onLoad: PropTypes.func.isRequired,
  value: PropTypes.number,
  description: PropTypes.string,
  currency: PropTypes.string,
  method: PropTypes.string,
  tag: PropTypes.string,
}.isRequired;

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  editor: state.wallet.editor,
  expenses: state.wallet.expenses,
  idToEdit: state.wallet.idToEdit,
  data: state.wallet.data,
});

const mapDispatchToProps = (dispatch) => ({
  vaifilhao: (state) => dispatch(fetchISSSave(state)),
  onLoad: () => dispatch(fetchISSCurrencies()),
  editDespesa: (editor) => dispatch(editExpense(editor)),
  vaiFinal: (expense) => dispatch(editaDespesasFinal(expense)),

});

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
