import { ethers } from "ethers"
import { useEffect, useState } from "react"
import { useMoralis } from "react-moralis"
import Profiler_ABI from "../constants/profilerABI.json"
import RLNFT_ABI from "../constants/RLNFTABI.json"
import walletAddress from "../constants/Addresses.json"
import fleekStorage, { upload } from "@fleekhq/fleek-storage-js"
import { deleteAccount, getUserData, Upload } from "@/utils/helper_functions"

export function Register({ currentPage, editing }) {
    const { isWeb3Enabled, enableWeb3, account } = useMoralis()
    const [firstName, setFirstName] = useState()
    const [lastName, setLastName] = useState()
    const [profession, setProfession] = useState()
    const [email, setEmail] = useState()
    const [faceBook, setFaceBook] = useState()
    const [youtube, setYoutube] = useState()
    const [introduction, setIntroduction] = useState()
    const [provider, setProvider] = useState()
    const [username, setUsername] = useState()
    const [address, setAddress] = useState(account)
    const [loadingUpload, setLoadingUpload] = useState()
    const [userId, setUserId] = useState()

    const [error, setError] = useState()

    const sendSomfn = async () => {
        const signer = await provider.getSigner()
        const profiler = new ethers.Contract(walletAddress.profiler_Address, Profiler_ABI, provider)
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

    const addProfile = async () => {
        setLoadingUpload(true)
        try {
            await Upload(setError, address, username, email)
        } catch (e) {
            setError("uploadError")
        }
        setLoadingUpload(false)
    }

    const handleSubmit = async () => {
        try {
            const signer = await provider.getSigner()
            const profiler = new ethers.Contract(
                walletAddress.profiler_Address,
                Profiler_ABI,
                provider
            )
            const RLNFT = new ethers.Contract(walletAddress.RLNFT_Address, RLNFT_ABI, provider)

            const Register = await profiler
                .connect(signer)
                .add_Instructor(
                    `${firstName} ${lastName}`,
                    userId,
                    profession,
                    introduction,
                    [youtube, faceBook, email],
                    "kdkdkkdklklweklweklwek",
                    RLNFT.address
                )
            await Register.wait()
            window.location.reload()
        } catch (e) {
            console.log(e)
        }
    }
    useEffect(() => {
        setAddress(account)
    }, [account])

    return (
        <div className="flex flex-col items-center pt-2 ">
            <div className="text-slate-200 text-3xl m-3">REGISTER</div>
            {currentPage == "instructorReg" ? (
                <div className="flex flex-col gap-4 border-2 p-4 rounded-lg w-10/12 sm:w-[30rem] mb-3 h-fit border-slate-400">
                    <div>
                        <label className="text-slate-200 text-xl">Wallet</label>
                        <input
                            className="outline-none rounded-lg h-10 w-full p-2"
                            type="text"
                            onChange={(entry) => {
                                setAddress(entry.target.value)
                            }}
                            value={address}
                            disabled={true}
                        ></input>
                    </div>
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
                        <label className="text-slate-200 text-xl">UserId</label>
                        <input
                            className="outline-none rounded-lg h-10 w-full p-2"
                            type="text"
                            onChange={(entry) => {
                                setUserId(entry.target.value)
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
                        className="self-center bg-blue-200 text-indigo-800 rounded-lg p-3 font-bold text-lg"
                        onClick={async () => {
                            await handleSubmit()
                        }}
                    >
                        Register
                    </button>
                </div>
            ) : (
                <div className="flex flex-col gap-4 border-2 p-4 rounded-lg w-10/12 sm:w-[30rem] mb-3 h-fit border-slate-400">
                    <div>
                        <label className="text-slate-200 text-xl">Wallet</label>
                        <input
                            className="outline-none rounded-lg h-10 w-full p-2 text-slate-200"
                            type="text"
                            onChange={(entry) => {
                                setAddress(entry.target.value)
                            }}
                            value={address}
                            disabled={true}
                        ></input>
                    </div>
                    <div>
                        <label className="text-slate-200 text-xl">Username</label>
                        <input
                            className="outline-none rounded-lg h-10 w-full p-2"
                            type="text"
                            onChange={(entry) => {
                                setUsername(entry.target.value)
                            }}
                        ></input>
                    </div>
                    <div>
                        <label className="text-slate-200 text-xl">Email (optional)</label>
                        <input
                            className="outline-none rounded-lg h-10 w-full p-2"
                            type="email"
                            onChange={(entry) => {
                                setEmail(entry.target.value)
                            }}
                        ></input>
                    </div>
                    <button
                        className="self-center bg-blue-200 text-indigo-800 rounded-lg p-3 font-bold text-lg"
                        onClick={async () => {
                            await addProfile()
                        }}
                    >
                        {editing ? <p>Edit</p> : <p>Register</p>}
                    </button>
                    <button
                        onClick={() => {
                            sendSomfn()
                        }}
                    >
                        sendSomfn
                    </button>
                </div>
            )}
        </div>
    )
}
