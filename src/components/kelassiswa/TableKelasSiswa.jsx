import React, { useState } from 'react';
import LoadingTable from '../Loading/LoadingTable';
import Pagination from '../Pagination';
import ButtonAction from '../ButtonAction';
import ButtonDetail from '../ButtonDetail';
import ButtonEdit from '../ButtonEdit';
import ButtonDelete from '../ButtonDelete';
import Error from '../Error';

const TableKelasSiswa = (props) => {
  const {
    data,
    isLoading,
    isSuccess,
    isError,
    error,
    currentPage,
    setCurrentPage,
    limitPerPage,
  } = props;

  const kelasSiswaData = data?.data;
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
                  Jurusan
                </th>
                <th scope="col" className="px-6 py-4">
                  No absen
                </th>
                <th scope="col" className="px-6 py-4">
                  Wali kelas
                </th>
                <th scope="col" className="px-6 py-4">
                  Tahun ajaran
                </th>
                <th scope="col" className="px-6 py-4">
                  Status
                </th>
              </tr>
            </thead>

            <tbody>
              {kelasSiswaData.length > 0 ? (
                kelasSiswaData.map((allKelasSiswaData, index) => (
                  <tr className="bg-second-orange border-b">
                    <th
                      scope="row"
                      className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap"
                    >
                      {index + 1}
                    </th>
                    <td className="px-6 py-2">{allKelasSiswaData?.no_kelas}</td>
                    <td className="px-6 py-2">
                      {allKelasSiswaData?.nama_kelas}
                    </td>
                    <td className="px-6 py-2">
                      {allKelasSiswaData?.nama_jurusan || '-'}
                    </td>
                    <td className="px-6 py-2">
                      {allKelasSiswaData?.no_absen || '-'}
                    </td>
                    <td className="px-6 py-2">
                      {allKelasSiswaData?.nama_walikelas}
                    </td>
                    <td className="px-6 py-2">
                      {allKelasSiswaData?.tahun_mulai_ajaran}-
                      {allKelasSiswaData?.tahun_akhir_ajaran}
                    </td>
                    <td className="px-6 py-2">
                      {allKelasSiswaData?.status_kelas_siswa == 1
                        ? 'Aktif'
                        : allKelasSiswaData?.status_kelas_siswa == 2
                        ? 'Naik kelas'
                        : allKelasSiswaData?.status_kelas_siswa == 3
                        ? 'Tinggal kelas'
                        : allKelasSiswaData?.status_kelas_siswa == 4
                        ? 'Lulus'
                        : allKelasSiswaData?.status_kelas_siswa == 5
                        ? 'Tidak lulus'
                        : ''}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="8"
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

export default TableKelasSiswa;
