"use client";

import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import { BuscarIcon } from "@/components/icons";
import { Input } from '@/components/ui/input';
import { es } from 'date-fns/locale';
import { useState, useMemo, SetStateAction } from "react";
import useSWR from "swr";
import Loader from "@/components/ui/loader";
import Pagination from "@/components/ui/pagination";

interface Item {
    nombre: string;
    email: string;
    fecha: string;
    tipoPublicacion: string;
    contenido: string;
    precio: number;
    duracionPublicacion: number;
    nombre_archivo: string;
    path_archivo: string;
    fechaPublicacion: string;
    id: number;
}

const fetcher = (...args: [RequestInfo, RequestInit]): Promise<any> => fetch(...args).then((res) => res.json());

export default function LegislacionAvisosOficiales() {
    const [page, setPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [date, setDate] = useState<Date | undefined>(new Date())
    const [isActive, setIsActive] = useState(false);
    const [tipoBoletin, setTipoBoletin] = useState({
        leyes: true,
        decretos: true,
    });
    //feacha actual
    const today = new Date();
    //convertir fecha en formato dd/mm/yyyy en español
    const dateFormatted = date ? date.toLocaleDateString() : '';
    //convertir fecha en formato yyyy-mm-dd
    const dateBuscar = date ? date.toISOString().split('T')[0] : '';

    const { data, isLoading } = useSWR(`http://localhost:8000/buscador-publicaciones?page=${page}${tipoBoletin.leyes ? "&tipoPublicacion=Ley" : ""}${tipoBoletin.decretos ? "&tipoPublicacion=Decreto" : ""}${searchTerm !== "" ? `&nombre=${searchTerm}` : ""}&fechaInicio=${isActive ? dateBuscar : ""}&pageSize=4`, fetcher, {
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
        <div className="flex text-grisPrincipal">
            <aside className="w-1/4 p-4 bg-gray-100 flex flex-col justify-start items-center">
                <div className="mt-12">
                    <h2 className="text-xl font-bold mb-4">Secciones</h2>
                    <ul>
                        <li className="mb-2 text-naranjaPrincipal"><a href="#">Leyes y Decretos oficiales</a></li>
                        <li className="mb-2"><a href="#">Normas y Ordenanzas</a></li>
                        <li className="mb-2"><a href="#">Edictos y Licitaciones</a></li>
                        <li className="mb-2"><a href="#">Convocatorias y otros</a></li>
                    </ul>
                </div>
            </aside>
            <main className="w-1/2 p-4">
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
                    <h2 className="text-xl mb-4 bg-naranjaPrincipal text-white text-center py-3 rounded-lg">Leyes y Decretos  {isActive && `del dia ${dateFormatted}`} </h2>
                    {
                        loadingState === "loading" ? <Loader /> :
                            loadingState === "idle" && data.detail ? <p>No se encontraron Boletines</p> :
                                <ul>
                                    {data?.boletines.map((item: Item) => (
                                        <a key={item.id} target="_blank" href="https://contenido.sanjuan.gob.ar/media/k2/attachments/(11)_(NOVIEMBRE)_15-11-2024__(P._84_Internet.pdf">
                                            <li className="mb-4 px-4 h-20 flex flex-col justify-center items-start border-2 shadow-md rounded-xl bg-white hover:border-naranjaPrincipal transition-colors">
                                                <h3 className="text-lg font-bold">{item.nombre}</h3>
                                                <p>{item.fecha.substring(0, 10)}</p>
                                            </li>
                                        </a>
                                    ))}
                                </ul>
                    }
                    <Pagination
                        total={pages}
                        page={page}
                        isCompact
                        onPageChange={(page) => setPage(page)}
                    />
                </div>
            </main>
            <aside className="w-1/4 p-4 bg-gray-100 mt-2">
                <h2 className="text-xl font-medium mb-4">Buscar por Fecha</h2>
                <div className='flex justify-start items-center'>
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
                <h2 className="text-xl font-medium my-4">Buscar por tipo de Boletín</h2>
                <div className="flex items-center space-x-2 py-2">
                    <Checkbox
                        id="leyes"
                        checked={tipoBoletin.leyes}
                        onCheckedChange={() => setTipoBoletin({ ...tipoBoletin, leyes: !tipoBoletin.leyes })}
                    />
                    <label
                        htmlFor="leyes"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 select-none"
                    >
                        Leyes
                    </label>
                </div>
                <div className="flex items-center space-x-2 py-2">
                    <Checkbox
                        id="decretos"
                        checked={tipoBoletin.decretos}
                        onCheckedChange={() => setTipoBoletin({ ...tipoBoletin, decretos: !tipoBoletin.decretos })}
                    />
                    <label
                        htmlFor="decretos"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 select-none"
                    >
                        Decretos
                    </label>
                </div>
            </aside>
        </div>
    );
};