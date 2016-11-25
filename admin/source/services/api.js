import { browserHistory } from 'react-router';


class API {
    constructor() {
        this.rootUrl = API_URL;
        this.events = {};
        this.eventsOnce = {};
    }

    authHeader(settings) {
        let token = localStorage.getItem('token');

        if (!token) {
            browserHistory.push('/login');
        }

        settings.headers.Authorization = `Bearer ${token}`;
    }

    prepareUrl(endpoint, querystring=null) {
        if (endpoint.startsWith('/')) {
            endpoint = endpoint.substring(1);
        }

        if (!endpoint.endsWith('/')) {
            endpoint = endpoint + '/';
        }

        if (querystring) {
            let params = $.params(querystring);
            return `${this.rootUrl}${endpoint}?${params}`;
        }
        return `${this.rootUrl}${endpoint}`
    }

    get(url, auth=true, headers={}) {
        let settings = {
            url: url,
            method: "GET",
            dataType: "json",
            headers: headers
        };

        if (auth) {
            this.authHeader(settings);
        }

        return $.ajax(settings);
    }

    post(url, data, auth=true, headers={}) {
        let settings = {
            url: url,
            method: "POST",
            dataType: "json",
            headers: headers
        }

        if (data) {
            settings.data = data;
        };

        if (auth) {
            this.authHeader(settings);
        }

        return $.ajax(settings);
    }

    put(url, data={}, auth=true, headers={}) {
        let settings = {
            url: url,
            method: "PUT",
            data: data,
            dataType: "json",
            headers: headers
        };

        if (auth) {
            this.authHeader(settings);
        }

        return $.ajax(settings);
    }

    patch(url, data, auth=true, headers={}) {
        let settings = {
            url: url,
            method: "PATCH",
            data: data,
            dataType: "json",
            headers: headers
        };

        if (auth) {
            this.authHeader(settings);
        }

        return $.ajax(settings);
    }

    delete(url, auth=true, headers={}) {
        let settings = {
            url: url,
            method: "DELETE",
            dataType: "json",
            headers: headers
        };

        if (auth) {
            this.authHeader(settings);
        }

        return $.ajax(settings);
    }
}

export default API;
