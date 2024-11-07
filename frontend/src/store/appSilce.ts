import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    sociedadAnonima: {
        nombreSA: "",
        actividad: "",
        tipoSA: "",
        cuit: "",
        direccion: "",
        correoElectronico: "",
        telefono: "",
        estados: [
            {
                fecha: "",
                estado: "",
                observaciones: "",
            },
        ],
        criterios: {
            acta_constitutiva: [],
            asamblea_miembros: [],
            lugar_asambleas: [],
        },
    },
};

export const SociedadStore = createSlice({
    name: "sociedadAnonima",
    initialState,
    reducers: {
        cargarSociedad: (state, action) => {
            state.sociedadAnonima = {
                ...initialState.sociedadAnonima,
                ...action.payload,
            };
        },
        cargarSubdocumentoSociedad: (
            state,
            action: {
                payload: {
                    subdoc: keyof typeof initialState.sociedadAnonima;
                    field: string;
                    value: any;
                };
            }
        ) => {
            const { subdoc, field, value } = action.payload;
            (state.sociedadAnonima[subdoc] as any)[field] = value;
        },
    },
});

export const { cargarSociedad, cargarSubdocumentoSociedad } =
    SociedadStore.actions;

export const personaSlice = createSlice({
    name: "persona",
    initialState: {
        usuario: {
            nombre: "",
            apellido: "",
            empresa: "",
            login: "",
            clave: "",
            auth: false,
        },
    },
    reducers: {
        actualizarUsuario: (state, action) => {
            state.usuario = { ...state.usuario, ...action.payload };
        },
    },
});

export const { actualizarUsuario } = personaSlice.actions;
