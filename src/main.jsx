import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MemorialLayout from './layouts/MemorialLayout';
import HomePage from './pages/HomePage';
import TributesPage from './pages/TributesPage';
import AllTributesPage from './pages/AllTributesPage';
import PhotosPage from './pages/PhotosPage';
import NotFoundPage from './pages/NotFoundPage';
import EulogyPage from './pages/EulogyPage';
import VideosPage from './pages/VideosPage';
import VideoDetailPage from './pages/VideoDetailPage';
import TimelinePage from './pages/TimelinePage';
import './styles/global.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<MemorialLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/tributes" element={<TributesPage />} />
          <Route path="/tributes/all" element={<AllTributesPage />} />
          <Route path="/photos" element={<PhotosPage />} />
          <Route path="/eulogy" element={<EulogyPage />} />
          <Route path="/videos" element={<VideosPage />} />
          <Route path="/videos/:videoId" element={<VideoDetailPage />} />
          <Route path="/timeline" element={<TimelinePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);
