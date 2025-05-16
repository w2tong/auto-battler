export default function BuffBar({ buffs, debuffs }: { buffs: string, debuffs: string; }) {
    return (
        <div>
            {buffs}
            {debuffs}
        </div>
    );
}