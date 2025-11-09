
const Navbar = () => {

    const navigations = [{type: 'home', content: '', icon:'PP'},
    {type: 'chat', content: 'content', icon:'PP'},
    {type: 'contact', content: 'content', icon:'PP'},
    {type: 'notification', content: 'content', icon:'PP'},
    {type: 'calendar', content: 'content', icon:'PP'},
    {type: 'setting', content: 'content', icon:'PP'},
] 

    return (
        <div className="flex flex-col justify-start items-start py-4 gap-8 h-full bg-white fixed w-52 ">
            <div className="flex flex-col items-center justify-center gap-3 px-4">
                <div className="w-16 h-16 rounded-3xl ">
                    <img
                    className="w-full h-full rounded-4xl shadow-md"
                    src="/image/Login-Art.png" alt="avatar" />

                </div>
                <div className="capitalize font-bold">Henry jabba</div>
            </div>
            <div className="flex-1 ">
                {navigations.map((navi,id) => {
                    return(   
                        <div
                        key={id}
                        className="flex gap-4 justify-start items-center px-4 my-4 border-l-3 border-amber-600 uppercase font-medium">
                    <div className=" text-amber-600">{navi.icon}</div>
                    <div className=" text-amber-600">{navi.type}</div>
                </div>)
            })}
            </div>
            
            <div className="flex gap-2 justify-center items-center px-4">
                <div>icon</div>
                <div>log out</div>
            </div>
        </div>
    )   
}
export default Navbar