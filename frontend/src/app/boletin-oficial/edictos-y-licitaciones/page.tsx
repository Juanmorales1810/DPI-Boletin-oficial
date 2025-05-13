"use client";

import BoletinOficialTemplate from "@/components/BoletinOficialTemplate";

export default function EdictosLicitaciones() {
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
            href: "#",
            active: true,
        },
        {
            text: "Convocatorias y otros",
            href: "/boletin-oficial/convocatorias-y-otros",
        },
    ];

    const tiposBoletin = [
        {
            id: "edictos",
            label: "Edicto",
            paramName: "tipoPublicacion",
        },
        {
            id: "licitaciones",
            label: "Licitación",
            paramName: "tipoPublicacion",
        },
    ];

    return (
        <BoletinOficialTemplate
            sectionTitle="Edictos y Licitaciones"
            sectionPath="/boletin-oficial/edictos-y-licitaciones"
            tiposBoletin={tiposBoletin}
            navLinks={navLinks}
        />
    );
}
