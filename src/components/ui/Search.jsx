import Input from "./Input"


const Search = () => {

    return (
        <div className="flex py-1 px-1 justify-between items-center border border-gray-300 rounded-3xl" >
            <div>
            <Input className="focus-visible:border-transparent" type="text" placeholderValue='Search' variant="ghost" >
            </Input>
            </div>
            <div className="mr-4 border-l-2 py-1 pl-4 border-gray-300">Message</div>
        </div>
    )
}
export default Search