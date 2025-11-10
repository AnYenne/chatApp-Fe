
const Button = ({children, type, variant = 'primary', className, ...props}) => {
    //prop là những thứ mà thấy cpn này sẽ cần khi tái sử dụng
    //base sẽ là style nền cho cả cpn btn nào cũng có

    const base = 'px-4 rounded-xl inline-flex items-center justify-center w-full cursor-pointer hover:bg-text-700 focus:ring-2 forcus:ring-blue-400 focus:outline-none';
    // base sẽ không cần style trong này nữa sẽ style riêng ở layer của tailwindcss, để conponent này chỉ cần sử dụng prop, event, logic,
    //tạo object để dễ maintain
    const variants = {
        //cần loại nào
        primary: "bg-button-800 w-full text-white hover:bg-blue-700",
        outline: "border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white",
        ghost: "text-blue-600 bg-transparent"
    };
    const sizes = {
        sm: 'px-3 py-1 text-sm',
        md: 'px-4 py-2',
        lg: 'px-6 py-3 text-lg'
    }
    // const icon = ''
    // const disable = {'disabled:opacity-50 disable:cursor-not-allowed'}
   


    return(
        <button type={type} className={`${variants[variant]} ${base} ${sizes[sizes]} ${className}`}>
        {children} 
        </button>
    )
}
export default Button;