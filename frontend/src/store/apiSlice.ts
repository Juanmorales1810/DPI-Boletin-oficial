import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const objetosApi = createApi({
    reducerPath: "objetosApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000/" }),
    endpoints: (builder) => ({
        // -------------Sociedad Anonima------------------
        getSociedadAnonima: builder.query({
            query: ({ id }) => `/sa_por_id/${id}`,
        }),
        postSociedadAnonima: builder.mutation({
            query: ({ data, id }) => ({
                url: `/crear_sociedad_anonima/${id}`,
                method: "POST",
                body: data,
            }),
        }),
        postSociedadAnonimaEstado: builder.mutation({
            query: ({ data, nombreSA }) => ({
                url: `/${nombreSA}/cambio_estado`,
                method: "POST",
                body: data,
            }),
        }),
        getSociedadUsuario: builder.query({
            query: ({ id }) => `/${id}/mi-sociedad`,
        }),
        getSociedadUsuarioPendiente: builder.query({
            query: ({ id }) => `/${id}/sa_por_estado`,
        }),
        // -------------Requisitos------------------
        putActaConstitutiva: builder.mutation({
            query: ({ data, nombreSA }) => ({
                url: `/requisitos/${nombreSA}/agregar_acta_constitutiva`,
                method: "PUT",
                body: data,
            }),
        }),
        postActaConstitutivaArchivo: builder.mutation({
            query: ({ formData, nombreSA }) => ({
                url: `/requisitos/${nombreSA}/subir_archivo_acta_constitutiva/`,
                method: "POST",
                body: formData,
            }),
        }),
        putContratoConstitutivo: builder.mutation({
            query: ({ personasData, nombreSA }) => ({
                url: `/requisitos/${nombreSA}/agregar_contrato_constitutivo`,
                method: "PUT",
                body: personasData,
            }),
        }),
        postContratoConstitutivoArchivoPersonaJuridica: builder.mutation({
            query: ({ formData, nombreSA }) => ({
                url: `/requisitos/${nombreSA}/subir_archivo_persona_juridica/`,
                method: "POST",
                body: formData,
            }),
        }),
        putNominaAccionista: builder.mutation({
            query: ({ personasData, nombreSA }) => ({
                url: `/requisitos/${nombreSA}/agregar_nomina_accionistas`,
                method: "PUT",
                body: personasData,
            }),
        }),
        postNominaAccionistaArchivo: builder.mutation({
            query: ({ formData, nombreSA }) => ({
                url: `/requisitos/${nombreSA}/subir_archivo_nomina_accionistas/`,
                method: "POST",
                body: formData,
            }),
        }),
        putMiembrosDirectorio: builder.mutation({
            query: ({ personasData, nombreSA }) => ({
                url: `/requisitos/${nombreSA}/agregar_miembros_directorio`,
                method: "PUT",
                body: personasData,
            }),
        }),
        postMiembrosDirectorioArchivo: builder.mutation({
            query: ({ formData, nombreSA }) => ({
                url: `/requisitos/${nombreSA}/subir_archivo_miembros_directorio/`,
                method: "POST",
                body: formData,
            }),
        }),
        putMiembrosSindicato: builder.mutation({
            query: ({ personasData, nombreSA }) => ({
                url: `/requisitos/${nombreSA}/agregar_miembros_sindicatura`,
                method: "PUT",
                body: personasData,
            }),
        }),
        postMiembrosSindicatoArchivo: builder.mutation({
            query: ({ formData, nombreSA }) => ({
                url: `/requisitos/${nombreSA}/subir_archivo_miembros_sindicatura/`,
                method: "POST",
                body: formData,
            }),
        }),
        putDerechoinspeccionArchivo: builder.mutation({
            query: ({ formData, nombreSA }) => ({
                url: `/requisitos/${nombreSA}/agregar_derecho_inspeccion/`,
                method: "PUT",
                body: formData,
            }),
        }),
        putNotaInspectorArchivo: builder.mutation({
            query: ({ formData, nombreSA }) => ({
                url: `/requisitos/${nombreSA}/agregar_nota_inspector/`,
                method: "PUT",
                body: formData,
            }),
        }),
        // -------------Capital Social------------------
        PostSubirInventarioResumido: builder.mutation({
            query: ({ formData, nombreSA }) => ({
                url: `/no_dinerario/${nombreSA}/subir_inventario_resumido/`,
                method: "POST",
                body: formData,
            }),
        }),
        PostSubirValuacionBienes: builder.mutation({
            query: ({ formData, nombreSA }) => ({
                url: `/no_dinerario/${nombreSA}/subir_valuacion_bienes/`,
                method: "POST",
                body: formData,
            }),
        }),
        PostSubirValuacionTitulos: builder.mutation({
            query: ({ formData, nombreSA }) => ({
                url: `/no_dinerario/${nombreSA}/subir_valuacion_titulos/`,
                method: "POST",
                body: formData,
            }),
        }),
        PostSubirAporteNoRegistrables: builder.mutation({
            query: ({ formData, nombreSA }) => ({
                url: `/no_dinerario/${nombreSA}/subir_aporte_bienes_no_registrables/`,
                method: "POST",
                body: formData,
            }),
        }),
        PostSubirAcreditacionTransfernciaRegistrable: builder.mutation({
            query: ({ formData, nombreSA }) => ({
                url: `/no_dinerario/${nombreSA}/subir_acreditacion_transferencia_bienes_registrables/`,
                method: "POST",
                body: formData,
            }),
        }),
        PostSubirAporteParticipanteOtraSociedades: builder.mutation({
            query: ({ formData, nombreSA }) => ({
                url: `/no_dinerario/${nombreSA}/subir_aporte_participaciones_otras_sociedades/`,
                method: "POST",
                body: formData,
            }),
        }),
        PostSubirAporteCreditos: builder.mutation({
            query: ({ formData, nombreSA }) => ({
                url: `/no_dinerario/${nombreSA}/subir_aporte_creditos/`,
                method: "POST",
                body: formData,
            }),
        }),
        PostSubirAporteBienesRadicados: builder.mutation({
            query: ({ formData, nombreSA }) => ({
                url: `/no_dinerario/${nombreSA}/subir_aporte_bienes_radicados/`,
                method: "POST",
                body: formData,
            }),
        }),
        // -------------USUARIOS------------------
        getUsuarios: builder.query({
            query: () => "usuarios",
        }),
        postLogin: builder.mutation({
            query: (user) => ({
                url: "login",
                method: "POST",
                body: user,
            }),
        }),
    }),
});

