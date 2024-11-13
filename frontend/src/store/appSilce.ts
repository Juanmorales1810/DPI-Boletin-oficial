import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface BoletinOficialState {
    nombre: string;
    email: string;
    tipoPublicacion: string;
    contenido: string;
    precio: number;
    duracionPublicacion?: number;
    fechaPublicacion: string;
}

interface RootState {
    boletinOficial: BoletinOficialState;
}

const initialState: RootState = {
    boletinOficial: {
        nombre: "",
        email: "",
        tipoPublicacion: "",
        contenido: "",
        precio: 0,
        duracionPublicacion: 4,
        fechaPublicacion: new Date().toISOString(),
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
