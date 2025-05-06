import { Classes, ClassName } from '@wholesome-sisters/auto-battler';
import { useRef, useState } from 'react';
import ClassIcon from '../../components/ClassIcon';
import { useCharactersDispatch } from '../../hooks/Characters/CharactersContext';

export default function CharacterCreator() {
    const charactersDispatch = useCharactersDispatch();
    const [selectedClass, setSelectedClass] = useState<ClassName>(ClassName.Fighter);
    const inputRef = useRef<HTMLInputElement>(null);

    return (
        <div>
            <h2>Choose a Class</h2>
            {Object.values(ClassName).map(charClass =>
                <button className={`${selectedClass === charClass ? 'opacity-100' : 'opacity-80'} transition duration-300 ease-in-out hover:opacity-100`} key={charClass} onClick={() => setSelectedClass(charClass)}>
                    <ClassIcon class={charClass} width={64} height={64} />
                </button>
            )}
            <h3>{selectedClass}</h3>
            <div>{Classes[selectedClass].description}</div>

            <h3>Special Ability</h3>
            <div>{Classes[selectedClass].ability.name}</div>
            <div>{Classes[selectedClass].ability.description}</div>

            <div>Name: <input ref={inputRef} className='text-black' type='text' name='name' placeholder='Enter a name' required /></div>
            <button onClick={() => {
                if (inputRef.current && charactersDispatch) {
                    charactersDispatch({ type: 'create', name: inputRef.current.value, class: selectedClass });
                }
            }}>
                Create Character
            </button>
        </div>
    );
}
