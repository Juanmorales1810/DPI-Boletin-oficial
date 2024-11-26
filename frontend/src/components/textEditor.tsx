"use client";

import { ALargeSmall, AlignCenter, AlignJustify, AlignLeft, AlignRight, Bold, Italic, LinkIcon, List, ListOrdered, Quote, SquareMinus, Strikethrough, UnderlineIcon, UnlinkIcon } from 'lucide-react';
import HorizontalRule from '@tiptap/extension-horizontal-rule';
import FontFamily from '@tiptap/extension-font-family';
import TextAlign from '@tiptap/extension-text-align';
import TextStyle from '@tiptap/extension-text-style';
import Underline from '@tiptap/extension-underline';
import Highlight from '@tiptap/extension-highlight';
import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import { Editor } from '@tiptap/core';
import {
    ToggleGroup,
    ToggleGroupItem,
} from "@/components/ui/toggle-group"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { CompraIcon } from './icons';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from '@/store/store';
import { usePostBoletinOficialMutation } from '@/store/apiSlice';
import { toast } from 'sonner';
import { cargarBoletin } from '@/store/appSilce';
import { useRouter } from 'next/navigation';


export default function TextEditor() {
    const boletin = useSelector((state: RootState) => state.novedad.boletinOficial);
    const [postBoletin] = usePostBoletinOficialMutation();
    const editorRef = useRef(null);
    const editorInstanceRef = useRef<Editor | null>(null);
    const [count, setCount] = useState(0);
    const dispatch = useDispatch();
    const router = useRouter();

    useEffect(() => {
        if (editorRef.current) {
            const FontSizeTextStyle = TextStyle.extend({
                addAttributes() {
                    return {
                        fontSize: {
                            default: null,
                            parseHTML: element => element.style.fontSize,
                            renderHTML: attributes => {
                                if (!attributes.fontSize) {
                                    return {};
                                }
                                return { style: `font-size: ${attributes.fontSize}` };
                            },
                        },
                    };
                },
            });

            // Inicializar TipTap Editor
            editorInstanceRef.current = new Editor({
                element: editorRef.current,
                extensions: [
                    StarterKit,
                    Highlight,
                    Underline,
                    Link.configure({
                        openOnClick: false,
                        autolink: true,
                        defaultProtocol: 'https',
                    }),
                    TextAlign.configure({
                        types: ['heading', 'paragraph'],
                    }),
                    HorizontalRule,
                    TextStyle,
                    FontSizeTextStyle,
                    FontFamily,
                ],
                content: '<p>Este es el contenido inicial del editor.</p>',
                editorProps: {
                    attributes: {
                        class: 'format lg:format-lg dark:format-invert focus:outline-none format-blue max-w-none',
                    },
                },
                onUpdate: ({ editor }) => {
                    // Obtén el texto plano del contenido
                    const textContent = editor.getText();
                    // Cuenta las palabras
                    const wordCount = textContent.trim().split(/\s+/).filter(word => word).length;
                    setCount(wordCount)
                }
            });

            return () => {
                // Limpieza cuando el componente se desmonte
                editorInstanceRef.current?.destroy();
            };
        }
    }, []);

    const toggleBold = () => {
        editorInstanceRef.current?.chain().focus().toggleBold().run();
    };
    const toggleItalic = () => {
        editorInstanceRef.current?.chain().focus().toggleItalic().run();
    }
    const toggleUnderline = () => {
        editorInstanceRef.current?.chain().focus().toggleUnderline().run();
    }
    const toggleStrike = () => {
        editorInstanceRef.current?.chain().focus().toggleStrike().run();
    }
    const toggleLink = () => {
        const url = prompt('Enter image URL:', 'https://tu-url.com');;
        if (url) {
            editorInstanceRef.current?.chain().focus().toggleLink({ href: url }).run();
        }
    }
    const removeLink = () => {
        editorInstanceRef.current?.chain().focus().unsetLink().run();
    }
    const setFontSize = (size: string) => {
        editorInstanceRef.current?.chain().focus().setMark('textStyle', { fontSize: size }).run();
    }
    const setTextAlign = (align: string) => {
        editorInstanceRef.current?.chain().focus().setTextAlign(align).run();
    }
    const toggleList = () => {
        editorInstanceRef.current?.chain().focus().toggleBulletList().run();
    }
    const toggleOrderedList = () => {
        editorInstanceRef.current?.chain().focus().toggleOrderedList().run();
    }
    const toggleBlockquote = () => {
        editorInstanceRef.current?.chain().focus().toggleBlockquote().run();
    }
    const toggleHorizontalRule = () => {
        editorInstanceRef.current?.chain().focus().setHorizontalRule().run();
    }

    const onSubmit = async () => {
        const data = {
            ...boletin,
            id: null,
            contenido: editorInstanceRef.current?.getHTML(),
            precio: count * 8,
            fechaPublicacion: new Date(boletin.fechaPublicacion),
        };
        try {
            const response = await postBoletin({ data }).unwrap();
            console.log("Desde el envio: ", response);
            // if (response?.message)
            toast.success("Boletin creado exitosamente", {
                richColors: true,
                style: {
                    padding: "16px",
                },
            });
            dispatch(cargarBoletin({ ...response }));
            router.push("/");
        } catch (error: any) {
            console.error("Error en el envio: ", error);
            toast.error(error.data?.detail, {
                richColors: true,
                style: {
                    padding: "16px",
                },
            });
        }
        console.log(data);
    };

    return (
        <div className='flex flex-col gap-4 justify-center items-start px-2 md:flex-row'>
            <div className='w-full mx-auto py-6'>
                <div className="flex flex-col justify-center items-center w-full">
                    <div className="w-full px-3 py-2 border-b dark:border-zinc-700 rounded-t-lg bg-gris50 dark:bg-zinc-900 sticky top-20 z-40">
                        <div className="flex flex-wrap items-center">
                            <div className="flex items-center space-x-1 rtl:space-x-reverse flex-wrap">
                                <ToggleGroup type="multiple">
                                    <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <ToggleGroupItem onClick={toggleBold} value="bold" aria-label="Toggle bold">
                                                    <Bold className="w-5 h-5" />
                                                </ToggleGroupItem>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <span className="">Negrita</span>
                                            </TooltipContent>
                                        </Tooltip>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <ToggleGroupItem onClick={toggleItalic} value="italic" aria-label="Toggle italic">
                                                    <Italic className="w-5 h-5" />
                                                </ToggleGroupItem>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <span className="">Cursiva</span>
                                            </TooltipContent>
                                        </Tooltip>
                                        <Tooltip >
                                            <TooltipTrigger asChild>
                                                <ToggleGroupItem onClick={toggleUnderline} value="underline" aria-label="Toggle underline">
                                                    <UnderlineIcon className="w-5 h-5" />
                                                </ToggleGroupItem>
                                            </TooltipTrigger>
                                            <TooltipContent >
                                                <span className="">Subrayado</span>
                                            </TooltipContent>
                                        </Tooltip>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <ToggleGroupItem onClick={toggleStrike} value="strike" aria-label="Toggle Strike">
                                                    <Strikethrough className="w-5 h-5" />
                                                </ToggleGroupItem>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <span className="">Tachar</span>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                </ToggleGroup>
                                <div className="px-1">
                                    <span className="block w-px h-4 bg-zinc-300 dark:bg-zinc-600"></span>
                                </div>
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Button variant="ghost" onClick={toggleLink} value="link" aria-label="Link">
                                                <LinkIcon />
                                            </Button>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <span className="">Link</span>
                                        </TooltipContent>
                                    </Tooltip>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Button variant="ghost" onClick={removeLink} value="remove-link" aria-label="Remove link">
                                                <UnlinkIcon className="w-5 h-5" />
                                            </Button>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <span className="">Quitar link</span>
                                        </TooltipContent>
                                    </Tooltip>

                                    <div className='flex justify-center items-center gap-2'>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger>
                                                <Tooltip>
                                                    <TooltipTrigger asChild>
                                                        <Button variant="ghost" asChild>
                                                            <div>
                                                                <ALargeSmall />
                                                            </div>
                                                        </Button>
                                                    </TooltipTrigger>
                                                    <TooltipContent>
                                                        <span className="">Tamaño del texto</span>
                                                    </TooltipContent>
                                                </Tooltip>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent>
                                                <DropdownMenuLabel>Text size</DropdownMenuLabel>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem onClick={() => setFontSize("16px")}>
                                                    <p data-text-size="16px" className="flex justify-between items-center w-full text-base rounded px-3 py-2 hover:bg-zinc-100 text-zinc-900 dark:hover:bg-zinc-600 dark:text-white">16px (Default)
                                                    </p>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => setFontSize("12px")}>
                                                    <p data-text-size="12px" className="flex justify-between items-center w-full text-xs rounded px-3 py-2 hover:bg-zinc-100 text-zinc-900 dark:hover:bg-zinc-600 dark:text-white">12px (Tiny)
                                                    </p>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => setFontSize("14px")}>
                                                    <p data-text-size="14px" className="flex justify-between items-center w-full text-sm rounded px-3 py-2 hover:bg-zinc-100 text-zinc-900 dark:hover:bg-zinc-600 dark:text-white">14px (Small)
                                                    </p>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => setFontSize("18px")}>
                                                    <p data-text-size="18px" className="flex justify-between items-center w-full text-lg rounded px-3 py-2 hover:bg-zinc-100 text-zinc-900 dark:hover:bg-zinc-600 dark:text-white">18px (Lead)
                                                    </p>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => setFontSize("24px")}>
                                                    <p data-text-size="24px" className="flex justify-between items-center w-full text-2xl rounded px-3 py-2 hover:bg-zinc-100 text-zinc-900 dark:hover:bg-zinc-600 dark:text-white">24px (Large)
                                                    </p>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => setFontSize("36px")}>
                                                    <p data-text-size="36px" className="flex justify-between items-center w-full text-4xl rounded px-3 py-2 hover:bg-zinc-100 text-zinc-900 dark:hover:bg-zinc-600 dark:text-white">36px (Huge)
                                                    </p>
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>
                                </TooltipProvider>
                                <div className="px-1">
                                    <span className="block w-px h-4 bg-zinc-300 dark:bg-zinc-600"></span>
                                </div>
                                <ToggleGroup type="single">
                                    <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <ToggleGroupItem onClick={() => setTextAlign("left")} value="aling-left" aria-label="Align left">
                                                    <AlignLeft />
                                                </ToggleGroupItem>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <span className="">Alinear a la izquierda</span>
                                            </TooltipContent>
                                        </Tooltip>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <ToggleGroupItem onClick={() => setTextAlign("center")} value="aling-center" aria-label="Align center">
                                                    <AlignCenter />
                                                </ToggleGroupItem>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <span className="">Alinear al centro</span>
                                            </TooltipContent>
                                        </Tooltip>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <ToggleGroupItem onClick={() => setTextAlign("right")} value="aling-right" aria-label="Align right">
                                                    <AlignRight />
                                                </ToggleGroupItem>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <span className="">Alinear a la derecha</span>
                                            </TooltipContent>
                                        </Tooltip>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <ToggleGroupItem onClick={() => setTextAlign("justify")} value="aling-right" aria-label="Align right">
                                                    <AlignJustify />
                                                </ToggleGroupItem>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <span className="">Justificado</span>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                </ToggleGroup>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 pt-2 flex-wrap">
                            <TooltipProvider>
                                <ToggleGroup type="single">
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <ToggleGroupItem onClick={toggleList} value="toggle-list" aria-label="Toggle list">
                                                <List />
                                            </ToggleGroupItem>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <span className="">Lista</span>
                                        </TooltipContent>
                                    </Tooltip>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <ToggleGroupItem onClick={toggleOrderedList} value="toggle-ordered-list" aria-label="Toggle ordered list">
                                                <ListOrdered />
                                            </ToggleGroupItem>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <span className="">Lista ordenada</span>
                                        </TooltipContent>
                                    </Tooltip>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <ToggleGroupItem onClick={toggleBlockquote} value="toggle-blockquote" aria-label="Toggle blockquote">
                                                <Quote size={20} />
                                            </ToggleGroupItem>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <span className="">Cita</span>
                                        </TooltipContent>
                                    </Tooltip>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <ToggleGroupItem onClick={toggleHorizontalRule} value="horizontal-rule" aria-label="Horizontal rule">
                                                <SquareMinus />
                                            </ToggleGroupItem>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <span className="">Separador horizontal</span>
                                        </TooltipContent>
                                    </Tooltip>
                                </ToggleGroup>
                            </TooltipProvider>
                        </div>
                    </div>
                    <div className="w-full px-4 py-2 bg-white rounded-b-lg min-h-96 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-800 shadow-xl dark:shadow-none">
                        <div ref={editorRef} id="wysiwyg-example" className="block w-full px-0 text-zinc-800 bg-white border-0 dark:bg-zinc-800 focus:ring-0 dark:text-white dark:placeholder-zinc-400 max-w-5xl"></div>
                    </div>
                </div>
            </div>
            <div className='flex flex-col justify-center items-center w-full max-w-lg bg-white rounded-lg space-y-4 my-6 px-8 py-6 sticky top-20 shadow-md'>
                <div className='flex justify-between items-center gap-2 w-full max-w-72'>
                    <p className='flex-1'>Valor por palabra:</p>
                    <p className='py-2 px-6 bg-gris50 rounded-md text-gris80 min-w-24 text-center'>$8.00</p>
                </div>
                <div className='flex justify-between items-center gap-2 w-full max-w-72'>
                    <p className='flex-1 text-nowrap'>Cantidad de palabras:</p>
                    <p className='py-2 px-6 bg-gris50 rounded-md text-gris80 min-w-24 text-center'>{count}</p>
                </div>
                <div className='flex justify-between items-center gap-4 w-full max-w-72'>
                    <button onClick={onSubmit} className='bg-gris80 text-white py-2 px-6 rounded-md flex justify-center items-center gap-2 flex-1'>
                        <CompraIcon />
                        Pagar
                    </button>
                    <p className='py-2 px-6 bg-gris50 rounded-md text-gris80 text-nowrap'>Valor: ${count * 8}</p>
                </div>
            </div>
        </div>
    )
}