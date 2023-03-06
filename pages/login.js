import { useEffect, useState } from "react"
import { useMoralis } from "react-moralis"
import { ethers } from "ethers"
import profiler_ABI from "../constants/profilerABI.json"
import fleekStorage from "@fleekhq/fleek-storage-js"
import RLNFT_ABI from "../constants/RLNFTABI.json"
import address from "../constants/Addresses.json"

export default function Login() {
    const { isWeb3Enabled, enableWeb3, account } = useMoralis()

    const logIn = async () => {
        if (isWeb3Enabled) {
            let provider = await enableWeb3()
            if (provider == undefined) {
                provider = new ethers.providers.Web3Provider(window.ethereum)
            }
            const RLNFT = new ethers.Contract(address.RLNFT_Address, RLNFT_ABI, provider)
            const Tokens = await RLNFT.getTokensOwned(account)
            const tokenArray = []
            if (Tokens.length > 0) {
                const convertToArray = new Promise(async (resolve, reject) => {
                    Tokens.forEach(async (token) => {
                        const data = await RLNFT.tokenURI(token)
                        tokenArray.push(JSON.parse(data).Owner)
                        if (tokenArray.length >= Tokens.length) {
                            resolve()
                        }
                    })
                })

                await convertToArray
                setTokens(tokenArray)
            } else {
                setTokens(tokenArray)
            }
            console.log("done")
        }
    }
    useEffect(() => {
        logIn()
    }, [account])

    return (
        <div className="p-5">
            {!isWeb3Enabled ? (
                <div className="tracking-wide leading-8 text-justify text-emerald-200 font-semibold">
                    {" "}
                    Please, connect to Your wallet
                </div>
            ) : tokens.length < 1 ? (
                <p className="tracking-wide leading-8 text-justify text-emerald-200 font-semibold">
                    The connected Account is not Registerd,{" "}
                    <a href="/register" className="text-slate-50">
                        Click Here
                    </a>
                    to register., However, If you have registered before please connect to the
                    registered Account. <hr />
                    If you have previously registered as an administrator, the connected account
                    does not contain your Ridlearn token, please connect to the account containing
                    the token or send the token to this account. However, you can decide to register
                    a new Instructor Profile and then get another Ridlearn token for the profile.
                    <a href="/register" className="text-slate-50">
                        Click Here
                    </a>
                    to register as an Instructor
                </p>
            ) : (
                <div className="tracking-wide leading-8 text-justify text-emerald-200 font-semibold">
                    Which account would You like to Login with?
                    <div className="flex flex-col gap-2">
                        {tokens.map((token) => {
                            return (
                                <button
                                    key={tokens.indexOf(token)}
                                    className="p-1 tracking-wide leading-8 text-justify text-emerald-100 font-semibold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
                                >
                                    {token[0].name}
                                </button>
                            )
                        })}{" "}
                    </div>
                </div>
            )}
        </div>
    )
}
