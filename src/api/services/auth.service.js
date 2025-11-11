import api from "../axiosInstance";

export const authService = {

    signUp: async (username,password,email) =>{
        const res = await api.post('/auth/signup', {username,password,email}, {withCredentials: true})
    
        return res.data
    },
    login: async(username, password) => {
        const res = await api.post('/auth/login',{username, password}, {withCredentials: true})
        
        return res.data
    },
    logout: async () => {
        return  await api.post('/auth/logout',{},{withCredentials: true})
    }
}