"use client";

import type React from "react";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
    CreditCard,
    Calendar,
    User,
    ArrowLeft,
    CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { usePostBoletinOficialMutation } from "@/store/apiSlice";
import { toast } from "sonner";
import { cargarBoletin } from "@/store/appSilce";

export default function PaymentPage() {
    const searchParams = useSearchParams();
    const router = useRouter();

    // Obtener parámetros de la URL
    const wordCount = Number(searchParams.get("wordCount") || 0);
    const pricePerWord = Number(searchParams.get("pricePerWord") || 8);
    const totalAmount = Number(searchParams.get("totalAmount") || 0);
    const contenido = decodeURIComponent(searchParams.get("contenido") || "");

    const boletin = useSelector(
        (state: RootState) => state.novedad.boletinOficial
    );
    const [postBoletin] = usePostBoletinOficialMutation();
    const dispatch = useDispatch();

    const [cardNumber, setCardNumber] = useState("");
    const [cardName, setCardName] = useState("");
    const [expiry, setExpiry] = useState("");
    const [cvv, setCvv] = useState("");
    const [loading, setLoading] = useState(false);
    const [isComplete, setIsComplete] = useState(false);

    // Verificar si tenemos los datos necesarios
    useEffect(() => {
        if (wordCount === 0 && totalAmount === 0) {
            // Si no hay datos, redirigir al checkout
            router.push("/checkout");
        }
    }, [wordCount, totalAmount, router]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        // Simulación de procesamiento de pago
        await new Promise((resolve) => setTimeout(resolve, 1500));
        const data = {
            ...boletin,
            id: null,
            contenido: contenido,
            precio: totalAmount,
            fechaPublicacion: new Date(boletin.fechaPublicacion),
        };
        try {
            const response = await postBoletin({ data }).unwrap();
            // if (response?.message)
            toast.success("El boletín fue creado exitosamente", {
                richColors: true,
                style: {
                    padding: "16px",
                },
            });
            dispatch(cargarBoletin({ ...response }));
            // router.push("/");
        } catch (error: any) {
            console.error("Error en el envio: ", error);
            toast.error(error.data?.detail, {
                richColors: true,
                style: {
                    padding: "16px",
                },
            });
        }

        setIsComplete(true);
        setLoading(false);
    };

    const formatCardNumber = (value: string) => {
        const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
        const matches = v.match(/\d{4,16}/g);
        const match = (matches && matches[0]) || "";
        const parts = [];

        for (let i = 0; i < match.length; i += 4) {
            parts.push(match.substring(i, i + 4));
        }

        if (parts.length) {
            return parts.join(" ");
        } else {
            return value;
        }
    };

    const formatExpiry = (value: string) => {
        const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");

        if (v.length >= 3) {
            return `${v.substring(0, 2)}/${v.substring(2, 4)}`;
        }

        return value;
    };

    return (
        <main className="container mx-auto py-10 px-4">
            <Button
                variant="ghost"
                className="mb-6 flex items-center gap-2"
                onClick={() => router.back()}
            >
                <ArrowLeft size={16} />
                Volver
            </Button>

            <h1 className="text-3xl font-bold mb-8 text-center">
                Finalizar Pago
            </h1>

            <div className="flex flex-col lg:flex-row gap-8 justify-between">
                <div className="flex-1 max-w-2xl mx-auto">
                    {!isComplete ? (
                        <div className="bg-white rounded-lg p-6 shadow-md">
                            <h2 className="text-xl font-semibold mb-4">
                                Información de Pago
                            </h2>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="space-y-4">
                                    <div>
                                        <Label htmlFor="cardName">
                                            Nombre en la tarjeta
                                        </Label>
                                        <div className="relative">
                                            <Input
                                                id="cardName"
                                                name="cardName"
                                                placeholder="Nombre completo"
                                                value={cardName}
                                                onChange={(e) =>
                                                    setCardName(e.target.value)
                                                }
                                                className="pl-10"
                                                required
                                            />
                                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gris80/60 h-4 w-4" />
                                        </div>
                                    </div>

                                    <div>
                                        <Label htmlFor="cardNumber">
                                            Número de tarjeta
                                        </Label>
                                        <div className="relative">
                                            <Input
                                                id="cardNumber"
                                                name="cardNumber"
                                                placeholder="1234 5678 9012 3456"
                                                value={cardNumber}
                                                onChange={(e) =>
                                                    setCardNumber(
                                                        formatCardNumber(
                                                            e.target.value
                                                        )
                                                    )
                                                }
                                                maxLength={19}
                                                className="pl-10"
                                                required
                                            />
                                            <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gris80/60 h-4 w-4" />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <Label htmlFor="expiry">
                                                Fecha de expiración
                                            </Label>
                                            <div className="relative">
                                                <Input
                                                    id="expiry"
                                                    name="expiry"
                                                    placeholder="MM/YY"
                                                    value={expiry}
                                                    onChange={(e) =>
                                                        setExpiry(
                                                            formatExpiry(
                                                                e.target.value
                                                            )
                                                        )
                                                    }
                                                    maxLength={5}
                                                    className="pl-10"
                                                    required
                                                />
                                                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gris80/60 h-4 w-4" />
                                            </div>
                                        </div>

                                        <div>
                                            <Label htmlFor="cvv">CVV</Label>
                                            <Input
                                                id="cvv"
                                                name="cvv"
                                                placeholder="123"
                                                value={cvv}
                                                onChange={(e) =>
                                                    setCvv(
                                                        e.target.value.replace(
                                                            /[^0-9]/g,
                                                            ""
                                                        )
                                                    )
                                                }
                                                maxLength={4}
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-4 border-t border-gray-200">
                                    <Button
                                        type="submit"
                                        className="w-full bg-gris80 hover:bg-gris80/90 text-white"
                                        disabled={loading}
                                    >
                                        {loading
                                            ? "Procesando..."
                                            : `Pagar $${totalAmount}.00`}
                                    </Button>
                                </div>
                            </form>
                        </div>
                    ) : (
                        <div className="bg-white rounded-lg p-8 shadow-md text-center">
                            <div className="flex justify-center mb-4">
                                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                                    <CheckCircle className="w-8 h-8 text-green-600" />
                                </div>
                            </div>
                            <h2 className="text-2xl font-semibold mb-2">
                                ¡Pago Completado!
                            </h2>
                            <p className="text-gris80 mb-6">
                                Tu pedido ha sido procesado correctamente.
                            </p>
                            <div className="bg-gris50/50 p-4 rounded-lg mb-6">
                                <div className="flex justify-between mb-2">
                                    <span>Número de orden:</span>
                                    <span className="font-medium">
                                        #ORD-
                                        {Math.floor(
                                            100000 + Math.random() * 900000
                                        )}
                                    </span>
                                </div>
                                <div className="flex justify-between mb-2">
                                    <span>Fecha:</span>
                                    <span className="font-medium">
                                        {new Date().toLocaleDateString()}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Total pagado:</span>
                                    <span className="font-medium">
                                        ${totalAmount}.00
                                    </span>
                                </div>
                            </div>
                            <Button
                                className="w-full bg-gris80 hover:bg-gris80/90 text-white"
                                onClick={() => router.push("/")}
                            >
                                Volver al Inicio
                            </Button>
                        </div>
                    )}
                </div>

                <div className="lg:w-96">
                    <div className="flex flex-col justify-center items-center w-full max-w-lg bg-white rounded-lg space-y-4 my-6 px-8 py-6 sticky top-20 shadow-md">
                        <h3 className="font-semibold text-lg w-full mb-2">
                            Resumen de Compra
                        </h3>

                        <div className="flex justify-between items-center gap-2 w-full max-w-72">
                            <p className="flex-1">Valor por palabra:</p>
                            <p className="py-2 px-6 bg-gris50 rounded-md text-gris80 min-w-24 text-center">
                                ${pricePerWord}.00
                            </p>
                        </div>

                        <div className="flex justify-between items-center gap-2 w-full max-w-72">
                            <p className="flex-1 text-nowrap">
                                Cantidad de palabras:
                            </p>
                            <p className="py-2 px-6 bg-gris50 rounded-md text-gris80 min-w-24 text-center">
                                {wordCount}
                            </p>
                        </div>

                        <div className="w-full max-w-72 pt-4 border-t border-gray-200">
                            <div className="flex justify-between items-center">
                                <p className="font-medium">Total:</p>
                                <p className="py-2 px-6 bg-gris50 rounded-md text-gris80 font-medium">
                                    ${totalAmount}.00
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
