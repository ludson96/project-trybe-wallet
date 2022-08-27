import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { actionEmail } from '../redux/actions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
    };

    this.handlerChangeGeneric = this.handlerChangeGeneric.bind(this);
    this.handlerSubmit = this.handlerSubmit.bind(this);
  }

  handlerChangeGeneric({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  handlerSubmit() {
    const { history, actionGetEmail } = this.props;
    console.log(this.state);
    actionGetEmail(this.state);
    history.push('/carteira');
  }

  render() {
    const { password, email } = this.state;
    let isDisabled = true;
    const NUMBER = 6;
    // const VALID = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.([a-z]+)?$/i;
    if (password.length >= NUMBER && /\S+@\S+\.\S+/.test(email)) {
      isDisabled = false;
    } else {
      isDisabled = true;
    }

    return (
      <div>
        <form>
          <label htmlFor="email">
            Email:
            <input
              type="email"
              name="email"
              data-testid="email-input"
              required
              onChange={ this.handlerChangeGeneric }
            />
          </label>

          <label htmlFor="password">
            Senha:
            <input
              type="text"
              name="password"
              data-testid="password-input"
              minLength={ 6 }
              required
              onChange={ this.handlerChangeGeneric }
            />
          </label>

          <button
            type="button"
            disabled={ isDisabled }
            onClick={ this.handlerSubmit }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  actionGetEmail: PropTypes.func.isRequired,
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  actionGetEmail: (email) => dispatch(actionEmail(email)),
});

export default connect(null, mapDispatchToProps)(Login);
