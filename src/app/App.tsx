import { BrowserRouter, Route, Routes } from 'react-router';
import Header from './Header';
import Battle from './routes/Battle';
import Equipment from './routes/Equipment';
import Home from './routes/Home';
import { CharactersProvider } from '../hooks/Characters/CharactersProvider';

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
                    </Routes>
                </CharactersProvider>
            </BrowserRouter>
        </>
    );
}

export default App;
