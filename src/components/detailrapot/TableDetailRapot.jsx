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
                Jenis Rapot
              </th>
              <th scope="col" className="px-6 py-4">
                Rapot
              </th>
              <th scope="col" className="px-6 py-4">
                {' '}
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
                className="px-6 py-1 font-medium text-gray-900 whitespace-nowrap"
              >
                1
              </th>
              <td className="px-6 py-1">Rapot Ganjil Awal</td>
              <td className=" gap-2 px-6 py-1">
                <ButtonAction
                  title="Maria Zhang-11-ganjil-awal.pdf"
                  isOpenPopUp={isOpenPopUpMulai}
                  setIsOpenPopUp={setIsOpenPopUpMulai}
                />
              </td>
              <td className=" gap-2 px-6 py-1">
                <ButtonAction
                  title="Sudah Upload"
                  isOpenPopUp={isOpenPopUpMulai}
                  setIsOpenPopUp={setIsOpenPopUpMulai}
                />
              </td>
              <td className="flex flex-row justify-center items-center gap-2 px-6 py-1">
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
                className="px-6 py-1 font-medium text-gray-900 whitespace-nowrap"
              >
                2
              </th>
              <td className="px-6 py-1">Rapot Ganjil Akhir</td>
              <td className=" gap-2 px-6 py-1">
                <ButtonAction
                  title="Maria Zhang-11-ganjil-akhir.pdf"
                  isOpenPopUp={isOpenPopUpMulai}
                  setIsOpenPopUp={setIsOpenPopUpMulai}
                />
              </td>
              <td className=" gap-2 px-6 py-1">
                <ButtonAction
                  title="Sudah Upload"
                  isOpenPopUp={isOpenPopUpMulai}
                  setIsOpenPopUp={setIsOpenPopUpMulai}
                />
              </td>
              <td className="flex flex-row justify-center items-center gap-2 px-6 py-1">
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
                className="px-6 py-1 font-medium text-gray-900 whitespace-nowrap"
              >
                3
              </th>
              <td className="px-6 py-1">Rapot Genap Awal</td>
              <td className=" gap-2 px-6 py-1">
                <ButtonAction
                  title="Maria Zhang-11-genap-awal.pdf"
                  isOpenPopUp={isOpenPopUpMulai}
                  setIsOpenPopUp={setIsOpenPopUpMulai}
                />
              </td>
              <td className=" gap-2 px-6 py-1">
                <ButtonAction
                  title="Sudah Upload"
                  isOpenPopUp={isOpenPopUpMulai}
                  setIsOpenPopUp={setIsOpenPopUpMulai}
                />
              </td>
              <td className="flex flex-row justify-center items-center gap-2 px-6 py-1">
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
                className="px-6 py-1 font-medium text-gray-900 whitespace-nowrap"
              >
                4
              </th>
              <td className="px-6 py-1">Rapot Genap Akhir</td>
              <td className="px-6 py-1">Belum Diupload</td>
              <td className="gap-2 px-6 py-1">
                <ButtonAction
                  title="Upload "
                  isOpenPopUp={isOpenPopUpUpload}
                  setIsOpenPopUp={setIsOpenPopUpUpload}
                />
              </td>

              <td className="flex flex-row justify-center items-center gap-2 px-6 py-1">
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

export default TableDetailRapot;
