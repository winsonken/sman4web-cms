import React from 'react';
import Button from '../Button';

const DetailPpdb = (props) => {
  const { setIsOpenPopUpAdd } = props;
  return (
    <div className="grid gap-5 max-w-xl h-fit max-h-[80%] p-3 rounded-md xl:max-w-2xl duration-200 overflow-y-auto ${className}">
      <div className=" ">
        <h1>
          <img src="./public/Suki.jpeg" alt="Siswa" />
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
          <h1 className="font-medium text-second-blue">NIPD</h1>
          <p className="w-full text-sm font-medium text-main-cream  bg-main-blue px-3 py-2 rounded ">
            90.100.600
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
          <h1 className="font-medium text-second-blue">Status PPDB</h1>
          <p className="w-full text-sm font-medium text-main-cream  bg-main-blue px-3 py-2 rounded ">
            Aktif
          </p>
        </div>
        <div>
          <h1 className="font-medium text-second-blue">Alamat</h1>
          <p className="w-full text-sm font-medium text-main-cream  bg-main-blue px-3 py-2 rounded ">
            Kintamani Blok B
          </p>
        </div>
        <div>
          <h1 className="font-medium text-second-blue">Angkatan</h1>
          <p className="w-full text-sm font-medium text-main-cream  bg-main-blue px-3 py-2 rounded ">
            Angkatan ke-24
          </p>
        </div>
        <div>
          <h1 className="font-medium text-second-blue">No Telp PPDB</h1>
          <p className="w-full text-sm font-medium text-main-cream  bg-main-blue px-3 py-2 rounded ">
            085678971654
          </p>
        </div>
        <div>
          <h1 className="font-medium text-second-blue">Nama Ortu</h1>
          <p className="w-full text-sm font-medium text-main-cream  bg-main-blue px-3 py-2 rounded ">
            Jaka Prataka
          </p>
        </div>
        <div>
          <h1 className="font-medium text-second-blue">No Telp Ortu</h1>
          <p className="w-full text-sm font-medium text-main-cream  bg-main-blue px-3 py-2 rounded ">
            087654367281
          </p>
        </div>
      </div>
      <div className="flex justify-end gap-2">
        <Button
          title="Batal"
          type="cancel"
          setIsOpenPopUp={setIsOpenPopUpAdd}
        />
        <Button title="Simpan" type="submit" />
      </div>
    </div>
  );
};

export default DetailPpdb;
