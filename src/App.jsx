import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Angkatan from './pages/Angkatan';
import TahunAjaran from './pages/TahunAjaran';
import Siswa from './pages/Siswa';
import Guru from './pages/Guru';
import Alumni from './pages/Alumni';
import Jurusan from './pages/Jurusan';
import Prestasi from './pages/Prestasi';
import Rapot from './pages/Rapot';
import Pelanggaran from './pages/Pelanggaran';
import Ppdb from './pages/Ppdb';
import Kelas from './pages/Kelas';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/angkatan" element={<Angkatan />} />
        <Route path="/tahun-ajaran" element={<TahunAjaran />} />
        <Route path="/kelas" element={<Kelas />} />
        <Route path="/siswa" element={<Siswa />} />
        <Route path="/guru" element={<Guru />} />
        <Route path="/alumni" element={<Alumni />} />
        <Route path="/jurusan" element={<Jurusan />} />
        <Route path="/prestasi" element={<Prestasi />} />
        <Route path="/rapot" element={<Rapot />} />
        <Route path="/pelanggaran" element={<Pelanggaran />} />
        <Route path="/ppdb" element={<Ppdb />} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
