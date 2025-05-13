"use client";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { boletinSchema } from "@/validations/boletinvalidation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Separator } from "@/components/ui/separator";
import { cargarBoletin } from "@/store/appSilce";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";

export default function Home() {
    const dispatch = useDispatch();
    const router = useRouter();
    const [step, setStep] = useState(1);

    const handleNext = () => setStep((prevStep) => prevStep + 1);
    const handleBack = () => setStep((prevStep) => prevStep - 1);

    const form = useForm<z.infer<typeof boletinSchema>>({
        resolver: zodResolver(boletinSchema),
        defaultValues: {
            titulo: "",
            descripcion: "",
            tipoPublicacion: undefined,
            tipoActividad: undefined,
            duracionPublicacion: undefined,
        },
    });

    function onSubmit(values: z.infer<typeof boletinSchema>) {
        try {
            toast.success("Crear Boletín", {
                richColors: true,
                style: {
                    padding: "16px",
                },
            });
            dispatch(
                cargarBoletin({
                    ...values,
                    duracionPublicacion: Number(values.duracionPublicacion),
                })
            );
            router.push("/cargar-boletin/completar-boletin");
        } catch (error: any) {
            console.error("Error en el envio: ", error);
            toast.error(error.data?.detail, {
                richColors: true,
                style: {
                    padding: "16px",
                },
            });
        }
        console.log(values);
    }

    return (
        <section className="py-10 w-full px-2">
            <div className="flex flex-col justify-center items-center mx-auto gap-10 py-20 bg-white rounded-lg shadow-md max-w-5xl md:flex-row">
                <div>
                    <h1 className="text-center text-2xl text-gris80 font-bold mb-6">
                        Boletín Oficial
                    </h1>
                    <img
                        src="/img/Frame- Escudo SJ.svg"
                        alt="Frame- Escudo SJ"
                        className="w-full"
                    />
                </div>
                <Separator
                    orientation="vertical"
                    className="h-80 hidden md:block"
                />
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="flex flex-col gap-4"
                    >
                        {step === 1 && (
                            <>
                                <FormField
                                    control={form.control}
                                    name="titulo"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-col justify-center items-center gap-1 w-full">
                                            <div className="flex justify-between items-center gap-2 w-full">
                                                <FormLabel className="mr-9">
                                                    Titulo
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        className="shadow-md"
                                                        placeholder="Ingrese su nombre"
                                                        {...field}
                                                    />
                                                </FormControl>
                                            </div>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="descripcion"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-col justify-center items-center gap-1 w-full">
                                            <div className="flex justify-between items-center gap-2 w-full">
                                                <FormLabel>
                                                    Descripción
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        className="shadow-md"
                                                        placeholder="Ingrese su email"
                                                        {...field}
                                                    />
                                                </FormControl>
                                            </div>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="tipoPublicacion"
                                    render={({ field }) => (
                                        <FormItem>
                                            <Select
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                            >
                                                <FormControl>
                                                    <SelectTrigger className="bg-naranjaPrincipal text-white">
                                                        <SelectValue placeholder="Seleccione tipo de documento" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent className="bg-gris70">
                                                    <SelectItem value="Ley">
                                                        Leyes
                                                    </SelectItem>
                                                    <SelectItem value="Decretos">
                                                        Decretos
                                                    </SelectItem>
                                                    <SelectItem value="Normas">
                                                        Normas
                                                    </SelectItem>
                                                    <SelectItem value="Ordenanzas">
                                                        Ordenanzas
                                                    </SelectItem>
                                                    <SelectItem value="Notificaciones">
                                                        Notificaciones (edictos)
                                                    </SelectItem>
                                                    <SelectItem value="Licitaciones">
                                                        Licitaciones
                                                    </SelectItem>
                                                    <SelectItem value="Convocatorias">
                                                        Convocatorias
                                                    </SelectItem>
                                                    <SelectItem value="Otro">
                                                        Otro
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button
                                    type="button"
                                    onClick={handleNext}
                                    className="bg-gris80 text-white w-24 ml-auto"
                                >
                                    Siguiente
                                </Button>
                            </>
                        )}
                        {step === 2 && (
                            <>
                                <FormField
                                    control={form.control}
                                    name="tipoActividad"
                                    render={({ field }) => (
                                        <FormItem>
                                            <Select
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                            >
                                                <FormControl>
                                                    <SelectTrigger className="bg-naranjaPrincipal text-white w-[297px]">
                                                        <SelectValue placeholder="Seleccione tipo de actividad" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent className="bg-gris70">
                                                    <SelectItem value="Minera">
                                                        Minera
                                                    </SelectItem>
                                                    <SelectItem value="Agrícola">
                                                        Agrícola
                                                    </SelectItem>
                                                    <SelectItem value="Industrial">
                                                        Industrial
                                                    </SelectItem>
                                                    <SelectItem value="Comercial">
                                                        Comercial
                                                    </SelectItem>
                                                    <SelectItem value="Turística">
                                                        Turística
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="duracionPublicacion"
                                    render={({ field }) => (
                                        <FormItem>
                                            <Select
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                            >
                                                <FormControl>
                                                    <SelectTrigger className="bg-naranjaPrincipal text-white w-[297px]">
                                                        <SelectValue placeholder="Duración de publicación" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent className="bg-gris70">
                                                    <SelectItem value="1">
                                                        1 día
                                                    </SelectItem>
                                                    <SelectItem value="2">
                                                        2 días
                                                    </SelectItem>
                                                    <SelectItem value="3">
                                                        3 días
                                                    </SelectItem>
                                                    <SelectItem value="4">
                                                        4 días
                                                    </SelectItem>
                                                    <SelectItem value="5">
                                                        5 días
                                                    </SelectItem>
                                                    <SelectItem value="6">
                                                        6 días
                                                    </SelectItem>
                                                    <SelectItem value="7">
                                                        1 semana
                                                    </SelectItem>
                                                    <SelectItem value="14">
                                                        2 semanas
                                                    </SelectItem>
                                                    <SelectItem value="21">
                                                        3 semanas
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <div className="flex justify-between">
                                    <Button
                                        type="button"
                                        onClick={handleBack}
                                        className="bg-gris80 text-white w-24"
                                    >
                                        Anterior
                                    </Button>
                                    <Button
                                        type="submit"
                                        className="bg-naranjaPrincipal text-white w-24"
                                    >
                                        Enviar
                                    </Button>
                                </div>
                            </>
                        )}
                    </form>
                </Form>
            </div>
        </section>
    );
}
