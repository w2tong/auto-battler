import StatType from '../../Character/Stats/StatType';
import Debuff from '../Debuff';
import DebuffId from '../DebuffId';

export default class Poison extends Debuff {
    id = DebuffId.Poison;
    name: string = 'Poison';
    symbol: string = '🤢';

    static baseDamage = 1;
    static healthDamagePercent = 0.01;

    onApply() { }
    onExpire() { }

    onTurnStart() { }
    onTurnEnd() {
        for (const [key, instance] of Object.entries(this.instances)) {
            this.char.takeDamage({
                source: `${Poison.name} (${instance.source.name})`,
                damage: Poison.baseDamage + Math.floor(this.char.currentHealth * Poison.healthDamagePercent),
                armourPenetration: instance.source.stats.getStat(StatType.ArmourPenetration)
            });

            instance.stacks -= 1;
            if (instance.stacks <= 0) this.remove(key);
        }
    }
    onAttack() { }

    onSourceTurnStart() { }
    onSourceTurnEnd() { }
}