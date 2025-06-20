import { Character } from "@wholesome-sisters/auto-battler";
import AbilityCard from "./AbilityCard";

type PetProps = { pet: Character; };
export default function Pet({ pet }: PetProps) {
    return (
        <div>
            <h3 className='text-xl font-bold'>{pet.name}</h3>
            <p>Pets inherit 50% of the owner's stats from attributes and items.</p>
            <div>
                <h4 className='text-lg font-bold'>Stats</h4>
                hp
                ...etc.
            </div>

            {
                pet.ability &&
                <div>
                    <h4 className='text-lg font-bold'>Ability</h4>
                    <AbilityCard ability={pet.ability} description={pet.ability.description(pet)} />
                </div>
            }
        </div>
    );
}
