import React from 'react';

const FormDetailSiswaDropout = (props) => {
  const { data } = props;

  const API_URL =
    import.meta.env.VITE_PRODUCTION === 'true'
      ? import.meta.env.VITE_API_URL_PROD
      : import.meta.env.VITE_API_URL_DEV;

  return (
    <div className="">
      <div className="grid grid-flow-row-dense grid-cols-1 sm:grid-cols-2 gap-3 md:grid-cols-3">
        <div className="sm:row-span-3">
          <img
            src={data?.foto ? `${API_URL}${data?.foto}` : './default-user.jpeg'}
            alt="Siswa"
            className="w-full h-full max-h-52 rounded-md object-cover"
            loading="lazy"
          />
        </div>
        <div>
          <h1 className="font-medium text-second-blue">No pendaftaran</h1>
          <p className="w-full text-sm font-medium text-main-cream  bg-main-blue px-3 py-2 rounded ">
            {data?.no_pendaftaran}
          </p>
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
        <div>
          <h1 className="font-medium text-second-blue">NIPD</h1>
          <p className="w-full text-sm font-medium text-main-cream  bg-main-blue px-3 py-2 rounded ">
            {data?.nipd}
          </p>
        </div>
        <div>
          <h1 className="font-medium text-second-blue">NIK</h1>
          <p className="w-full text-sm font-medium text-main-cream  bg-main-blue px-3 py-2 rounded ">
            {data?.nik}
          </p>
        </div>
        <div>
          <h1 className="font-medium text-second-blue">No Telepon siswa</h1>
          <p className="w-full text-sm font-medium text-main-cream  bg-main-blue px-3 py-2 rounded ">
            {data?.no_telepon_siswa}
          </p>
        </div>
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
        <div>
          <h1 className="font-medium text-second-blue">Nama Ortu</h1>
          <p className="w-full text-sm font-medium text-main-cream  bg-main-blue px-3 py-2 rounded ">
            {data?.nama_ortu}
          </p>
        </div>
        <div>
          <h1 className="font-medium text-second-blue">No Telepon Ortu</h1>
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
        <div>
          <h1 className="font-medium text-second-blue">Status siswa</h1>
          <p className="w-full text-sm font-medium text-main-cream  bg-main-blue px-3 py-2 rounded ">
            {data?.status_siswa == 4 ? 'Dropout' : ''}
          </p>
        </div>
        <div>
          <h1 className="font-medium text-second-blue">Username</h1>
          <p className="w-full text-sm font-medium text-main-cream  bg-main-blue px-3 py-2 rounded ">
            {data?.username}
          </p>
        </div>
      </div>
    </div>
  );
};

export default FormDetailSiswaDropout;
