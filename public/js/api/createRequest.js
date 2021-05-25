/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
    const {
        url, method, data={}, callback = () =>{}
    } = options
    const newRequest = new XMLHttpRequest();
    newRequest.withCredentials = true;
    newRequest.responseType = 'json';
    newRequest.onload = ()=> {
        if(newRequest.response.success) {
            callback(null, newRequest.response)
        } else {
            callback(newRequest.response.error, null)
        }
    };
    if (method !== 'GET') {
        newRequest.open(method, url);
        newRequest.setRequestHeader('Content-type', 'application/json')
        newRequest.send(JSON.stringify(data))
    } else {
        const createURL = ()=>{
            Object.entries(data).map(([key, value]) => `${key}=${value}`);
            const dataString = Object.entries(data).map(([key, value]) => `${key}=${value}`).join("&") ;
            return dataString ? url + '?' + dataString : url
        }
        const returnedURL = createURL();
        newRequest.open('GET', returnedURL);
        newRequest.send()
    }
};

