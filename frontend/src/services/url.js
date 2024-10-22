import axios from '../util/apiClient'
const baseURL = '/urls'

export const newShortenedUrl = async ({ longUrl, shortUrl }) => {
    const res = await axios.post(baseURL, { longUrl, shortUrl })
    return res.data
}

export const getUrlAnalysis = async ({ path, region }) => {
    console.log(path, region)
    const res = await axios.get(baseURL + path + '/analysis', {
        params: {
            region
        }
    })
    return res.data
}