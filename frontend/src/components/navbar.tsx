import { LogoCiDi, LogoSanJuanGob } from "./icons"

export default function Navbar() {
    return (
        <header className="sticky top-0 z-50 flex items-center justify-between bg-background h-16 py-4 px-8 sm:px-12 backdrop-blur-sm shadow-md">
            <div className="flex items-center gap-4">
                <a href="/" className="">
                    <LogoSanJuanGob height={42} width={109} />
                </a>
            </div>

            <div className="flex items-center gap-4">
                <LogoCiDi height={39} width={109} />
            </div>

        </header>
    )
}
