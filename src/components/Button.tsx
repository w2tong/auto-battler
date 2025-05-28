import { ReactNode } from "react";
import { cn } from "../utils/utils";

export default function Button({ className, disabled = false, onClick, children }: { className?: string, disabled?: boolean, onClick?: React.MouseEventHandler<HTMLButtonElement>, children: ReactNode; }) {
    return (
        <button
            className={cn('cursor-pointer text-white bg-button hover:bg-button-hover font-medium text-sm px-5 py-2.5', className)}
            disabled={disabled}
            onClick={onClick}
        >
            {children}
        </button>
    );
}