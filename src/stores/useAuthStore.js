import {create} from 'zustand'
import {toast} from 'sonner'
import { authService } from '../api/services/Auth.service'

export const useAuthStore =  create((set, get) => ({
    accessToken: null,
    user: null,
    loading: false,

    clearState: () => {
    set({accessToken: null,
    user: null,
    loading: false})
    },

    signUp: async (username,password,email) => {
        try {
            set({loading: true})

            //call API
            await authService.signUp(username,password,email);
            return res
        } catch (error) {
            console.error(error);
            return error
        } finally{
            set({loading: false})
        }
    },

    login: async(username, password) => {
        try {
            set({loading: true})
            // call Api
            
            const {accessToken} = await authService.login(username, password);
             set({accessToken})
        } catch (error) {
            console.error(error);
            return error
        } finally {
            set({loading: false})

        }
    },
    logout: async() => {
        try {
            get().clearState();
            await authService.logout()
        } catch (error) {
            console.error(error)
            return error
        }
    }
}))