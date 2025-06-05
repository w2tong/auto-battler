import { useState } from "react";
import { useCharacters } from "@contexts/Characters/CharactersContext";
import { NavLink } from "react-router";
import { Button } from "@/components/ui/button";

export default function BattlePage() {
    const { list, selected } = useCharacters();
    const lsChar = list[selected];

    const [levelInput, setLevelInput] = useState<number>(lsChar?.level ?? 1);
    function handleLevelInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        let level = Number(e.target.value);
        if (level > 20) level = 20;
        else if (level < 1) level = 1;
        setLevelInput(() => Number(level));
    }

    if (!lsChar) return (
        'Select a character for entering a battle.'
    );
    return (
        <div className='flex flex-col'>
            <h1>Battle</h1>
            <div>
                <NavLink to={`/battle/${levelInput}`}>
                    <Button>Normal Encounter</Button>
                </NavLink>
                <input
                    type='number'
                    value={levelInput}
                    min={1}
                    max={20}
                    onChange={handleLevelInputChange}
                />
            </div>
            <Button disabled>Boss Encounter</Button>
        </div>
    );
}