import API from './api.js';


class UserEndpoint extends API {
    create(data) {
        let url = this.prepareUrl('users');
        return this.post(url);
    }

    update(id, data) {
        let url = this.prepareUrl(`users/${id}/`);
        return this.put(url, data);
    }

    partialUpdate(id, data) {
        let url = this.prepareUrl(`users/${id}/`);
        return this.patch(url, data);
    }

    list(querystring=null) {
        let url = this.prepareUrl('users', querystring);
        return this.get(url);
    }

    retrieve(id) {
        let url = this.prepareUrl(`users/${id}/`);
        return this.get(url);
    }

    remove(id) {
        let url = this.prepareUrl(`users/${id}/`);
        return this.delete(url);
    }

    undelete(id) {
        let url = this.prepareUrl(`users/${id}/undelete/`);
        return this.post(url);
    }
}

export default UserEndpoint;
