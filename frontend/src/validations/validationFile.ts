import { z } from "zod";

const isFileListDefined = typeof FileList !== "undefined";

const fileSchema = isFileListDefined
    ? z
          .instanceof(FileList)
          .refine((files) => files.length > 0, {
              message: "Debe seleccionar un archivo de documento.",
          })
          .refine(
              (files) => {
                  const validTypes = [
                      "application/pdf",
                      "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // DOCX
                      "text/plain",
                  ];
                  return validTypes.includes(files[0]?.type);
              },
              {
                  message:
                      "Formato de documento no válido. Solo se permiten archivos PDF, DOCX y TXT.",
              }
          )
          .refine((files) => files[0]?.size <= 2 * 1024 * 1024, {
              message: "El tamaño del documento no debe exceder los 2MB.",
          })
    : z.any();

// Definimos el esquema de validación para el formulario de usuario
export const pdfSchema = (id: any) =>
    z.object({
        [`dropzonefile-${id}`]: fileSchema,
    });
