import { z } from "zod";

const typeBoletin = [
    "leyes",
    "decretos",
    "normas",
    "ordenanzas",
    "notificaciones",
    "licitaciones",
    "convocatorias",
    "otro",
] as const;

export type TypeBoletin = (typeof typeBoletin)[number];

export const mappedBoletin: { [key in TypeBoletin]: string } = {
    leyes: "Leyes",
    decretos: "Decretos",
    normas: "Normas",
    ordenanzas: "Ordenanzas",
    notificaciones: "Notificaciones(edictos)",
    licitaciones: "Licitaciones",
    convocatorias: "Convocatorias",
    otro: "Otro",
};

// Definimos el esquema de validación para el formulario de usuario
export const boletinSchema = z.object({
    nombre: z
        .string()
        .min(3, {
            message: "El nombre debe tener al menos 3 caracteres.",
        })
        .max(70, {
            message: "El nombre no debe exceder los 70 caracteres.",
        }),
    apellido: z
        .string()
        .min(3, {
            message: "La calle debe tener al menos 3 caracteres.",
        })
        .max(100, {
            message: "La calle no debe exceder los 120 caracteres.",
        }),
    tipoBoletin: z.enum(typeBoletin, {
        errorMap: () => ({ message: "Debes seleccionar un tipo de sociedad." }),
    }),
});
