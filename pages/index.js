import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

export default function Home() {
    const sendSomfn = async () => {}
    return (
        <div className="text-2xl text-slate-100">
            <button className="text-white text-bold">Send Something</button>
        </div>
    )
}
