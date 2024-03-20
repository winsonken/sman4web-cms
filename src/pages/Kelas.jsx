import React, { useState } from 'react';

import { RiDoorOpenFill } from 'react-icons/ri';

import Layout from '../components/Layout';
import ButtonAdd from '../components/ButtonAdd';
import SelectFilter from '../components/SelectFilter';
import SearchFilter from '../components/SearchFilter';
import ButtonDetail from '../components/ButtonDetail';
import PopUpDetail from '../components/PopUpDetail';
import PopUpAdd from '../components/PopUpAdd';
import Pagination from '../components/Pagination';


import FormAddSiswa from '../components/siswa/FormAddSiswa';
import FormAddKelas from '../components/kelas/FormAddKelas';

const Kelas = () => {
  const [isOpenPopUpAdd, setIsOpenPopUpAdd] = useState(false);
  const [isOpenPopUpDetail, setIsOpenPopUpDetail] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPage = 8;
  const totalRecord = 16;
  const limitPerPage = 10;

  return (
    <Layout>
      <div className="flex flex-col gap-5">
        <div>
          <h1 className="text-xl font-semibold md:text-2xl">Data Kelas</h1>
        </div>

        <div className="flex flex-col sm:flex-row sm:justify-between gap-3">
          <ButtonAdd
            title="Tambah kelas"
            isOpenPopUpAdd={isOpenPopUpAdd}
            setIsOpenPopUpAdd={setIsOpenPopUpAdd}
          />

          <div className="flex flex-col gap-3 sm:w-1/2 sm:flex-row 2xl:w-1/3  ">
            <div className="sm:w-1/2">
              <SelectFilter placeholder="Pilih angkatan" />
            </div>
            <div className="sm:w-1/2">
              <SearchFilter />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <div className="table-scroll relative overflow-x-auto rounded-t-lg">
            <table className="w-full text-sm text-left rtl:text-right text-black">
              <thead className="text-xs text-gray-700 uppercase bg-main-orange">
                <tr>
                  <th scope="col" className="px-6 py-4">
                    No
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Kelas
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Nama kelas
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Wali kelas
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Angakatan
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Tahun ajaran
                  </th>
                  <th scope="col" className="text-center px-6 py-4">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-second-orange border-b">
                  <th
                    scope="row"
                    className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap"
                  >
                    1
                  </th>
                  <td className="px-6 py-2">X</td>
                  <td className="px-6 py-2">XA</td>
                  <td className="px-6 py-2">Wali kelas</td>
                  <td className="px-6 py-2">1</td>
                  <td className="px-6 py-2">2023/2024</td>
                  <td className="flex flex-row justify-center items-center gap-2 px-6 py-2">

                    <ButtonDetail
                      isOpenPopUpDetail={isOpenPopUpDetail}
                      setIsOpenPopUpDetail={setIsOpenPopUpDetail}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPage={totalPage}
            totalRecord={totalRecord}
            limitPerPage={limitPerPage}
          />
        </div>

        <PopUpAdd
          title="Tambah kelas"
          icon={<RiDoorOpenFill />}
          isOpenPopUpAdd={isOpenPopUpAdd}
          setIsOpenPopUpAdd={setIsOpenPopUpAdd}
        >
          <FormAddKelas setIsOpenPopUpAdd={setIsOpenPopUpAdd} />
        </PopUpAdd>

        <PopUpDetail
          title="Detail Kelas"
          icon={<RiDoorOpenFill />}
          isOpenPopUpDetail={isOpenPopUpDetail}
          setIsOpenPopUpDetail={setIsOpenPopUpDetail}
        >
          <div>Bagian ini ganti jadi file contoh: DetailAngkatan.jsx</div>
        </PopUpDetail>
      </div>
    </Layout>
  );
};

export default Kelas;
