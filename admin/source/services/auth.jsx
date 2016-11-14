import API from './api.jsx';


class AuthEndpoint extends API {
    login(username, password){
        let url =  this.prepareUrl('auth/login/');

        return this.post(url, null, auth=false, extra_settings={username: username, password: password});
    }
}

export default AuthEndpoint;
