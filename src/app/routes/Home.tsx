import CharacterIcon from "@/components/svgs/CharacterIcon";
import BattleIcon from "@/components/svgs/BattleIcon";
import { ReactNode } from "react";
import { NavLink } from "react-router";
import EquipmentIcon from "@/components/svgs/EquipmentIcon";
import AccountIcon from "@/components/svgs/AccountIcon";

type CardProps = { to: string, header: string, text: string, icon: ReactNode; };
function Card({ to, header, text, icon }: CardProps) {
    return (
        <NavLink to={to} className="flex flex-col items-center gap-2 p-6 rounded-lg border shadow bg-card hover:bg-secondary fill-primary hover:fill-white">
            {icon}
            <h2 className="text-xl font-semibold">{header}</h2>
            <p className="text-sm text-muted-foreground text-center">{text}</p>
        </NavLink>
    );
}
const iconSize = 32;

function Home() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] px-6 py-8 gap-8">
            <div className="flex flex-col items-center gap-2">
                <h1 className="text-4xl font-extrabold">Auto Battler</h1>
                <p className="text-lg text-muted-foreground max-w-xl text-center">
                    Build your team, equip your heroes, and battle your way to the top. Manage your account, customize your characters, and challenge powerful enemies in this strategic auto-battler experience.
                </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-8">
                <Card
                    to='character'
                    header='Character'
                    text='View your characters and customize their attributes and abilities.'
                    icon={<CharacterIcon width={iconSize} height={iconSize} />}
                />
                <Card
                    to='equipment'
                    header='Equipment'
                    text='Manage character’s equipment your inventory. Equip items to optimize your character’s performance in battle.'
                    icon={<EquipmentIcon width={iconSize} height={iconSize} />}
                />
                <Card
                    to='battle'
                    header='Battle'
                    text='Enter the arena and test your character against challenging opponents'
                    icon={<BattleIcon width={iconSize} height={iconSize} />}
                />
                <Card
                    to='account'
                    header='Account'
                    text='Import, export, and manage your account data.'
                    icon={<AccountIcon width={iconSize} height={iconSize} />}
                />
            </div>
        </div>
    );
}

export default Home;