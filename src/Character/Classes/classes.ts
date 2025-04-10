import Fighter from './Fighter';
import Priest from './Priest';
import Rogue from './Rogue';
import Wizard from './Wizard';

enum ClassName {
    Fighter = 'Fighter',
    Rogue = 'Rogue',
    Wizard = 'Wizard',
    Priest = 'Priest'
}

const Classes = {
    [ClassName.Fighter]: Fighter,
    [ClassName.Priest]: Priest,
    [ClassName.Rogue]: Rogue,
    [ClassName.Wizard]: Wizard
} as const;

export { Classes, ClassName };