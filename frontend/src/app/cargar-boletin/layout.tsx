export default function CargaLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <section className="flex flex-col items-center justify-center gap-4 pt-16">
            <div className="flex flex-col items-center justify-center w-full">
                {children}
            </div>
        </section>
    );
}