import { ClassName, levelExp } from "@wholesome-sisters/auto-battler";
import ClassIcon from "../../../components/ClassIcon";
import { Dispatch, SetStateAction } from "react";

export default function CharacterSelectCard({ name, charClass, level, exp, index, selected, setSelected }: { name: string, charClass: ClassName, level: number, exp: number, index: number, selected: boolean, setSelected: Dispatch<SetStateAction<number>>; }) {
    return (
        <button className='hover:bg-secondary-hover w-full' onClick={() => setSelected(index)}>
            <div className={`flex flex-row p-2 ${selected ? 'bg-white' : ''}`}>
                <ClassIcon class={charClass} width={64} height={64} />
                <div className='flex flex-col text-left my-auto ml-4'>
                    <div>{name}</div>
                    <div>Lvl. {level} {charClass}</div>
                    <div>{exp}/{levelExp[level]} exp</div>
                </div>
            </div>
        </button>
    );
}