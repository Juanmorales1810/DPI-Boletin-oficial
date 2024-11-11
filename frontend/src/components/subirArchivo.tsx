import { pdfSchema } from "@/validations/validationFile";
import { zodResolver } from "@hookform/resolvers/zod";
import { cargarBoletin } from "@/store/appSilce";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { UploadIcon } from "./icons";
import Loader from "./ui/loader";
import { useState } from "react";
import { toast } from "sonner";

interface SubirArchivoProps {
    checkbox?: boolean;
    apiSlice?: any;
    label?: string;
    id: string;
    disabled?: boolean;
    nombreSA: string;
    pathArchivo?: string;
}

export default function SubirArchivo(props: SubirArchivoProps) {
    const { checkbox, apiSlice, label, id, disabled, nombreSA, pathArchivo } =
        props;
    const [isloading, setIsLoading] = useState(false);

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

        setIsLoading(true);

        try {
            const response = await apiSlice({
                formData,
                nombreSA,
            }).unwrap();
            console.log("Desde el envio: ", response);
            if (response?.message)
                toast.success(response.message, {
                    richColors: true,
                    style: {
                        padding: "16px",
                    },
                });
            dispatch(cargarBoletin({ ...response.sa }));
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
        <form onSubmit={onSubmit} className="flex justify-center items-center gap-5  py-8">
            {label && <p className="font-bold text-sm">{label}</p>}
            <div className="flex justify-center items-center gap-5 ">
                <label
                    htmlFor={`dropzonefile-${id}`}
                    className="flex justify-center items-center rounded-md border-none bg-naranjaPrincipal text-white cursor-pointer shadow-md"
                >
                    <div className="flex justify-center items-center px-4 py-1 gap-2 ">
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
                        <p className="text1">
                            {watch(`dropzonefile-${id}`)[0]?.name}
                        </p>
                    )}
                </label>
                {pathArchivo && (
                    <a
                        href={`http://localhost:8000/${pathArchivo}`}
                        target="_blank"
                        className="text-naranjaPrincipal"
                    >
                        Ver Archivo
                    </a>
                )}
                {pathArchivo && (
                    <p
                        className="bg-gris50 px-4 py-2 rounded-md text-center"
                    >
                        valor: $ 1000
                    </p>
                )}
            </div>
            {errors[`dropzonefile-${id}`] && (
                <p className="textError">
                    {errors[`dropzonefile-${id}`]?.message?.toString()}
                </p>
            )}
            {isloading ? (
                <Loader />
            ) : !(!checkbox && watchDropzonefile?.length > 0) ? null : (
                <button
                    disabled={!(!checkbox && watchDropzonefile?.length > 0)}
                    className="sendButton"
                    type="submit"
                >
                    Enviar
                </button>
            )}
        </form>
    );
}