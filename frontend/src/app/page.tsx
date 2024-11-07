"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator";
import Image from "next/image";

import { useState } from "react";

export default function Home() {
  const [tipoDocumento, setTipoDocumento] = useState("");
  return (
    <section className="font-[family-name:var(--font-ubuntu)] py-10">

      <div className="flex justify-center items-center mx-auto gap-10 py-20 bg-white rounded-lg shadow-md max-w-5xl">
        <div>
          <h1 className="text-center text-2xl text-gris80 font-bold mb-6">Boletín Oficial</h1>
          <img src="/img/Frame- Escudo SJ.svg" alt="Frame- Escudo SJ" className="w-full" />
        </div>
        <Separator orientation="vertical" className="h-80" />
        <div className="flex flex-col gap-4">
          <div className="flex justify-center items-center gap-4">
            <Label>Nombre</Label>
            <Input className="shadow-md" />
          </div>
          <div className="flex justify-center items-center gap-4">
            <Label>Apellido</Label>
            <Input className="shadow-md" />
          </div>
          <Select
            onValueChange={(value) => setTipoDocumento(value)}
          >
            <SelectTrigger className="bg-naranjaPrincipal text-white">
              <SelectValue placeholder="Seleccione tipo de documento" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="juridico">Juridico</SelectItem>
              <SelectItem value="otro">Otro</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      {
        tipoDocumento === "juridico" && (
          <Button className="bg-naranjaPrincipal text-white">
            <span className="text-xl font-bold">Generar boletín</span>
          </Button>
        )
      }
    </section>
  );
}
