import Debuff from '../Debuff';
import DebuffId from '../DebuffId';

// TODO: skip turn on turn start
export default class Frozen extends Debuff {
    id = DebuffId.Frozen;

    onApply() { }
    onExpire() { }

    onTurnStart() { }
    onTurnEnd() { }
    onAttack() { }

    onSourceTurnStart() { }
    onSourceTurnEnd() { }
}