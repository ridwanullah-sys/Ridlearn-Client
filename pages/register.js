import { ethers } from "ethers"
import { useEffect, useState } from "react"
import { useMoralis } from "react-moralis"
import profiler_ABI from "../constants/profilerABI.json"
import RLNFT_ABI from "../constants/RLNFTABI.json"
import address from "../constants/Addresses.json"

export default function Register() {
    const { isWeb3Enabled, enableWeb3, account } = useMoralis()
    const [firstName, setFirstName] = useState()
    const [lastName, setLastName] = useState()
    const [profession, setProfession] = useState()
    const [email, setEmail] = useState()
    const [faceBook, setFaceBook] = useState()
    const [youtube, setYoutube] = useState()
    const [introduction, setIntroduction] = useState()
    const [provider, setProvider] = useState()

    const sendSomfn = async () => {
        const signer = await provider.getSigner()
        const profiler = new ethers.Contract(address.profiler_Address, profiler_ABI, provider)
        const send = await profiler
            .connect(signer)
            .transferETH("0x4639155fb94e983a13f76be68845012f7eDCA46f", {
                value: ethers.utils.parseEther("1"),
            })
        console.log("done")
    }

    useEffect(() => {
        if (isWeb3Enabled) {
            async function getProvider() {
                const provider = await enableWeb3()
                setProvider(provider)
            }
            getProvider()
        } else {
            const INFURA_API_KEY = process.env.NEXT_PUBLIC_INFURA_API_KEY
            const provider = new ethers.providers.JsonRpcProvider(INFURA_API_KEY)
            setProvider(provider)
        }
    }, [isWeb3Enabled])
    const handleSubmit = async () => {
        const signer = await provider.getSigner()
        const profiler = new ethers.Contract(address.profiler_Address, profiler_ABI, provider)
        const RLNFT = new ethers.Contract(address.RLNFT_Address, RLNFT_ABI, provider)
        const Register = await profiler
            .connect(signer)
            .add_Instructor(
                `${firstName} ${lastName}`,
                profession,
                introduction,
                [faceBook, email, youtube],
                "kdkdkkdklklweklweklwek",
                RLNFT.address
            )
        await Register.wait()
    }

    return (
        <div className="flex flex-col items-center pt-2 ">
            <div className="text-slate-200 text-3xl m-3">REGISTER</div>
            <div className="flex flex-col gap-4 border-2 p-4 rounded-lg w-10/12 sm:w-[30rem] mb-3 h-fit border-slate-400">
                <div>
                    <label className="text-slate-200 text-xl">FirstName</label>
                    <input
                        className="outline-none rounded-lg h-10 w-full p-2"
                        type="text"
                        onChange={(entry) => {
                            setFirstName(entry.target.value)
                        }}
                    ></input>
                </div>
                <div>
                    <label className="text-slate-200 text-xl">LastName</label>
                    <input
                        className="outline-none rounded-lg h-10 w-full p-2"
                        type="text"
                        onChange={(entry) => {
                            setLastName(entry.target.value)
                        }}
                    ></input>
                </div>
                <div>
                    <label className="text-slate-200 text-xl">Profession</label>
                    <input
                        className="outline-none rounded-lg h-10 w-full p-2"
                        type="text"
                        onChange={(entry) => {
                            setProfession(entry.target.value)
                        }}
                    ></input>
                </div>
                <div>
                    <label className="text-slate-200 text-xl">Email</label>
                    <input
                        className="outline-none rounded-lg h-10 w-full p-2"
                        type="email"
                        onChange={(entry) => {
                            setEmail(entry.target.value)
                        }}
                    ></input>
                </div>
                <div>
                    <label className="text-slate-200 text-xl">FaceBook</label>
                    <input
                        className="outline-none rounded-lg h-10 w-full p-2"
                        type="url"
                        onChange={(entry) => {
                            setFaceBook(entry.target.value)
                        }}
                    ></input>
                </div>
                <div>
                    <label className="text-slate-200 text-xl">Youtube</label>
                    <input
                        className="outline-none rounded-lg h-10 w-full p-2"
                        type="url"
                        onChange={(entry) => {
                            setYoutube(entry.target.value)
                        }}
                    ></input>
                </div>
                <div>
                    <label className="text-slate-200 text-xl">Intoduction</label>
                    <textarea
                        className="outline-none rounded-lg h-36 w-full p-2"
                        onChange={(entry) => {
                            setIntroduction(entry.target.value)
                        }}
                    ></textarea>
                </div>

                <button
                    className="self-end bg-blue-200 text-indigo-800 rounded-lg p-3 font-bold text-lg"
                    onClick={() => {
                        handleSubmit()
                    }}
                >
                    Register
                </button>

                <button
                    className="self-end bg-blue-200 text-indigo-800 rounded-lg p-3 font-bold text-lg"
                    onClick={() => {
                        sendSomfn()
                    }}
                >
                    Send Something
                </button>
            </div>
        </div>
    )
}
