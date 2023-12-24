import { Api, parseResponse, okResult, parseErrors } from './axiosBase';

export const getUsers = async (payload) => {
    try {
        const response = await Api.get(`/user/list?page=${payload.page}&size=${payload.size}`)
        let data = parseResponse(response)
        return okResult(data)
    } catch (error) {
        return parseErrors(error)
    }
}

export const getUserByEmail = async (email) => {
    try {
        const response = await Api.get(`/user/find_by_email?email=${email}`)
        let data = parseResponse(response)
        return okResult(data)
    } catch (error) {
        return parseErrors(error)
    }
}

export const getAllLanguages = async () => {
    try {
        const response = await Api.get('/user/get_all_languages')
        let data = parseResponse(response)
        return okResult(data)
    } catch (error) {
        return parseErrors(error)
    }
}


export const userService = {
    getUsers,
    getUserByEmail,
    getAllLanguages
}