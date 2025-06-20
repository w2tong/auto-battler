import { Ability } from "@wholesome-sisters/auto-battler";

type AbilityCardProps = { ability: Ability, description: string; };
export default function AbilityCard({ ability, description }: AbilityCardProps) {
    return (
        <div className='flex flex-col space-y-2 w-full h-full text-left'>
            <p className='font-bold'>{ability.name}</p>
            <p className='text-foreground'>{description}</p>
            <div className='mt-auto'>
                {ability.attackType && <p className='text-sm'><b>Attack</b>: {ability.attackType}</p>}
                {ability.scaling && <p className='text-sm'><b>Scaling</b>: [{ability.scaling.join(', ')}]</p>}
            </div>
        </div>
    );
}