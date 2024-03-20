import React, { useState } from 'react';
import LoadingTable from '../Loading/LoadingTable';
import Pagination from '../Pagination';
import ButtonAction from '../ButtonAction';
import ButtonDetail from '../ButtonDetail';
import ButtonEdit from '../ButtonEdit';
import ButtonDelete from '../ButtonDelete';

const TableAngkatan = (props) => {
  const {
    data,
    isLoading,
    isSuccess,
    isError,
    error,
    isOpenPopUpMulai,
    setIsOpenPopUpMulai,
    isOpenPopUpLulus,
    setIsOpenPopUpLulus,
    isOpenPopUpDetail,
    setIsOpenPopUpDetail,
    isOpenPopUpEdit,
    setIsOpenPopUpEdit,
    isOpenPopUpDelete,
    setIsOpenPopUpDelete,
  } = props;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPage = 5;
  const totalRecord = 30;
  const limitPerPage = 6;
  return (
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
                className="px-6 py-1 font-medium text-gray-900 whitespace-nowrap"
              >
                1
              </th>
              <td className="px-6 py-1">5</td>
              <td className="px-6 py-1">2005</td>
              <td className="px-6 py-1">300</td>
              <td className="px-6 py-1">Lulus</td>
              <td className="px-6 py-1">300</td>
              <td className="flex flex-row justify-center items-center gap-2 px-6 py-1">
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

            <tr>
              <td
                colSpan="7"
                class="px-6 py-3 whitespace-no-wrap bg-second-orange"
              >
                <div className="text-sm  text-gray-500 text-center">
                  Data tidak ditemukan
                </div>
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
  );
};

export default TableAngkatan;
