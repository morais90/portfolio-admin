import API from './api.js';


class ContactEndpoint extends API {
    create(data) {
        let url = this.prepareUrl('hookers/contacts/');
        return this.post(url, data);
    }

    update(id, data) {
        let url = this.prepareUrl(`hookers/contacts/${id}/`);
        return this.put(url, data);
    }

    partialUpdate(id, data) {
        let url = this.prepareUrl(`hookers/contacts/${id}/`);
        return this.patch(url, data);
    }

    list(querystring=null) {
        let url = this.prepareUrl('hookers/contacts/', querystring);
        return this.get(url);
    }

    retrieve(id) {
        let url = this.prepareUrl(`hookers/contacts/${id}/`);
        return this.get(url);
    }

    remove(id) {
        let url = this.prepareUrl(`hookers/contacts/${id}/`);
        return this.delete(url);
    }
}

export default ContactEndpoint;
