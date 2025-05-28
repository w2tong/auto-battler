import { useCharacters, useCharactersDispatch } from '../../hooks/Characters/CharactersContext';
import CharacterSelectCard from './components/CharacterSelectCard';

export default function CharacterSelect() {
    const { list, selected } = useCharacters();
    const characterDispatch = useCharactersDispatch();
    const selectedChar = list[selected];

    return (
        <div className='relative flex flex-col group bg-primary z-10 w-60'>
            <div className=' hover:bg-primary-hover'>
                {selectedChar ? <CharacterSelectCard name={selectedChar.name} charClass={selectedChar.class} level={selectedChar.level} exp={selectedChar.exp} index={-1} selected={false} setSelected={() => { }} key={-1} /> : 'Select a character'}
            </div>
            <div className='relative'>
                <div className='absolute invisible group-hover:visible bg-primary w-60'>
                    {list.map((char, i) => <CharacterSelectCard name={char.name} charClass={char.class} level={char.level} exp={char.exp} index={i} selected={i === selected} setSelected={() => characterDispatch({ type: 'select', index: i })} key={i} />)}
                </div>
            </div>
        </div>
    );
}