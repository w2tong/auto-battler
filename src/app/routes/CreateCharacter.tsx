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
                <div key={charClass} className='bg-black inline-block'>
                    <button className={`${selectedClass === charClass ? 'opacity-100' : 'opacity-25'} transition duration-250 ease-in-out hover:opacity-100`} key={charClass} onClick={() => setSelectedClass(charClass)}>
                        <ClassIcon class={charClass} width={64} height={64} />
                    </button>
                </div>
            )}
            <h3>{selectedClass}</h3>
            <div>{Classes[selectedClass].description}</div>

            <h3>Special Ability</h3>
            <div>{Classes[selectedClass].ability.name}</div>
            <div>{Classes[selectedClass].ability.description()}</div>

            <h3>Attributes</h3>
            <div>{Object.entries(Classes[selectedClass].attributes).map(([attr, value]) => <div key={attr}>+{value} {attr}</div>)}</div>

            <label>
                Name:
                <input ref={inputRef} className='border border-white ml-2' type='text' name='name' placeholder='Enter a name' required />
            </label>
            <button className='border border-white cursor-pointer' onClick={() => {
                if (inputRef.current && inputRef.current.value.length >= 1 && charactersDispatch) {
                    charactersDispatch({ type: 'create', name: inputRef.current.value, class: selectedClass });
                }
            }}>
                Create Character
            </button>
        </div>
    );
}
