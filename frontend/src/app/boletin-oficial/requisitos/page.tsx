import React from "react";

export default function Page() {
    return (
        <div className="max-w-4xl mx-auto p-8 bg-white shadow-md mt-10 rounded-lg leading-relaxed">
            <h1 className="text-3xl font-bold text-naranjaPrincipal mb-6 text-center">
                Requisitos para la Publicación en el Boletín Oficial
                <br />
                Provincia de San Juan - Argentina
            </h1>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-700 mb-2">
                    ¿Quiénes pueden publicar?
                </h2>
                <p>
                    Están habilitados para solicitar publicaciones en el Boletín
                    Oficial:
                </p>
                <ul className="list-disc list-inside mt-2 ml-4 space-y-1">
                    <li>
                        Organismos de la Administración Pública Provincial y
                        Municipal.
                    </li>
                    <li>Poder Judicial y Legislativo.</li>
                    <li>
                        Personas Jurídicas: sociedades, fundaciones,
                        asociaciones civiles.
                    </li>
                    <li>
                        Estudios jurídicos, escribanos, contadores y gestores
                        debidamente autorizados.
                    </li>
                </ul>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-700 mb-2">
                    Documentación requerida
                </h2>
                <ul className="list-disc list-inside ml-4 space-y-1">
                    <li>Nota de solicitud dirigida al Boletín Oficial.</li>
                    <li>
                        Documento o pieza a publicar (firmado digital o
                        manuscrito).
                    </li>
                    <li>Copia del DNI del solicitante o apoderado.</li>
                    <li>
                        Comprobante de pago de la tasa correspondiente (si
                        aplica).
                    </li>
                    <li>
                        Formulario de solicitud completo (según tipo de
                        publicación).
                    </li>
                </ul>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-700 mb-2">
                    Tipos de publicaciones admitidas
                </h2>
                <p className="mb-2">Entre las más frecuentes se encuentran:</p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                    <li>
                        Decretos, resoluciones, disposiciones y normativas
                        oficiales.
                    </li>
                    <li>
                        Edictos judiciales (sucesorios, subastas, citaciones,
                        etc.).
                    </li>
                    <li>Constitución y reformas de sociedades comerciales.</li>
                    <li>Llamados a licitación y concursos.</li>
                    <li>
                        Notificaciones de personas jurídicas y entidades
                        civiles.
                    </li>
                </ul>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-700 mb-2">
                    Formato y entrega de archivos
                </h2>
                <ul className="list-disc list-inside ml-4 space-y-1">
                    <li>
                        El contenido debe presentarse en formato{" "}
                        <strong>PDF</strong> o <strong>DOCX</strong>.
                    </li>
                    <li>
                        El texto debe estar completo, firmado y sin errores.
                    </li>
                    <li>
                        Las imágenes (si las hubiera) deben tener alta
                        resolución y estar en JPG o PNG.
                    </li>
                    <li>
                        No se aceptan manuscritos escaneados como único formato.
                    </li>
                </ul>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-700 mb-2">
                    Plazos y cronograma de publicación
                </h2>
                <p className="mb-2">
                    Los plazos estimados para la publicación son:
                </p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                    <li>
                        Publicaciones ingresadas antes de las 12:00 h: dentro de
                        las 48 h hábiles.
                    </li>
                    <li>
                        Publicaciones con observaciones: plazo suspendido hasta
                        subsanar.
                    </li>
                    <li>Las publicaciones urgentes deben ser justificadas.</li>
                </ul>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-700 mb-2">
                    Costo del servicio
                </h2>
                <p>
                    El costo varía según la cantidad de caracteres, tipo de
                    publicación y número de días publicados. Consultar la{" "}
                    <a href="#" className="text-blue-700 underline">
                        tabla de aranceles actualizada
                    </a>
                    .
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-700 mb-2">
                    Contacto y atención
                </h2>
                <p>
                    Para consultas o asesoramiento, comunicarse con la Dirección
                    del Boletín Oficial:
                </p>
                <ul className="list-none ml-4 mt-2 space-y-1">
                    <li>
                        <strong>Teléfono:</strong> (0264) 4200000 int. 123
                    </li>
                    <li>
                        <strong>Correo electrónico:</strong>{" "}
                        boletinoficial@sanjuan.gov.ar
                    </li>
                    <li>
                        <strong>Dirección:</strong> Centro Cívico, Núcleo 5,
                        Piso 2 - San Juan
                    </li>
                </ul>
            </section>

            <div className="text-center mt-10">
                <p className="text-sm text-gray-500">
                    Última actualización: mayo 2025
                </p>
            </div>
        </div>
    );
}
