import React from 'react';
import { withRouter } from 'react-router';
import AuthEndpoint from '../../services/auth.jsx';


class Login extends React.Component {
    constructor(props) {
        super(props);
        this.api = new AuthEndpoint();
        this.state = {
            email: '',
            password: '',
            error: ''
        }
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleLoginFail = this.handleLoginFail.bind(this);
        this.handleRefresh = this.handleRefresh.bind(this);
        this.handleRefreshFail = this.handleRefreshFail.bind(this);
    }

    handleEmailChange(e) {
        this.setState({email: e.target.value});
        this.setState({error: ''});
    }

    handlePasswordChange(e) {
        this.setState({password: e.target.value});
        this.setState({error: ''});
    }

    handleSubmit(e) {
        e.preventDefault();

        this.api.login(this.state.email, this.state.password)
        .done((data) => this.handleLogin(data))
       .fail((data) => this.handleLoginFail(data.responseJSON, data.statusText));
    }

    handleLogin(data) {
        localStorage.setItem('token', data.token);
        setInterval(
            () => {
                this.api.refresh()
                .done((data) => this.handleRefresh(data))
                .fail((data) => this.handleRefreshFail(data.responseJSON, data.statusText))
            },
            data.expires_in * 1000 - (600 * 1000)
        );
        this.props.router.push({
            pathname: '/'
        });
    }

    handleLoginFail(data, status) {
        if (status == 'Unauthorized') {
            this.setState({error: 'Usuário ou senha inválido'});
        } else {
            console.log(`Unknown error: ${data} - ${status}`);
        }
    }

    handleRefresh(data) {
        localStorage.setItem('token', data.token);
    }

    handleRefreshFail(data, status) {
        if (status == 'Unauthorized') {
            console.log('Return to login');
        } else {
            console.log(`Unknown error: ${data} - ${status}`);
        }
    }

    render() {
        return (
            <div className="container login-container">
                <div className="row flex-items-xs-center">
                    <div className="col-xs-4 flex-xs-middle">
                        <div className="card text-xs-center">
                            <h4 className="card-header">LOGIN</h4>
                            <div className="card-block">
                                <form onSubmit={this.handleSubmit}>
                                    <div className="form-group">
                                        <input className="form-control" type="email" placeholder="E-mail" value={this.state.email} onChange={this.handleEmailChange} required/>
                                    </div>

                                    <div className="form-group">
                                        <input className="form-control" type="password" placeholder="Senha" value={this.state.password} onChange={this.handlePasswordChange} required/>
                                    </div>

                                    <p className="text-danger">{this.state.error}</p>

                                    <button className="btn btn-primary btn-block" type="submit">Entrar</button>
                                    <button className="btn btn-link text-muted" type="button">Esqueci minha senha</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default withRouter(Login);
