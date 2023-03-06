import { AiOutlineHome } from "react-icons/ai"
import { BsPerson } from "react-icons/bs"
import { AiOutlineSearch } from "react-icons/ai"
import { BsPlayCircleFill } from "react-icons/bs"
import { AiFillHeart } from "react-icons/ai"
export const Navbar = () => {
    return (
        <div className="fixed bottom-0 bg-emerald-100 w-full p-2 sm:px-6 flex justify-between">
            <a href="/">
                <div className="flex flex-col items-center text-indigo-800 font-bold">
                    <AiOutlineHome className="text-3xl" />
                    <p>features</p>
                </div>
            </a>
            <div className="flex flex-col items-center text-indigo-800 font-bold">
                <AiOutlineSearch className="text-3xl" />
                <p>search</p>
            </div>

            <div className="flex flex-col items-center text-indigo-800 font-bold">
                <BsPlayCircleFill className="text-3xl" />
                <p>my courses</p>
            </div>
            <div className="flex flex-col items-center text-indigo-800 font-bold">
                <AiFillHeart className="text-3xl" />
                <p>wishlist</p>
            </div>
            <a href="/profile">
                <div className="flex flex-col items-center text-indigo-800 font-bold">
                    <BsPerson className="text-3xl" />
                    <p>profile</p>
                </div>
            </a>
        </div>
    )
}
