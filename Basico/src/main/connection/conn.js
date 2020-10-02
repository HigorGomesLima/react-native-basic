import axios from 'axios';

export const URL_API = 'http://api.setcanhoto.com.br/api_campo_racoes/v1/api.php';

export const post = function (data) {

    var body = new FormData();

    for (var value in data){
        body.append(value,data[value]);
    }
    
    const post = axios({
        method: 'post',
            url: URL_API,
            data: body,
            headers: {'Content-Type': 'multipart/form-data' }
    });

    return post;
}

export const get = function (data) {

    var body = new FormData();

    for (var value in data){
        body.append(value,data[value]);
    }

    const get = axios({
        method: 'post',
            url: URL_API,
            data: body,
            headers: {'Content-Type': 'multipart/form-data' }
    });

    return get;
    
}