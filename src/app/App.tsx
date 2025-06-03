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
import AccountPage from './routes/AccountPage';
import { Toaster } from '@/components/ui/sonner';

function App() {
    return (
        <>
            <BrowserRouter>
                <CharactersProvider>
                    <InventoryProvider>
                        <Toaster position='top-center' />
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
                                <Route path="account" element={<AccountPage />} />
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
