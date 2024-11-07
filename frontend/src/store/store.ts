import { configureStore } from "@reduxjs/toolkit";
import { SociedadStore, personaSlice } from "./appSilce";
import { objetosApi } from "./apiSlice";

export const store = configureStore({
    reducer: {
        novedad: SociedadStore.reducer,
        persona: personaSlice.reducer,
        [objetosApi.reducerPath]: objetosApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(objetosApi.middleware),
});
