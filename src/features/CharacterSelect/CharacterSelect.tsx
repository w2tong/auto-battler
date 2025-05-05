import { useCharacters, useSelected } from '../../hooks/Characters/CharactersContext';
import CharacterSelectCard from './components/CharacterSelectCard';

export default function CharacterSelect() {
    const characters = useCharacters();
    const { selected, setSelected } = useSelected();
    const selectedChar = characters[selected];

    return (
        <div className='relative flex flex-col group bg-secondary z-50'>
            Characters
            {/* TODO: MAKE CLICKING ON SELECTED CHARACTER DO SOMETHING DIFFERENT */}
            <div className=' hover:bg-secondary-hover'>
                {selectedChar ? <CharacterSelectCard name={selectedChar.name} charClass={selectedChar.class} level={selectedChar.level} exp={selectedChar.exp} index={-1} selected={false} setSelected={() => { }} key={-1} /> : 'Select a character'}
            </div>
            <div className='relative w-max'>
                <div className='absolute invisible group-hover:visible bg-secondary w-60'>
                    {characters.map((char, i) => <CharacterSelectCard name={char.name} charClass={char.class} level={char.level} exp={char.exp} index={i} selected={i === selected} setSelected={setSelected} key={i} />)}
                </div>
            </div>
        </div>
    );
}