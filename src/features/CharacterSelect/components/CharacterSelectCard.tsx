import { ClassName, levelExp, LevelRange } from "@wholesome-sisters/auto-battler";
import ClassIcon from "@components/ClassIcon";
import { Dispatch, SetStateAction } from "react";
import { cn } from "@utils/utils";
import { classTextColor } from "@utils/classColour";

export default function CharacterSelectCard({ name, charClass, level, exp, index, selected, setSelected }: { name: string, charClass: ClassName, level: number, exp: number, index: number, selected: boolean, setSelected: Dispatch<SetStateAction<number>>; }) {
    return (
        <button className={cn('hover:bg-card w-full', selected && 'bg-card')} onClick={() => setSelected(index)}>
            <div className='flex flex-row p-2'>
                <ClassIcon class={charClass} width={64} height={64} />
                <div className='flex flex-col text-left my-auto ml-4 min-w-0'>
                    <div className={cn('font-bold text-xl truncate', classTextColor[charClass])}>{name}</div>
                    <div className='truncate'>Lvl. {level} {charClass}</div>
                    <div className='truncate'>{exp}/{levelExp[level as LevelRange]} exp</div>
                </div>
            </div>
        </button>
    );
}