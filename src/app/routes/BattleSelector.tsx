import { useState } from "react";
import { useCharacters } from "@contexts/Characters/CharactersContext";
import { NavLink } from "react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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
        <div className='flex flex-col w-full max-w-160 mx-auto px-2 space-y-2'>
            <h1 className='text-center'>Battle</h1>
            <div className=' flex flex-row items-center space-x-2'>
                <NavLink className='grow' to={`/battle/${levelInput}`}>
                    <Button className='w-full'>Normal Encounter</Button>
                </NavLink>
                <label htmlFor='normal-level' className='font-bold text-xl'>Level</label>
                <Input
                    id='normal-level'
                    className='w-16'
                    type='number'
                    value={levelInput}
                    min={1}
                    max={20}
                    onChange={handleLevelInputChange}
                />
            </div>
            <Button disabled>Boss Encounter</Button>
        </div >
    );
}