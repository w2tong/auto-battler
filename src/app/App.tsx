import { BrowserRouter, Route, Routes } from 'react-router';
import Header from '@/components/Header';
import BattlePage from './routes/BattlePage';
import EquipmentPage from './routes/EquipmentPage';
import Home from './routes/Home';
import { CharactersProvider } from '@contexts/Characters/CharactersProvider';
import { InventoryProvider } from '@contexts/Inventory/InventoryProvider';
import BattleSelector from './routes/BattleSelector';
import Credits from './routes/Credits';
import AccountPage from './routes/AccountPage';
import { Toaster } from '@/components/ui/sonner';
import CharacterPage from './routes/CharacterPage';

function App() {
    return (
        <div className='flex flex-col h-full'>
            <BrowserRouter basename='/auto-battler'>
                <CharactersProvider>
                    <InventoryProvider>
                        <Toaster position='top-center' />
                        <Header />
                        <div className='flex-1'>
                            <Routes>
                                <Route index element={<Home />} />
                                <Route path="character" element={<CharacterPage />} />
                                <Route path="equipment" element={<EquipmentPage />} />
                                <Route path="battle">
                                    <Route index element={<BattleSelector />} />
                                    <Route path=":level" element={<BattlePage />} />
                                </Route>
                                <Route path="account" element={<AccountPage />} />
                                <Route path="credits" element={<Credits />} />
                            </Routes>
                        </div>
                    </InventoryProvider>
                </CharactersProvider>
            </BrowserRouter>
        </div>
    );
}

export default App;
