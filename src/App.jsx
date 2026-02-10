import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import BoardListPage from './pages/board/BoardListPage';
import BoardCreatePage from './pages/board/BoardCreatePage';
import BoardEditPage from './pages/board/BoardEditPage';
import BoardDetailPage from './pages/board/BoardDetailPage';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Navigate to="/board" replace />} />
          <Route path="/board" element={<BoardListPage />} />
          <Route path="/board/create" element={<BoardCreatePage />} />
          <Route path="/board/edit/:id" element={<BoardEditPage />} />
          <Route path="/board/:id" element={<BoardDetailPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
