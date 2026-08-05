import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import CampusMap from './pages/CampusMap';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<CampusMap />} />
        <Route path="*" element={<CampusMap />} />
      </Route>
    </Routes>
  );
}

export default App;
