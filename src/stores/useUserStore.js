import { create } from "zustand"
import { userService } from "../api/services/user.service"

const useUserStore = create((set, get) => ({
    userdata: null,
    loading: false,

    searchUser: async (username) => {
        try {
            set({loading: true})
            const user = await userService.searchUser(username);
            return user
            
        } catch (error) {
            console.error('search user error', error)
            set({ userdata: null,
                loading: false,})
            return error
    
        } finally{
            set({loading: false})
        }
    } 
    
})) 

export default useUserStore