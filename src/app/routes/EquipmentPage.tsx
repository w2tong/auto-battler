import { Character, createEquipmentImport, startingAbility } from "@wholesome-sisters/auto-battler";
import CharacterSheet from "../../features/CharacterSheet/CharacterSheet";
import { useCharacters, useCharactersDispatch, useSelected } from "../../hooks/Characters/CharactersContext";
import EquipmentInventory from "../../features/EquipmentInventory/EquipmentInventory";
import Button from "../../components/Button";
import Modal from "../../components/Modal";
import { useState } from "react";

export default function EquipmentPage() {
    const characters = useCharacters();
    const charactersDispatch = useCharactersDispatch();
    const { selected } = useSelected();
    const selectedChar = characters[selected];

    const [modalOpen, setModalOpen] = useState(false);

    if (!selectedChar) {
        return (
            <>
                Select a character.
            </>
        );
    }

    const char = new Character({
        name: selectedChar.name,
        level: selectedChar.level,
        className: selectedChar.class,
        attributes: selectedChar.attributes,
        statTemplate: {},
        equipment: createEquipmentImport(selectedChar.equipment),
        ability: startingAbility[selectedChar.class]
    });

    return (
        <>
            <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
                <p>Delete {selectedChar.name}?</p>
                <p>All items currently equipped on {selectedChar.name} will also be deleted.</p>
                <Button onClick={() => {
                    charactersDispatch({ type: 'delete', index: selected });
                    setModalOpen(false);
                }}>
                    Yes
                </Button>
                <Button onClick={() => setModalOpen(false)}>
                    No
                </Button>
            </Modal>
            <div className='flex flex-row'>
                <h1>Character Page</h1>
                <Button onClick={() => setModalOpen(true)}>Delete Character</Button>
            </div>
            <div className='flex flex-row space-x-4'>
                <EquipmentInventory />
                <CharacterSheet char={char} exp={selectedChar.exp} />
            </div>

        </>
    );
}