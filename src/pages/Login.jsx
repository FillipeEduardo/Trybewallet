import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { saveEmailAction } from '../redux/actions';
import '../css/login.css';
import logoTrybe from '../img/logoTrybeWallet.png';

const SIX_DIGITS = 6;

class Login extends React.Component {
  state = {
    email: '',
    password: '',
  };

  handlerchange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  validacao = () => {
    const { email, password } = this.state;
    const validacaoSenha = (password.length < SIX_DIGITS);
    const regexEmail = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
    const validacaoEmail = !regexEmail.test(email);
    return validacaoSenha || validacaoEmail;
  };

  handlerClick = () => {
    const { email } = this.state;
    const { dispatch, history } = this.props;
    dispatch(saveEmailAction(email));
    history.push('/carteira');
  };

  render() {
    const { email, password } = this.state;
    return (
      <div className="container-login">
        <div className=" tela-login ">
          <img src={ logoTrybe } alt="logoTrybe" />
          <form>
            <input
              type="email"
              value={ email }
              name="email"
              id="email"
              onChange={ this.handlerchange }
              data-testid="email-input"
              placeholder="E-mail"
            />
            <input
              type="password"
              name="password"
              onChange={ this.handlerchange }
              value={ password }
              id="password"
              data-testid="password-input"
              placeholder="Senha"
            />
            <button
              onClick={ this.handlerClick }
              disabled={ this.validacao() }
              type="button"
            >
              Entrar
            </button>
          </form>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect()(Login);
