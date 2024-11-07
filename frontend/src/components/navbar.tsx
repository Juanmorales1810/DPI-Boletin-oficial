import { LogoCiDi, LogoSanJuanGob } from "./icons"

export default function Navbar() {
    return (
        <header className="sticky top-0 z-50 flex justify-center items-center w-full bg-background h-16 py-2 px-8 shadow-md log:px-12">
            <nav className="flex items-center justify-between gap-4 w-full max-w-6xl mx-auto">
                <div className="flex items-center gap-4">
                    <a href="/" className="">
                        <LogoSanJuanGob height={42} width={109} />
                    </a>
                </div>

                <div className="flex items-center gap-4">
                    <LogoCiDi height={39} width={109} />
                </div>
            </nav>

        </header>
    )
}
