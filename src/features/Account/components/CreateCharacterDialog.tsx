import { classes, ClassName } from '@wholesome-sisters/auto-battler';
import { useRef, useState } from 'react';
import ClassIcon from '@components/ClassIcon';
import { useCharactersDispatch } from '@contexts/Characters/CharactersContext';
import { classTextColor } from '@utils/classColour';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Input } from '@/components/ui/input';
import { NAME_MAX_LENGTH } from '@/utils/constants';
import { Button } from '@/components/ui/button';

export default function CreateCharacterDialog() {
    const charactersDispatch = useCharactersDispatch();
    const [selectedClassName, setSelectedClassName] = useState<ClassName>(ClassName.Fighter);
    const inputRef = useRef<HTMLInputElement>(null);
    const selectedClass = classes[selectedClassName];

    function handleClick() {
        if (inputRef.current && inputRef.current.value.length >= 1) {
            charactersDispatch({ type: 'create', name: inputRef.current.value, class: selectedClassName });
        }
    }

    const content = (
        <div className='space-y-4'>
            <div>
                <h3>Choose a Class</h3>
                <div className='flex flex-row justify-center sm:justify-start'>
                    {Object.values(ClassName).map(charClass =>
                        <div key={charClass} className='bg-black'>
                            <button className={`${selectedClassName === charClass ? 'opacity-100' : 'opacity-25'} transition duration-250 ease-in-out hover:opacity-100`} key={charClass} onClick={() => setSelectedClassName(charClass)}>
                                <ClassIcon class={charClass} width={64} height={64} />
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <div>
                <h3 className={classTextColor[selectedClassName]}>{selectedClassName}</h3>
                <div className='text-foreground'>{selectedClass.description}</div>
            </div>

            <div>
                <h3 className={classTextColor[selectedClassName]}>Abilities</h3>
                <ul className='space-y-2'>
                    {selectedClass.abilities.map(ability =>
                        <li key={ability.name}>
                            <h4>{ability.name}</h4>
                            <div className='text-muted-foreground'>{ability.description()}</div>
                        </li>
                    )}
                </ul>
            </div>

            <div>
                <h3 className={classTextColor[selectedClassName]}>Attributes</h3>
                <div>{Object.entries(selectedClass.attributes).map(([attr, value]) => <div key={attr}>+{value} <b>{attr}</b></div>)}</div>
            </div>

            <div className='mt-auto font-bold flex flex-col sm:flex-row items-center'>
                <label className='text-2xl mr-2' htmlFor='name'>Name</label>
                <Input className='shrink' id='name' ref={inputRef} type='text' name='name' placeholder='Enter a name' required maxLength={NAME_MAX_LENGTH} />
            </div>
        </div>
    );

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button>Create Character</Button>
            </AlertDialogTrigger>
            <AlertDialogContent className='min-h-170'>
                <AlertDialogHeader>
                    <AlertDialogTitle>Create Character</AlertDialogTitle>
                    <AlertDialogDescription>
                        Choose a class and a name for your new character.
                    </AlertDialogDescription>
                    {content}
                </AlertDialogHeader>
                <AlertDialogFooter className='mt-auto'>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleClick}>Create</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}