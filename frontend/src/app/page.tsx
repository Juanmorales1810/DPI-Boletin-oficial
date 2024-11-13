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

export default function Home() {

  const dispatch = useDispatch();
  const router = useRouter()

  const form = useForm<z.infer<typeof boletinSchema>>({
    resolver: zodResolver(boletinSchema),
    defaultValues: {
      nombre: "",
      email: "",
      tipoPublicacion: undefined,
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
      dispatch(cargarBoletin({ ...values }));
      router.push("/cargar-boletin")
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


  return (
    <section className="py-10">

      <div className="flex justify-center items-center mx-auto gap-10 py-20 bg-white rounded-lg shadow-md max-w-5xl">
        <div>
          <h1 className="text-center text-2xl text-gris80 font-bold mb-6">Boletín Oficial</h1>
          <img src="/img/Frame- Escudo SJ.svg" alt="Frame- Escudo SJ" className="w-full" />
        </div>
        <Separator orientation="vertical" className="h-80" />
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <FormField
              control={form.control}
              name="nombre"
              render={({ field }) => (
                <FormItem className="flex flex-col justify-center items-center gap-1">
                  <div className="flex justify-center items-center gap-2">
                    <FormLabel>Nombre</FormLabel>
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
              name="email"
              render={({ field }) => (
                <FormItem className="flex flex-col justify-center items-center gap-1">
                  <div className="flex justify-center items-center gap-2">
                    <FormLabel className="">Email</FormLabel>
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
                      <SelectItem value="leyes">Leyes</SelectItem>
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
            <Button type="submit" className="bg-naranjaPrincipal text-white w-24 ml-auto">
              Siguiente
            </Button>
          </form>
        </Form>
      </div>
    </section>
  );
}
