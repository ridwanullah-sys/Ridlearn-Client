import { BsPerson } from "react-icons/bs"

export const LoadingProfile = () => {
    return (
        <div className="text-2xl animate-pulse">
            <div className="flex justify-center m-3">
                <div className=" border-2 rounded-full w-60 h-60 flex justify-center items-center border-emerald-100">
                    <BsPerson className="text-[19rem] font-thin text-emerald-100" />
                </div>
            </div>
            <div className="p-3 font-semibold text-3xl text-center h-10 bg-slate-100 text-emerald-100"></div>

            <div className="font-semibold text-xl text-emerald-100 flex bg-slate-100 justify-center items-center"></div>
        </div>
    )
}
