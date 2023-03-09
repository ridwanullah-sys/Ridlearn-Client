import fleekStorage from "@fleekhq/fleek-storage-js"
import { ethers } from "ethers"
import RLNFT_ABI from "../constants/RLNFTABI.json"
import profiler_ABI from "../constants/profilerABI.json"
import address from "../constants/Addresses.json"
import { Token } from "nft.storage"

export const getUserData = async (isWeb3Enabled, account, provider, setLoadingGetUserData) => {
    setLoadingGetUserData(true)
    let User
    if (isWeb3Enabled && provider) {
        const profiler = new ethers.Contract(address.profiler_Address, profiler_ABI, provider)
        User = await profiler.registeredStudent(account)
        setLoadingGetUserData(false)
    }
    if (User.exist != true) {
        setLoadingGetUserData(false)
        return "User Not Registered"
    } else {
        setLoadingGetUserData(false)
        return User
    }
}

export const newUser = async (
    isWeb3Enabled,
    provider,
    firstName,
    lastName,
    UserName,
    setError,
    setLoadingNewUser
) => {
    setLoadingNewUser(true)
    if (isWeb3Enabled && provider) {
        const signer = await provider.getSigner()
        const profiler = new ethers.Contract(address.profiler_Address, profiler_ABI, provider)
        try {
            await profiler.connect(signer).add_User(firstName, lastName, UserName)
            window.location.reload()
        } catch (e) {
            if (e.data.message.includes("'Address Registered'")) {
                setError("Address Registered")
                console.log(e.data.message)
            } else if (e.data.message.includes("'username already used'")) {
                setError("username already used")
                console.log(console.log(e.data.message))
            } else {
                console.log(e.data.message)
            }
        }
    }
    setLoadingNewUser(false)
}

export const deleteAccount = async (isWeb3Enabled, provider, setLoadingDeleteAccount) => {
    setLoadingDeleteAccount(true)
    if (isWeb3Enabled && provider) {
        const signer = await provider.getSigner()
        const profiler = new ethers.Contract(address.profiler_Address, profiler_ABI, provider)
        try {
            await profiler.connect(signer).delete_UserProfile()
            window.location.reload()
        } catch (e) {
            if (e.data.message.includes("'Address not registered'")) {
                console.log(e.data.message)
            }
        }
    }
    setLoadingDeleteAccount(false)
}

export const editAccount = async (
    isWeb3Enabled,
    provider,
    firstName,
    lastName,
    UserName,
    setError,
    setLoadingEditAccount
) => {
    setLoadingEditAccount(true)
    if (isWeb3Enabled && provider) {
        const signer = await provider.getSigner()
        const profiler = new ethers.Contract(address.profiler_Address, profiler_ABI, provider)
        try {
            await profiler.connect(signer).edit_UserProfile(firstName, lastName, UserName)
            window.location.reload()
        } catch (e) {
            if (e.data.message.includes("'Address not registered'")) {
                setError("Address not registered")
                console.log(e.data.message)
            } else if (e.data.message.includes("'username already used'")) {
                setError("username already used")
                console.log(console.log(e.data.message))
            } else {
                console.log(e.data.message)
            }
        }
    }
    setLoadingEditAccount(false)
}

export const getTokens = async (
    isWeb3Enabled,
    account,
    provider,
    setUserIds,
    setLoadingGetTokens
) => {
    setLoadingGetTokens(true)
    let Instructor
    if (isWeb3Enabled && provider) {
        const RLNFT = new ethers.Contract(address.RLNFT_Address, RLNFT_ABI, provider)
        const Tokens = await RLNFT.getTokensOwned(account)
        const setting = new Promise(async (resolve) => {
            const array = {}
            Tokens.forEach(async (element) => {
                const data = await RLNFT.tokenURI(element.toString())
                const key = element.toString()
                array[key] = JSON.parse(data).Owner[0].userId

                if (Object.keys(array).length >= Tokens.length) {
                    console.log(array[5])
                    setUserIds(array)
                    resolve()
                }
            })

            if (Tokens.length < 1) {
                console.log(array)
                resolve()
            }
        })
        await setting
        if (Tokens.length < 1) {
            Instructor = "Not An Instructor"
        } else {
            Instructor = Tokens
        }
    } else {
        Instructor = "please, connect you wallet"
    }
    setLoadingGetTokens(false)
    return Instructor
}
export const getInstructorData = async (
    isWeb3Enabled,
    tokenId,
    provider,
    setData,
    setLoadingInstructorData
) => {
    setLoadingInstructorData(true)
    if (isWeb3Enabled && provider) {
        const RLNFT = new ethers.Contract(address.RLNFT_Address, RLNFT_ABI, provider)
        const data = await RLNFT.tokenURI(tokenId)
        console.log(JSON.parse(data).Owner[0])
        setData(JSON.parse(data).Owner[0])
        setLoadingInstructorData(false)
        return JSON.parse(data).Owner[0]
    } else {
        setLoadingInstructorData(false)
        return "Not connected"
    }
}

export const newInstructor = async (
    isWeb3Enabled,
    provider,
    firstName,
    lastName,
    userId,
    profession,
    briefIntro,
    faceBook,
    youtube,
    email,
    imageLink,
    setError,
    setLoadingNewInstructor
) => {
    setLoadingNewInstructor(true)
    if (isWeb3Enabled && provider) {
        const signer = await provider.getSigner()
        const profiler = new ethers.Contract(address.profiler_Address, profiler_ABI, provider)
        try {
            await profiler
                .connect(signer)
                .add_Instructor(
                    `${firstName} ${lastName}`,
                    userId,
                    profession,
                    briefIntro,
                    [faceBook, youtube, email],
                    "imageLink",
                    address.RLNFT_Address
                )
            window.location.reload()
        } catch (e) {
            setError("Upload Error")
            console.log(e.data.message)
        }
    }
    setLoadingNewInstructor(false)
}

export const EditInstructor = async (
    isWeb3Enabled,
    provider,
    firstName,
    lastName,
    userId,
    profession,
    briefIntro,
    faceBook,
    youtube,
    email,
    imageLink,
    tokenId,
    setError,
    setLoadingEditInstructor
) => {
    setLoadingEditInstructor(true)
    if (isWeb3Enabled && provider) {
        const signer = await provider.getSigner()
        const profiler = new ethers.Contract(address.profiler_Address, profiler_ABI, provider)
        try {
            await profiler
                .connect(signer)
                .edit_InstructorProfile(
                    `${firstName} ${lastName}`,
                    userId,
                    profession,
                    briefIntro,
                    [faceBook, youtube, email],
                    "imageLink",
                    tokenId,
                    address.RLNFT_Address
                )
            window.location.reload()
        } catch (e) {
            setError("Upload Error")
            console.log(e.data.message)
        }
    }
    setLoadingEditInstructor(false)
}

export const sendsofn = async (provider) => {
    const signer = await provider.getSigner()
    const profiler = new ethers.Contract(address.profiler_Address, profiler_ABI, provider)
    await profiler.connect(signer).sendSomfn("0xB0acF74E5a0295A40915a8229Ea56CEc53379916", {
        value: ethers.utils.parseEther("1"),
    })
    console.log("done")
}
