import Content from "@/components/content"
export default async function Page({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const id = (await params).id
    return (
        <section className="w-full py-4 px-2">
            <Content id={id} />
        </section>
    )
}


