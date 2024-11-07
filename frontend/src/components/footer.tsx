import { FacebookIcon, InstagramIcon, InstitucionalIcon, LogoSanJuanGob, XIcon, YoutubeIcon } from "./icons";

export default function Footer() {
    return (
        <footer className="flex justify-between items-center px-20 py-2 bg-grisPrincipal h-60">
            <div className="flex flex-col justify-center items-center">
                <LogoSanJuanGob height={57} width={144} fill="#ffffff" />
                <img src="/img/Frame- Escudo SJ.svg" alt="Logo San Juan Gobierno" className="h-20 brightness-200 mt-2" />
            </div>
            <div className="flex gap-4 justify-center items-center">
                <InstitucionalIcon size={40} />
                <ul className="flex flex-col gap-4 text-white">
                    <li>
                        <p>
                            Santa Fe 54 Oeste, entre Mendoza y Entre Ríos,
                            SAN JUAN
                        </p>
                    </li>
                    <li>
                        <p>Teléfono</p>
                    </li>
                    <li>
                        <p>
                            Email: igpj@sanjuan.gov.ar,
                            turnosigpj@sanjuan.gov.ar
                        </p>
                    </li>
                </ul>
            </div>
            <div >
                <ul className="flex gap-4 justify-center items-center">
                    <li>
                        <FacebookIcon size={27} />
                    </li>
                    <li>
                        <XIcon size={27} />
                    </li>
                    <li>
                        <InstagramIcon size={27} />
                    </li>
                    <li>
                        <YoutubeIcon size={27} />
                    </li>
                </ul>
            </div>
        </footer>
    )
}
