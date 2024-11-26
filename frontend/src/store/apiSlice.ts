import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const objetosApi = createApi({
    reducerPath: "objetosApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000/" }),
    endpoints: (builder) => ({
        postBoletinOficial: builder.mutation({
            query: ({ data }) => ({
                url: `/crear-boletin/`,
                method: "POST",
                body: data,
            }),
        }),
        postSubirArchivoBoletin: builder.mutation({
            query: ({ formData }) => ({
                url: `/subir-archivo-boletin/`,
                method: "POST",
                body: formData,
            }),
        }),
        getSociedadUsuarioPendiente: builder.query({
            query: ({ id }) => `/${id}/sa_por_estado`,
        }),
        getBoletinPorID: builder.query({
            query: ({ id }) => `/obtener-boletin/${id}`,
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
    usePostBoletinOficialMutation,
    usePostSubirArchivoBoletinMutation,
    useGetSociedadUsuarioPendienteQuery,
    useGetUsuariosQuery,
    usePostLoginMutation,
    useGetBoletinPorIDQuery,
} = objetosApi;
