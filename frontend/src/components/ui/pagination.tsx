interface PaginationProps {
    total: number;
    page: number;
    onPageChange: (page: number) => void;
    isCompact?: boolean;
}

export default function Pagination(porp: PaginationProps) {
    const { total, page, onPageChange, isCompact = false } = porp;
    const handlePreviousClick = () => {
        if (page > 1) {
            onPageChange(page - 1);
        }
    };

    const handleNextClick = () => {
        if (page < total) {
            onPageChange(page + 1);
        }
    };

    const handlePageClick = (pageNumber: number) => {
        onPageChange(pageNumber);
    };

    const renderPages = () => {
        if (!isCompact || total <= 5) {
            // Si no es compacto o total de páginas <= 5, mostramos todas las páginas.
            return Array.from({ length: total }, (_, i) => (
                <li key={i + 1}>
                    <button
                        aria-selected={page === i + 1}
                        onClick={() => handlePageClick(i + 1)}
                        className={`flex pl-3 pr-3 justify-center items-center h-8 leading-tight text-grisPrincipal bg-gris50 rounded-lg hover:text-gray-800 hover:bg-gray-200 aria-selected:text-white aria-selected:bg-naranjaPrincipal`}
                    >
                        {i + 1}
                    </button>
                </li>
            ));
        }

        // Modo compacto: mostrar solo 5 páginas.
        const pages = [];

        pages.push(
            <li key={1}>
                <button
                    aria-selected={page === 1}
                    onClick={() => handlePageClick(1)}
                    className={`flex pl-3 pr-3 justify-center items-center h-8 leading-tight text-grisPrincipal bg-gris50 rounded-lg hover:text-gray-800 hover:bg-gray-200 aria-selected:text-white aria-selected:bg-naranjaPrincipal`}
                >
                    1
                </button>
            </li>
        );

        if (page > 3) {
            pages.push(<li key="start-ellipsis">...</li>);
        }

        for (
            let i = Math.max(2, page - 1);
            i <= Math.min(total - 1, page + 1);
            i++
        ) {
            pages.push(
                <li key={i}>
                    <button
                        aria-selected={page === i}
                        onClick={() => handlePageClick(i)}
                        className={`flex pl-3 pr-3 justify-center items-center h-8 leading-tight text-grisPrincipal bg-gris50 rounded-lg hover:text-gray-800 hover:bg-gray-200 aria-selected:text-white aria-selected:bg-naranjaPrincipal`}
                    >
                        {i}
                    </button>
                </li>
            );
        }

        if (page < total - 2) {
            pages.push(<li key="end-ellipsis">...</li>);
        }

        pages.push(
            <li key={total}>
                <button
                    aria-selected={page === total}
                    onClick={() => handlePageClick(total)}
                    className={`flex pl-3 pr-3 justify-center items-center h-8 leading-tight text-grisPrincipal bg-gris50 rounded-lg hover:text-gray-800 hover:bg-gray-200 aria-selected:text-white aria-selected:bg-naranjaPrincipal`}
                >
                    {total}
                </button>
            </li>
        );

        return pages;
    };

    return (
        <nav
            className="w-full mx-auto flex justify-center items-center mt-4"
            aria-label="Page navigation example"
        >
            <ul className="flex flex-row gap-2 items-center h-8 text-sm">
                <li>
                    <button
                        onClick={handlePreviousClick}
                        className="flex px-2 justify-center items-center h-8 bg-gris50 text-zinc-600 rounded-lg hover:bg-naranjaPrincipal hover:text-white transition-colors disabled:opacity-50"
                        disabled={page === 1}
                    >
                        <span className="sr-only">Anterior</span>
                        <svg
                            className="h-3 w-3"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 6 10"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M5 1 1 5l4 4"
                            />
                        </svg>
                    </button>
                </li>
                {renderPages()}
                <li>
                    <button
                        onClick={handleNextClick}
                        className="flex px-2 justify-center items-center h-8 bg-gris50 text-zinc-600 rounded-lg hover:bg-naranjaPrincipal hover:text-white transition-colors disabled:opacity-50"
                        disabled={page === total}
                    >
                        <span className="sr-only">Siguiente</span>
                        <svg
                            className="h-3 w-3"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 6 10"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="m1 9 4-4-4-4"
                            />
                        </svg>
                    </button>
                </li>
            </ul>
        </nav>
    );
}