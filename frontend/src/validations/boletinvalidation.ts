import { z } from "zod";

const typeBoletin = [
    "Ley",
    "Decretos",
    "Normas",
    "Ordenanzas",
    "Notificaciones",
    "Licitaciones",
    "Convocatorias",
    "Otro",
] as const;

export type TypeBoletin = (typeof typeBoletin)[number];

export const mappedBoletin: { [key in TypeBoletin]: string } = {
    Ley: "Leyes",
    Decretos: "Decretos",
    Normas: "Normas",
    Ordenanzas: "Ordenanzas",
    Notificaciones: "Notificaciones(edictos)",
    Licitaciones: "Licitaciones",
    Convocatorias: "Convocatorias",
    Otro: "Otro",
};
const typeActividad = [
    "Minera",
    "Agrícola",
    "Industrial",
    "Comercial",
    "Turística",
] as const;

export type TypeActividad = (typeof typeActividad)[number];

export const mappedActividad: { [key in TypeActividad]: string } = {
    Minera: "Minera",
    Agrícola: "Agrícola",
    Industrial: "Industrial",
    Comercial: "Comercial",
    Turística: "Turística",
};
const typeDuracion = ["1", "2", "3", "4", "5", "6", "7", "14", "21"] as const;

export type TypeDuracion = (typeof typeDuracion)[number];

export const mappedDuracion: { [key in TypeDuracion]: string } = {
    1: "1 día",
    2: "2 días",
    3: "3 días",
    4: "4 días",
    5: "5 días",
    6: "6 días",
    7: "1 semana",
    14: "2 semanas",
    21: "3 semanas",
};

// Definimos el esquema de validación para el formulario de usuario
export const boletinSchema = z.object({
    titulo: z
        .string()
        .min(3, {
            message: "El nombre debe tener al menos 3 caracteres.",
        })
        .max(70, {
            message: "El nombre no debe exceder los 70 caracteres.",
        }),
    descripcion: z
        .string()
        .min(3, {
            message: "La descripción debe tener al menos 3 caracteres.",
        })
        .max(500, {
            message: "La descripción no debe exceder los 500 caracteres.",
        }),
    tipoPublicacion: z.enum(typeBoletin, {
        errorMap: () => ({
            message: "Debes seleccionar un tipo de Publicación.",
        }),
    }),
    tipoActividad: z.enum(typeActividad, {
        errorMap: () => ({
            message: "Debes seleccionar un tipo de actividad.",
        }),
    }),
    duracionPublicacion: z.enum(typeDuracion, {
        errorMap: () => ({
            message: "Debes seleccionar una duración de publicación.",
        }),
    }),
    // calendario: z.array(z.date()).min(1, {
    //     message: "Debes seleccionar al menos una fecha.",
    // }),
});
