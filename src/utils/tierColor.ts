import { Tier } from '@wholesome-sisters/auto-battler';

const tierBgColor: { [key in Tier]: string } = {
    0: 'bg-tier-0',
    1: 'bg-tier-1',
    2: 'bg-tier-2',
    3: 'bg-tier-3',
    4: 'bg-tier-4',
    5: 'bg-tier-5'
};

const tierBorderColor: { [key in Tier]: string } = {
    0: 'border-tier-0',
    1: 'border-tier-1',
    2: 'border-tier-2',
    3: 'border-tier-3',
    4: 'border-tier-4',
    5: 'border-tier-5'
};

const tierTextColor: { [key in Tier]: string } = {
    0: 'text-tier-0',
    1: 'text-tier-1',
    2: 'text-tier-2',
    3: 'text-tier-3',
    4: 'text-tier-4',
    5: 'text-tier-5'
};

export { tierBgColor, tierBorderColor, tierTextColor };