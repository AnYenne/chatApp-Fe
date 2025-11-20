import api from "../api/axiosInstance";
import { create } from "zustand";
import { sendMessageService } from "../api/services/sendMessage.service.js";

const useMessageStore = create((set, get) => ({
    sendMessageDirect: async(recipientId, content, conversationId) => {
        try {
            const res = await sendMessageService.sendDirect(recipientId, content, conversationId)
            return res
        } catch (error) {
            console.error(error)
            
        }
    },
    sendMessageGroup: async(conversationId, content) =>{
        try {
            const res = await sendMessageService.sendGroup(conversationId, content)
            return res
        } catch (error) {
            console.error(error)
            
        }
    }

}))
export default useMessageStore