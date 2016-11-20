const authRequired = (nextstate, replace) => {
    let credentials =  localStorage.getItem('token');

    if (!credentials) {
        replace('/login');
    }
}

const authCheck = (nextstate, replace) => {
    let credentials = localStorage.getItem('token');

    if (credentials) {
        replace('/');
    }
}

export {authRequired, authCheck};
