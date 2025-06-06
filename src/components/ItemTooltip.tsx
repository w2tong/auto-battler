import { Armour, Hands, Head, Item, ItemAttributes, ItemStats, ItemType, Neck, Potion, Ring, Shield, StatType, Waist, Weapon, WeaponTypeProperties } from "@wholesome-sisters/auto-battler";
import { tierTextColor } from "@utils/tierColor";
import { ReactNode } from "react";
import Tooltip from "./Tooltip";
import { formatItemStat, formatNum } from "@utils/stats";
import { Separator } from "@components/ui/separator";

function ItemTooltip({ children, item, display = true, className }: { children: ReactNode, item: Item, display?: boolean, className?: string; }) {
    const itemContent = getItemContent(item);
    const content =
        <div className='whitespace-nowrap'>
            <div className={`${tierTextColor[item.tier]} font-bold`}>{item.name}</div>
            {itemContent}
        </div>;

    return (
        <Tooltip content={content} display={display} className={className}>
            {children}
        </Tooltip>
    );
}
export default ItemTooltip;

function createAttributes(attrs?: ItemAttributes) {
    if (attrs === undefined) return null;
    return (<>
        {Object.entries(attrs).map(([attr, num]) => {
            const positive = num > 0;
            const textColor = positive ? 'text-positive' : 'text-negative';
            return <div className={`font-bold ${textColor}`} key={attr}>{`${positive ? '+' : ''}${num} ${attr}`}</div>;
        })}
    </>);
}

function createStats(stats?: ItemStats) {
    if (stats === undefined) return null;
    return (<>
        {Object.entries(stats).map(([stat, num]) => {
            const positive = num > 0;
            const textColor = stat === StatType.ManaCost ? positive ? 'text-negative' : 'text-positive' : positive ? 'text-positive' : 'text-negative';
            const { key, val } = formatItemStat(stat as StatType, num);
            return (<div className={textColor} key={key}>{`${val} ${key}`}</div>);
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
                <div>{weapon.attackType}</div>
                <div className='flex flex-row h-4 space-x-1.5 items-center mt-1 mb-2'>
                    <span className='inline-flex'>{weapon.type}</span>
                    <Separator orientation='vertical' />
                    <span>{twoHanded ? 'Two-handed' : 'One-handed'}</span>
                    {light && <>
                        <Separator orientation='vertical' />
                        <span>Light</span>
                    </>}
                </div>
                <Separator className='my-1' />
                <div>
                    <span className='font-bold'>{min + bonus} - {max + bonus}</span>{weapon.spellPowerRatio && <span className='font-bold text-tooltip-highlight'> (+{formatNum(weapon.spellPowerRatio * 100)}% SP)</span>} damage
                </div>
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
                <Separator className='my-1' />
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
                <Separator className='my-1' />
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
                <Separator className='my-1' />
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
                <Separator className='my-1' />
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
                <Separator className='my-1' />
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
                <Separator className='my-1' />
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
                <Separator className='my-1' />
                {createAttributes(waist.attributes)}
                {createStats(waist.stats)}
            </>
        );
    },
    [ItemType.Neck]: (item) => {
        const neck = item as Neck;
        return (
            <>
                <div>{ItemType.Neck}</div>
                <Separator className='my-1' />
                {createAttributes(neck.attributes)}
                {createStats(neck.stats)}
            </>
        );
    },
};
