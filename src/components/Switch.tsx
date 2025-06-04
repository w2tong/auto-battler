import { cn } from "@utils/utils";

interface SwitchToggleProps {
    checked: boolean;
    onChange: (checked: boolean) => void;
    label?: string;
    className?: string;
}

export default function Switch({ checked, onChange, label, className = "" }: SwitchToggleProps) {
    return (
        <label className={cn('inline-flex items-center cursor-pointer', className)}>
            <input
                type="checkbox"
                className="sr-only peer"
                checked={checked}
                onChange={e => onChange(e.target.checked)}
            />
            <div className="w-11 h-6 bg-gray-300 peer-checked:bg-blue-600 rounded-full relative transition-colors">
                <div
                    className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow transition-transform
                        ${checked ? "translate-x-5" : "translate-x-0"}`}
                />
            </div>
            {label && <span className="ml-3 text-sm">{label}</span>}
        </label>
    );
}