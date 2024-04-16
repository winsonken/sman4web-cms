import React, { useState } from 'react';

import { FaBookOpen } from 'react-icons/fa';
import { toast } from 'react-toastify';

import { Button, ButtonCustom, Layout, PopUpCustom } from '../components';

import { jwtDecode } from 'jwt-decode';
import { useSelector } from 'react-redux';
import {
  selectCurrentModules,
  selectCurrentToken,
  selectCurrentUser,
} from '../services/features/authSlice';
import FormPilihJurusan from '../components/profile/FormPilihJurusan';
import {
  useGetProfileGuruQuery,
  useGetProfileSiswaQuery,
  useGetProfileTendikQuery,
} from '../services/api/profileApiSlice';

const Profile = () => {
  const data = useSelector(selectCurrentUser);
  const role = data?.role;
  const [isOpenPopUpSetJurusan, setIsOpenPopUpSetJurusan] = useState(false);
  // const decoded = jwtDecode(token);

  // const role = decoded?.role;
  const id_siswa = data?.id_siswa;
  const { data: siswa } = useGetProfileSiswaQuery({ siswa: id_siswa });
  const profileSiswa = siswa?.data?.[0];

  const id_guru = data?.id_guru;
  const { data: guru } = useGetProfileGuruQuery({ guru: id_guru });
  const profileGuru = guru?.data?.[0];

  const id_tendik = data?.id_tendik;
  const { data: tendik } = useGetProfileTendikQuery({ tendik: id_tendik });
  const profileTendik = tendik?.data?.[0];

  const modules = useSelector(selectCurrentModules);

  const filterModule = (kodeModul) => {
    const module = modules?.find(
      (allModules) => allModules?.kode_modul == kodeModul
    );
    return module;
  };

  const modulesProfile = filterModule('profile');
  return (
    <Layout>
      <div className="flex flex-col gap-5">
        <div
          className={`flex flex-col gap-3 sm:flex-row  ${
            modulesProfile?.ubah ? 'sm:justify-between' : 'sm:justify-start'
          }`}
        >
          <h1 className="text-xl font-semibold md:text-2xl">Profile</h1>
          {role == 'siswa' &&
            profileSiswa?.jurusan == null &&
            modulesProfile?.ubah && (
              <ButtonCustom
                title="Pilih jurusan"
                setIsOpenPopUp={setIsOpenPopUpSetJurusan}
              />
            )}
        </div>

        {(role == 'siswa' || role == 'alumni') && (
          <div className="">
            <div className="grid grid-flow-row-dense grid-cols-1 sm:grid-cols-2 gap-3 md:grid-cols-3">
              <div className="sm:row-span-3">
                <img
                  src={
                    profileSiswa?.foto
                      ? `http://localhost:5500/${profileSiswa?.foto}`
                      : './default-user.jpeg'
                  }
                  alt="Siswa"
                  className="w-full h-full max-h-52 rounded-md object-cover"
                  loading="lazy"
                />
              </div>
              <div>
                <h1 className="font-medium text-second-blue">No pendaftaran</h1>
                <p className="w-full text-sm font-medium text-main-cream  bg-main-blue px-3 py-2 rounded ">
                  {profileSiswa?.no_pendaftaran}
                </p>
              </div>
              <div>
                <h1 className="font-medium text-second-blue">Nama</h1>
                <p className="w-full text-sm font-medium text-main-cream  bg-main-blue px-3 py-2 rounded ">
                  {profileSiswa?.nama}
                </p>
              </div>
              <div>
                <h1 className="font-medium text-second-blue">Jenis Kelamin</h1>
                <p className="w-full text-sm font-medium text-main-cream  bg-main-blue px-3 py-2 rounded ">
                  {profileSiswa?.jenis_kelamin}
                </p>
              </div>
              <div>
                <h1 className="font-medium text-second-blue">NIPD</h1>
                <p className="w-full text-sm font-medium text-main-cream  bg-main-blue px-3 py-2 rounded ">
                  {profileSiswa?.nipd}
                </p>
              </div>
              <div>
                <h1 className="font-medium text-second-blue">NIK</h1>
                <p className="w-full text-sm font-medium text-main-cream  bg-main-blue px-3 py-2 rounded ">
                  {profileSiswa?.nik}
                </p>
              </div>
              <div>
                <h1 className="font-medium text-second-blue">
                  No Telepon siswa
                </h1>
                <p className="w-full text-sm font-medium text-main-cream  bg-main-blue px-3 py-2 rounded ">
                  {profileSiswa?.no_telepon_siswa}
                </p>
              </div>
              <div>
                <h1 className="font-medium text-second-blue">Alamat</h1>
                <p className="w-full text-sm font-medium text-main-cream  bg-main-blue px-3 py-2 rounded ">
                  {profileSiswa?.alamat}
                </p>
              </div>
              <div>
                <h1 className="font-medium text-second-blue">Email</h1>
                <p className="w-full text-sm font-medium text-main-cream  bg-main-blue px-3 py-2 rounded ">
                  {profileSiswa?.email}
                </p>
              </div>
              <div>
                <h1 className="font-medium text-second-blue">Tempat Lahir</h1>
                <p className="w-full text-sm font-medium text-main-cream  bg-main-blue px-3 py-2 rounded ">
                  {profileSiswa?.tempat_lahir}
                </p>
              </div>
              <div>
                <h1 className="font-medium text-second-blue">Tanggal Lahir</h1>
                <p className="w-full text-sm font-medium text-main-cream  bg-main-blue px-3 py-2 rounded ">
                  {profileSiswa?.tanggal_lahir}
                </p>
              </div>
              <div>
                <h1 className="font-medium text-second-blue">Agama</h1>
                <p className="w-full text-sm font-medium text-main-cream  bg-main-blue px-3 py-2 rounded ">
                  {profileSiswa?.agama}
                </p>
              </div>
              <div>
                <h1 className="font-medium text-second-blue">Nama Ortu</h1>
                <p className="w-full text-sm font-medium text-main-cream  bg-main-blue px-3 py-2 rounded ">
                  {profileSiswa?.nama_ortu}
                </p>
              </div>
              <div>
                <h1 className="font-medium text-second-blue">
                  No Telepon Ortu
                </h1>
                <p className="w-full text-sm font-medium text-main-cream  bg-main-blue px-3 py-2 rounded ">
                  {profileSiswa?.no_telepon_ortu}
                </p>
              </div>
              <div>
                <h1 className="font-medium text-second-blue">Angkatan</h1>
                <p className="w-full text-sm font-medium text-main-cream  bg-main-blue px-3 py-2 rounded ">
                  {profileSiswa?.no_angkatan}
                </p>
              </div>
              <div>
                <h1 className="font-medium text-second-blue">Jurusan</h1>
                <p className="w-full text-sm font-medium text-main-cream  bg-main-blue px-3 py-2 rounded ">
                  {profileSiswa?.nama_jurusan || 'Belum dipilih'}
                </p>
              </div>
              <div>
                <h1 className="font-medium text-second-blue">Status siswa</h1>
                <p className="w-full text-sm font-medium text-main-cream  bg-main-blue px-3 py-2 rounded ">
                  {profileSiswa?.status_siswa == 1
                    ? 'Aktif'
                    : profileSiswa?.status_siswa == 2
                    ? 'Lulus'
                    : profileSiswa?.status_siswa == 3
                    ? 'Alumni'
                    : profileSiswa?.status_siswa == 4
                    ? 'Dropout'
                    : ''}
                </p>
              </div>
              <div>
                <h1 className="font-medium text-second-blue">Username</h1>
                <p className="w-full text-sm font-medium text-main-cream  bg-main-blue px-3 py-2 rounded ">
                  {profileSiswa?.username}
                </p>
              </div>
            </div>
          </div>
        )}

        {role == 'guru' && (
          <div className="">
            <div className="grid grid-flow-row-dense grid-cols-1 sm:grid-cols-2 gap-3 md:grid-cols-3">
              <div className="sm:row-span-3">
                <img
                  src={
                    profileGuru?.foto
                      ? `http://localhost:5500/${profileGuru?.foto}`
                      : './default-user.jpeg'
                  }
                  alt="Guru"
                  className="w-full h-full max-h-52 rounded-md object-cover"
                  loading="lazy"
                />
              </div>
              <div>
                <h1 className="font-medium text-second-blue">Nama</h1>
                <p className="w-full text-sm font-medium text-main-cream  bg-main-blue px-3 py-2 rounded ">
                  {profileGuru?.nama}
                </p>
              </div>
              <div>
                <h1 className="font-medium text-second-blue">Jenis Kelamin</h1>
                <p className="w-full text-sm font-medium text-main-cream  bg-main-blue px-3 py-2 rounded ">
                  {profileGuru?.jenis_kelamin}
                </p>
              </div>
              <div>
                <h1 className="font-medium text-second-blue">NIK</h1>
                <p className="w-full text-sm font-medium text-main-cream  bg-main-blue px-3 py-2 rounded ">
                  {profileGuru?.nik}
                </p>
              </div>
              <div>
                <h1 className="font-medium text-second-blue">Jenis PTK</h1>
                <p className="w-full text-sm font-medium text-main-cream  bg-main-blue px-3 py-2 rounded ">
                  {profileGuru?.jenis_ptk}
                </p>
              </div>
              <div>
                <h1 className="font-medium text-second-blue">NIP/NRPTK/NIG</h1>
                <p className="w-full text-sm font-medium text-main-cream  bg-main-blue px-3 py-2 rounded ">
                  {profileGuru?.no_guru}
                </p>
              </div>
              <div>
                <h1 className="font-medium text-second-blue">
                  No Telepon guru
                </h1>
                <p className="w-full text-sm font-medium text-main-cream  bg-main-blue px-3 py-2 rounded ">
                  {profileGuru?.no_telepon_guru}
                </p>
              </div>
              <div>
                <h1 className="font-medium text-second-blue">Alamat</h1>
                <p className="w-full text-sm font-medium text-main-cream  bg-main-blue px-3 py-2 rounded ">
                  {profileGuru?.alamat}
                </p>
              </div>
              <div>
                <h1 className="font-medium text-second-blue">Email</h1>
                <p className="w-full text-sm font-medium text-main-cream  bg-main-blue px-3 py-2 rounded ">
                  {profileGuru?.email}
                </p>
              </div>
              <div>
                <h1 className="font-medium text-second-blue">Tempat Lahir</h1>
                <p className="w-full text-sm font-medium text-main-cream  bg-main-blue px-3 py-2 rounded ">
                  {profileGuru?.tempat_lahir}
                </p>
              </div>
              <div>
                <h1 className="font-medium text-second-blue">Tanggal Lahir</h1>
                <p className="w-full text-sm font-medium text-main-cream  bg-main-blue px-3 py-2 rounded ">
                  {profileGuru?.tanggal_lahir}
                </p>
              </div>
              <div>
                <h1 className="font-medium text-second-blue">Status kawin</h1>
                <p className="w-full text-sm font-medium text-main-cream  bg-main-blue px-3 py-2 rounded ">
                  {profileGuru?.status_kawin}
                </p>
              </div>
              <div>
                <h1 className="font-medium text-second-blue">
                  Status kepegawaian
                </h1>
                <p className="w-full text-sm font-medium text-main-cream  bg-main-blue px-3 py-2 rounded ">
                  {profileGuru?.status_kepegawaian}
                </p>
              </div>
              <div>
                <h1 className="font-medium text-second-blue">Status guru</h1>
                <p className="w-full text-sm font-medium text-main-cream  bg-main-blue px-3 py-2 rounded ">
                  {profileGuru?.status_guru == 1
                    ? 'Aktif'
                    : profileGuru?.status_guru == 2
                    ? 'Tidak aktif'
                    : ''}
                </p>
              </div>
              <div>
                <h1 className="font-medium text-second-blue">Username</h1>
                <p className="w-full text-sm font-medium text-main-cream  bg-main-blue px-3 py-2 rounded ">
                  {profileGuru?.username}
                </p>
              </div>
            </div>
          </div>
        )}

        {(role == 'tendik' || role == 'admin') && (
          <div className="">
            <div className="grid grid-flow-row-dense grid-cols-1 sm:grid-cols-2 gap-3 md:grid-cols-3">
              <div className="sm:row-span-3">
                <img
                  src={
                    profileTendik?.foto
                      ? `http://localhost:5500/${profileTendik?.foto}`
                      : './default-user.jpeg'
                  }
                  alt="Tendik"
                  className="w-full h-full max-h-52 rounded-md object-cover"
                  loading="lazy"
                />
              </div>
              <div>
                <h1 className="font-medium text-second-blue">Nama</h1>
                <p className="w-full text-sm font-medium text-main-cream  bg-main-blue px-3 py-2 rounded ">
                  {profileTendik?.nama}
                </p>
              </div>
              <div>
                <h1 className="font-medium text-second-blue">Jenis Kelamin</h1>
                <p className="w-full text-sm font-medium text-main-cream  bg-main-blue px-3 py-2 rounded ">
                  {profileTendik?.jenis_kelamin}
                </p>
              </div>
              <div>
                <h1 className="font-medium text-second-blue">NIK</h1>
                <p className="w-full text-sm font-medium text-main-cream  bg-main-blue px-3 py-2 rounded ">
                  {profileTendik?.nik}
                </p>
              </div>
              <div>
                <h1 className="font-medium text-second-blue">Jenis PTK</h1>
                <p className="w-full text-sm font-medium text-main-cream  bg-main-blue px-3 py-2 rounded ">
                  {profileTendik?.jenis_ptk}
                </p>
              </div>
              <div>
                <h1 className="font-medium text-second-blue">NIP/NRPTK/NIG</h1>
                <p className="w-full text-sm font-medium text-main-cream  bg-main-blue px-3 py-2 rounded ">
                  {profileTendik?.no_tendik}
                </p>
              </div>
              <div>
                <h1 className="font-medium text-second-blue">
                  No Telepon tendik
                </h1>
                <p className="w-full text-sm font-medium text-main-cream  bg-main-blue px-3 py-2 rounded ">
                  {profileTendik?.no_telepon_tendik}
                </p>
              </div>
              <div>
                <h1 className="font-medium text-second-blue">Alamat</h1>
                <p className="w-full text-sm font-medium text-main-cream  bg-main-blue px-3 py-2 rounded ">
                  {profileTendik?.alamat}
                </p>
              </div>
              <div>
                <h1 className="font-medium text-second-blue">Email</h1>
                <p className="w-full text-sm font-medium text-main-cream  bg-main-blue px-3 py-2 rounded ">
                  {profileTendik?.email}
                </p>
              </div>
              <div>
                <h1 className="font-medium text-second-blue">Tempat Lahir</h1>
                <p className="w-full text-sm font-medium text-main-cream  bg-main-blue px-3 py-2 rounded ">
                  {profileTendik?.tempat_lahir}
                </p>
              </div>
              <div>
                <h1 className="font-medium text-second-blue">Tanggal Lahir</h1>
                <p className="w-full text-sm font-medium text-main-cream  bg-main-blue px-3 py-2 rounded ">
                  {profileTendik?.tanggal_lahir}
                </p>
              </div>
              <div>
                <h1 className="font-medium text-second-blue">Status kawin</h1>
                <p className="w-full text-sm font-medium text-main-cream  bg-main-blue px-3 py-2 rounded ">
                  {profileTendik?.status_kawin}
                </p>
              </div>
              <div>
                <h1 className="font-medium text-second-blue">
                  Status kepegawaian
                </h1>
                <p className="w-full text-sm font-medium text-main-cream  bg-main-blue px-3 py-2 rounded ">
                  {profileTendik?.status_kepegawaian}
                </p>
              </div>
              <div>
                <h1 className="font-medium text-second-blue">Status tendik</h1>
                <p className="w-full text-sm font-medium text-main-cream  bg-main-blue px-3 py-2 rounded ">
                  {profileTendik?.status_tendik == 1
                    ? 'Aktif'
                    : profileTendik?.status_tendik == 2
                    ? 'Tidak aktif'
                    : ''}
                </p>
              </div>
              <div>
                <h1 className="font-medium text-second-blue">Role</h1>
                <p className="w-full text-sm font-medium text-main-cream  bg-main-blue px-3 py-2 rounded capitalize">
                  {profileTendik?.role}
                </p>
              </div>
              <div>
                <h1 className="font-medium text-second-blue">Username</h1>
                <p className="w-full text-sm font-medium text-main-cream  bg-main-blue px-3 py-2 rounded ">
                  {profileTendik?.username}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* <div className="">
          <div className="grid grid-flow-row-dense grid-cols-1 sm:grid-cols-2 gap-3 md:grid-cols-3">
            <div className="sm:row-span-3">
              <img
                src={
                  data?.foto
                    ? `http://localhost:5500/${data?.foto}`
                    : './default-user.jpeg'
                }
                alt="Guru"
                className="w-full h-full max-h-52 rounded-md object-cover"
                loading="lazy"
              />
            </div>
            <div>
              <h1 className="font-medium text-second-blue">Nama</h1>
              <p className="w-full text-sm font-medium text-main-cream  bg-main-blue px-3 py-2 rounded ">
                {data?.nama}
              </p>
            </div>
            <div>
              <h1 className="font-medium text-second-blue">Jenis Kelamin</h1>
              <p className="w-full text-sm font-medium text-main-cream  bg-main-blue px-3 py-2 rounded ">
                {data?.jenis_kelamin}
              </p>
            </div>
            {role == 'siswa' && (
              <div>
                <h1 className="font-medium text-second-blue">NIPD</h1>
                <p className="w-full text-sm font-medium text-main-cream  bg-main-blue px-3 py-2 rounded ">
                  {data?.nipd}
                </p>
              </div>
            )}
            <div>
              <h1 className="font-medium text-second-blue">NIK</h1>
              <p className="w-full text-sm font-medium text-main-cream  bg-main-blue px-3 py-2 rounded ">
                {data?.nik}
              </p>
            </div>

            {(role == 'admin' || role == 'tendik' || role == 'guru') && (
              <div>
                <h1 className="font-medium text-second-blue">Jenis PTK</h1>
                <p className="w-full text-sm font-medium text-main-cream  bg-main-blue px-3 py-2 rounded ">
                  {data?.jenis_ptk}
                </p>
              </div>
            )}

            {role == 'guru' && (
              <div>
                <h1 className="font-medium text-second-blue">NIP/NRPTK/NIG</h1>
                <p className="w-full text-sm font-medium text-main-cream  bg-main-blue px-3 py-2 rounded ">
                  {data?.no_guru}
                </p>
              </div>
            )}

            {(role == 'admin' || role == 'tendik') && (
              <div>
                <h1 className="font-medium text-second-blue">NIP/NRPTK/NIG</h1>
                <p className="w-full text-sm font-medium text-main-cream  bg-main-blue px-3 py-2 rounded ">
                  {data?.no_tendik}
                </p>
              </div>
            )}

            {role == 'guru' && (
              <div>
                <h1 className="font-medium text-second-blue">
                  No Telepon guru
                </h1>
                <p className="w-full text-sm font-medium text-main-cream  bg-main-blue px-3 py-2 rounded ">
                  {data?.no_telepon_guru}
                </p>
              </div>
            )}

            {(role == 'admin' || role == 'tendik') && (
              <div>
                <h1 className="font-medium text-second-blue">
                  No Telepon tendik
                </h1>
                <p className="w-full text-sm font-medium text-main-cream  bg-main-blue px-3 py-2 rounded ">
                  {data?.no_telepon_tendik}
                </p>
              </div>
            )}

            {role == 'siswa' && (
              <div>
                <h1 className="font-medium text-second-blue">
                  No Telepon siswa
                </h1>
                <p className="w-full text-sm font-medium text-main-cream  bg-main-blue px-3 py-2 rounded ">
                  {data?.no_telepon_siswa}
                </p>
              </div>
            )}

            <div>
              <h1 className="font-medium text-second-blue">Alamat</h1>
              <p className="w-full text-sm font-medium text-main-cream  bg-main-blue px-3 py-2 rounded ">
                {data?.alamat}
              </p>
            </div>
            <div>
              <h1 className="font-medium text-second-blue">Email</h1>
              <p className="w-full text-sm font-medium text-main-cream  bg-main-blue px-3 py-2 rounded ">
                {data?.email}
              </p>
            </div>
            <div>
              <h1 className="font-medium text-second-blue">Tempat Lahir</h1>
              <p className="w-full text-sm font-medium text-main-cream  bg-main-blue px-3 py-2 rounded ">
                {data?.tempat_lahir}
              </p>
            </div>
            <div>
              <h1 className="font-medium text-second-blue">Tanggal Lahir</h1>
              <p className="w-full text-sm font-medium text-main-cream  bg-main-blue px-3 py-2 rounded ">
                {data?.tanggal_lahir}
              </p>
            </div>

            <div>
              <h1 className="font-medium text-second-blue">Agama</h1>
              <p className="w-full text-sm font-medium text-main-cream  bg-main-blue px-3 py-2 rounded ">
                {data?.agama}
              </p>
            </div>

            {role == 'siswa' && (
              <>
                <div>
                  <h1 className="font-medium text-second-blue">Nama Ortu</h1>
                  <p className="w-full text-sm font-medium text-main-cream  bg-main-blue px-3 py-2 rounded ">
                    {data?.nama_ortu}
                  </p>
                </div>
                <div>
                  <h1 className="font-medium text-second-blue">
                    No Telepon Ortu
                  </h1>
                  <p className="w-full text-sm font-medium text-main-cream  bg-main-blue px-3 py-2 rounded ">
                    {data?.no_telepon_ortu}
                  </p>
                </div>
                <div>
                  <h1 className="font-medium text-second-blue">Angkatan</h1>
                  <p className="w-full text-sm font-medium text-main-cream  bg-main-blue px-3 py-2 rounded ">
                    {data?.no_angkatan}
                  </p>
                </div>
                <div>
                  <h1 className="font-medium text-second-blue">Jurusan</h1>
                  <p className="w-full text-sm font-medium text-main-cream  bg-main-blue px-3 py-2 rounded ">
                    {data?.nama_jurusan || 'Belum dipilih'}
                  </p>
                </div>
              </>
            )}

            {(role == 'admin' || role == 'tendik' || role == 'guru') && (
              <>
                <div>
                  <h1 className="font-medium text-second-blue">Status kawin</h1>
                  <p className="w-full text-sm font-medium text-main-cream  bg-main-blue px-3 py-2 rounded ">
                    {data?.status_kawin}
                  </p>
                </div>
                <div>
                  <h1 className="font-medium text-second-blue">
                    Status kepegawaian
                  </h1>
                  <p className="w-full text-sm font-medium text-main-cream  bg-main-blue px-3 py-2 rounded ">
                    {data?.status_kepegawaian}
                  </p>
                </div>
              </>
            )}

            {role == 'guru' && (
              <div>
                <h1 className="font-medium text-second-blue">Status guru</h1>
                <p className="w-full text-sm font-medium text-main-cream  bg-main-blue px-3 py-2 rounded ">
                  {data?.status_guru == 1 ? 'Aktif' : ''}
                </p>
              </div>
            )}

            {(role == 'admin' || role == 'tendik') && (
              <div>
                <h1 className="font-medium text-second-blue">Status tendik</h1>
                <p className="w-full text-sm font-medium text-main-cream  bg-main-blue px-3 py-2 rounded ">
                  {data?.status_tendik == 1 ? 'Aktif' : ''}
                </p>
              </div>
            )}

            {role == 'siswa' && (
              <div>
                <h1 className="font-medium text-second-blue">Status siswa</h1>
                <p className="w-full text-sm font-medium text-main-cream  bg-main-blue px-3 py-2 rounded ">
                  {data?.status_siswa == 1 ? 'Aktif' : ''}
                </p>
              </div>
            )}

            <div>
              <h1 className="font-medium text-second-blue">Username</h1>
              <p className="w-full text-sm font-medium text-main-cream  bg-main-blue px-3 py-2 rounded ">
                {data?.username}
              </p>
            </div>

            {(role == 'admin' || role == 'tendik' || role == 'guru') && (
              <div>
                <h1 className="font-medium text-second-blue">Role</h1>
                <p className="w-full text-sm font-medium text-main-cream  bg-main-blue px-3 py-2 rounded ">
                  {data?.role}
                </p>
              </div>
            )}
          </div>
        </div> */}
      </div>

      <PopUpCustom
        title="Pilih jurusan"
        icon={<FaBookOpen />}
        isOpenPopUp={isOpenPopUpSetJurusan}
        setIsOpenPopUp={setIsOpenPopUpSetJurusan}
        className="md:max-w-xl"
      >
        <div className="flex flex-col gap-3">
          <FormPilihJurusan
            data={data}
            setIsOpenPopUpSetJurusan={setIsOpenPopUpSetJurusan}
          />
        </div>
      </PopUpCustom>
    </Layout>
  );
};

export default Profile;
