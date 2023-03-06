import { deleteAccount, editAccount } from "@/utils/helper_functions"
import { useEffect, useState } from "react"
import { BsPerson } from "react-icons/bs"
import { SiGmail } from "react-icons/si"

export const Student = ({ userData, setError, account, setCurrentPage, setEditing }) => {
    const [data, setData] = useState()
    useEffect(() => {
        setData(undefined)
        if (userData != undefined && userData != "User Not Registered") {
            setData(userData)
        }
    }, [userData])
    return (
        <div>
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
                        {data.username}
                    </div>

                    <div className="font-semibold text-xl text-emerald-100 flex justify-center items-center">
                        <SiGmail className="mx-2 border-2 rounded-full p-2 w-10 h-10 bg-red-600" />
                        {data.email}
                    </div>
                    <div className="my-5 flex flex-col gap-6">
                        <button
                            onClick={async () => {
                                setEditing(true)
                                setCurrentPage("studentReg")
                            }}
                            className="bg-emerald-800 mx-4 text-slate-200 p-1 rounded-lg text-base font-semibold border-2 border-slate-200"
                        >
                            Edit Profile
                        </button>
                        <button
                            onClick={() => {
                                deleteAccount(setError, account, data.username)
                            }}
                            className="bg-red-800 mx-4 text-slate-200 p-1 rounded-lg text-base font-semibold border-2 border-slate-200"
                        >
                            Delete Profile
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}
