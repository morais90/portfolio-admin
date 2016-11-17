import { withRouter } from 'react-router';


class API {
    constructor() {
        this.rootUrl = API_URL;
        this.events = {};
        this.eventsOnce = {};
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

    get(url, auth=true) {
        let settings = {
            url: url,
            method: "GET",
            dataType: "json"
        };
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
            let token = localStorage.getItem('token');

            if (token) {
                settings.headers.Authorization = `Bearer ${token}`;
            } else {
                this.props.router.push({
                    pathname: 'login'
                })
            }
        }
        return $.ajax(settings);
    }

    put(url, data, auth=true) {
        let settings = {
            url: url,
            method: "PUT",
            data: data,
            dataType: "json"
        };
        return $.ajax(settings);
    }

    patch(url, data, auth=true) {
        let settings = {
            url: url,
            method: "PATCH",
            data: data,
            dataType: "json"
        };
        return $.ajax(settings);
    }

    delete(url, auth=true) {
        let settings = {
            url: url,
            method: "DELETE",
            dataType: "json"
        };
        return $.ajax(settings);
    }
}

export default withRouter(API);
