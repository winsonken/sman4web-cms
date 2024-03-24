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
import Error404 from './pages/Error404';
import DetailRapot from './pages/DetailRapot';
import Role from './pages/Role';
import RequireAuth from './components/RequireAuth';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route element={<RequireAuth />}>
          <Route path="/" element={<Dashboard />} />
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
          <Route path="/detailrapot" element={<DetailRapot />} />
          <Route path="/role" element={<Role />} />
          <Route path="/*" element={<Error404 />} />
        </Route>
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
