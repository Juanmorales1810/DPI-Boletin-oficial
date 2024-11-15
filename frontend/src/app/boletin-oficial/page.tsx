import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function BoletinOficialPage() {

    const cards = [
        {
            title: 'Leyes y Decretos oficiales',
            description: 'Consulta todos los boletines de Leyes y Decretos oficiales.',
            link: '/boletin-oficial/legislacion-avisos-oficiales',
        },
        {
            title: 'Normas y Ordenanzas',
            description: 'Consulta todos los boletines de Normas y Ordenanzas.',
            link: '/boletin-oficial/legislacion-avisos-oficiales',
        },
        {
            title: 'Edictos y Licitaciones',
            description: 'Consulta todos los boletines de Edictos y Licitaciones.',
            link: '/boletin-oficial/legislacion-avisos-oficiales',
        },
        {
            title: 'Convocatorias y otros',
            description: 'Consulta todos los boletines de Convocatorias y otros.',
            link: '/boletin-oficial/legislacion-avisos-oficiales',
        }
        // Agrega más cards según sea necesario
    ];

    return (
        <div className="w-full text-grisPrincipal">
            <div className="h-[300px] relative sm:h-[150px] w-full flex justify-center px-12 sm:px-20 md:px-32 lg:px-[222px] bg-[url('/img/textura.jpg')] bg-cover bg-no-repeat -z-10 bg-naranjaPrincipal"></div>
            <div className="mt-[-60px] flex w-full justify-center px-4 sm:px-20 md:px-32 lg:px-[120px] max-w-7xl mx-auto">
                <div className="w-full bg-white border-2 px-6 md:px-10 lg:px-32 py-9 flex flex-col rounded-lg shadow-md">
                    <h1 className="flex-grow-0 flex-shrink-0 text-2xl md:text-3xl font-bold text-center text-grisPrincipal">Boletin oficial</h1>
                </div>
            </div>
            <div className="max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-4 mx-auto mt-8 py-6">
                {cards.map((card, index) => (
                    <Link
                        key={index}
                        className="bg-white shadow-md rounded-lg p-6 cursor-pointer hover:shadow-lg hover:bg-naranjaPrincipal hover:text-white transition-[shadow_color] group"
                        href={card.link}
                    >
                        <h2 className="text-xl font-semibold mb-2">{card.title}</h2>
                        <p className="text-gray-700 group-hover:text-white transition-colors">{card.description}</p>
                    </Link>
                ))}
            </div>
            <div className='max-w-6xl mx-auto py-4'>
                <Button
                    asChild
                    className="bg-naranjaPrincipal text-white"
                    size="lg"
                >
                    <Link href="/">
                        Realizar Publicación
                    </Link>
                </Button>
            </div>
        </div>
    );
};