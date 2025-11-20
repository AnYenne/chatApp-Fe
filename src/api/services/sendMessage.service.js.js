import api from '../axiosInstance'

export const sendMessageService = {

   sendDirect: async(recipientId, content, conversationId) => {
        const res = await api.post('/messages/direct',{recipientId, content, conversationId},{withCredentials:true})
        return res.data
    },
   sendGroup: async(conversationId, content) => {
        const res = await api.post('/messages/group',{conversationId, content},{withCredentials:true})
        return res
   }
}