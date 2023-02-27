import { BsPerson } from "react-icons/bs"
import { SiGmail } from "react-icons/si"
import { BsFacebook } from "react-icons/bs"
import { BsYoutube } from "react-icons/bs"
import { useState } from "react"
export default function InstructorProfile() {
    const [status, setstatus] = useState("logged_out")

    return (
        <div>
            {status == "logged_out" ? (
                <div className="flex flex-col p-3 gap-8">
                    <a href="/login">
                        <button className="mt-10 w-full rounded-lg bg-emerald-100 text-indigo-800 py-1 px-3 font-bold text-2xl">
                            Log In
                        </button>
                    </a>
                    <a href="/register">
                        <button className=" w-full rounded-lg bg-emerald-100 text-indigo-800 py-1 px-3 font-bold text-2xl">
                            Register
                        </button>
                    </a>
                </div>
            ) : (
                <div className="text-2xl">
                    <div className="flex justify-center m-3">
                        <div className=" border-2 rounded-full w-60 h-60 flex justify-center items-center border-emerald-100">
                            <BsPerson className="text-[19rem] font-thin text-emerald-100" />
                        </div>
                    </div>
                    <div className="p-3 font-semibold text-3xl text-center text-emerald-100">
                        AbdRauf Ridwan
                    </div>

                    <div className="font-semibold text-xl text-emerald-100 flex justify-center items-center">
                        <SiGmail className="mx-2 border-2 rounded-full p-2 w-10 h-10 bg-red-600" />
                        abdraufridwantemi@gmail.com
                    </div>
                    <hr className="my-5" />
                    <div className="mx-2 font-semibold text-emerald-100">A Programmer</div>
                    <hr className="my-5" />
                    <div className="p-3 text-emerald-100">
                        ljwjknedjkldj kljdskljsdkljklsdjklsdjd kljdklsjskldjkljsljdkljkljsk
                        ljdklsjcksnklsnckljclsjklcj scnsjklcn ljkcnskldcklsdjcklsjdckljsklcjsklcj
                    </div>
                    <hr className="my-5" />
                    <div className="flex mx-4 sm:w-[30rem] justify-between items-center p-1">
                        <BsFacebook className="text-emerald-100" />
                        <p className="text-emerald-100">ridwanullaj@facebook.com</p>
                    </div>
                    <div className="flex mx-4 sm:w-[30rem] justify-between items-center p-1">
                        <BsYoutube className="text-emerald-100" />
                        <p className="text-emerald-100">ridwanullaj@youtube.com</p>
                    </div>
                    <div className="flex justify-end">
                        <button className="m-3 w-full rounded-lg bg-emerald-100 text-indigo-800 py-1 px-3 font-semibold">
                            Edit
                        </button>
                    </div>
                    <div>
                        <h1>Courses</h1>
                    </div>
                </div>
            )}
        </div>
    )
}
