import Battle from '../Battle/Battle';
import Character from '../Character/Character';
import { getRandomEncounter } from '../encounters';
import { weapons } from '../Equipment/Weapon/weapons';

const testChar = new Character({
    name: 'Test',
    level: 1,
    attributes: {},
    statTemplate: {},
    equipment: {},
    // ability:
});

const battle = new Battle(
    [testChar],
    getRandomEncounter(1),
);

const left = battle.left[0];
const right = battle.right[0];

function displayCharacterStats(char: Character) {
    const weapon = char.equipment.mainHand ?? weapons.fist;
    const damageRange = char.calcDamageRange({
        damageRange: weapon.damageRange,
        weaponAttack: true,
        spellPowerRatio: weapon.spellPowerRatio
    });

    console.log(`${char.name}
Lvl. ${char.level}
Health: ${char.currentHealth}
Accuracy: ${char.stats.getAccuracy(char.equipment.mainHand.attackType)}
Dodge Chance: ${char.stats.dodge}
Crit Chance: ${char.stats.critChance}
Crit Damage: ${char.stats.critDamage}
Damage Range: ${damageRange.min}-${damageRange.max}
`);
}

displayCharacterStats(left);
displayCharacterStats(right);

battle.startCombat();

const interval = setInterval(() => {
    const res = battle.nextTurn();
    battle.log.last.forEach(line => {
        console.log(line.text);
    });
    console.log(left.name, left.currentHealth);
    console.log(right.name, right.currentHealth);

    if (res.combatEnded) clearInterval(interval);
}, 1000);