"use client";
import { useGetBoletinPorIDQuery } from "@/store/apiSlice";
import Loader from "./ui/loader";
import { Printer } from "lucide-react";

interface ContentProps {
    id: string;
}

export default function Content(props: ContentProps) {
    const { id } = props;
    const { data, isLoading, error } = useGetBoletinPorIDQuery({ id: id[0] });

    if (isLoading) return <Loader />;
    if (error) return <p>Ocurrió un error al cargar los datos.</p>;

    return (
        <div className="flex flex-col justify-center items-center">
            <div className="w-full mx-auto mb-6 text-center md:w-2/3">
                <p className="text-xs font-semibold tracking-wider text-naranjaPrincipal uppercase">{data.tipoPublicacion}</p>
                <h1 className="mb-1 text-4xl font-bold text-gray-900 md:leading-tight md:text-5xl" itemProp="headline" title={data.titulo}>
                    {data.titulo}
                </h1>
                <p className="text-gray-700">
                    {data.descripcion}
                </p>
            </div>
            <div className="flex justify-between items-center w-full max-w-2xl bg-naranjaPrincipal px-4 py-3 rounded-lg">
                <p className="text-sm font-semibold text-white">Publicado el {new Date(data.fechaPublicacion).toLocaleDateString()}</p>
                <div>
                    {!data.nombre_archivo ? (
                        <a href={data.path_archivo} target="_blank" rel="noreferrer" className="text-white"><Printer /></a>
                    ) : null}
                </div>
            </div>
            {data && data.contenido ? (
                <div className="prose prose-lg py-4"
                    dangerouslySetInnerHTML={{ __html: data.contenido }}
                />
            ) : (
                <p>No hay contenido disponible.</p>
            )}
        </div>
    );
}