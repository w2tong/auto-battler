export default function CharacterSheetAbility({ name, description }: { name: string, description: string; }) {
    return (
        <div>
            <h4>{name}</h4>
            <p>{description}</p>
        </div>
    );
}