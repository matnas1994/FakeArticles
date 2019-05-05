export const get = url =>
    new Promise(
        (rosolve, reject) => {
            fetch(url, { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('api_token') } })
                .then(response => response.json())
                .then(json => rosolve(json))
        }
    )

const apiCall = (url, method, body, resolve, reject) =>
    fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'Authorization': 'Bearer ' + localStorage.getItem('api_token'),
            'Accept': 'application/json'
        },
        body: JSON.stringify(body)
    }).then(response => {
            response.json().then(json => resolve(json))
    });

export const post = (url, body) => new Promise(
    (resolve, reject) => apiCall(url, 'POST', body, resolve, reject)
)

export const put = (url, body) => new Promise(
    (resolve, reject) => apiCall(url, 'PUT', body, resolve, reject)
)

export const destroy = url => {
    new Promise(
        (resolve, reject) => {
            fetch(url, {
                method: 'DELETE',
                header: {
                    'Content-Type': 'application/json; charset=utf-8',
                    'Authorization': 'Bearer ' + localStorage.getItem('api_token'),
                    'Accept': 'application/json'
                }
            }).then(response => {
                if (response.ok) {
                    resolve(response)
                } else {
                    reject(response)
                }
            })
        }
    )
}