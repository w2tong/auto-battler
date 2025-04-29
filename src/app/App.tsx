import { BrowserRouter, Route, Routes } from 'react-router';
import Header from './Header';
import Battle from './routes/Battle';
import Equipment from './routes/Equipment';
import Home from './routes/Home';

function App() {
    return (
        <>
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path="" element={<Home />} />
                    <Route path="battle" element={<Battle />} />
                    <Route path="equipment" element={<Equipment />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
