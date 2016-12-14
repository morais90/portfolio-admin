import API from './api.js';


class ServiceEndpoint extends API {
    create(data) {
        let url = this.prepareUrl('hookers/services/');
        return this.post(url, data);
    }

    update(id, data) {
        let url = this.prepareUrl(`hookers/services/${id}/`);
        return this.put(url, data);
    }

    partialUpdate(id, data) {
        let url = this.prepareUrl(`hookers/services/${id}/`);
        return this.patch(url, data);
    }

    list(querystring=null) {
        let url = this.prepareUrl('hookers/services/', querystring);
        return this.get(url);
    }

    retrieve(id) {
        let url = this.prepareUrl(`hookers/services/${id}/`);
        return this.get(url);
    }

    remove(id) {
        let url = this.prepareUrl(`hookers/services/${id}/`);
        return this.delete(url);
    }
}

export default ServiceEndpoint;
