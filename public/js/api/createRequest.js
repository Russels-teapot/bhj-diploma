/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
    const {
        url, headers={}, method, responseType, data={}, callback = () =>{}
    } = options
    const newRequest = new XMLHttpRequest();
    newRequest.withCredentials = true;
    newRequest.responseType = responseType;
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
        // const formData = new FormData();
        // formData.append('login', data.login);
        // formData.append('password', data.password);
        // newRequest.open(method, url)
        // newRequest.setRequestHeader(headers.name, headers.value);
        // newRequest.onload = callback;
        newRequest.send(JSON.stringify(data))
    } else {
        const createURL = ()=>{
            Object.entries(data).map(([key, value]) => `${key}=${value}`);
            const dataString = Object.entries(data).map(([key, value]) => `${key}=${value}`).join("&") ;
            return dataString ? url + '?' + dataString : url
        }
        const returnedURL = createURL();
        newRequest.open('GET', returnedURL)
        newRequest.setRequestHeader(headers.name, headers.value);
        newRequest.send()
    }
};

createRequest({url:'http://localhost:8000/user/current', method:'GET', responseType:'json', data:{}, callback:(err, response)=>{
    console.log(err, response)
    }})