import { Api, parseResponse, okResult, parseErrors } from './axiosBase';

const registerByEmail = async (payload) => {
    try {
        const response = await Api.post('/auth/register', payload)
        let data = parseResponse(response)
        return okResult(data)
    } catch (error) {
        return parseErrors(error)
    }
}

const loginOrRegisterByOauth2 = async (payload) => {
    try {
        const response = await Api.post('/auth/oauth2', payload)
        let data = parseResponse(response)
        return okResult(data)
    } catch (error) {
        return parseErrors(error)
    }
}

const loginByEmailOrUsername = async (payload) => {
    try {
        const response = await Api.post('/auth/login', payload)
        let data = parseResponse(response)
        return okResult(data)
    } catch (error) {
        return parseErrors(error)
    }
}

const generateToken = async (payload) => {
    try {
        const response = await Api.post('/auth/token', payload)
        let data = parseResponse(response)
        return okResult(data)
    } catch (error) {
        return parseErrors(error)
    }
}

export const authService = {
    loginOrRegisterByOauth2,
    loginByEmailOrUsername,
    registerByEmail,
    generateToken,
}
