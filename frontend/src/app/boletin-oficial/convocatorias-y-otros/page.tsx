"use client";

import BoletinOficialTemplate from "@/components/BoletinOficialTemplate";

export default function ConvocatoriasOtros() {
    const navLinks = [
        {
            text: "Leyes y Decretos oficiales",
            href: "/boletin-oficial/leyes-decretos-oficiales",
        },
        {
            text: "Normas y Ordenanzas",
            href: "/boletin-oficial/normas-y-ordenanzas",
        },
        {
            text: "Edictos y Licitaciones",
            href: "/boletin-oficial/edictos-y-licitaciones",
        },
        {
            text: "Convocatorias y otros",
            href: "#",
            active: true,
        },
    ];

    const tiposBoletin = [
        {
            id: "convocatorias",
            label: "Convocatoria",
            paramName: "tipoPublicacion",
        },
        {
            id: "otros",
            label: "Otro",
            paramName: "tipoPublicacion",
        },
    ];

    return (
        <BoletinOficialTemplate
            sectionTitle="Convocatorias y Otros"
            sectionPath="/boletin-oficial/convocatorias-y-otros"
            tiposBoletin={tiposBoletin}
            navLinks={navLinks}
        />
    );
}
