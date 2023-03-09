import { useEffect, useState } from "react"
import { useMoralis } from "react-moralis"
import { Register } from "@/components/register"
import { Instructor } from "@/components/istructor_profile"
import { Student } from "@/components/student_profile"
import { LoadingProfile } from "@/components/loading"
import { ProfileButtons } from "@/components/profileButton"
import { getInstructorData, getTokens, getUserData, sendsofn } from "@/utils/helper_functions"
import { ethers } from "ethers"

export default function InstructorProfile() {
    const [error, setError] = useState()

    const [loadingUserData, setLoadingUserData] = useState(false)
    const [loadingInstructorData, setLoadingInstructorData] = useState()
    const [loadingTokens, setLoadingTokens] = useState(false)
    const { isWeb3Enabled, enableWeb3, account } = useMoralis()
    const [instructorReg, setInstructorReg] = useState(false)
    const [studentReg, setStudentReg] = useState(true)
    const [openInstructorProfile, setOpenInstructorProfile] = useState(false)
    const [openStudentProfile, setOpenStudentProfile] = useState(false)
    const [currentPage, setCurrentPage] = useState()
    const [userData, setUserData] = useState()
    const [instructorData, setinstructorData] = useState([])
    const [editing, setEditing] = useState()
    const [provider, setProvider] = useState()
    const [id, setId] = useState()
    const [userIds, setUserIds] = useState()

    useEffect(() => {
        getProvider()
    }, [])

    const getProvider = async () => {
        let prvdr = await enableWeb3()
        if (!prvdr) {
            prvdr = new ethers.providers.Web3Provider(window.ethereum)
        }
        setProvider(prvdr)
    }

    const isInstructor = async () => {
        let anInstructor
        try {
            anInstructor = await getTokens(
                isWeb3Enabled,
                account,
                provider,
                setUserIds,
                setLoadingTokens
            )
            setinstructorData(anInstructor)
        } catch (e) {
            console.log(e)
        }
        console.log("done")
    }

    const isUser = async () => {
        let aUser
        try {
            aUser = await getUserData(isWeb3Enabled, account, provider, setLoadingUserData)
            setUserData(aUser)
        } catch (e) {
            console.log(e)
        }
        console.log(`a user`)
        console.log(aUser)
    }

    useEffect(() => {
        if (account) {
            isUser()
            isInstructor()
        }
    }, [account])

    return (
        <div>
            {!isWeb3Enabled ? (
                <div className="tracking-wide leading-8 text-justify text-emerald-200 font-semibold p-3">
                    {" "}
                    Please, connect to Your wallet
                </div>
            ) : loadingUserData || loadingTokens ? (
                <LoadingProfile />
            ) : (
                <div>
                    {currentPage == "instructorPage" ? (
                        <Instructor
                            instructorData={instructorData}
                            isWeb3Enabled={isWeb3Enabled}
                            provider={provider}
                            setEditing={setEditing}
                            setCurrentPage={setCurrentPage}
                            id={id}
                            setId={setId}
                            userIds={userIds}
                            setLoadingInstructorData={setLoadingInstructorData}
                        />
                    ) : currentPage == "studentPage" ? (
                        <Student
                            userData={userData}
                            setError={setError}
                            account={account}
                            setCurrentPage={setCurrentPage}
                            setEditing={setEditing}
                            isWeb3Enabled={isWeb3Enabled}
                            provider={provider}
                        />
                    ) : (
                        <Register
                            currentPage={currentPage}
                            editing={editing}
                            setEditing={setEditing}
                            id={id}
                            setId={setId}
                            provider={provider}
                            setLoadingInstructorData={setLoadingInstructorData}
                            loadingInstructorData={loadingInstructorData}
                            loadingUserData={loadingUserData}
                            setLoadingUserData={setLoadingUserData}
                        />
                    )}
                    <ProfileButtons
                        instructorReg={instructorReg}
                        setInstructorReg={setInstructorReg}
                        studentReg={studentReg}
                        setStudentReg={setStudentReg}
                        openInstructorProfile={openInstructorProfile}
                        setOpenInstructorProfile={setOpenInstructorProfile}
                        openStudentProfile={openStudentProfile}
                        setOpenStudentProfile={setOpenStudentProfile}
                        userData={userData}
                        instructorData={instructorData}
                        setCurrentPage={setCurrentPage}
                        currentPage={currentPage}
                        account={account}
                        setEditing={setEditing}
                        setId={setId}
                    />
                </div>
            )}
            <button
                onClick={() => {
                    sendsofn(provider)
                }}
            >
                sendSomfn
            </button>
        </div>
    )
}
