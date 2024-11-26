"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { boletinSchema } from "@/validations/boletinvalidation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Separator } from "@/components/ui/separator";
import { cargarBoletin } from "@/store/appSilce";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from 'next/navigation';
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { z } from "zod";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format, isSameDay } from "date-fns";
import { useState } from "react";
import { DayMouseEventHandler } from "react-day-picker";
import { es } from "date-fns/locale/es";

export default function Home() {
  const dispatch = useDispatch();
  const router = useRouter()

  const form = useForm<z.infer<typeof boletinSchema>>({
    resolver: zodResolver(boletinSchema),
    defaultValues: {
      titulo: "",
      descripcion: "",
      tipoPublicacion: undefined,
      tipoActividad: undefined,
      duracionPublicacion: undefined,
      // calendario: [],
    },
  })

  function onSubmit(values: z.infer<typeof boletinSchema>) {
    try {

      toast.success("Crear Boletín", {
        richColors: true,
        style: {
          padding: "16px",
        },
      });
      dispatch(cargarBoletin({ ...values, duracionPublicacion: Number(values.duracionPublicacion) }));
      router.push("/cargar-boletin/completar-boletin")
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
  };

  // const handleReset = () => {
  //   form.reset({
  //     calendario: [],
  //   })
  // }


  return (
    <section className="py-10 w-full px-2">
      <div className="flex flex-col justify-center items-center mx-auto gap-10 py-20 bg-white rounded-lg shadow-md max-w-5xl md:flex-row">
        <div>
          <h1 className="text-center text-2xl text-gris80 font-bold mb-6">Boletín Oficial</h1>
          <img src="/img/Frame- Escudo SJ.svg" alt="Frame- Escudo SJ" className="w-full" />
        </div>
        <Separator orientation="vertical" className="h-80 hidden md:block" />
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <FormField
              control={form.control}
              name="titulo"
              render={({ field }) => (
                <FormItem className="flex flex-col justify-center items-center gap-1 w-full">
                  <div className="flex justify-between items-center gap-2 w-full">
                    <FormLabel className="mr-9">Titulo</FormLabel>
                    <FormControl>
                      <Input className="shadow-md" placeholder="Ingrese su nombre" {...field} />
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
                    <FormLabel>Descripción</FormLabel>
                    <FormControl>
                      <Input className="shadow-md" placeholder="Ingrese su email" {...field} />
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
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-naranjaPrincipal text-white">
                        <SelectValue placeholder="Seleccione tipo de documento" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-gris70">
                      <SelectItem value="Ley">Leyes</SelectItem>
                      <SelectItem value="decretos">Decretos</SelectItem>
                      <SelectItem value="normas">Normas</SelectItem>
                      <SelectItem value="ordenanzas">Ordenanzas</SelectItem>
                      <SelectItem value="notificaciones">Notificaciones (edictos)</SelectItem>
                      <SelectItem value="licitaciones">Licitaciones</SelectItem>
                      <SelectItem value="convocatorias">Convocatorias</SelectItem>
                      <SelectItem value="otro">Otro</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tipoActividad"
              render={({ field }) => (
                <FormItem>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-naranjaPrincipal text-white">
                        <SelectValue placeholder="Seleccione tipo de actividad" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-gris70">
                      <SelectItem value="Minera">Minera</SelectItem>
                      <SelectItem value="Agrícola">Agrícola</SelectItem>
                      <SelectItem value="Industrial">Industrial</SelectItem>
                      <SelectItem value="Comercial">Comercial</SelectItem>
                      <SelectItem value="Turística">Turística</SelectItem>
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
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-naranjaPrincipal text-white">
                        <SelectValue placeholder="Duración de publicación" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-gris70">
                      <SelectItem value="1">1 día</SelectItem>
                      <SelectItem value="2">2 días</SelectItem>
                      <SelectItem value="3">3 días</SelectItem>
                      <SelectItem value="4">4 días</SelectItem>
                      <SelectItem value="5">5 días</SelectItem>
                      <SelectItem value="6">6 días</SelectItem>
                      <SelectItem value="7">1 semana</SelectItem>
                      <SelectItem value="14">2 semanas</SelectItem>
                      <SelectItem value="21">3 semanas</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* <FormField
              control={form.control}
              name="calendario"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "pl-3 text-left font-normal shadow-md",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {
                            field.value.length > 0
                              ? (
                                <p>
                                  Seleccionaste {field.value.length} días
                                </p>
                              )
                              : "Dias de publicación"
                          }
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="multiple"
                        selected={field.value}
                        onSelect={field.onChange}
                        locale={es}
                        footer={
                          field.value.length > 0
                            ? (
                              <p>
                                Seleccionaste {field.value.length} días {" "}
                                <Button asChild className="px-2 py-1 h-4">
                                  <span onClick={handleReset}>Reset</span>
                                </Button>
                              </p>
                            )
                            : "Seleccione fechas"
                        }
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            /> */}
            <Button type="submit" className="bg-naranjaPrincipal text-white w-24 ml-auto">
              Siguiente
            </Button>
          </form>
        </Form>
      </div>
    </section>
  );
}
