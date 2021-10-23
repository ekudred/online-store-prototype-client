import axios from 'axios'
import { API_URL } from '../config'

const api = axios.create({
  withCredentials: true,
  baseURL: API_URL,
})

api.interceptors.request.use(config => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`

  return config
})

api.interceptors.response.use(
  config => {
    return config
  },
  async error => {
    const originRequest = error.config

    if (error.response.status === 401 && error.config && !error.config._isRetry) {
      originRequest._isRetry = true

      try {
        const response = await axios.get(`${API_URL}/refresh`, { withCredentials: true })
        localStorage.setItem('accessToken', response.data.accessToken)

        return api.request(originRequest)
      } catch (e) {
        console.log('Пользователь не найден')
      }
    }

    throw error
  }
)

export default api
