import { useCharacters, useCharactersDispatch } from "@/contexts/Characters/CharactersContext";
import { cn } from "@/utils/utils";
import { Ability, AbilityId, Character, classes, ClassName } from "@wholesome-sisters/auto-battler";

type AbilitySelectorProps = { char: Character, className: ClassName, };
export default function AbilitySelector({ char, className }: AbilitySelectorProps) {
    const { selected } = useCharacters();
    const dispatch = useCharactersDispatch();
    const abilities = classes[className].abilities;

    function updateAbility(id: AbilityId) {
        dispatch({ type: 'update', index: selected, ability: id });
    }

    return (
        <div className='grid grid-cols-2'>
            {abilities.map(ability => <AbilityButton key={ability.name} ability={ability} char={char} updateAbility={updateAbility} />)}
        </div>
    );
}

function AbilityButton({ ability, char, updateAbility }: { ability: Ability, char: Character, updateAbility: (id: AbilityId) => void; }) {
    const isSelected: boolean = char.ability?.id === ability.id;

    return (
        <button
            onClick={() => updateAbility(ability.id)}
            className={cn(
                'w-full transition-colors cursor-pointer border',
                isSelected && 'bg-accent border-accent-foreground'
            )}
        >
            <div className='flex flex-col p-2 space-y-2 w-full h-full text-left'>
                <p className='font-bold'>{ability.name}</p>
                <p className='text-foreground'>{ability.description(char)}</p>
                <div className='mt-auto'>
                    {ability.attackType && <p className='text-sm'><b>Attack</b>: {ability.attackType}</p>}
                    {ability.scaling && <p className='text-sm'><b>Scaling</b>: [{ability.scaling.join(', ')}]</p>}
                </div>
            </div>
        </button>
    );
}