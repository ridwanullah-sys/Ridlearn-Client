import { ethers } from "ethers"
import { useEffect, useState } from "react"
import { useMoralis } from "react-moralis"
import {
    editAccount,
    EditInstructor,
    newInstructor,
    newUser,
    getInstructorData,
    getUserData,
} from "@/utils/helper_functions"
import { LoadingProfile } from "./loading"

export function Register({
    currentPage,
    editing,
    setEditing,
    id,
    provider,
    loadingInstructorData,
    setLoadingInstructorData,
    setLoadingUserData,
    loadingUserData,
}) {
    const { isWeb3Enabled, enableWeb3, account } = useMoralis()
    const [firstName, setFirstName] = useState()
    const [lastName, setLastName] = useState()
    const [profession, setProfession] = useState()
    const [email, setEmail] = useState()
    const [faceBook, setFaceBook] = useState()
    const [youtube, setYoutube] = useState()
    const [introduction, setIntroduction] = useState()
    const [username, setUsername] = useState()
    const [address, setAddress] = useState(account)
    const [userId, setUserId] = useState()
    const [data, setData] = useState()
    const [error, setError] = useState()

    useEffect(() => {
        setAddress(account)
    }, [account])

    useEffect(() => {
        if (editing && currentPage == "instructorReg") {
            getInstructorData(
                isWeb3Enabled,
                id.toString(),
                provider,
                setData,
                setLoadingInstructorData
            )
        } else if (editing && currentPage == "studentReg") {
            getUserData(isWeb3Enabled, account, provider, setLoadingUserData)
        }
    }, [editing])
    useEffect(() => {
        if (data && editing) {
            if (currentPage == "instructorReg") {
                setFirstName(data.name.slice(0, data.name.indexOf(" ")))
                setLastName(data.name.slice(data.name.indexOf(" ") + 1, data.name.length))
                setUserId(data.userId.slice(0, data.userId.length - 2))
                setProfession(data.profession)
                setFaceBook(data.links[0].faceBook)
                setEmail(data.links[0].email)
                setYoutube(data.links[0].youtube)
                setIntroduction(data.briefIntro)
            } else if (currentPage == "studentReg") {
                console.log(data)
            } else {
                setFirstName(null)
                setLastName(null)
                setUserId(null)
                setProfession(null)
                setFaceBook(null)
                setEmail(null)
                setYoutube(null)
                setIntroduction(null)
            }
        }
    }, [data])

    return (
        <div className="flex flex-col items-center pt-2 ">
            <div className="text-slate-200 text-3xl m-3">
                {editing ? <h1>EDIT</h1> : <h1>REGISTER</h1>}
            </div>
            {currentPage == "instructorReg" ? (
                <div className="flex flex-col gap-4 border-2 p-4 rounded-lg w-10/12 sm:w-[30rem] mb-3 h-fit border-slate-400">
                    <div>
                        <label className="text-slate-200 text-xl">Wallet</label>
                        <input
                            className="outline-none rounded-lg h-10 w-full p-2 text-white"
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
                            value={firstName}
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
                            value={lastName}
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
                            value={userId}
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
                            value={profession}
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
                            value={email}
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
                            value={faceBook}
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
                            value={youtube}
                        ></input>
                    </div>
                    <div>
                        <label className="text-slate-200 text-xl">Intoduction</label>
                        <textarea
                            className="outline-none rounded-lg h-36 w-full p-2"
                            onChange={(entry) => {
                                setIntroduction(entry.target.value)
                            }}
                            value={introduction}
                        ></textarea>
                    </div>

                    <button
                        className="self-center bg-blue-200 text-indigo-800 rounded-lg p-3 font-bold text-lg"
                        onClick={async () => {
                            if (editing) {
                                if (id) {
                                    await EditInstructor(
                                        isWeb3Enabled,
                                        provider,
                                        firstName,
                                        lastName,
                                        userId,
                                        profession,
                                        introduction,
                                        faceBook,
                                        youtube,
                                        email,
                                        "kdkksk",
                                        id,
                                        setError
                                    )
                                    setEditing(false)
                                }
                            } else {
                                await newInstructor(
                                    isWeb3Enabled,
                                    provider,
                                    firstName,
                                    lastName,
                                    userId,
                                    profession,
                                    introduction,
                                    faceBook,
                                    youtube,
                                    email,
                                    "kdndkddk",
                                    setError
                                )
                            }
                        }}
                    >
                        {editing ? <p>Edit</p> : <p>Register</p>}
                    </button>
                    <button
                        onClick={() => {
                            console.log(editing)
                            console.log(id)
                        }}
                    >
                        testing
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

                    <button
                        className="self-center bg-blue-200 text-indigo-800 rounded-lg p-3 font-bold text-lg"
                        onClick={async () => {
                            if (editing) {
                                editAccount(isWeb3Enabled, provider, firstName, lastName, username)
                            } else {
                                await newUser(
                                    isWeb3Enabled,
                                    provider,
                                    firstName,
                                    lastName,
                                    username
                                )
                            }
                        }}
                    >
                        {editing ? <p>Edit</p> : <p>Register</p>}
                    </button>
                </div>
            )}
        </div>
    )
}
