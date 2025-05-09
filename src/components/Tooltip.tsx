import { ReactNode } from "react";

export default function Tooltip({ children, content, display = true }: { children: ReactNode, content: ReactNode, display?: boolean; }) {

    return (
        <div className={`group ${display ? 'relative' : ''}`}>
            {children}
            <div className={`absolute bottom-full bg-black text-white px-2 py-1 rounded z-10 border hidden ${display ? 'group-hover:block' : ''}`}>
                {content}
            </div>
        </div>
    );
}