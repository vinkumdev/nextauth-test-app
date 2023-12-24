import axios from 'axios'

const BASE_URL = 'http://localhost:8080/';


const apiAxios = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const Api = {
    get: (url) => {
        return apiAxios.get(url).then((response) => response);
    },
    post: (url, data) => {
        return apiAxios.post(url, data).then((response) => response);
    },
    // Add other HTTP methods as needed (e.g., put, delete, etc.)
};

export const parseResponse = response => {
    if (response.status !== 200 && response.status !== 201) {
        throw Error(response.message)
    }
    if (!response.data) {
        return []
    }
    let data = response.data
    if (typeof data !== 'object') {
        data = []
    }
    return data
}

export const okResult = data => {
    return {
        hasError: false,
        Data: data,
        ServiceStatus: {
            AwaitingResponse: false,
            HasError: false,
            Errors: null,
            Message: null,
        },
    }
}
export const parseErrors = error => {

    let errorResult = {
        hasError: true,
        message: null,
        errors: null,
    }
    if (axios.isCancel(error)) {
        // Request was canceled
        errorResult.message = error.message
    } else if (axios.isAxiosError(error)) {
        // Axios-specific error (e.g., network error, timeout)
        if (error.response) {
            // The request was made and the server responded with a status code
            errorResult.message = error.response.data.message
            errorResult.errors = error.response.data.errors
        } else if (error.request) {
            // The request was made but no response was received
            errorResult.message = "Network error please try again later."
        } else {
            // Something happened in setting up the request that triggered an Error
            errorResult.message = error.message
        }
    } else {
        // Other non-Axios errors
        console.log('Non-Axios error:', error.message);
        errorResult.message = error.message
    }
    return errorResult
}