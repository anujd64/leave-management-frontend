export default function HelperToolTip(
    {className,text}
) {
    return (
        <span className={`absolute w-auto -right-8 top-5 p-2 m-2 min-w-max rounded-md shadow-md bg-gray-900 text-white text-xs font-bold transition-all duration-100 opacity-0 group-hover:opacity-100 group-hover:flex ${className}`}>{text}</span>
    )
}