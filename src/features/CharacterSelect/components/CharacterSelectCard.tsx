import { ClassName, levelExp, LevelRange } from "@wholesome-sisters/auto-battler";
import ClassIcon from "../../../components/ClassIcon";
import { Dispatch, SetStateAction } from "react";

const truncateText = 'truncate overflow-hidden whitespace-nowrap';

export default function CharacterSelectCard({ name, charClass, level, exp, index, selected, setSelected }: { name: string, charClass: ClassName, level: number, exp: number, index: number, selected: boolean, setSelected: Dispatch<SetStateAction<number>>; }) {
    return (
        <button className='hover:bg-primary-hover w-full' onClick={() => setSelected(index)}>
            <div className={`flex flex-row p-2 ${selected ? 'bg-primary-active' : ''}`}>
                <ClassIcon class={charClass} width={64} height={64} />
                <div className='flex flex-col text-left my-auto ml-4 min-w-0'>
                    <div className={`font-bold text-xl ${truncateText}`}>{name}</div>
                    <div className={truncateText}>Lvl. {level} {charClass}</div>
                    <div className={truncateText}>{exp}/{levelExp[level as LevelRange]} exp</div>
                </div>
            </div>
        </button>
    );
}