import axios from "axios";

export const APICaller = async (
    url: string,
    method: "POST" | "GET" | "PUT" | "PATCH" | "DELETE",
    payload?: object,
    customHeaders?: object
) => {
    let statusCode: number = 200;
    let data: any;
    let error: any;

    // baseurl of the backend api
    const BASE_URL = import.meta.env.VITE_API_URL;

    // headers for the api call
    const headers = customHeaders || {
        "Content-Type": "application/json",
        "Authentication": `Bearer `,
    };

    await axios({
        baseURL: BASE_URL,
        url: url,
        method: method,
        data: payload,
        headers: headers
    }).then((res) => {
        statusCode = res.status;
        data = res.data;
    }).catch((err) => {
        statusCode = err.response.status;
        error = err.response.data;
    })

    return { statusCode, data, error };
}