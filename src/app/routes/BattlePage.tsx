import { useCharacters } from "../../hooks/Characters/CharactersContext";
import { LevelRange } from "@wholesome-sisters/auto-battler";
import { useParams } from "react-router";
import BattleWrapper from "../../features/Battle/Battle";

export default function BattlePage() {
    const param = useParams();
    const level: LevelRange = Number(param.level) as LevelRange;

    const { list, selected } = useCharacters();
    const lsChar = list[selected];

    if (!lsChar) {
        return 'Select a character to battle.';
    }
    if (isNaN(Number(level))) {
        return <div>Invalid level {level}</div>;
    }
    return (
        <BattleWrapper
            lsChar={lsChar}
            index={selected}
            encounterLevel={level}
        />
    );
}