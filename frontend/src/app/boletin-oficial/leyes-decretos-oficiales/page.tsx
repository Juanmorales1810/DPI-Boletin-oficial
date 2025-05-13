"use client";

import BoletinOficialTemplate from "@/components/BoletinOficialTemplate";

export default function LegislacionAvisosOficiales() {
    const navLinks = [
        {
            text: "Leyes y Decretos oficiales",
            href: "#",
            active: true,
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
            href: "/boletin-oficial/convocatorias-y-otros",
        },
    ];

    const tiposBoletin = [
        {
            id: "leyes",
            label: "Ley",
            paramName: "tipoPublicacion",
        },
        {
            id: "decretos",
            label: "Decreto",
            paramName: "tipoPublicacion",
        },
    ];

    return (
        <BoletinOficialTemplate
            sectionTitle="Leyes y Decretos"
            sectionPath="/boletin-oficial/leyes-decretos-oficiales"
            tiposBoletin={tiposBoletin}
            navLinks={navLinks}
        />
    );
}
