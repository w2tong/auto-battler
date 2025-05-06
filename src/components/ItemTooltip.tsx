import { Armour, Belt, Hands, Head, Item, ItemAttributes, ItemStats, ItemType, Potion, Ring, Shield, StatType, Weapon, WeaponTypeProperties } from "@wholesome-sisters/auto-battler";
import { tierTextColor } from "../utils/tierColor";
import { ReactNode } from "react";
import Tooltip from "./Tooltip";
import { formatStat } from "../utils/stats";

export default function ItemTooltipContent({ children, item, display = true }: { children: ReactNode, item: Item, display?: boolean; }) {
    const content = <>
        <div className={`${tierTextColor[item.tier]} font-bold`}>{item.name}</div>
        {getItemContent(item)}
    </>;

    return (
        <Tooltip content={content} display={display}>
            {children}
        </Tooltip>
    );
}

function createAttributes(attrs?: ItemAttributes) {
    if (attrs === undefined) return null;
    return (<>
        {Object.entries(attrs).map(([attr, num]) => <div>{num} {attr}</div>)}
    </>);
}

function createStats(stats?: ItemStats) {
    if (stats === undefined) return null;
    return (<>
        {Object.entries(stats).map(([stat, num]) => {
            const { key, val } = formatStat(stat as StatType, num);
            return (<div>{val} {key}</div>);
        })}
    </>);
}

function getItemContent(item: Item) {
    switch (item.itemType) {
        case (ItemType.Weapon): {
            const weapon = item as Weapon;
            const { min, max, bonus } = weapon.damageRange;
            return (
                <>
                    <div>{weapon.type}, {WeaponTypeProperties[weapon.type] ? 'Two-Handed' : 'One-Handed'}</div>
                    <div>{min + bonus}-{max + bonus} {weapon.damageType} damage</div>
                    {weapon.onHit ? <div>On Hit: {weapon.onHit.description}</div> : null}
                    {createAttributes(weapon.attributes)}
                    {createStats(weapon.stats)}
                </>

            );
        }
        case (ItemType.Shield): {
            const shield = item as Shield;
            return (
                <>
                    <div>{shield.type} {ItemType.Shield}</div>
                    {createAttributes(shield.attributes)}
                    {createStats(shield.stats)}
                </>
            );
        }
        case (ItemType.Armour): {
            const armour = item as Armour;
            return (
                <>
                    <div>{armour.type}</div>
                    {armour.onHit ? <div>On Hit: {armour.onHit.description}</div> : null}
                    {createAttributes(armour.attributes)}
                    {createStats(armour.stats)}
                </>
            );
        }
        case (ItemType.Head): {
            const head = item as Head;
            return (
                <>
                    <div>{ItemType.Head}</div>
                    {createAttributes(head.attributes)}
                    {createStats(head.stats)}
                </>
            );
        }
        case (ItemType.Hands): {
            const hands = item as Hands;
            return (
                <>
                    <div>{ItemType.Hands}</div>
                    {hands.weaponStyle ? <div>{hands.weaponStyle} Style</div> : null}
                    {createAttributes(hands.attributes)}
                    {createStats(hands.stats)}
                </>
            );
        }
        case (ItemType.Ring): {
            const ring = item as Ring;
            return (
                <>
                    <div>{ItemType.Ring}</div>
                    {createAttributes(ring.attributes)}
                    {createStats(ring.stats)}
                </>
            );
        }
        case (ItemType.Potion): {
            const potion = item as Potion;
            return (
                <>
                    <div>{ItemType.Potion}</div>
                    {/* <div><DieRange dice={item.dice} flatBonus={item.bonus} /> Healing</div> */}
                    <div>{potion.charges} Charge{potion.charges > 1 ? 's' : ''}</div>
                    {potion.onUse ? <div>On Use: {potion.onUse.description}</div> : null}
                </>
            );
        }
        case (ItemType.Belt): {
            const belt = item as Belt;
            return (
                <>
                    <div>{ItemType.Belt}</div>
                    {createAttributes(belt.attributes)}
                    {createStats(belt.stats)}
                </>
            );
        }
    }
    return null;
}
