import { useCharacters, useCharactersDispatch } from "@/contexts/Characters/CharactersContext";
import { cn } from "@/utils/utils";
import { Ability, AbilityId, Character, classes, ClassName } from "@wholesome-sisters/auto-battler";
import AbilityCard from "./AbilityCard";

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
                'w-full transition-colors cursor-pointer border px-4 py-2',
                isSelected && 'bg-active-background border-active-foreground'
            )}
        >
            <AbilityCard ability={ability} description={ability.description(char)} />
        </button>
    );
}