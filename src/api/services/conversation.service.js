import api from '../axiosInstance'

export const ConversationService = {

    getMessage: async(conversationId) => {
        const res =  await api.get(`/conversations/${conversationId}/message`, {withCredentials: true})
        return res
    },
    getConversation: async() => {
        const res =  await api.get('/conversations', {withCredentials: true})
        return res.data
    },
    createConversation: async() => {
        const res =  await api.post('/conversations',{withCredentials: true})
        return res
    }
}