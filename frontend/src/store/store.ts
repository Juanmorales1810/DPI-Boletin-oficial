import { configureStore } from "@reduxjs/toolkit";
import { BoletinStore, personaSlice } from "./appSilce";
import { objetosApi } from "./apiSlice";

export const store = configureStore({
    reducer: {
        novedad: BoletinStore.reducer,
        persona: personaSlice.reducer,
        [objetosApi.reducerPath]: objetosApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(objetosApi.middleware),
});
// Define el tipo RootState basado en la configuración del store
export type RootState = ReturnType<typeof store.getState>;
