"use client";

import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import { BuscarIcon } from "@/components/icons";
import { Input } from '@/components/ui/input';
import { es } from 'date-fns/locale';
import { useState, useMemo, useCallback, AwaitedReactNode, JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal } from "react";
import useSWR from "swr";

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

const fetcher = (...args: [RequestInfo, RequestInit]) => fetch(...args).then((res) => res.json());

export default function LegislacionAvisosOficiales() {
    const [searchTerm, setSearchTerm] = useState('');
    const [date, setDate] = useState<Date | undefined>(new Date())
    const [tipoBoletin, setTipoBoletin] = useState({
        leyes: true,
        decretos: true,
    });

    const { data, isLoading } = useSWR(`http://localhost:8000/buscador-publicaciones?${tipoBoletin.leyes ? "tipoPublicacion=Ley" : ""}${tipoBoletin.decretos ? "&tipoPublicacion=Decreto" : ""}${searchTerm !== "" ? `&nombre=${searchTerm}` : ""}`, fetcher, {
        keepPreviousData: true,
    });

    const itemsPerPage = 12;

    // const pages = useMemo(() => {
    //     return data?.totalItems ? Math.ceil(data.totalItems / itemsPerPage) : 0;
    // }, [data?.totalItems, itemsPerPage, searchTerm]);

    // const loadingState = isLoading || data?.totalItems.length === 0 ? "loading" : "idle";

    console.log(data);


    const dateFormatted = date ? date.toLocaleDateString() : '';


    const lawsAndNotices = [
        { id: 1, title: 'Ley 1', description: 'Descripción de la Ley 1' },
        { id: 2, title: 'Aviso Oficial 1', description: 'Descripción del Aviso Oficial 1' },
        // Add more items here
    ];

    const filteredItems = lawsAndNotices.filter(item =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="flex">
            <aside className="w-1/4 p-4 bg-gray-100 flex justify-center items-center">
                <ul>
                    <li className="mb-2 text-naranjaPrincipal"><a href="#">Leyes y Decretos oficiales</a></li>
                    <li className="mb-2"><a href="#">Normas y Ordenanzas</a></li>
                    <li className="mb-2"><a href="#">Edictos y Licitaciones</a></li>
                    <li className="mb-2"><a href="#">Convocatorias y otros</a></li>
                </ul>
            </aside>
            <main className="w-1/2 p-4">
                <div className="space-y-2 max-w-2xl mx-auto mb-4">
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
                    <h2 className="text-xl mb-4 bg-naranjaPrincipal text-white text-center py-3">Leyes y Decretos  dia {dateFormatted} </h2>
                    <ul>
                        {data?.map((item: Item) => (
                            <li key={item.id} className="mb-4 p-4 border border-gray-300 rounded">
                                <h3 className="text-lg font-bold">{item.nombre}</h3>
                                <p>{item.fecha}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </main>
            <aside className="w-1/4 p-4 bg-gray-100">
                <h2 className="text-xl font-bold mb-4">Buscar por Fecha</h2>
                <div className='flex justify-start items-center'>
                    <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        className="rounded-md border"
                        locale={es}
                    />
                </div>
                <h2 className="text-xl font-bold mb-4">Buscar por tipo de Boletin</h2>
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