"use client";

import { useState, useMemo, SetStateAction } from "react";
import { BoletinOficialState } from "@/store/appSilce";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import Pagination from "@/components/ui/pagination";
import { BuscarIcon } from "@/components/icons";
import { Input } from "@/components/ui/input";
import Loader from "@/components/ui/loader";
import { es } from "date-fns/locale";
import Link from "next/link";
import useSWR from "swr";

const fetcher = (...args: [RequestInfo, RequestInit]): Promise<any> =>
    fetch(...args).then((res) => res.json());

interface BoletinOficialTemplateProps {
    sectionTitle: string;
    sectionPath: string;
    tiposBoletin: {
        id: string;
        label: string;
        paramName: string;
    }[];
    navLinks: {
        text: string;
        href: string;
        active?: boolean;
    }[];
}

export default function BoletinOficialTemplate({
    sectionTitle,
    sectionPath,
    tiposBoletin,
    navLinks,
}: BoletinOficialTemplateProps) {
    const [page, setPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [date, setDate] = useState<Date | undefined>(new Date());
    const [isActive, setIsActive] = useState(false);
    const [tiposSeleccionados, setTiposSeleccionados] = useState<
        Record<string, boolean>
    >(tiposBoletin.reduce((acc, tipo) => ({ ...acc, [tipo.id]: true }), {}));

    // Fecha actual
    const today = new Date();
    // Convertir fecha en formato dd/mm/yyyy en español
    const dateFormatted = date ? date.toLocaleDateString() : "";
    // Convertir fecha en formato yyyy-mm-dd
    const dateBuscar = date ? date.toISOString().split("T")[0] : "";

    // Construir parámetros de tipo de boletín
    const tipoParams = tiposBoletin
        .filter((tipo) => !tiposSeleccionados[tipo.id])
        .map((tipo) => `&${tipo.paramName}=${tipo.label}`)
        .join("");

    // Construir parámetros cuando todos los tipos están seleccionados
    const todosTiposParams = Object.values(tiposSeleccionados).every(
        (value) => value
    )
        ? tiposBoletin
              .map((tipo) => `&${tipo.paramName}=${tipo.label}`)
              .join("")
        : "";

    const { data, isLoading } = useSWR(
        `http://localhost:8000/buscador-publicaciones/?page=${page}${tipoParams}${
            searchTerm !== "" ? `&titulo=${searchTerm}` : ""
        }&fechaInicio=${
            isActive ? dateBuscar : ""
        }${todosTiposParams}&pageSize=4`,
        fetcher,
        {
            keepPreviousData: true,
        }
    );

    const itemsPerPage = 4;

    const pages = useMemo(() => {
        return data?.contador ? Math.ceil(data.contador / itemsPerPage) : 0;
    }, [data?.contador, itemsPerPage, searchTerm]);

    const loadingState =
        isLoading || data?.boletines === 0 ? "loading" : "idle";

    const handleDaySelect = (day: SetStateAction<Date | undefined>) => {
        setIsActive(!!day);
        setDate(day);
    };

    interface DataResponse {
        contador: number;
        boletines: BoletinOficialState[];
        detail?: string;
    }

    const filteredData = (data as DataResponse)?.boletines?.filter(
        (item: BoletinOficialState) =>
            item.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.contenido.toLowerCase().includes(searchTerm.toLowerCase())
    );

    interface HighlightTextProps {
        text: string;
        highlight: string;
    }

    const highlightText = ({
        text,
        highlight,
    }: HighlightTextProps): (string | JSX.Element)[] => {
        if (!highlight.trim()) return [text];
        const parts = text.split(new RegExp(`(${highlight})`, "gi"));
        return parts.map((part, index) =>
            part.toLowerCase() === highlight.toLowerCase() ? (
                <mark className="bg-naranjaPrincipal text-white" key={index}>
                    {part}
                </mark>
            ) : (
                part
            )
        );
    };

    const truncateHTML = (
        html: string,
        highlight: string,
        maxLength: number
    ): string => {
        const div = document.createElement("div");
        div.innerHTML = html;
        const text = div.textContent || div.innerText || "";
        const index = text.toLowerCase().indexOf(highlight.toLowerCase());

        if (index === -1 || !highlight.trim()) {
            return text.length > maxLength
                ? text.substring(0, maxLength) + "..."
                : text;
        }

        const start = Math.max(0, index - Math.floor(maxLength / 2));
        const end = Math.min(text.length, start + maxLength);
        const truncated = text.substring(start, end);

        return (
            (start > 0 ? "..." : "") +
            truncated +
            (end < text.length ? "..." : "")
        );
    };

    return (
        <div className="flex flex-col justify-center items-center text-grisPrincipal md:flex-row md:items-start">
            <aside className="w-1/4 p-4 bg-gray-100 hidden flex-col justify-start items-center md:flex">
                <div className="mt-12">
                    <h2 className="text-xl font-bold mb-4">Secciones</h2>
                    <ul>
                        {navLinks.map((link, index) => (
                            <li
                                key={index}
                                className={`mb-2 ${
                                    link.active ? "text-naranjaPrincipal" : ""
                                }`}
                            >
                                <Link href={link.href}>{link.text}</Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </aside>
            <main className="w-full p-4 md:w-1/2">
                <div className="space-y-2 max-w-2xl mx-auto mb-4 bg-white">
                    <div className="relative">
                        <Input
                            className="peer pe-9 px-4"
                            placeholder="Buscar..."
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <div className="pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 text-muted-foreground/80 peer-disabled:opacity-50">
                            <BuscarIcon />
                        </div>
                    </div>
                </div>
                <div>
                    <h2 className="text-xl mb-4 bg-naranjaPrincipal text-white text-center py-3 rounded-lg">
                        {sectionTitle} {isActive && `del día ${dateFormatted}`}{" "}
                    </h2>
                    {loadingState === "loading" ? (
                        <Loader />
                    ) : loadingState === "idle" && data.detail ? (
                        <p>No se encontraron Boletines</p>
                    ) : (
                        <ul>
                            {filteredData?.map((item: BoletinOficialState) => (
                                <Link
                                    key={item.id}
                                    href={`${sectionPath}/${item.id}/${
                                        item.titulo
                                    }/${item.fecha.substring(0, 10)}`}
                                >
                                    <li className="mb-4 px-4 h-fit flex flex-col justify-center items-start border-2 shadow-md rounded-xl bg-white hover:border-naranjaPrincipal transition-colors">
                                        <h3 className="text-lg font-bold">
                                            {highlightText({
                                                text: item.titulo,
                                                highlight: searchTerm,
                                            })}
                                        </h3>
                                        <p className="px-1 text-gris80 line-clamp-1">
                                            {highlightText({
                                                text: truncateHTML(
                                                    item.contenido,
                                                    searchTerm,
                                                    100
                                                ),
                                                highlight: searchTerm,
                                            })}
                                        </p>
                                        <p className="px-1 text-gris80">
                                            {item.fecha.substring(0, 10)}
                                        </p>
                                    </li>
                                </Link>
                            ))}
                        </ul>
                    )}
                    <Pagination
                        total={pages}
                        page={page}
                        isCompact
                        onPageChange={(page) => setPage(page)}
                    />
                </div>
            </main>
            <aside className="w-full p-4 bg-gray-100 mt-2 md:w-1/4 md:pt-14 md:pl-20">
                <h2 className="text-xl font-medium text-center mb-4 md:text-start">
                    Buscar por Fecha
                </h2>
                <div className="flex justify-center items-center md:justify-start">
                    <Calendar
                        mode="single"
                        selected={date}
                        onSelect={handleDaySelect}
                        className="rounded-md border bg-white"
                        locale={es}
                        disabled={{
                            after: today,
                        }}
                    />
                </div>
                <h2 className="text-xl font-medium text-center my-4 md:text-start">
                    Buscar por tipo de Boletín
                </h2>
                <div className="flex justify-center items-center gap-4 md:flex-col md:items-start md:gap-0">
                    {tiposBoletin.map((tipo) => (
                        <div
                            key={tipo.id}
                            className="flex items-center space-x-2 py-2"
                        >
                            <Checkbox
                                id={tipo.id}
                                checked={!tiposSeleccionados[tipo.id]}
                                onCheckedChange={() =>
                                    setTiposSeleccionados({
                                        ...tiposSeleccionados,
                                        [tipo.id]: !tiposSeleccionados[tipo.id],
                                    })
                                }
                            />
                            <label
                                htmlFor={tipo.id}
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 select-none"
                            >
                                {tipo.label}
                            </label>
                        </div>
                    ))}
                </div>
            </aside>
        </div>
    );
}
