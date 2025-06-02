import Image from "next/image"
import { FaStar } from "react-icons/fa"
import { IoStar } from "react-icons/io5"
import { LiaStar } from "react-icons/lia"

const SuggestionItem = (props) => {
    return (
        <a href="/">
        <div className="flex flex-col gap-4 w-[20rem]">
            <div>
                <div className="flex h-[14rem] w-[20rem] shadow-lg rounded-2xl overflow-clip hover:-translate-y-1 transition-all ease-in duration-300">
                    <Image src='/house.png' alt ='house' height={300} width={350} className="object-cover " />
                </div>
            </div>
            <div className="flex items-center flex-row justify-between">
                <p className="font-semibold">{props.title}</p>
                <p className="flex items-center flex-row gap-2 text-[#535353]">{props.star}<IoStar></IoStar></p>
            </div>
        </div>
        </a>

    )
}

export default SuggestionItem
