import React from 'react';


class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleEmailChange(e) {
       this.setState({email: e.target.value});
    }

    handlePasswordChange(e) {
       this.setState({password: e.target.value});
    }

    handleSubmit(e) {
        console.log(this.state.email, this.state.password);
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

export default Login;
