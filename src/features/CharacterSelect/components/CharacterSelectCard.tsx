import { ClassName } from "@wholesome-sisters/auto-battler";
import ClassIcon from "@components/ClassIcon";
import { Dispatch, SetStateAction } from "react";
import { cn } from "@utils/utils";
import { classTextColor } from "@utils/classColour";

type CharacterSelectCardProps = {
    name: string,
    charClass: ClassName,
    level: number,
    exp: number,
    index: number,
    selected: boolean,
    setSelected: Dispatch<SetStateAction<number>>;
};
export default function CharacterSelectCard({ name, charClass, level, index, selected, setSelected }: CharacterSelectCardProps) {
    const classColor = classTextColor[charClass];

    return (
        <button className={cn('w-full cursor-pointer hover:bg-card', selected && 'bg-card')} onClick={() => setSelected(index)}>
            <div className='flex flex-row items-center p-2'>
                <ClassIcon className='w-[48px] h-[48px]' charClass={charClass} />
                <div className='flex flex-col text-left my-auto ml-4 min-w-0'>
                    <div className={cn('font-bold text-lg truncate', classColor)}>{name}</div>
                    <div className='truncate'>Lvl. {level} <span className={cn('text-bold', classColor)}>{charClass}</span></div>
                </div>
            </div>
        </button>
    );
}