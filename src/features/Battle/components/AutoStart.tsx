import { Switch } from "@/components/ui/switch";

type AutoStartProps = { checked: boolean, onChange: (checked: boolean) => void; };
export default function AutoStart({ checked, onChange }: AutoStartProps) {
    return (
        <div className='flex flex-col sm:flex-row items-center gap-x-2'>
            <p className='text-lg font-bold'>Auto Start</p>
            <Switch checked={checked} onCheckedChange={onChange} />
        </div>
    );
}