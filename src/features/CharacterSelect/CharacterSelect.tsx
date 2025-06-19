import { useCharacters, useCharactersDispatch } from '@contexts/Characters/CharactersContext';
import CharacterSelectCard from './components/CharacterSelectCard';
import { useMediaQuery, useToggle } from 'usehooks-ts';
import ClassIcon from '@/components/ClassIcon';
import { cn } from '@/utils/utils';
import questionMark from '@assets/icons/gui/question-mark.svg';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';

type CharacterSelectProps = { className?: string, width?: number; };
export default function CharacterSelect({ className }: CharacterSelectProps) {
    const { list, selected } = useCharacters();
    const characterDispatch = useCharactersDispatch();
    const selectedChar = list[selected];
    const [open, toggleOpen, setOpen] = useToggle(false);

    const matches = useMediaQuery('(min-width: 640px)');

    const navigate = useNavigate();

    function handleOpen() {
        if (list.length > 0) toggleOpen();
    }
    function handleUnselected() {
        if (list.length === 0) navigate('account');
    }

    return (
        <div
            className={cn('w-fit sm:w-60 md:w-70 lg:w-80 relative flex flex-col z-10 cursor-pointer bg-secondary hover:bg-card', className)}
            onClick={handleOpen}
        >
            {selectedChar ?
                <div>
                    {matches ?
                        <div className=''>
                            <CharacterSelectCard name={selectedChar.name} charClass={selectedChar.class} level={selectedChar.level} index={-1} selected={false} setSelected={() => { }} key={-1} />
                        </div>
                        :
                        <div className='p-2'>
                            <ClassIcon className='w-[48px] h-[48px]' variant='circle' charClass={selectedChar.class} />
                        </div>
                    }
                </div>
                :
                <div className='h-full' onClick={handleUnselected}>
                    {matches ?
                        <button className={cn('w-full h-full cursor-pointer hover:bg-card')} onClick={handleUnselected}>
                            <div className='flex flex-row items-center p-2'>
                                <img className='w-[48px] h-[48px]' src={questionMark} />
                                <div className='flex flex-col text-left my-auto ml-4 min-w-0 font-bold'>
                                    Select or Create a character
                                </div>
                            </div>
                        </button>
                        :
                        <div className='p-2' onClick={() => { if (list.length === 0) toast('Create a character.'); }}>
                            <img className=' rounded-full w-[48px] h-[48px]' src={questionMark} />
                        </div>
                    }
                </div>
            }

            <div>
                <div className={cn('absolute bg-secondary right-0', open ? 'block' : 'hidden', matches ? 'w-full' : 'w-screen')}>
                    {list.map((char, i) =>
                        <CharacterSelectCard
                            key={i}
                            name={char.name}
                            charClass={char.class}
                            level={char.level}
                            index={i}
                            selected={i === selected}
                            setSelected={() => {
                                characterDispatch({ type: 'select', index: i });
                                setOpen(false);
                            }}
                        />
                    )}
                </div>
            </div>
        </div >
    );
};