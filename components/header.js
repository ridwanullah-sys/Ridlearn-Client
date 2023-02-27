import { ConnectButton } from "@web3uikit/web3"

export const Header = () => {
    return (
        <div className="flex justify-between border-b-2 p-3">
            <div className="text-slate-200 text-2xl">Ridlearn</div>
            <div>
                <ConnectButton />
            </div>
        </div>
    )
}
