import React, { useState } from 'react';

import { FaCalendar } from 'react-icons/fa'; 


import Layout from '../components/Layout';
import ButtonAdd from '../components/ButtonAdd';
import PopUpAdd from '../components/PopUpAdd';
import PopUpEdit from '../components/PopUpEdit';
import PopUpDelete from '../components/PopUpDelete';
import SearchFilter from '../components/SearchFilter';
import ButtonEdit from '../components/ButtonEdit';
import ButtonDelete from '../components/ButtonDelete';
import Button from '../components/Button';
import ButtonAction from '../components/ButtonAction';
import Pagination from '../components/Pagination';

import FormAddTahunajaran from '../components/tahunajaran/FormAddTahunajaran';
import FormEditTahunajaran from '../components/tahunajaran/FormEditTahunajaran';

const Tahunajaran = () => {
  const [isOpenPopUpAdd, setIsOpenPopUpAdd] = useState(false);
  const [isOpenPopUpEdit, setIsOpenPopUpEdit] = useState(false);
  const [isOpenPopUpDelete, setIsOpenPopUpDelete] = useState(false);
  const [isOpenPopUpMulai, setIsOpenPopUpMulai] = useState(false);
  const [isOpenPopUpLulus, setIsOpenPopUpLulus] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPage = 8;
  const totalRecord = 16;
  const limitPerPage = 10;

  return (
    <Layout>
      <div className="flex flex-col gap-5">
        <div>
          <h1 className="text-xl font-semibold md:text-2xl">Tahun Ajaran</h1>
        </div>

        <div className="flex flex-col sm:flex-row sm:justify-between gap-3">
          <ButtonAdd
            title="Tambah tahun ajaran"
            isOpenPopUpAdd={isOpenPopUpAdd}
            setIsOpenPopUpAdd={setIsOpenPopUpAdd}
          />

          <div className="flex flex-reverse">
            <div className="sm:w-48">
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
                    Tahun Ajaran
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Periode ganjil
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Periode Genap
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Status
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
                  <td className="px-6 py-2">2022-2023</td>
                  <td className="px-6 py-2">19/07/22 - 13/12/22</td>
                  <td className="px-6 py-2">05/01/23 - 15/06/23</td>
                  <td className="px-6 py-2">Lulus</td>
                  <td className="flex flex-row justify-center items-center gap-2 px-6 py-2">

                    <ButtonAction
                      title="Lulus"
                      isOpenPopUp={isOpenPopUpLulus}
                      setIsOpenPopUp={setIsOpenPopUpLulus}
                    />

                    <ButtonEdit
                      isOpenPopUpEdit={isOpenPopUpEdit}
                      setIsOpenPopUpEdit={setIsOpenPopUpEdit}
                    />

                    <ButtonDelete
                      isOpenPopUpDelete={isOpenPopUpDelete}
                      setIsOpenPopUpDelete={setIsOpenPopUpDelete}
                    />
                  </td>
                </tr>

                <tr className="bg-green-100 border-b">
                  <th
                    scope="row"
                    className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap"
                  > 2
                  </th>
                  <td className="px-6 py-2">2023-2024</td>
                  <td className="px-6 py-2">19/07/22 - 13/12/22</td>
                  <td className="px-6 py-2">05/01/24 - 15/06/24</td>
                  <td className="px-6 py-2">Belum dimulai</td>
                  <td className="flex flex-row justify-center items-center gap-2 px-6 py-2">

                    <ButtonAction
                      title="Mulai"
                      isOpenPopUp={isOpenPopUpMulai}
                      setIsOpenPopUp={setIsOpenPopUpMulai}
                    />

                    <ButtonEdit
                      isOpenPopUpEdit={isOpenPopUpEdit}
                      setIsOpenPopUpEdit={setIsOpenPopUpEdit}
                    />

                    <ButtonDelete
                      isOpenPopUpDelete={isOpenPopUpDelete}
                      setIsOpenPopUpDelete={setIsOpenPopUpDelete}
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

        {/* Table kedua */}
        <div>
          <h1 className="mt-8 text-xl font-semibold md:text-2xl">Tahun Ajaran Berakhir</h1>
        </div>


        <div className="flex flex-col sm:flex-row sm:justify-between gap-3">
        <div></div>
          <div className="flex flex-reverse">
            <div className="sm:w-48">
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
                    Tahun Ajaran
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Periode ganjil
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Periode Genap
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Status
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
                  <td className="px-6 py-2">2022-2023</td>
                  <td className="px-6 py-2">19/07/22 - 13/12/22</td>
                  <td className="px-6 py-2">05/01/23 - 15/06/23</td>
                  <td className="px-6 py-2">Berakhir</td>
                  <td className="flex flex-row justify-center items-center gap-2 px-6 py-2">

                    <ButtonEdit
                      isOpenPopUpEdit={isOpenPopUpEdit}
                      setIsOpenPopUpEdit={setIsOpenPopUpEdit}
                    />

                    <ButtonDelete
                      isOpenPopUpDelete={isOpenPopUpDelete}
                      setIsOpenPopUpDelete={setIsOpenPopUpDelete}
                    />
                  </td>
                </tr>

                <tr className="bg-green-100 border-b">
                  <th
                    scope="row"
                    className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap"
                  > 2
                  </th>
                  <td className="px-6 py-2">2023-2024</td>
                  <td className="px-6 py-2">19/07/22 - 13/12/22</td>
                  <td className="px-6 py-2">05/01/24 - 15/06/24</td>
                  <td className="px-6 py-2">Berakhir</td>
                  <td className="flex flex-row justify-center items-center gap-2 px-6 py-2">

                    <ButtonEdit
                      isOpenPopUpEdit={isOpenPopUpEdit}
                      setIsOpenPopUpEdit={setIsOpenPopUpEdit}
                    />

                    <ButtonDelete
                      isOpenPopUpDelete={isOpenPopUpDelete}
                      setIsOpenPopUpDelete={setIsOpenPopUpDelete}
                    />
                  </td>
                </tr>
                <tr className="bg-second-orange border-b">
                  <th
                    scope="row"
                    className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap"
                  >
                    3
                  </th>
                  <td className="px-6 py-2">2022-2023</td>
                  <td className="px-6 py-2">19/07/22 - 13/12/22</td>
                  <td className="px-6 py-2">05/01/23 - 15/06/23</td>
                  <td className="px-6 py-2">Berakhir</td>
                  <td className="flex flex-row justify-center items-center gap-2 px-6 py-2">

                    <ButtonEdit
                      isOpenPopUpEdit={isOpenPopUpEdit}
                      setIsOpenPopUpEdit={setIsOpenPopUpEdit}
                    />

                    <ButtonDelete
                      isOpenPopUpDelete={isOpenPopUpDelete}
                      setIsOpenPopUpDelete={setIsOpenPopUpDelete}
                    />
                  </td>
                </tr>

                <tr className="bg-green-100 border-b">
                  <th
                    scope="row"
                    className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap"
                  > 4
                  </th>
                  <td className="px-6 py-2">2023-2024</td>
                  <td className="px-6 py-2">19/07/22 - 13/12/22</td>
                  <td className="px-6 py-2">05/01/24 - 15/06/24</td>
                  <td className="px-6 py-2">Berakhir</td>
                  <td className="flex flex-row justify-center items-center gap-2 px-6 py-2">

                    <ButtonEdit
                      isOpenPopUpEdit={isOpenPopUpEdit}
                      setIsOpenPopUpEdit={setIsOpenPopUpEdit}
                    />

                    <ButtonDelete
                      isOpenPopUpDelete={isOpenPopUpDelete}
                      setIsOpenPopUpDelete={setIsOpenPopUpDelete}
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
          title="Tambah tahun ajaran"
          icon={<FaCalendar />}
          isOpenPopUpAdd={isOpenPopUpAdd}
          setIsOpenPopUpAdd={setIsOpenPopUpAdd}
        >
          <FormAddTahunajaran setIsOpenPopUpAdd={setIsOpenPopUpAdd}  />
        </PopUpAdd>

        <PopUpEdit
          title="Ubah Tahun ajaran"
          icon={<FaCalendar />}
          isOpenPopUpEdit={isOpenPopUpEdit}
          setIsOpenPopUpEdit={setIsOpenPopUpEdit}
        >
          <FormEditTahunajaran setIsOpenPopUpEdit={setIsOpenPopUpEdit} />
        </PopUpEdit>

        <PopUpDelete
          title="Hapus Tahun Ajaran"
          icon={<FaCalendar />}
          isOpenPopUpDelete={isOpenPopUpDelete}
          setIsOpenPopUpDelete={setIsOpenPopUpDelete}
        >
          <div className="flex flex-col gap-3">
            <h1>Apakah anda yakin menghapus Tahun ajaran 2022/2023?</h1>

            <div className="flex justify-end gap-2">
              <Button
                title="Batal"
                type="cancel"
                setIsOpenPopUp={setIsOpenPopUpDelete}
              />
              <Button title="Hapus" type="submit" />
            </div>
          </div>
        </PopUpDelete>

      </div>
    </Layout>
  );
};

export default Tahunajaran;
