"use client";

import TextEditor from '@/components/textEditor'
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import SubirArchivo from '@/components/subirArchivo';

export default function Carga() {
    const boletin = useSelector((state: RootState) => state.novedad.boletinOficial);
    return (
        <div className='w-full max-w-7xl'>
            {boletin.tipoPublicacion === "notificaciones" ? (
                <SubirArchivo
                    disabled={false}
                    id="acta_constitutiva"
                    checkbox={false}
                    // apiSlice={postArchivo}
                    nombreSA={"nombreSA"}
                    pathArchivo={"archivo?.path_arch"}
                />
            ) : (
                <TextEditor />
            )}
        </div>
    )
}
