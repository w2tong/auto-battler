import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FILTER_NONE_VALUE } from "@/utils/constants";

const tierOptions = [
    { value: FILTER_NONE_VALUE, text: 'None' },
    { value: '0', text: 'Tier 0' },
    { value: '1', text: 'Tier 1' },
    { value: '2', text: 'Tier 2' },
    { value: '3', text: 'Tier 3' },
    { value: '4', text: 'Tier 4' },
    { value: '5', text: 'Tier 5' }
];

type InventoryTierFilterProps = {
    value: string;
    onChange: (value: string) => void;
};
export default function InventoryTierFilter({ value, onChange }: InventoryTierFilterProps) {
    return (
        <Select value={value} onValueChange={val => onChange(val)}>
            <SelectTrigger className='w-fit'>
                <SelectValue placeholder='Tier Filter' />
            </SelectTrigger>
            <SelectContent className='w-fit'>
                {tierOptions.map(({ value, text }) => (
                    <SelectItem key={text} value={value}>{text}</SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
}