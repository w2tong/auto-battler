import { ReactNode, useState } from "react";

export default function Tooltip({ children, content, display = true }: { children: ReactNode, content: ReactNode, display?: boolean; }) {
    const [isVisible, setIsVisible] = useState(false);

    return (

        <div className='relative'
            onMouseEnter={() => setIsVisible(true)}
            onMouseLeave={() => setIsVisible(false)}
        >
            {children}
            {display && isVisible &&
                <div className='absolute w-[160px] -top-full bg-black text-white p-2 rounded z-10'>
                    {content}
                </div>
            }
        </div>
    );
}