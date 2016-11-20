import API from './api.jsx';


class AuthEndpoint extends API {
    login(username, password){
        let url =  this.prepareUrl('auth/login/');
        let credentials = btoa(`${username}:${password}`);

        return this.post(url, null, false, {'Authorization': `Basic ${credentials}`});
    }

    refresh() {
        let url = this.prepareUrl('auth/refresh/');
        return this.post(url);
    }
}

export default AuthEndpoint;
