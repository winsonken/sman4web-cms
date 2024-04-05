import React, { useState } from 'react';
import LoadingTable from '../Loading/LoadingTable';
import Pagination from '../Pagination';
import ButtonAction from '../ButtonAction';
import ButtonDetail from '../ButtonDetail';
import ButtonEdit from '../ButtonEdit';
import ButtonDelete from '../ButtonDelete';

const TableDetailRapot = (props) => {
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
    isOpenPopUpTinggal,
    setIsOpenPopUpTinggal,
    isOpenPopUpGanjilAwal,
    setIsOpenPopUpGanjilAwal,
    isOpenPopUpGanjilAkhir,
    setIsOpenPopUpGanjilAkhir,
    isOpenPopUpGenapAwal,
    setIsOpenPopUpGenapAwal,
    isOpenPopUpDetail,
    setIsOpenPopUpDetail,
    isOpenPopUpEdit,
    setIsOpenPopUpEdit,
    isOpenPopUpDelete,
    setIsOpenPopUpDelete,
    isOpenPopUpUpload,
    setIsOpenPopUpUpload,
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
                Nama siswa
              </th>
              <th scope="col" className="px-6 py-4">
                Wali Kelas
              </th>
              <th scope="col" className="px-6 py-4">
                {' '}
                Status
              </th>
              <th scope="col" className="px-6 py-4">

              </th>
              <th scope="col" className="px-6 py-4">
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
              <td className="px-6 py-1">Jonathan</td>
              <td className=" gap-2 px-6 py-1">Wali Kelas</td>
              <td className=" gap-2 px-6 py-1">-</td>
              <td className=" flex flex-row gap-2 px-6 py-1">
                <ButtonAction
                  title="Naik Kelas"
                  isOpenPopUp={isOpenPopUpLulus}
                  setIsOpenPopUp={setIsOpenPopUpLulus}
                />
                <ButtonAction
                  title="Tinggal Kelas"
                  isOpenPopUp={isOpenPopUpTinggal}
                  setIsOpenPopUp={setIsOpenPopUpTinggal}
                />
              </td>
              <td className="gap-2 px-6 py-1">
                <ButtonDelete
                  isOpenPopUpDelete={isOpenPopUpDelete}
                  setIsOpenPopUpDelete={setIsOpenPopUpDelete}
                />
              </td>
            </tr>

            <tr className="bg-second-orange border-b">
              <th
                scope="row"
                className="px-6 py-1 font-medium text-gray-900 whitespace-nowrap"></th>
              <td className="px-6 py-1"></td>
              <td className=" gap-2 px-6 py-1"></td>
              <td className=" gap-2 px-6 py-1"></td>
              <td className=" flex flex-row px-6 py-1">
                <ButtonAction
                  title="Upload rapot ganjil awal"
                  isOpenPopUp={isOpenPopUpGanjilAwal}
                  setIsOpenPopUp={setIsOpenPopUpGanjilAwal}
                />
              </td>
              <td className="gap-2 px-6 py-1"></td>
            </tr>

            <tr className="bg-second-orange border-b">
              <th
                scope="row"
                className="px-6 py-1 font-medium text-gray-900 whitespace-nowrap"></th>
              <td className="px-6 py-1"></td>
              <td className=" gap-2 px-6 py-1"></td>
              <td className=" gap-2 px-6 py-1"></td>
              <td className=" flex flex-row px-6 py-1">
                <ButtonAction
                  title="Upload rapot ganjil akhir"
                  isOpenPopUp={isOpenPopUpGanjilAkhir}
                  setIsOpenPopUp={setIsOpenPopUpGanjilAkhir}
                />
              </td>
              <td className="gap-2 px-6 py-1"></td>
            </tr>

            <tr className="bg-second-orange border-b">
              <th
                scope="row"
                className="px-6 py-1 font-medium text-gray-900 whitespace-nowrap"></th>
              <td className="px-6 py-1"></td>
              <td className=" gap-2 px-6 py-1"></td>
              <td className=" gap-2 px-6 py-1"></td>
              <td className=" flex flex-row px-6 py-1">
                <ButtonAction
                  title="Upload rapot genap awal"
                  isOpenPopUp={isOpenPopUpGenapAwal}
                  setIsOpenPopUp={setIsOpenPopUpGenapAwal}
                />
              </td>
              <td className="gap-2 px-6 py-1"></td>
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

export default TableDetailRapot;
