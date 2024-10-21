import axios from '../util/apiClient'

const baseURL = '/login'

export const login = async ({ username, password }) => {
    const res = await axios.post(baseURL, { username, password})
    return res.data
}