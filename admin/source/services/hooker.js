import API from './api.js';


class HookerEndpoint extends API {
    create(data) {
        let url = this.prepareUrl('hookers');
        return this.post(url, data);
    }

    update(id, data) {
        let url = this.prepareUrl(`hookers/${id}/`);
        return this.put(url, data);
    }

    partialUpdate(id, data) {
        let url = this.prepareUrl(`hookers/${id}/`);
        return this.patch(url, data);
    }

    list(querystring=null) {
        let url = this.prepareUrl('hookers', querystring);
        return this.get(url);
    }

    retrieve(id) {
        let url = this.prepareUrl(`hookers/${id}/`);
        return this.get(url);
    }

    remove(id) {
        let url = this.prepareUrl(`hookers/${id}/`);
        return this.delete(url);
    }

    undelete(id) {
        let url = this.prepareUrl(`hookers/${id}/undelete/`);
        return this.post(url);
    }

    createContact(id, data) {
        let url = this.prepareUrl(`hookers/${id}/contacts/`);
        return this.post(url, data);
    }

    listContact(id) {
        let url = this.prepareUrl(`hookers/${id}/contacts/`);
        return this.get(url);
    }
}

export default HookerEndpoint;
