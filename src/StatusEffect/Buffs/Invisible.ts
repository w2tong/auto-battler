import Buff from '../Buff';
import BuffId from '../types/BuffId';

export default class Invisible extends Buff {
    id = BuffId.Invisible;

    static damage = 4;

    onApply() { }
    onExpire() { }

    onTurnStart() { }
    onTurnEnd() { }
    onAttack() {
        this.manager.removeBuff(this.id, this.source);
    }

    onSourceTurnStart() { }
    onSourceTurnEnd() { }
}