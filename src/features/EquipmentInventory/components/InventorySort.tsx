import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const sortOptions = [
    { value: 'name', text: 'Name' },
    { value: 'type', text: 'Type' },
    { value: 'tier-asc', text: 'Tier Asc' },
    { value: 'tier-desc', text: 'Tier Desc' }
];

type InventorySortProps = {
    value: string;
    onChange: (value: string) => void;
};
export default function InventorySort({ value, onChange }: InventorySortProps) {
    return (
        <Select value={value} onValueChange={val => onChange(val)}>
            <SelectTrigger className='w-[108px]'>
                <SelectValue placeholder='Sort' />
            </SelectTrigger>
            <SelectContent className='w-[108px]'>
                {sortOptions.map(({ value, text }) => (
                    <SelectItem key={text} value={value}>{text}</SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
}