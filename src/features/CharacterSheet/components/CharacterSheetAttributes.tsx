import { AttributeType, POINTS_PER_LEVEL, STARTING_POINTS, LEVEL_CAPS, LevelRange, Attributes } from "@wholesome-sisters/auto-battler";
import { useCharactersDispatch, useSelected } from "../../../hooks/Characters/CharactersContext";

// function Attribute({ value, min, max }: { value: number, min: number, max: number; }) {

//     return (
//         <span>
//             <button>-</button>
//             {value}
//             <button>+</button>
//         </span>
//     );
// }

export default function CharacterSheetAttributes({ level, attributes }: { level: LevelRange, attributes: { [key in AttributeType]: { base: number, bonus: number; } }; }) {
    const { selected } = useSelected();
    const dispatch = useCharactersDispatch();

    const unspent = (STARTING_POINTS + POINTS_PER_LEVEL * level) - Object.values(attributes).reduce((sum, curr) => sum + curr.base - Attributes.DEFAULT_VALUE, 0);

    function handleChange(attr: AttributeType, num: number): void {
        let val = num;
        // Minimum of Attributes.MIN_VALUE
        val = Math.max(val, Attributes.MIN_VALUE);
        // Maximum of  LEVEL_CAPS[level]
        val = Math.min(val, LEVEL_CAPS[level]);
        // Prevent val from using more unspent than available
        val = Math.min(unspent + attributes[attr].base, val);
        if (val === attributes[attr].base) return;
        dispatch({ type: 'update', index: selected, attributes: { [attr]: val } });
    }

    return (
        <div>
            {Object.entries(attributes).map(([attr, { base, bonus }]) =>
                <div className='flex justify-between w-full' key={attr}>
                    <span className='mr-4'>{attr}</span>
                    <input
                        className='w-8'
                        type='number'
                        min={5 + bonus}
                        max={Math.min(base + unspent, LEVEL_CAPS[level as LevelRange]) + bonus}
                        value={base + bonus}
                        onChange={e => { handleChange(attr as AttributeType, Number(e.target.value) - bonus); }
                        } />
                </div>
            )}
            <div>{unspent} unspent points</div>
        </div>
    );
}