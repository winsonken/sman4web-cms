import React from 'react';
import { Layout } from '../components';

<<<<<<< HEAD
import { FaUserGraduate } from 'react-icons/fa';

import Layout from '../components/Layout';
import PopUpEdit from '../components/PopUpEdit';
import PopUpDelete from '../components/PopUpDelete';
import SearchFilter from '../components/SearchFilter';
import ButtonEdit from '../components/ButtonEdit';
import ButtonDelete from '../components/ButtonDelete';
import Button from '../components/Button';
import ButtonDetail from '../components/ButtonDetail';
import PopUpDetail from '../components/PopUpDetail';
import Pagination from '../components/Pagination';

import FormEditAlumni from '../components/alumni/FormEditAlumni';

const Alumni = () => {
  const [isOpenPopUpEdit, setIsOpenPopUpEdit] = useState(false);
  const [isOpenPopUpDelete, setIsOpenPopUpDelete] = useState(false);
  const [isOpenPopUpDetail, setIsOpenPopUpDetail] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPage = 8;
  const totalRecord = 16;
  const limitPerPage = 10;

=======
const Alumni = () => {
>>>>>>> 4a0c93871762ab55fff11f5d202fc3783a110be0
  return (
    <Layout>
      <div className="flex flex-col">
        <div>
          <h1 className="text-xl font-semibold md:text-2xl">Alumni</h1>
        </div>

        <div></div>
<<<<<<< HEAD
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
                    Foto
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Nama Siswa
                  </th>
                  <th scope="col" className="px-6 py-4">
                    NIPD
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
                  <td className="px-6 py-2">-</td>
                  <td className="px-6 py-2">Jonathan Wijaya</td>
                  <td className="px-6 py-2">123456</td>
                  <td className="px-6 py-2">Aktif</td>
                  <td className="flex flex-row justify-center items-center gap-2 px-6 py-2">

                    <ButtonDetail
                      isOpenPopUpDetail={isOpenPopUpDetail}
                      setIsOpenPopUpDetail={setIsOpenPopUpDetail}
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
                  >
                    2
                  </th>
                  <td className="px-6 py-2">-</td>
                  <td className="px-6 py-2">Winson Kennedy</td>
                  <td className="px-6 py-2">123456</td>
                  <td className="px-6 py-2">Aktif</td>
                  <td className="flex flex-row justify-center items-center gap-2 px-6 py-2">

                    <ButtonDetail
                      isOpenPopUpDetail={isOpenPopUpDetail}
                      setIsOpenPopUpDetail={setIsOpenPopUpDetail}
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

                <tr className="bg-second-orange border-b">
                  <th
                    scope="row"
                    className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap"
                  >
                    3
                  </th>
                  <td className="px-6 py-2">-</td>
                  <td className="px-6 py-2">Vincentius junior Samudra</td>
                  <td className="px-6 py-2">123456</td>
                  <td className="px-6 py-2">Aktif</td>
                  <td className="flex flex-row justify-center items-center gap-2 px-6 py-2">

                    <ButtonDetail
                      isOpenPopUpDetail={isOpenPopUpDetail}
                      setIsOpenPopUpDetail={setIsOpenPopUpDetail}
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

        <PopUpEdit
          title="Ubah Alumni"
          icon={<FaUserGraduate />}
          isOpenPopUpEdit={isOpenPopUpEdit}
          setIsOpenPopUpEdit={setIsOpenPopUpEdit}
        >
          <FormEditAlumni setIsOpenPopUpEdit={setIsOpenPopUpEdit} />
        </PopUpEdit>

        <PopUpDelete
          title="Hapus alumni"
          icon={<FaUserGraduate />}
          isOpenPopUpDelete={isOpenPopUpDelete}
          setIsOpenPopUpDelete={setIsOpenPopUpDelete}
        >
          <div className="flex flex-col gap-3">
            <h1>Apakah anda yakin menghapus (nama-alumni)?</h1>

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

        <PopUpDetail
          title="Detail Alumni"
          icon={<FaUserGraduate />}
          isOpenPopUpDetail={isOpenPopUpDetail}
          setIsOpenPopUpDetail={setIsOpenPopUpDetail}
        >
          <div>Bagian ini ganti jadi file contoh: DetailAngkatan.jsx</div>
        </PopUpDetail>
=======
>>>>>>> 4a0c93871762ab55fff11f5d202fc3783a110be0
      </div>
    </Layout>
  );
};

export default Alumni;
