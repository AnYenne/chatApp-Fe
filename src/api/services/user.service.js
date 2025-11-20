import api from "../axiosInstance";

export const userService = {
   
    searchUser: async (username) => {
        const res =  await api.get('/users/search',{
            params: {
                username,
            }
        }, {withCredentials: true})
        return res.data
    }
}