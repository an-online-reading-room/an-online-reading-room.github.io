const base = import.meta.env.VITE_STRAPI_URL;

async function send({ method, path, data, token }) {
    const opts = { method, headers: {} };

    if (path ==="api/upload" && data) {
        opts.headers['Accept'] = '*/*';
        opts.body = data;
    }
    else if (data) {
        opts.headers['Content-Type'] = 'application/json';
        opts.body = JSON.stringify(data);
    }

    if (token) {
        opts.headers['Authorization'] = `Bearer ${token}`;
    }
    console.log(opts)
    return fetch(`${base}/${path}`, opts)
        .then((r) => r.text())
        .then((json) => {
            try {
                //console.log(json)
                return JSON.parse(json);
            } catch (err) {
                //console.log(json)
                return json;
            }
        });
}

export function get(path, token) {
    // @ts-ignore
    return send({ method: 'GET', path, token });
}

export function del(path, token) {
    // @ts-ignore
    return send({ method: 'DELETE', path, token });
}

export function post(path, data, token) {

    return send({ method: 'POST', path, data, token });
}

export function put(path, data, token) {
    return send({ method: 'PUT', path, data, token });
}