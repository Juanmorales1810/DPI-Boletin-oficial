import { cn } from "@/lib/utils";

interface LoaderProps {
    color?: string;
    size?: string;
    speed?: string;
    placeholder?: string;
}

export default function Loader(props: LoaderProps) {
    const { color, size, speed, placeholder } = props;
    console.log("LoaderProps", props);
    return (
        <div className="flex flex-col justify-center items-center gap-[10px] font-medium">
            <div className={cn(
                `[--uib-size:2.8rem] [--uib-speed:0.9s] [--uib-color:#ff8300] relative flex items-center justify-start h-[var(--uib-size)] w-[var(--uib-size)]`)}>
                <div className="dot-spinner__dot absolute top-0 left-0 flex items-center justify-start h-full w-full"></div>
                <div className="dot-spinner__dot absolute top-0 left-0 flex items-center justify-start h-full w-full"></div>
                <div className="dot-spinner__dot absolute top-0 left-0 flex items-center justify-start h-full w-full"></div>
                <div className="dot-spinner__dot absolute top-0 left-0 flex items-center justify-start h-full w-full"></div>
                <div className="dot-spinner__dot absolute top-0 left-0 flex items-center justify-start h-full w-full"></div>
                <div className="dot-spinner__dot absolute top-0 left-0 flex items-center justify-start h-full w-full"></div>
                <div className="dot-spinner__dot absolute top-0 left-0 flex items-center justify-start h-full w-full"></div>
                <div className="dot-spinner__dot absolute top-0 left-0 flex items-center justify-start h-full w-full"></div>
            </div>
            {
                placeholder && <p>{placeholder}</p>
            }
        </div>
    );
}