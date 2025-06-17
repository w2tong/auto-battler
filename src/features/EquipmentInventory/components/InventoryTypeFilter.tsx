import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FILTER_NONE_VALUE } from "@/utils/constants";
import { ItemType } from "@wholesome-sisters/auto-battler";

const typeOptions = [
    { value: FILTER_NONE_VALUE, text: 'None' },
    { value: ItemType.Weapon, text: ItemType.Weapon },
    { value: ItemType.Shield, text: ItemType.Shield },
    { value: ItemType.Head, text: ItemType.Head },
    { value: ItemType.Armour, text: ItemType.Armour },
    { value: ItemType.Hands, text: ItemType.Hands },
    { value: ItemType.Ring, text: ItemType.Ring },
    { value: ItemType.Potion, text: ItemType.Potion },
    { value: ItemType.Waist, text: ItemType.Waist },
    { value: ItemType.Neck, text: ItemType.Neck }
];
type InventoryTypeFilterProps = {
    value: string;
    onChange: (value: string) => void;
};
export default function InventoryTypeFilter({ value, onChange }: InventoryTypeFilterProps) {
    return (
        <SelectGroup className='flex flex-row items-center'>
            <SelectLabel className='text-foreground font-bold'>Type</SelectLabel>
            <Select value={value} onValueChange={val => onChange(val)}>
                <SelectTrigger className='w-[102px]'>
                    <SelectValue placeholder='Type Filter' />
                </SelectTrigger>
                <SelectContent className='w-[102px]'>
                    {typeOptions.map(({ value, text }) => (
                        <SelectItem key={text} value={value}>{text}</SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </SelectGroup>
    );
}