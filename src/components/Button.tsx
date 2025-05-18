import { ReactNode } from "react";

export default function Button({ className, disabled = false, onClick, children }: { className?: string, disabled?: boolean, onClick?: React.MouseEventHandler<HTMLButtonElement>, children: ReactNode; }) {
    return (
        <button
            className={`text-white bg-button hover:bg-button-hover font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 ${className}`}
            disabled={disabled}
            onClick={onClick}
        >
            {children}
        </button>
    );
}