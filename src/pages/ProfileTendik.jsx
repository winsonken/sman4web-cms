import React from 'react';
import { Layout } from '../components';
const ProfileTendik = () => {
  return (
    <Layout>
      <div className="flex flex-col gap-5">
        <div>
          <h1 className="text-xl font-semibold md:text-2xl">Profile Tendik</h1>
        </div>
        <div className=" w-full h-full">
          <h1>
            <img src="./public/tendik.jpeg" alt="Tendik" />
          </h1>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:grid-cols-3">
          <div>
            <h1 className="font-medium text-second-blue">Nama</h1>
            <p className="w-full text-sm font-medium text-main-cream  bg-main-blue px-3 py-2 rounded ">
              Maria Zhang
            </p>
          </div>
          <div>
            <h1 className="font-medium text-second-blue">Tanggal Lahir</h1>
            <p className="w-full text-sm font-medium text-main-cream  bg-main-blue px-3 py-2 rounded ">
              08/08/1999
            </p>
          </div>
          <div>
            <h1 className="font-medium text-second-blue">NRPTK</h1>
            <p className="w-full text-sm font-medium text-main-cream  bg-main-blue px-3 py-2 rounded ">
              123456
            </p>
          </div>
          <div>
            <h1 className="font-medium text-second-blue">Tempat Lahir</h1>
            <p className="w-full text-sm font-medium text-main-cream  bg-main-blue px-3 py-2 rounded ">
              Polandia
            </p>
          </div>
          <div>
            <h1 className="font-medium text-second-blue">Email</h1>
            <p className="w-full text-sm font-medium text-main-cream  bg-main-blue px-3 py-2 rounded ">
              suki@gmail.com
            </p>
          </div>
          <div>
            <h1 className="font-medium text-second-blue">Jenis PTK</h1>
            <p className="w-full text-sm font-medium text-main-cream  bg-main-blue px-3 py-2 rounded ">
              Administrasi
            </p>
          </div>
          <div>
            <h1 className="font-medium text-second-blue">Jenis Kelamin</h1>
            <p className="w-full text-sm font-medium text-main-cream  bg-main-blue px-3 py-2 rounded ">
              Wanita
            </p>
          </div>
          <div>
            <h1 className="font-medium text-second-blue">Agama</h1>
            <p className="w-full text-sm font-medium text-main-cream  bg-main-blue px-3 py-2 rounded ">
              Kim Jong Un
            </p>
          </div>
          <div>
            <h1 className="font-medium text-second-blue">Alamat</h1>
            <p className="w-full text-sm font-medium text-main-cream  bg-main-blue px-3 py-2 rounded ">
              Kintamani Blok B
            </p>
          </div>

          <div>
            <h1 className="font-medium text-second-blue">No Telp Tendik</h1>
            <p className="w-full text-sm font-medium text-main-cream  bg-main-blue px-3 py-2 rounded ">
              085678971654
            </p>
          </div>
          <div>
            <h1 className="font-medium text-second-blue">Status Kepegawaian</h1>
            <p className="w-full text-sm font-medium text-main-cream  bg-main-blue px-3 py-2 rounded ">
              Tenaga Honor Sekolah
            </p>
          </div>
          <div>
            <h1 className="font-medium text-second-blue">Status Tendik</h1>
            <p className="w-full text-sm font-medium text-main-cream  bg-main-blue px-3 py-2 rounded ">
              Bekerja
            </p>
          </div>
          <div>
            <h1 className="font-medium text-second-blue">Status Nikah</h1>
            <p className="w-full text-sm font-medium text-main-cream  bg-main-blue px-3 py-2 rounded ">
              belum Menikah
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default ProfileTendik;
