import React from 'react';

const FormDetailGuru = (props) => {
  const { data } = props;

  return (
    <div className="">
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
        <div>
          <h1 className="font-medium text-second-blue">NIK</h1>
          <p className="w-full text-sm font-medium text-main-cream  bg-main-blue px-3 py-2 rounded ">
            {data?.nik}
          </p>
        </div>
        <div>
          <h1 className="font-medium text-second-blue">Jenis PTK</h1>
          <p className="w-full text-sm font-medium text-main-cream  bg-main-blue px-3 py-2 rounded ">
            {data?.jenis_ptk}
          </p>
        </div>
        <div>
          <h1 className="font-medium text-second-blue">NIP/NRPTK/NIG</h1>
          <p className="w-full text-sm font-medium text-main-cream  bg-main-blue px-3 py-2 rounded ">
            {data?.no_guru}
          </p>
        </div>
        <div>
          <h1 className="font-medium text-second-blue">No Telepon guru</h1>
          <p className="w-full text-sm font-medium text-main-cream  bg-main-blue px-3 py-2 rounded ">
            {data?.no_telepon_guru}
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
          <h1 className="font-medium text-second-blue">Status kawin</h1>
          <p className="w-full text-sm font-medium text-main-cream  bg-main-blue px-3 py-2 rounded ">
            {data?.status_kawin}
          </p>
        </div>
        <div>
          <h1 className="font-medium text-second-blue">Status kepegawaian</h1>
          <p className="w-full text-sm font-medium text-main-cream  bg-main-blue px-3 py-2 rounded ">
            {data?.status_kepegawaian}
          </p>
        </div>
        <div>
          <h1 className="font-medium text-second-blue">Status guru</h1>
          <p className="w-full text-sm font-medium text-main-cream  bg-main-blue px-3 py-2 rounded ">
            {data?.status_guru == 1 ? 'Aktif' : ''}
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

export default FormDetailGuru;
