import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Global } from '@emotion/react';
import { ThemeProvider } from '@mui/material/styles'; // Ensure @mui/material/styles is installed
import Home from './components/UserHomePage/Home';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import { store } from './store';
import globalStyles from './styles/globalStyles';
import theme from './styles/themes/theme';
import AdminDashboard from './components/AdminHomePage/AdminDashboard';
import {AlbumItem} from './components/Album/AlbumItem';
// import AlbumList from './components/Album/AlbumList';
import GenereItem from './components/Genere/GenereItem';
import { GenereList } from './components/Genere/GenereList';

import {ArtistItem} from './components/Artist/ArtistItem';
import {ArtistList} from './components/Artist/ArtistList';
// import SongItem from './components/Song/SongItem';
// import SongList from './components/Song/SongList';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Global styles={globalStyles} />
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/admin/*" element={<AdminDashboard />} />
            {/* <Route path="/Song/:id" element={<SongItem />} /> */}
            {/* <Route path="/Songs" element={<SongList />} /> */}
            <Route path="/Album/:id" element={<AlbumItem />} />
            {/* <Route path="/Albums" element={<AlbumList />} /> */}
            <Route path="/Genre/:id" element={<GenereItem />} />
            <Route path="/Genres" element={<GenereList />} />
            <Route path="/Artist/:id" element={<ArtistItem />} />
            <Route path="/Artists" element={<ArtistList />} />
          </Routes>
          <Footer />
        </Router>
      </ThemeProvider>
    </Provider>
  );
};
export default App;