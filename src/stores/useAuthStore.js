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

    setAccessToken : (token) => {
        set({accessToken: token})
    },


    signUp: async (username,password,email) => {
        try {
            set({loading: true})

            //call API
            const res = await  authService.signUp(username,password,email);
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
              get().setAccessToken(accessToken)
             await get().fetchMe()
        } catch (error) {
            console.error(error);
            return error
        } finally {
            set({loading: false})

        }
    },
    logout: async() => {
        try {
            set({loading: true})
            get().clearState();
            await authService.logout()
        } catch (error) {
            console.error(error)
            return error
        } finally{
            set({loading: false})

        }
    },
    fetchMe: async () => {
        try {
            set({loading: true})
            const userId = await authService.fetchMe()
            set({user: userId})
        } catch (error) {
            console.error(error)
            set({ accessToken: null,
                user: null,
            })
        }
        finally{
            set({loading: false})
        }
    },
    refresh: async () => {
        try {
            const {user, fetchMe} = get()
            set({loading: true })
            const accessToken =  await authService.refresh()
            get().setAccessToken(accessToken)
            if(!user){
                await fetchMe()
            }
        } catch (error) {
            console.error(error)
            get().clearState()
        } finally{
            set({loading: false})
        }
    }
}))