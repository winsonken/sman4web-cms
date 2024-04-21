import React, { useState } from 'react';
import LoadingTable from '../Loading/LoadingTable';
import Pagination from '../Pagination';
import ButtonAction from '../ButtonAction';
import ButtonDetail from '../ButtonDetail';
import ButtonEdit from '../ButtonEdit';
import ButtonDelete from '../ButtonDelete';
import ButtonDetailKelas from '../ButtonDetailKelas';
import ButtonPage from '../ButtonPage';
import { Link } from 'react-router-dom';
import { IoEyeSharp } from 'react-icons/io5';
import Error from '../Error';

const TableKelas = (props) => {
  const {
    data,
    isLoading,
    isSuccess,
    isError,
    error,
    modules,
    isOpenPopUpEdit,
    setIsOpenPopUpEdit,
    isOpenPopUpDelete,
    setIsOpenPopUpDelete,
    isOpenPopUpMulaiKelas,
    setIsOpenPopUpMulaiKelas,
    isOpenPopUpAkhiriKelas,
    setIsOpenPopUpAkhiriKelas,
    setGetData,
    currentPage,
    setCurrentPage,
    limitPerPage,
  } = props;

  const kelasData = data?.data;
  const pagination = data?.pagination;

  const totalPage = pagination?.total_page;
  const totalRecord = pagination?.total_record;

  return (
    <div className="flex flex-col gap-3">
      {isError ? (
        <Error error={error} />
      ) : isLoading ? (
        <LoadingTable />
      ) : isSuccess ? (
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
                <th scope="col" className="px-6 py-4">
                  Status
                </th>
                {modules?.ubah && (
                  <th scope="col" className="px-6 py-4">
                    Status kelas
                  </th>
                )}
                <th scope="col" className="text-center px-6 py-4">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody>
              {kelasData.length > 0 ? (
                kelasData.map((allKelasData, index) => (
                  <tr
                    key={allKelasData?.id_kelas}
                    className="bg-second-orange border-b"
                  >
                    <th
                      scope="row"
                      className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap"
                    >
                      {index + 1}
                    </th>
                    <td className="px-6 py-2">{allKelasData?.kelas}</td>
                    <td className="px-6 py-2">{allKelasData?.nama_kelas}</td>
                    <td className="px-6 py-2">{allKelasData?.walikelas}</td>
                    <td className="px-6 py-2">{allKelasData?.no_angkatan}</td>
                    <td className="px-6 py-2">
                      {allKelasData?.tahun_mulai_ajaran}-
                      {allKelasData?.tahun_akhir_ajaran}
                    </td>
                    <td className="px-6 py-2">
                      {allKelasData?.status_kelas == 0
                        ? 'Baru'
                        : allKelasData?.status_kelas == 1
                        ? 'Aktif'
                        : allKelasData?.status_kelas == 2
                        ? 'Berakhir'
                        : ''}
                    </td>
                    {modules?.ubah && (
                      <td className="px-6 py-2">
                        <div className="flex gap-2">
                          {allKelasData?.status_kelas == 0 && (
                            <ButtonAction
                              title="Mulai"
                              data={allKelasData}
                              isOpenPopUp={isOpenPopUpMulaiKelas}
                              setIsOpenPopUp={setIsOpenPopUpMulaiKelas}
                              setGetData={setGetData}
                            />
                          )}

                          {allKelasData?.status_kelas == 1 && (
                            <ButtonAction
                              title="Akhiri"
                              data={allKelasData}
                              isOpenPopUp={isOpenPopUpAkhiriKelas}
                              setIsOpenPopUp={setIsOpenPopUpAkhiriKelas}
                              setGetData={setGetData}
                            />
                          )}
                        </div>
                      </td>
                    )}
                    <td className="px-6 py-2">
                      <div className="flex flex-row justify-center items-center gap-2">
                        <Link to="/kelas/detail" state={allKelasData}>
                          <div className="w-fit h-fit text-2xl text-black bg-white px-1.5 py-1 flex justify-center items-center rounded-md cursor-pointer">
                            <IoEyeSharp />
                          </div>
                        </Link>

                        {modules?.ubah && (
                          <ButtonEdit
                            data={allKelasData}
                            isOpenPopUpEdit={isOpenPopUpEdit}
                            setIsOpenPopUpEdit={setIsOpenPopUpEdit}
                            setGetData={setGetData}
                          />
                        )}

                        {modules?.hapus && (
                          <ButtonDelete
                            data={allKelasData}
                            isOpenPopUpDelete={isOpenPopUpDelete}
                            setIsOpenPopUpDelete={setIsOpenPopUpDelete}
                            setGetData={setGetData}
                          />
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="9"
                    className="px-6 py-3 whitespace-no-wrap bg-second-orange"
                  >
                    <div className="text-sm  text-gray-500 text-center">
                      Data tidak ditemukan
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      ) : null}

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

export default TableKelas;
