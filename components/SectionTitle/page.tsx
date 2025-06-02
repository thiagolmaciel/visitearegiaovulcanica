import { FaCircleChevronLeft, FaCircleChevronRight } from "react-icons/fa6"

const SectionTitle = (props) => {
    return (
        <div role="title-box" className="flex flex-row items-center justify-between text-xl font-bold">
            <div role="title">
                <h2>{props.title}</h2>
            </div>
            <div role="buttons" className="flex items-center flex-row gap-2">
            <li className="flex items-center justify-center gap-1 text-md text-[#cacaca] hover:text-[#b9b9b9] font-semibold transition-all ease-in-out duration-100 cursor-pointer "><FaCircleChevronLeft /></li>
            <li className="flex items-center justify-center gap-1 text-md text-[#cacaca] hover:text-[#b9b9b9] font-semibold transition-all ease-in-out duration-100 cursor-pointer "><FaCircleChevronRight /></li>
            </div>
        </div>
    )
}

export default SectionTitle
