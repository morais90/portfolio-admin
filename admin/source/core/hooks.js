const authRequired = (nextstate, replace) => {
    let credentials =  localStorage.getItem('token');

    if (!credentials) {
        replace('login');
    } 
}

const authCheck = (nextstate, replace) => {
    let credentials = localStorage.getItem('token');

    if (credentials) {
        replace('dashboard');
    }
}

export {authRequired, authCheck};
