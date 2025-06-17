import { useCharacters, useCharactersDispatch } from '@contexts/Characters/CharactersContext';
import CharacterSelectCard from './components/CharacterSelectCard';
import { useMediaQuery, useToggle } from 'usehooks-ts';
import ClassIcon from '@/components/ClassIcon';
import { cn } from '@/utils/utils';

export default function CharacterSelect() {
    const { list, selected } = useCharacters();
    const characterDispatch = useCharactersDispatch();
    const selectedChar = list[selected];
    const [open, toggleOpen] = useToggle(false);

    function handleClick() { toggleOpen(); }

    const matches = useMediaQuery('(min-width: 640px)');

    return <>
        <div
            className={cn('relative flex flex-col z-10 cursor-pointer', matches ? 'bg-sidebar' : 'bg-secondary')}>
            <div onClick={handleClick}>
                {matches ?
                    <div className='w-60'>
                        {selectedChar ? <CharacterSelectCard name={selectedChar.name} charClass={selectedChar.class} level={selectedChar.level} exp={selectedChar.exp} index={-1} selected={false} setSelected={() => { }} key={-1} /> : 'Select a character'}
                    </div>
                    :
                    <ClassIcon className='w-[64px] h-[64px]' variant='circle' charClass={selectedChar.class} />
                }
            </div>

            <div>
                <div className={cn('absolute bg-secondary right-0', open ? 'block' : 'hidden', matches ? 'w-60' : 'w-screen')}>
                    {list.map((char, i) => <CharacterSelectCard name={char.name} charClass={char.class} level={char.level} exp={char.exp} index={i} selected={i === selected} setSelected={() => characterDispatch({ type: 'select', index: i })} key={i} />)}
                </div>
            </div>
        </div>
    </>;
};