import axios from 'axios'
import { useAuthStore } from '../stores/useAuthStore';

const api = axios.create({
    baseURL: import.meta.env.MODE === "development" ? "http://localhost:3002/api" : "/api",
    withCredentials: true
});

// gắn accesstoken vào req header
api.interceptors.request.use((config) => {
    const {accessToken} = useAuthStore.getState(); // lay accessToken lan 1 duy nhat luc goi linh
    if(accessToken){
        config.headers.Authorization = `Bearer ${accessToken}`
    }
    return config; 
})

// tự động gọi refreshtoken khi accessToken hết hạn
api.interceptors.response.use((res) => res, async (error) => {
    const originalRequest = error.config;

    //nhưng api không cần kiểm tra
    if(originalRequest.url.includes('/auth/login') ||
        originalRequest.url.includes('/auth/signup') ||
        originalRequest.url.includes('/auth/refresh')
) {
    return Promise.reject(error)
}
    originalRequest._retryCount = originalRequest._retryCount || 0

    if(error.response?.status === 403 && originalRequest._retryCount < 4){
        originalRequest._retryCount +=1
        try {
            const res = await api.post('/auth/refresh', {withCredentials: true})
            const newAccessToken = res.data.accessToken

            useAuthStore.getState().setAccessToken(newAccessToken)
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`
            return api(originalRequest)
        } catch (refreshError) {
            useAuthStore.getState().clearState()
            return Promise.reject(refreshError)
        }
    }
    return Promise.reject(error)
})

export default api