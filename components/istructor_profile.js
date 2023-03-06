import { BsPerson } from "react-icons/bs"
import { SiGmail } from "react-icons/si"
import { BsFacebook } from "react-icons/bs"
import { BsYoutube } from "react-icons/bs"
import { useEffect, useState } from "react"
export const Instructor = ({ instructorData }) => {
    const [data, setData] = useState()
    useEffect(() => {
        setData(undefined)
        if (instructorData != undefined && instructorData != "Not An Instructor") {
            setData(instructorData[0][0])
        }
    }, [instructorData])
    return (
        <div className="text-2xl">
            {!data ? (
                <div>{null}</div>
            ) : (
                <div className="text-2xl">
                    <div className="flex justify-center m-3">
                        <div className=" border-2 rounded-full w-60 h-60 flex justify-center items-center border-emerald-100">
                            <BsPerson className="text-[19rem] font-thin text-emerald-100" />
                        </div>
                    </div>
                    <div className="p-3 font-semibold text-3xl text-center text-emerald-100">
                        {data.name}
                    </div>

                    <div className="font-semibold text-xl text-emerald-100 flex justify-center items-center">
                        <BsPerson className="font-thin text-emerald-100 mx-2" />
                        {data.userId}
                    </div>

                    <div className="font-semibold text-xl text-emerald-100 flex justify-center items-center">
                        <SiGmail className="mx-2 border-2 rounded-full p-2 w-10 h-10 bg-red-600" />
                        {data.links[0].email}
                    </div>
                    <hr className="my-5" />
                    <div className="mx-2 font-semibold text-emerald-100">{data.profession}</div>
                    <hr className="my-5" />
                    <div className="p-3 text-emerald-100">{data.briefIntro}</div>
                    <hr className="my-5" />
                    <div className="flex mx-4 sm:w-[30rem] justify-between items-center p-1">
                        <BsFacebook className="text-emerald-100" />
                        <p className="text-emerald-100">{data.links[0].faceBook}</p>
                    </div>
                    <div className="flex mx-4 sm:w-[30rem] justify-between items-center p-1">
                        <BsYoutube className="text-emerald-100" />
                        <p className="text-emerald-100">{data.links[0].youtube}</p>
                    </div>
                    <div className="my-5 flex flex-col gap-6">
                        <button className="bg-emerald-800 mx-4 text-slate-200 p-1 rounded-lg text-base font-semibold border-2 border-slate-200">
                            Edit Profile
                        </button>
                        <button
                            onClick={() => {
                                console.log(data.links[0].email)
                            }}
                            className="bg-red-800 mx-4 text-slate-200 p-1 rounded-lg text-base font-semibold border-2 border-slate-200"
                        >
                            Delete Profile
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
