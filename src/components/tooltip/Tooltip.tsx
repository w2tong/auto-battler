import { ReactNode, useState, useRef, useLayoutEffect } from "react";
import { cn } from "@utils/utils";

export default function Tooltip({
    children,
    content,
    className,
    contentClassName,
    display = true,
    followCursor = true,
}: {
    children: ReactNode;
    content: ReactNode;
    className?: string;
    contentClassName?: string;
    display?: boolean;
    followCursor?: boolean;
}) {
    const [pos, setPos] = useState({ x: 0, y: 0 });
    const [hovered, setHovered] = useState(false);
    const [tooltipDims, setTooltipDims] = useState({ width: 0, height: 0 });
    const tooltipRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: React.MouseEvent) => {
        setPos({ x: e.clientX, y: e.clientY });
    };

    useLayoutEffect(() => {
        if (tooltipRef.current) {
            setTooltipDims({
                width: tooltipRef.current.offsetWidth,
                height: tooltipRef.current.offsetHeight,
            });
        }
    }, [content, hovered]);

    // Calculate position to keep tooltip within window
    let left = pos.x;
    let top = pos.y - tooltipDims.height;
    if (left + tooltipDims.width > window.innerWidth) {
        left = window.innerWidth - tooltipDims.width - 8; // 8px margin
    }
    if (left < 0) left = 8;
    if (top < 0) top = pos.y + 16; // place below cursor if not enough space above

    return (
        <div
            className={cn('group inline-block', display && 'relative', className)}
            onMouseMove={followCursor ? handleMouseMove : undefined}
            onMouseEnter={followCursor ? () => setHovered(true) : undefined}
            onMouseLeave={followCursor ? () => setHovered(false) : undefined}
        >
            {children}
            {display && followCursor && hovered && (
                <div
                    ref={tooltipRef}
                    className={cn('fixed pointer-events-none bg-black text-white px-2 py-1 rounded z-50 border text-wrap', contentClassName)}
                    style={{
                        left,
                        top
                    }}
                >
                    {content}
                </div>
            )}
            {display && !followCursor && (
                <div className={cn('absolute bottom-full bg-black text-white px-2 py-1 rounded z-10 border hidden group-hover:block text-wrap')}>
                    {content}
                </div>
            )}
        </div>
    );
}