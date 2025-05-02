import { BrowserRouter, Route, Routes } from 'react-router';
import Header from './Header';
import Battle from './routes/Battle';
import Equipment from './routes/Equipment';
import Home from './routes/Home';
import { CharactersProvider } from '../hooks/Characters/CharactersProvider';
import CreateCharacter from './routes/CreateCharacter';

function App() {
    return (
        <>
            <BrowserRouter>
                <CharactersProvider>
                    <Header />
                    <Routes>
                        <Route path="" element={<Home />} />
                        <Route path="equipment" element={<Equipment />} />
                        <Route path="battle" element={<Battle />} />
                        <Route path="create-character" element={<CreateCharacter />} />
                    </Routes>
                </CharactersProvider>
            </BrowserRouter>
        </>
    );
}

export default App;
