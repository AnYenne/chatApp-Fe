import Button from "./Button"
import Input from "./Input"


const Search = ({input, button, onChange, onClick}) => {

    return (
        <div className="flex py-1 px-1 justify-between items-center border border-gray-300 rounded-3xl max-w-full" >
            <div className="w-full h-full flex-1">
                <Input 
                onChange={onChange} className="focus-visible:border-transparent " type="text" placeholderValue={input} variant="ghost" >
                </Input>
            </div>

            <div>
                <Button
                variant="ghost"
                sizes= ''
                onClick={onClick}
                className="mr-4 border-l-2 py-1 pl-4 border-gray-300 w-fit border-none">{button}</Button>
            </div>
           
        </div>
    )
}
export default Search