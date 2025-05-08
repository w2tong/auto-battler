import { AttributeType, POINTS_PER_LEVEL, STARTING_POINTS, LEVEL_CAPS, LevelRange } from "@wholesome-sisters/auto-battler";
import { useCharactersDispatch, useSelected } from "../../../hooks/Characters/CharactersContext";

export default function Attributes({ level, attributes }: { level: number, attributes: { [key in AttributeType]: { base: number, bonus: number; } }; }) {
    const { selected } = useSelected();
    const dispatch = useCharactersDispatch();

    const unspent = (STARTING_POINTS + POINTS_PER_LEVEL * level) - Object.values(attributes).reduce((sum, curr) => sum + curr.base - 10, 0);

    return (
        <div>
            {Object.entries(attributes).map(([key, { base, bonus }]) =>
                <div className='flex justify-between w-full' key={key}>
                    <span className='mr-4'>{key}</span>
                    <input
                        className='w-8'
                        type='number'
                        min={5 + bonus}
                        max={Math.min(base + unspent, LEVEL_CAPS[level as LevelRange]) + bonus}
                        value={base + bonus}
                        onChange={e => dispatch({ type: 'update', index: selected, attributes: { [key]: Number(e.target.value) - bonus } })} />
                </div>
            )}
            <div>{unspent} unspent points</div>
        </div>
    );
}