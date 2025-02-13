"use client";

import { useState, useMemo, SetStateAction } from "react";
import { BoletinOficialState } from "@/store/appSilce";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import Pagination from "@/components/ui/pagination";
import { BuscarIcon } from "@/components/icons";
import { Input } from '@/components/ui/input';
import Loader from "@/components/ui/loader";
import { es } from 'date-fns/locale';
import Link from "next/link";
import useSWR from "swr";

const fetcher = (...args: [RequestInfo, RequestInit]): Promise<any> => fetch(...args).then((res) => res.json());

export default function LegislacionAvisosOficiales() {
    const [page, setPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [date, setDate] = useState<Date | undefined>(new Date())
    const [isActive, setIsActive] = useState(false);
    const [tipoBoletin, setTipoBoletin] = useState({
        edictos: true,
        licitaciones: true,
    });
    //feacha actual
    const today = new Date();
    //convertir fecha en formato dd/mm/yyyy en español
    const dateFormatted = date ? date.toLocaleDateString() : '';
    //convertir fecha en formato yyyy-mm-dd
    const dateBuscar = date ? date.toISOString().split('T')[0] : '';

    const { data, isLoading } = useSWR(`http://localhost:8000/buscador-publicaciones?page=${page}${tipoBoletin.edictos ? "&tipoPublicacion=Edictos" : ""}${tipoBoletin.licitaciones ? "&tipoPublicacion=Licitaciones" : ""}${searchTerm !== "" ? `&nombre=${searchTerm}` : ""}&fechaInicio=${isActive ? dateBuscar : ""}&pageSize=4`, fetcher, {
        keepPreviousData: true,
    });

    const itemsPerPage = 4;

    const pages = useMemo(() => {
        return data?.contador ? Math.ceil(data.contador / itemsPerPage) : 0;
    }, [data?.contador, itemsPerPage, searchTerm]);

    const loadingState = isLoading || data?.boletines === 0 ? "loading" : "idle";

    const handleDaySelect = (day: SetStateAction<Date | undefined>) => {
        setIsActive(!!day);
        setDate(day);
    };

    return (
        <div className="flex flex-col justify-center items-center text-grisPrincipal md:flex-row md:items-start">
            <aside className="w-1/4 p-4 bg-gray-100 hidden flex-col justify-start items-center md:flex">
                <div className="mt-12">
                    <h2 className="text-xl font-bold mb-4">Secciones</h2>
                    <ul>
                        <li className="mb-2"><Link href="/boletin-oficial/leyes-decretos-oficiales">Leyes y Decretos oficiales</Link></li>
                        <li className="mb-2"><Link href="/boletin-oficial/normas-y-ordenanzas">Normas y Ordenanzas</Link></li>
                        <li className="mb-2 text-naranjaPrincipal"><Link href="#">Edictos y Licitaciones</Link></li>
                        <li className="mb-2"><Link href="/boletin-oficial/convocatorias-y-otros">Convocatorias y otros</Link></li>
                    </ul>
                </div>
            </aside>
            <main className="w-full p-4 md:w-1/2">
                <div className="space-y-2 max-w-2xl mx-auto mb-4 bg-white">
                    <div className="relative">
                        <Input
                            className="peer pe-9 px-4"
                            placeholder="Buscar..."
                            type="email"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <div className="pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 text-muted-foreground/80 peer-disabled:opacity-50">
                            <BuscarIcon />
                        </div>
                    </div>
                </div>
                <div>
                    <h2 className="text-xl mb-4 bg-naranjaPrincipal text-white text-center py-3 rounded-lg">Edictos y Licitaciones  {isActive && `del dia ${dateFormatted}`} </h2>
                    {
                        loadingState === "loading" ? <Loader /> :
                            loadingState === "idle" && data.detail ? <p>No se encontraron Boletines</p> :
                                <ul>
                                    {data?.boletines.map((item: BoletinOficialState) => (
                                        <Link key={item.id} href={`/boletin-oficial/leyes-decretos-oficiales/${item.id}/${item.titulo}/${item.fecha.substring(0, 10)}`}>
                                            <li className="mb-4 px-4 h-20 flex flex-col justify-center items-start border-2 shadow-md rounded-xl bg-white hover:border-naranjaPrincipal transition-colors">
                                                <h3 className="text-lg font-bold">{item.titulo}</h3>
                                                <p>{item.fecha.substring(0, 10)}</p>
                                            </li>
                                        </Link>
                                    ))}
                                </ul>
                    }
                    {
                        data &&
                        <Pagination
                            total={pages}
                            page={page}
                            isCompact
                            onPageChange={(page) => setPage(page)}
                        />
                    }
                </div>
            </main>
            <aside className="w-full p-4 bg-gray-100 mt-2 md:w-1/4 md:pt-14 md:pl-20">
                <h2 className="text-xl font-medium text-center mb-4 md:text-start">Buscar por Fecha</h2>
                <div className='flex justify-center items-center md:justify-start'>
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
                <h2 className="text-xl font-medium text-center my-4 md:text-start">Buscar por tipo de Boletín</h2>
                <div className="flex justify-center items-center gap-4 md:flex-col md:items-start md:gap-0">
                    <div className="flex items-center space-x-2 py-2">
                        <Checkbox
                            id="edictos"
                            checked={tipoBoletin.edictos}
                            onCheckedChange={() => setTipoBoletin({ ...tipoBoletin, edictos: !tipoBoletin.edictos })}
                        />
                        <label
                            htmlFor="edictos"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 select-none"
                        >
                            Edictos
                        </label>
                    </div>
                    <div className="flex items-center space-x-2 py-2">
                        <Checkbox
                            id="licitaciones"
                            checked={tipoBoletin.licitaciones}
                            onCheckedChange={() => setTipoBoletin({ ...tipoBoletin, licitaciones: !tipoBoletin.licitaciones })}
                        />
                        <label
                            htmlFor="licitaciones"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 select-none"
                        >
                            Licitaciones
                        </label>
                    </div>
                </div>
            </aside>
        </div>
    );
};