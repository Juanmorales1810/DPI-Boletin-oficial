import { usePostSubirArchivoBoletinMutation } from "@/store/apiSlice";
import { pdfSchema } from "@/validations/validationFile";
import { zodResolver } from "@hookform/resolvers/zod";
import { cargarBoletin } from "@/store/appSilce";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { UploadIcon } from "./icons";
import Loader from "./ui/loader";
import { useState } from "react";
import { toast } from "sonner";
import { BoletinOficialState } from "@/store/appSilce";

interface SubirArchivoProps {
    label?: string;
    id: string;
    disabled?: boolean;
    boletin: BoletinOficialState;
}

export default function SubirArchivo(props: SubirArchivoProps) {
    const { label, id, disabled, boletin } = props;
    const [isloading, setIsLoading] = useState(false);
    const [PostArchivo] = usePostSubirArchivoBoletinMutation();

    const dispatch = useDispatch();

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(pdfSchema(id)),
    });

    const watchDropzonefile = watch(`dropzonefile-${id}`);

    const onSubmit = handleSubmit(async (data) => {
        const formData = new FormData();
        formData.append("file", data[`dropzonefile-${id}`][0]);
        formData.append("titulo", boletin.titulo || "unnombre");
        formData.append("descripcion", boletin.descripcion || "unmail@mail.com");
        formData.append("tipoPublicacion", boletin.tipoPublicacion || "notificaciones");
        formData.append("tipoActividad", boletin.tipoActividad || "Minera");
        formData.append("duracionPublicacion", boletin.duracionPublicacion?.toString() || "4");

        setIsLoading(true);

        try {
            const response = await PostArchivo({
                formData,
            }).unwrap();
            console.log("Desde el envio: ", response);
            if (response?.message)
                toast.success(response.message, {
                    richColors: true,
                    style: {
                        padding: "16px",
                    },
                });
            dispatch(cargarBoletin({ ...response }));
        } catch (error: any) {
            console.error("Error en el envio: ", error);
            const errorMessage =
                error.data?.detail.toString() || "Error desconocido";
            toast.error(errorMessage, {
                richColors: true,
                style: {
                    padding: "16px",
                },
            });
        }
        setIsLoading(false);
    });

    return (
        <form onSubmit={onSubmit} className="flex justify-center items-center gap-5 py-8">
            <div className="flex justify-center items-center bg-white w-full max-w-2xl h-40 rounded-lg shadow-md">
                {label && <p className="font-bold text-sm">{label}</p>}
                <div className="flex flex-col justify-center items-center gap-5 ">
                    <div className="flex justify-center items-center space-x-4">
                        <div className="space-y-1">
                            <label
                                htmlFor={`dropzonefile-${id}`}
                                className="flex justify-center items-center rounded-md border-none bg-naranjaPrincipal text-white cursor-pointer shadow-md"
                            >
                                <div className="flex justify-center items-center px-4 py-2 gap-2 ">
                                    <UploadIcon />
                                    <p className="text-sm text-left">
                                        <span className="textSpan">
                                            {disabled ? "Archivo cargado" : "Subir archivo"}
                                        </span>
                                    </p>
                                </div>
                                <input
                                    id={`dropzonefile-${id}`}
                                    type="file"
                                    disabled={disabled}
                                    className="hidden"
                                    {...register(`dropzonefile-${id}`)}
                                />
                                {watch(`dropzonefile-${id}`) && (
                                    <p className="text-xs pr-4">
                                        {watch(`dropzonefile-${id}`)[0]?.name}
                                    </p>
                                )}
                            </label>
                            {errors[`dropzonefile-${id}`] && (
                                <p className="text-xs text-destructive">
                                    {errors[`dropzonefile-${id}`]?.message?.toString()}
                                </p>
                            )}
                        </div>
                        {isloading ? (
                            <Loader />
                        ) : !(watchDropzonefile?.length > 0) ? null : (
                            <button
                                disabled={!(watchDropzonefile?.length > 0)}
                                className="bg-gris80 text-white px-4 py-2 rounded-md"
                                type="submit"
                            >
                                Calcular
                            </button>
                        )}
                    </div>
                    <div className="flex justify-center items-center space-x-4">
                        {boletin.nombreArchivo && (
                            <a
                                href={`http://localhost:8000/archivos/boletines/${boletin.nombreArchivo.substring(2, 80)}/${boletin.id}`}
                                target="_blank"
                                className="text-naranjaPrincipal"
                            >
                                Ver Archivo
                            </a>
                        )}
                        {boletin.nombreArchivo && (
                            <p
                                className="bg-gris50 px-4 py-2 rounded-md text-center"
                            >
                                valor: $ {boletin.precio}
                            </p>
                        )}
                        {
                            boletin.nombreArchivo && (
                                <button
                                    className="bg-naranjaPrincipal text-white px-4 py-2 rounded-md"
                                >
                                    Aceptar
                                </button>
                            )
                        }
                    </div>
                </div>
            </div>
        </form>
    );
}