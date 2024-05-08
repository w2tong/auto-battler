import Ability from './Ability';

const NAME = 'Double Strike';

const DoubleStrike: Ability = {
    name: NAME,
    description: 'Attack an enemy twice.',
    func: (char) => {
        if (!char.battle) return;
        char.setTarget();
        if (char.target) {
            char.battle.ref.log.add(`${char.name} used ${NAME}.`);
            char.useMana();
            char.weaponAttack({fromAbility: true});
            char.weaponAttack({fromAbility: true});
        }
    }
};

export default DoubleStrike;