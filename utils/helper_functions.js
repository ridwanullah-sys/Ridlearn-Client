import fleekStorage from "@fleekhq/fleek-storage-js"
import { ethers } from "ethers"
import RLNFT_ABI from "../constants/RLNFTABI.json"
import address from "../constants/Addresses.json"

const API_SECRET = process.env.NEXT_PUBLIC_FLEEK_API_SECRET
const API_KEY = process.env.NEXT_PUBLIC_FLEEK_API_KEY

export const getUserData = async (setError, account, user_name) => {
    let addressData, usernameData
    const enc = new TextDecoder("utf-8")
    let myFile = []
    try {
        myFile = await fleekStorage.get({
            apiKey: API_KEY,
            apiSecret: API_SECRET,
            key: `profiles`,
            getOptions: ["data"],
        })
    } catch (e) {
        console.log(e)
        setError("error getting data")
        return
    }
    const data = JSON.parse(enc.decode(myFile.data))
    const address = data.find((datum) => datum.address == account)
    const username = data.find((datum) => datum.username == user_name)
    if (address) {
        addressData = address
    } else if (data && !address) {
        addressData = "User Not Registered"
    }
    if (username) {
        usernameData = username
    } else if (data && !username) {
        usernameData = "Username Still Available"
    }
    setError(null)

    return [addressData, usernameData, data]
}

export const Upload = async (setError, account, user_name, email) => {
    console.log("getting .....")
    if (!ethers.utils.isAddress(account)) {
        setError("invalid Address")
        console.log("invalid Address")
        return
    }
    const userData = await getUserData(setError, account, user_name)
    const data = userData[2]
    const datumUsername = userData[1]
    const datumAddress = userData[0]
    console.log(userData)

    if (datumUsername == "Username Still Available" && datumAddress == "User Not Registered") {
        const newProfile = {
            address: account,
            username: user_name,
            email: email,
        }
        data.push(newProfile)
        console.log("uploading................")
        try {
            await fleekStorage.upload({
                apiKey: API_KEY,
                apiSecret: API_SECRET,
                key: `profiles`,
                data: JSON.stringify(data),
            })
        } catch (e) {
            console.log(e)
            setError(`uploading Error`)
            return
        }
    } else {
        if (datumAddress != "User Not Registered") {
            setError(`Address, already reagistered with the Username ${datumAddress.username}`)
            console.log(`Address, already reagistered with the Username ${datumAddress.username}`)
            return
        } else if (datumUsername != "Username Still Available") {
            setError(`UserName already used, please try somthing else`)
            console.log(`UserName already used, please try somthing else`)
            return
        }
    }
    window.location.reload()
}

export const deleteAccount = async (setError, account, user_name) => {
    console.log("getting.....")
    const userData = await getUserData(setError, account, user_name)
    const data = userData[2]
    const datumAccount = userData[0]
    if (datumAccount != "User Not Registered" && datumAccount != undefined) {
        console.log("deleting.....")
        data.pop(datumAccount)
        try {
            await fleekStorage.upload({
                apiKey: API_KEY,
                apiSecret: API_SECRET,
                key: `profiles`,
                data: JSON.stringify(data),
            })
        } catch (e) {
            console.log(e)
            setError(`uploading Error`)
            return
        }
    } else {
        console.log("account not registered")
        setError("account not registered")
        return
    }
    window.location.reload()
}

export const editAccount = async (setError, account, user_name, email) => {
    console.log("getting.....")
    const userData = await getUserData(setError, account, user_name)
    const data = userData[2]
    const datumAccount = userData[0]
    const datumUsername = userData[1]
    if (datumAccount != "User Not Registered" && datumAccount != undefined) {
        if (datumUsername != "Username Still Available") {
            setError("UserName Not availbale")
            console.log("UserName Not availbale")
            return
        }
        console.log("editing.....")
        const IndexOfDatum = data.indexOf(datumAccount)
        datumAccount.username = user_name
        datumAccount.email = email
        data[IndexOfDatum] = datumAccount

        if (datumAccount.username == user_name && datumAccount.email == email) {
            try {
                await fleekStorage.upload({
                    apiKey: API_KEY,
                    apiSecret: API_SECRET,
                    key: `profiles`,
                    data: JSON.stringify(data),
                })
            } catch (e) {
                console.log(e)
                setError(`uploading Error`)
                return
            }
        }
    } else {
        console.log("account not registered")
        setError("account not registered")
        return
    }
    window.location.reload()
}

export const getInstructorData = async (isWeb3Enabled, enableWeb3, account) => {
    let Instructor
    if (isWeb3Enabled) {
        let provider = await enableWeb3()
        if (provider == undefined) {
            provider = new ethers.providers.Web3Provider(window.ethereum)
        }
        const RLNFT = new ethers.Contract(address.RLNFT_Address, RLNFT_ABI, provider)
        const Tokens = await RLNFT.getTokensOwned(account)
        const tokenArray = []

        if (Tokens.length > 0) {
            const convertToArray = new Promise(async (resolve) => {
                Tokens.forEach(async (token) => {
                    const data = await RLNFT.tokenURI(token)
                    tokenArray.push(JSON.parse(data).Owner)
                    if (tokenArray.length >= Tokens.length) {
                        resolve()
                    }
                })
            })
            await convertToArray
        }
        if (tokenArray.length < 1) {
            Instructor = "Not An Instructor"
        } else {
            Instructor = tokenArray
        }
    } else {
        Instructor = "please, connect you wallet"
    }
    return Instructor
}
