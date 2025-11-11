import { Button } from "../ui"
import { useAuthStore } from "../../stores/useAuthStore";
import { toast } from "sonner";
import { useNavigate } from "react-router";



const Logout = (onclick) => {

   
    const {logout} = useAuthStore()
    const navigate = useNavigate()


    const handleSubmit = async (e) =>{
        e.preventDefault();
        const res = await logout()
        if(res?.response){
            return confirm(res.response.data.message)
        }
        navigate('/login')

    }
    

    return(
         <div className="flex gap-2 justify-center items-center px-4">
                <div>icon</div>
                <Button 
                variant="ghost" 
                sizes='sm' 
                className='text-gray-400'
                onClick={handleSubmit}
                >log out</Button>
        </div>
    )
}
export default Logout