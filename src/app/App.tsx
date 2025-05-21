import { BrowserRouter, Route, Routes } from 'react-router';
import Header from './Header';
import BattlePage from './routes/BattlePage';
import EquipmentPage from './routes/EquipmentPage';
import Home from './routes/Home';
import { CharactersProvider } from '../hooks/Characters/CharactersProvider';
import CreateCharacter from './routes/CreateCharacter';
import { InventoryProvider } from '../hooks/Inventory/InventoryProvider';
import BattleSelector from './routes/BattleSelector';

function App() {
    return (
        <>
            <BrowserRouter>
                <CharactersProvider>
                    <InventoryProvider>
                        <Header />
                        <Routes>
                            <Route index element={<Home />} />
                            <Route path="equipment" element={<EquipmentPage />} />

                            <Route path="battle">
                                <Route index element={<BattleSelector />} />
                                <Route path=":level" element={<BattlePage />} />
                            </Route>
                            <Route path="create-character" element={<CreateCharacter />} />
                        </Routes>
                    </InventoryProvider>
                </CharactersProvider>
            </BrowserRouter>
        </>
    );
}

export default App;
