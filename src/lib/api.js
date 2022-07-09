const base = import.meta.env.VITE_STRAPI_URL;

async function send({ method, path, data, token }) {
    const opts = { method, headers: {} };

    if (path === "api/upload" && data) {
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
    //console.log(opts)
    return fetch(`${base}/${path}`, opts)
        .then(res => {
            if(res.ok) {
                return res.json()
            } 
            throw new Error("api: something went wrong")
        })
        .then(json => transform(json))
        .catch(console.error)
}

function transform(json) {
    // console.log("transforming response.")
    let transJson

    if(json.data instanceof Array) {
        transJson = json.data.map(attr => {
            return transform({
                data: attr
            })
        })
    } 
    else if(json.data instanceof Object) {
        // console.log(json)
        transJson = { 
            id: json.data.id,
            ...json.data.attributes
        }

        for(let key in transJson) {
            const value = transJson[key]
            if(value == null) {
                continue
            }
            else {
                // console.log(key)
                if(value.hasOwnProperty('data')) {
                    transJson[key] = transform(transJson[key])
                } 
            }
           
        }
    } else {
        transJson = json
    }

//    console.log(transJson)

    return transJson
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

