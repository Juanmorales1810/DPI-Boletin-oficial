"use client";

import BoletinOficialTemplate from "@/components/BoletinOficialTemplate";

export default function NormasOrdenanzas() {
    const navLinks = [
        {
            text: "Leyes y Decretos oficiales",
            href: "/boletin-oficial/leyes-decretos-oficiales",
        },
        {
            text: "Normas y Ordenanzas",
            href: "#",
            active: true,
        },
        {
            text: "Edictos y Licitaciones",
            href: "/boletin-oficial/edictos-y-licitaciones",
        },
        {
            text: "Convocatorias y otros",
            href: "/boletin-oficial/convocatorias-y-otros",
        },
    ];

    const tiposBoletin = [
        {
            id: "normas",
            label: "Norma",
            paramName: "tipoPublicacion",
        },
        {
            id: "ordenanzas",
            label: "Ordenanza",
            paramName: "tipoPublicacion",
        },
    ];

    return (
        <BoletinOficialTemplate
            sectionTitle="Normas y Ordenanzas"
            sectionPath="/boletin-oficial/normas-y-ordenanzas"
            tiposBoletin={tiposBoletin}
            navLinks={navLinks}
        />
    );
}
