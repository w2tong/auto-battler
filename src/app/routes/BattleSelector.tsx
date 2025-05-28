import { useState } from "react";
import Button from "../../components/Button";
import { useCharacters } from "../../hooks/Characters/CharactersContext";
import { NavLink } from "react-router";

export default function BattlePage() {
    const { list, selected } = useCharacters();
    const lsChar = list[selected];

    const [levelInput, setLevelInput] = useState<number>(lsChar.level);
    function handleLevelInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        let level = Number(e.target.value);
        if (level > 20) level = 20;
        else if (level < 1) level = 1;
        setLevelInput(() => Number(level));
    }

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