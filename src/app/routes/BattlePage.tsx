import { useCharacters, useSelected } from "../../hooks/Characters/CharactersContext";
import { Character, createEquipmentImport, LevelRange, startingAbility } from "@wholesome-sisters/auto-battler";
import { useParams } from "react-router";
import BattleWrapper from "../../features/Battle/Battle";

export default function BattlePage() {
    const param = useParams();
    const level: LevelRange = Number(param.level) as LevelRange;

    const chars = useCharacters();
    const { selected } = useSelected();
    const lsChar = chars[selected];

    const char = new Character({
        name: lsChar.name,
        level: lsChar.level,
        className: lsChar.class,
        attributes: lsChar.attributes,
        statTemplate: {},
        equipment: createEquipmentImport(lsChar.equipment),
        ability: startingAbility[lsChar.class],
        petId: lsChar.pet ?? undefined
    });

    if (!lsChar) {
        return 'Select a character to battle.';
    }
    if (isNaN(Number(level))) {
        return <div>Invalid level {level}</div>;
    }
    return (
        <BattleWrapper
            char={char}
            exp={lsChar.exp}
            index={selected}
            level={level}
        />
    );
}