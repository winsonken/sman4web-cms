import React, { useState } from 'react';
import LoadingTable from '../Loading/LoadingTable';
import Pagination from '../Pagination';
import ButtonAction from '../ButtonAction';
import ButtonDetail from '../ButtonDetail';
import ButtonEdit from '../ButtonEdit';
import ButtonDelete from '../ButtonDelete';

const TablePrestasi = (props) => {
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

          <tr className="bg-second-orange border-b">
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

  );
};

export default TablePrestasi;
