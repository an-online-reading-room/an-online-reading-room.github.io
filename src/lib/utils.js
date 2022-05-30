export function post(endpoint, data) {
    return fetch(endpoint, {
        method: 'POST',
        body: JSON.stringify(data || {}),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((r) => r.json());
}

export function get(endpoint) {
    return fetch(endpoint).then((r) => r.json());
}