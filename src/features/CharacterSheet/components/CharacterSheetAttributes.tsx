import { AttributeType, POINTS_PER_LEVEL, STARTING_POINTS, LEVEL_CAPS, LevelRange, Attributes } from "@wholesome-sisters/auto-battler";
import { useCharacters, useCharactersDispatch } from "@contexts/Characters/CharactersContext";
import AttributeTooltip from "@components/tooltip/AttributeTooltip";
import { cn } from "@utils/utils";

type CharacterSheetAttributesProps = { level: LevelRange, attributes: { [key in AttributeType]: { base: number, bonus: number; } }, className?: string; };
export default function CharacterSheetAttributes({ level, attributes, className }: CharacterSheetAttributesProps) {
    const { selected } = useCharacters();
    const dispatch = useCharactersDispatch();

    const unspent = (STARTING_POINTS + POINTS_PER_LEVEL * (level - 1)) - Object.values(attributes).reduce((sum, curr) => sum + curr.base - Attributes.DEFAULT_VALUE, 0);

    function handleChange(attr: AttributeType, num: number): void {
        let val = num;
        val = Math.max(val, Attributes.MIN_VALUE); // Minimum of Attributes.MIN_VALUE
        val = Math.min(val, LEVEL_CAPS[level]); // Maximum of  LEVEL_CAPS[level]
        val = Math.min(unspent + attributes[attr].base, val); // Prevent val from using more unspent than available

        if (val === attributes[attr].base) return;
        dispatch({ type: 'update', index: selected, attributes: { [attr]: val } });
    }

    return (
        <div className={cn('', className)}>
            {Object.entries(attributes).map(([attr, { base, bonus }]) => {
                const min = Attributes.MIN_VALUE + bonus;
                const max = Math.min(base + unspent, LEVEL_CAPS[level as LevelRange]) + bonus;
                return (
                    <div className='flex justify-between w-full' key={attr}>
                        <AttributeTooltip type={attr as AttributeType} base={base} bonus={bonus}>
                            <label className='mr-4 text-tooltip-highlight font-medium' htmlFor={attr}>{attr}</label>
                        </AttributeTooltip>
                        <input
                            id={attr}
                            className='w-12 text-right border active:border-accent-foreground p-0.5'
                            type='number'
                            min={min}
                            max={max}
                            value={base + bonus}
                            onChange={e => { handleChange(attr as AttributeType, Number(e.target.value) - bonus); }
                            } />
                    </div>
                );
            }
            )}
            <p className='text-lg text-center text-bold'><span className={cn('font-extrabold', unspent > 0 && 'text-positive')}>{unspent}</span> unspent points</p>
        </div>
    );
}