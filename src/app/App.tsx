import { BrowserRouter, Route, Routes } from 'react-router';
import Header from './Header';
import BattlePage from './routes/BattlePage';
import EquipmentPage from './routes/EquipmentPage';
import Home from './routes/Home';
import { CharactersProvider } from '@contexts/Characters/CharactersProvider';
import CreateCharacter from './routes/CreateCharacter';
import { InventoryProvider } from '@contexts/Inventory/InventoryProvider';
import BattleSelector from './routes/BattleSelector';
import Credits from './routes/Credits';
import Account from './routes/Account';

function App() {
    return (
        <>
            <BrowserRouter>
                <CharactersProvider>
                    <InventoryProvider>
                        <Header />
                        <div className='px-4'>
                            <Routes>
                                <Route index element={<Home />} />
                                <Route path="equipment" element={<EquipmentPage />} />
                                <Route path="battle">
                                    <Route index element={<BattleSelector />} />
                                    <Route path=":level" element={<BattlePage />} />
                                </Route>
                                <Route path="create-character" element={<CreateCharacter />} />
                                <Route path="account" element={<Account />} />
                                <Route path="credits" element={<Credits />} />
                            </Routes>
                        </div>
                    </InventoryProvider>
                </CharactersProvider>
            </BrowserRouter>
        </>
    );
}

export default App;
