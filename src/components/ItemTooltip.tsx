import { Armour, Hands, Head, Item, ItemAttributes, ItemStats, ItemType, Potion, Ring, Shield, StatType, Waist, Weapon, WeaponTypeProperties } from "@wholesome-sisters/auto-battler";
import { tierTextColor } from "../utils/tierColor";
import { ReactNode } from "react";
import Tooltip from "./Tooltip";
import { formatStat } from "../utils/stats";

function ItemTooltip({ children, item, display = true }: { children: ReactNode, item: Item, display?: boolean; }) {
    const itemContent = getItemContent(item);
    const content =
        <div className='whitespace-nowrap'>
            <div className={`${tierTextColor[item.tier]} font-bold`}>{item.name}</div>
            {itemContent}
        </div>;

    return (
        <Tooltip content={content} display={display}>
            {children}
        </Tooltip>
    );
}
export default ItemTooltip;

function createAttributes(attrs?: ItemAttributes) {
    if (attrs === undefined) return null;
    return (<>
        {Object.entries(attrs).map(([attr, num]) => <div key={attr}>{`${num} ${attr}`}</div>)}
    </>);
}

function createStats(stats?: ItemStats) {
    if (stats === undefined) return null;
    return (<>
        {Object.entries(stats).map(([stat, num]) => {
            const { key, val } = formatStat(stat as StatType, num);
            return (<div key={key}>{`${val} ${key}`}</div>);
        })}
    </>);
}

function getItemContent(item: Item) {
    const renderContent = itemTypeContentMap[item.itemType];
    return renderContent ? renderContent(item) : null;
}

const itemTypeContentMap: Record<ItemType, (item: Item) => ReactNode> = {
    [ItemType.Weapon]: (item) => {
        const weapon = item as Weapon;
        const { min, max, bonus } = weapon.damageRange;
        const { twoHanded, light } = WeaponTypeProperties[weapon.type];
        return (
            <>
                <div>{weapon.type}, {twoHanded ? 'Two-handed' : 'One-handed'}{light ? ', Light' : ''}</div>
                <div>{min + bonus}-{max + bonus} damage</div>
                {weapon.onHit ? <div>On Hit: {weapon.onHit.description}</div> : null}
                {createAttributes(weapon.attributes)}
                {createStats(weapon.stats)}
            </>
        );
    },
    [ItemType.Shield]: (item) => {
        const shield = item as Shield;
        return (
            <>
                <div>{shield.type} {ItemType.Shield}</div>
                {createAttributes(shield.attributes)}
                {createStats(shield.stats)}
            </>
        );
    },
    [ItemType.Armour]: (item) => {
        const armour = item as Armour;
        return (
            <>
                <div>{armour.type}</div>
                {armour.onHit ? <div>On Hit: {armour.onHit.description}</div> : null}
                {createAttributes(armour.attributes)}
                {createStats(armour.stats)}
            </>
        );
    },
    [ItemType.Head]: (item) => {
        const head = item as Head;
        return (
            <>
                <div>{ItemType.Head}</div>
                {createAttributes(head.attributes)}
                {createStats(head.stats)}
            </>
        );
    },
    [ItemType.Hands]: (item) => {
        const hands = item as Hands;
        return (
            <>
                <div>{ItemType.Hands}</div>
                {hands.weaponStyle ? <div>{hands.weaponStyle} Style</div> : null}
                {createAttributes(hands.attributes)}
                {createStats(hands.stats)}
            </>
        );
    },
    [ItemType.Ring]: (item) => {
        const ring = item as Ring;
        return (
            <>
                <div>{ItemType.Ring}</div>
                {createAttributes(ring.attributes)}
                {createStats(ring.stats)}
            </>
        );
    },
    [ItemType.Potion]: (item) => {
        const potion = item as Potion;
        return (
            <>
                <div>{ItemType.Potion}</div>
                <div>{potion.charges} Charge{potion.charges > 1 ? 's' : ''}</div>
                {potion.onUse ? <div>On Use: {potion.onUse.description}</div> : null}
            </>
        );
    },
    [ItemType.Waist]: (item) => {
        const waist = item as Waist;
        return (
            <>
                <div>{ItemType.Waist}</div>
                {createAttributes(waist.attributes)}
                {createStats(waist.stats)}
            </>
        );
    },
    [ItemType.Neck]: (item) => {
        console.log(item.name);
        // TODO: filled out when necks are added
        return (
            <>
            </>
        );
    },
};
