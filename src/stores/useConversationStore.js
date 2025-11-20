import { create } from "zustand"
import { ConversationService } from "../api/services/conversation.service"
import { useAuthStore } from "./useAuthStore"



export  const useConversationStore = create((set, get) => ({
    conversations: null,
    message: null,
    conversationId: null,
    loading: null,
    otherMemberId: null,
    activeConversation: null,


    
    clearConversations(){
        set({
            conversations: null,
            message: null,
        })
    },



    async chooseConversation (id) {
        try {
            set({loading: true})
            set({conversationId: id})
            await get().getMessage(id)
        } catch (error) {
            console.error(error)
        } finally{
            set({loading: false})

        }
        
        
    },
    getAconversation: () => {
        try {
            set({loading: true})    
            const activeConversation = get().conversations.find( convo => convo._id == get().conversationId)
            set({activeConversation})
            
        } catch (error) {
            console.error(error)
        } finally{
         set({loading: false})

        }
    },
    getMember: async (id) => {
        if(!get().activeConversation){
            await get().getAconversation()
        }   
            let participantId
            const otherMemberId = get().activeConversation.participants.filter(item => item._id.toString() !== id)
            if(otherMemberId.length === 1){
                participantId = [otherMemberId[0]._id.toString()]
                participantId = participantId.toString()
                set({otherMemberId: participantId})
                 return participantId
            } else{
                participantId = otherMemberId.map(item => item._id.toString());
                set({otherMemberId: participantId})
                return participantId
            }
            
    },
    
    getConversation: async () => {
        try {
        set({loading: true})
        const conversation = await ConversationService.getConversation()
        set({conversations: conversation.conversations,
            conversationId: conversation.conversations[0]._id,
        })
        } catch (error) {
            console.error(error)
        } finally{
        set({loading: false})

        }
    },
    getMessage: async (id) => {
        try {
            set({loading: true})
            const messages = await ConversationService.getMessage(id)
            set({message: messages.data.messages})

        } catch (error) {
            console.error(error)
        }
        finally{
            set({loading: false})
        }
    },
    createConversation: async () => {
        try {
            const newConversation = await ConversationService.createConversation()
            await get().getConversation()
        }catch (error){
            console.error(error)
        }
        finally{
        }
    }
}))