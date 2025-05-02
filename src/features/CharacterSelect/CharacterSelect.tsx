import { useCharacters, useSelectedContext } from '../../hooks/Characters/CharactersContext';
import CharacterSelectCard from './components/CharacterSelectCard';

export default function CharacterSelect() {
    const characters = useCharacters();
    const { selected, setSelected } = useSelectedContext();

    return (
        <div className='flex flex-col group bg-secondary z-50'>
            Characters
            {/* TODO: MAKE CLICKING ON SELECTED CHARACTER DO SOMETHING DIFFERENT */}
            {/* <div className=' hover:bg-secondary-hover'>
                {selected ? <CharacterSelectCard setSelected={setSelected} /> : 'Select a character'}
            </div> */}
            <div className='absolute top-20 invisible group-hover:visible bg-secondary w-60'>
                {characters.map((char, i) => <CharacterSelectCard name={char.name} charClass={char.class} level={char.level} exp={char.exp} index={i} selected={i === selected} setSelected={setSelected} />)}
            </div>
        </div>
    );
}