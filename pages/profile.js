import { useEffect, useState } from "react"
import { useMoralis } from "react-moralis"
import { Register } from "@/components/register"
import { Instructor } from "@/components/istructor_profile"
import { Student } from "@/components/student_profile"
import { LoadingProfile } from "@/components/loading"
import { ProfileButtons } from "@/components/profileButton"
import { getInstructorData, getUserData } from "@/utils/helper_functions"

export default function InstructorProfile() {
    const [error, setError] = useState()

    const [loadingUserData, setLoadingUserData] = useState(false)
    const [loadingInstructorData, setLoadingInstructorData] = useState(false)
    const { isWeb3Enabled, enableWeb3, account } = useMoralis()
    const [instructorReg, setInstructorReg] = useState(false)
    const [studentReg, setStudentReg] = useState(true)
    const [openInstructorProfile, setOpenInstructorProfile] = useState(false)
    const [openStudentProfile, setOpenStudentProfile] = useState(false)
    const [currentPage, setCurrentPage] = useState()
    const [userData, setUserData] = useState()
    const [instructorData, setinstructorData] = useState()
    const [editing, setEditing] = useState()

    const isInstructor = async () => {
        setLoadingInstructorData(true)
        let anInstructor
        try {
            anInstructor = await getInstructorData(isWeb3Enabled, enableWeb3, account)
            setinstructorData(anInstructor)
        } catch (e) {
            console.log(e)
        }
        console.log(anInstructor)
        setLoadingInstructorData(false)
    }

    const isUser = async () => {
        setLoadingUserData(true)
        let aUser
        try {
            aUser = await getUserData(setError, account, "")
            setUserData(aUser[0])
        } catch (e) {
            console.log(e)
        }
        console.log(aUser)
        setLoadingUserData(false)
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
            ) : loadingUserData || loadingInstructorData ? (
                <LoadingProfile />
            ) : (
                <div>
                    {currentPage == "instructorPage" ? (
                        <Instructor instructorData={instructorData} />
                    ) : currentPage == "studentPage" ? (
                        <Student
                            userData={userData}
                            setError={setError}
                            account={account}
                            setCurrentPage={setCurrentPage}
                            setEditing={setEditing}
                        />
                    ) : (
                        <Register currentPage={currentPage} editing={editing} />
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
                    />
                </div>
            )}
        </div>
    )
}