export const {
    useGetSociedadAnonimaQuery,
    useGetSociedadUsuarioQuery,
    useGetSociedadUsuarioPendienteQuery,
    usePostSociedadAnonimaEstadoMutation,
    useGetUsuariosQuery,
    usePostLoginMutation,
    usePutActaConstitutivaMutation,
    usePostSociedadAnonimaMutation,
    usePostActaConstitutivaArchivoMutation,
    usePutContratoConstitutivoMutation,
    usePostContratoConstitutivoArchivoPersonaJuridicaMutation,
    usePutNominaAccionistaMutation,
    usePostNominaAccionistaArchivoMutation,
    usePutMiembrosDirectorioMutation,
    usePostMiembrosDirectorioArchivoMutation,
    usePutMiembrosSindicatoMutation,
    usePostMiembrosSindicatoArchivoMutation,
    usePutDerechoinspeccionArchivoMutation,
    usePutNotaInspectorArchivoMutation,
    usePostSubirInventarioResumidoMutation,
    usePostSubirValuacionBienesMutation,
    usePostSubirValuacionTitulosMutation,
    usePostSubirAporteNoRegistrablesMutation,
    usePostSubirAcreditacionTransfernciaRegistrableMutation,
    usePostSubirAporteParticipanteOtraSociedadesMutation,
    usePostSubirAporteCreditosMutation,
    usePostSubirAporteBienesRadicadosMutation,
} = objetosApi;
