import { useEffect, useState } from "react"

export const ProfileButtons = ({
    instructorReg,
    setInstructorReg,
    studentReg,
    setStudentReg,
    openInstructorProfile,
    setOpenInstructorProfile,
    openStudentProfile,
    setOpenStudentProfile,
    userData,
    instructorData,
    setCurrentPage,
    currentPage,
    account,
}) => {
    const [text, setText] = useState("Register as an Instructor")

    const init = () => {
        if (instructorData != undefined && instructorData != "Not An Instructor") {
            setOpenInstructorProfile(true)
            setOpenStudentProfile(false)
            setInstructorReg(false)
            setStudentReg(false)
            setCurrentPage("instructorPage")
            console.log(1)
        } else if (userData != undefined && userData != "User Not Registered") {
            setOpenInstructorProfile(false)
            setOpenStudentProfile(true)
            setInstructorReg(false)
            setStudentReg(false)
            setCurrentPage("studentPage")
            console.log(2)
        } else {
            setOpenInstructorProfile(false)
            setOpenStudentProfile(false)
            setInstructorReg(false)
            setStudentReg(true)
            setCurrentPage("studentReg")
            console.log(3)
        }
    }
    const handle = async () => {
        const goto = async () => {
            if (studentReg && !instructorReg && !openInstructorProfile && !openStudentProfile) {
                if (instructorData != undefined && instructorData != "Not An Instructor") {
                    setOpenInstructorProfile(true)
                    setCurrentPage("instructorPage")
                } else {
                    setInstructorReg(true)
                    setCurrentPage("instructorReg")
                }
                setStudentReg(false)
            } else if (
                !studentReg &&
                !instructorReg &&
                openInstructorProfile &&
                !openStudentProfile
            ) {
                if (userData != undefined && userData != "User Not Registered") {
                    setOpenStudentProfile(true)
                    setCurrentPage("studentPage")
                } else {
                    setStudentReg(true)
                    setCurrentPage("studentReg")
                }
                setOpenInstructorProfile(false)
            } else if (
                !studentReg &&
                !instructorReg &&
                !openInstructorProfile &&
                openStudentProfile
            ) {
                if (instructorData != undefined && instructorData != "Not An Instructor") {
                    setOpenInstructorProfile(true)
                    setCurrentPage("instructorPage")
                } else {
                    setInstructorReg(true)
                    setCurrentPage("instructorReg")
                }
                setOpenStudentProfile(false)
            } else if (
                !studentReg &&
                instructorReg &&
                !openInstructorProfile &&
                !openStudentProfile
            ) {
                if (userData != undefined && userData != "User Not Registered") {
                    setOpenStudentProfile(true)
                    setCurrentPage("studentPage")
                } else {
                    setStudentReg(true)
                    setCurrentPage("studentReg")
                }
                setInstructorReg(false)
            }
        }

        await goto()
    }

    const setTexts = () => {
        if (currentPage == "studentReg" || currentPage == "studentPage") {
            if (instructorData != undefined && instructorData != "Not An Instructor") {
                setText("Go to Instructor Profile")
                console.log(4)
            } else {
                setText("Register as an Instructor")
                console.log(5)
            }
        } else if (currentPage == "instructorPage" || currentPage == "instructorReg") {
            if (userData != undefined && userData != "User Not Registered") {
                setText("go to Student Profile")
                console.log(6)
            } else {
                setText("Register as a Student")
                console.log(7)
            }
        }
    }

    useEffect(() => {
        if (account) {
            init()
        }
    }, [account, instructorData, userData])

    useEffect(() => {
        setTexts()
        console.log(currentPage)
    }, [currentPage])

    return (
        <div>
            <button
                className={`self-end bg-blue-200 text-indigo-800 rounded-lg p-1 font-semibold text-sm`}
                onClick={() => {
                    handle()
                    console.log(currentPage)
                }}
            >
                {text}
            </button>
        </div>
    )
}
