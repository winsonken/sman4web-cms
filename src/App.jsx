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
import { selectCurrentModules } from './services/features/authSlice';
import { useSelector } from 'react-redux';

function App() {
  const modules = useSelector(selectCurrentModules);

  const filterModule = (kodeModul) => {
    const module = modules?.find(
      (allModules) => allModules?.kode_modul == kodeModul
    );
    return module;
  };
  const modulesDashboard = filterModule('dashboard');
  const modulesProfile = filterModule('profile');
  const modulesAngkatan = filterModule('data_angkatan');
  const modulesTahunAjaran = filterModule('data_tahun_ajaran');
  const moduleKelas = filterModule('data_kelas');
  const modulesSiswa = filterModule('data_siswa');
  const modulesGuru = filterModule('data_guru');
  const modulesAlumni = filterModule('data_alumni');
  const modulesJurusan = filterModule('data_jurusan');
  const modulesPrestasi = filterModule('data_prestasi');
  const modulesRapot = filterModule('data_rapot');
  const modulesPelanggaran = filterModule('data_pelanggaran');
  const modulesPpdb = filterModule('data_ppdb');
  const modulesRole = filterModule('data_role');

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route element={<RequireAuth />}>
          <Route path="/" element={<Dashboard />} />

          {modulesDashboard?.akses && (
            <Route path="/dashboard" element={<Dashboard />} />
          )}

          {modulesProfile?.akses && (
            <Route path="/profile" element={<Profile />} />
          )}

          {modulesAngkatan?.akses && (
            <Route path="/angkatan" element={<Angkatan />} />
          )}

          {modulesTahunAjaran?.akses && (
            <Route path="/tahun-ajaran" element={<TahunAjaran />} />
          )}

          {moduleKelas?.akses && <Route path="/kelas" element={<Kelas />} />}

          {modulesSiswa?.akses && <Route path="/siswa" element={<Siswa />} />}

          {modulesGuru?.akses && <Route path="/guru" element={<Guru />} />}

          {modulesAlumni?.akses && (
            <Route path="/alumni" element={<Alumni />} />
          )}

          {modulesJurusan?.akses && (
            <Route path="/jurusan" element={<Jurusan />} />
          )}

          {modulesPrestasi?.akses && (
            <Route path="/prestasi" element={<Prestasi />} />
          )}

          {modulesRapot?.akses && (
            <>
              <Route path="/rapot" element={<Rapot />} />
              <Route path="/detailrapot" element={<DetailRapot />} />
            </>
          )}

          {modulesPelanggaran?.akses && (
            <Route path="/pelanggaran" element={<Pelanggaran />} />
          )}

          {modulesPpdb?.akses && <Route path="/ppdb" element={<Ppdb />} />}

          {modulesRole?.akses && <Route path="/role" element={<Role />} />}

          <Route path="/*" element={<Error404 />} />
        </Route>
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
