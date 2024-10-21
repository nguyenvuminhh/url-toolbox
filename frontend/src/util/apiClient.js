import axios from "axios"

const apiClient = axios.create({
    baseURL:  'http://localhost:3000/api',
    headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
})

export default apiClient