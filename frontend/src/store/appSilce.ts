import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface BoletinOficialState {
    id: number;
    titulo: string;
    descripcion: string;
    tipoPublicacion: string;
    tipoActividad: string;
    duracionPublicacion?: number;
    contenido: string;
    precio: number;
    fechaPublicacion: string;
    fecha: string;
    nombreArchivo?: string;
    pathArchivo?: string;
}

interface RootState {
    boletinOficial: BoletinOficialState;
}

const initialState: RootState = {
    boletinOficial: {
        id: 0,
        titulo: "",
        descripcion: "",
        tipoPublicacion: "",
        tipoActividad: "",
        duracionPublicacion: 4,
        contenido: "",
        precio: 0,
        fecha: "",
        fechaPublicacion: new Date().toISOString(),
        nombreArchivo: "",
        pathArchivo: "",
    },
};

export const BoletinStore = createSlice({
    name: "boletinOficial",
    initialState,
    reducers: {
        cargarBoletin: (
            state,
            action: PayloadAction<Partial<BoletinOficialState>>
        ) => {
            state.boletinOficial = {
                ...state.boletinOficial,
                ...action.payload,
            };
        },
        cargarSubdocumentoSociedad: (
            state,
            action: PayloadAction<{
                subdoc: keyof BoletinOficialState;
                field: string;
                value: any;
            }>
        ) => {
            const { subdoc, field, value } = action.payload;
            (state.boletinOficial[subdoc] as any)[field] = value;
        },
    },
});

export const { cargarBoletin, cargarSubdocumentoSociedad } =
    BoletinStore.actions;

interface PersonaState {
    usuario: {
        nombre: string;
        apellido: string;
        empresa: string;
        login: string;
        clave: string;
        auth: boolean;
    };
}
const initialPersonaState: PersonaState = {
    usuario: {
        nombre: "",
        apellido: "",
        empresa: "",
        login: "",
        clave: "",
        auth: false,
    },
};

export const personaSlice = createSlice({
    name: "persona",
    initialState: initialPersonaState,
    reducers: {
        actualizarUsuario: (
            state,
            action: PayloadAction<Partial<PersonaState["usuario"]>>
        ) => {
            state.usuario = { ...state.usuario, ...action.payload };
        },
    },
});

export const { actualizarUsuario } = personaSlice.actions;
