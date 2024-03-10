import React, { useState } from 'react';
import Layout from '../components/Layout';
import ButtonAdd from '../components/ButtonAdd';
import PopUpAdd from '../components/PopUpAdd';
import PopUpEdit from '../components/PopUpEdit';
import PopUpDelete from '../components/PopUpDelete';
import SelectFilter from '../components/SelectFilter';
import { MdStairs } from 'react-icons/md';
import { RiDoorOpenFill } from 'react-icons/ri';
import FormAddAngkatan from '../components/angkatan/FormAddAngkatan';
import FormEditAngkatan from '../components/angkatan/FormEditAngkatan';
import SearchFilter from '../components/SearchFilter';
import ButtonEdit from '../components/ButtonEdit';
import ButtonDelete from '../components/ButtonDelete';
import Button from '../components/Button';
import ButtonAction from '../components/ButtonAction';
import PopUpAction from '../components/PopUpAction';
import ButtonDetail from '../components/ButtonDetail';
import PopUpDetail from '../components/PopUpDetail';
import LoadingTable from '../components/Loading/LoadingTable';
import Pagination from '../components/Pagination';

const Angkatan = () => {
  const [isOpenPopUpAdd, setIsOpenPopUpAdd] = useState(false);
  const [isOpenPopUpEdit, setIsOpenPopUpEdit] = useState(false);
  const [isOpenPopUpDelete, setIsOpenPopUpDelete] = useState(false);
  const [isOpenPopUpDetail, setIsOpenPopUpDetail] = useState(false);
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
          <h1 className="text-xl font-semibold md:text-2xl">Angkatan</h1>
        </div>

        <div className="flex flex-col sm:flex-row sm:justify-between gap-3">
          <ButtonAdd
            title="Tambah angkatan"
            isOpenPopUpAdd={isOpenPopUpAdd}
            setIsOpenPopUpAdd={setIsOpenPopUpAdd}
          />

          <div className="flex flex-col gap-3 sm:w-1/2 sm:flex-row 2xl:w-1/3  ">
            <div className="sm:w-1/2">
              <SelectFilter placeholder="Select angkatan" />
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
                    Angkatan
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Tahun
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Jumlah siswa
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Siswa lulus
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
                  <td className="px-6 py-2">10</td>
                  <td className="px-6 py-2">2020</td>
                  <td className="px-6 py-2">300</td>
                  <td className="px-6 py-2">Lulus</td>
                  <td className="px-6 py-2">300</td>
                  <td className="flex flex-row justify-center items-center gap-2 px-6 py-2">
                    <ButtonAction
                      title="Mulai"
                      isOpenPopUp={isOpenPopUpMulai}
                      setIsOpenPopUp={setIsOpenPopUpMulai}
                    />

                    <ButtonAction
                      title="Lulus"
                      isOpenPopUp={isOpenPopUpLulus}
                      setIsOpenPopUp={setIsOpenPopUpLulus}
                    />

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

        <PopUpAdd
          title="Tambah angkatan"
          icon={<MdStairs />}
          isOpenPopUpAdd={isOpenPopUpAdd}
          setIsOpenPopUpAdd={setIsOpenPopUpAdd}
        >
          <FormAddAngkatan setIsOpenPopUpAdd={setIsOpenPopUpAdd} />
        </PopUpAdd>

        <PopUpEdit
          title="Ubah angkatan"
          icon={<MdStairs />}
          isOpenPopUpEdit={isOpenPopUpEdit}
          setIsOpenPopUpEdit={setIsOpenPopUpEdit}
        >
          <FormEditAngkatan setIsOpenPopUpEdit={setIsOpenPopUpEdit} />
        </PopUpEdit>

        <PopUpDelete
          title="Hapus angkatan"
          icon={<MdStairs />}
          isOpenPopUpDelete={isOpenPopUpDelete}
          setIsOpenPopUpDelete={setIsOpenPopUpDelete}
        >
          <div className="flex flex-col gap-3">
            <h1>Apakah anda yakin menghapus data angkatan ini?</h1>

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
          title="Detail angkatan"
          icon={<MdStairs />}
          isOpenPopUpDetail={isOpenPopUpDetail}
          setIsOpenPopUpDetail={setIsOpenPopUpDetail}
        >
          <div>Bagian ini ganti jadi file contoh: DetailAngkatan.jsx</div>
        </PopUpDetail>

        <PopUpAction
          title="Luluskan angkatan"
          icon={<MdStairs />}
          isOpenPopUp={isOpenPopUpLulus}
          setIsOpenPopUp={setIsOpenPopUpLulus}
        >
          <div className="flex flex-col gap-3">
            <h1>Apakah anda yakin meluluskan angkatan ini?</h1>

            <div className="flex justify-end gap-2">
              <Button
                title="Batal"
                type="cancel"
                setIsOpenPopUp={setIsOpenPopUpLulus}
              />
              <Button title="Simpan" type="submit" />
            </div>
          </div>
        </PopUpAction>

        <PopUpAction
          title="Mulai angkatan"
          icon={<MdStairs />}
          isOpenPopUp={isOpenPopUpMulai}
          setIsOpenPopUp={setIsOpenPopUpMulai}
        >
          <div className="flex flex-col gap-3">
            <h1>Apakah anda yakin memulai pembelajaran angkatan ini?</h1>

            <div className="flex justify-end gap-2">
              <Button
                title="Batal"
                type="cancel"
                setIsOpenPopUp={setIsOpenPopUpMulai}
              />
              <Button title="Simpan" type="submit" />
            </div>
          </div>
        </PopUpAction>
      </div>
    </Layout>
  );
};

export default Angkatan;
