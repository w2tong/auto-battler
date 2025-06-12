import { useCharacters } from "@contexts/Characters/CharactersContext";
import { LevelRange } from "@wholesome-sisters/auto-battler";
import { useParams } from "react-router";
import Battle from "@features/Battle/Battle";

export default function BattlePage() {
    const param = useParams();
    const level = Number(param.level);

    const { list, selected } = useCharacters();
    const lsChar = list[selected];

    if (!lsChar) {
        return 'Select a character to battle.';
    }
    if (isNaN(level) || level < 1 || level > 20) {
        return <div>Invalid level: <b>{param.level}</b>. Choose a level between <b>1</b> and <b>20</b>.</div>;
    }
    return (
        <Battle
            lsChar={lsChar}
            index={selected}
            encounterLevel={level as LevelRange}
        />
    );
}