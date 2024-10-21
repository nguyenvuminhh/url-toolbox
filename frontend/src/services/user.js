import axios from "../util/apiClient"

const baseURL = '/users'

export const signUp = async ({ name, username, password, phoneNumber, email }) => {
    const res = await axios.post(baseURL, { name, username, password, phoneNumber, email })
    return res.data
}