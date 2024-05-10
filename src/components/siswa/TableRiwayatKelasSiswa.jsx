import React, { useState } from 'react';
import LoadingTable from '../Loading/LoadingTable';
import Pagination from '../Pagination';
import ButtonAction from '../ButtonAction';
import ButtonDetail from '../ButtonDetail';
import ButtonEdit from '../ButtonEdit';
import ButtonDelete from '../ButtonDelete';
import Error from '../Error';
import { useGetRiwayatKelasSiswaQuery } from '../../services/api/kelasSiswaApiSlice';

const TableRiwayatKelasSiswa = (props) => {
  const { data } = props;

  const [currentPageRiwayatKelasSiswa, setCurrentPageRiwayatKelasSiswa] =
    useState(1);
  const limitPerPage = 10;

  const {
    data: riwayatKelasSiswa,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetRiwayatKelasSiswaQuery({
    siswa: data?.id_siswa,
    page: currentPageRiwayatKelasSiswa,
    limit: limitPerPage,
  });

  const riwayatKelasSiswaData = riwayatKelasSiswa?.data;
  const pagination = riwayatKelasSiswa?.pagination;

  const totalPage = pagination?.total_page;
  const totalRecord = pagination?.total_record;

  return (
    <div className="flex flex-col gap-3">
      <p>Nama: {data?.nama}</p>
      <p>NIPD: {data?.nipd}</p>
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
              {riwayatKelasSiswaData.length > 0 ? (
                riwayatKelasSiswaData.map((allRiwayatKelasSiswaData, index) => (
                  <tr
                    key={allRiwayatKelasSiswaData?.id_kelas_siswa}
                    className="bg-second-orange border-b"
                  >
                    <th
                      scope="row"
                      className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap"
                    >
                      {index + 1}
                    </th>
                    <td className="px-6 py-2">
                      {allRiwayatKelasSiswaData?.no_kelas}
                    </td>
                    <td className="px-6 py-2">
                      {allRiwayatKelasSiswaData?.nama_kelas}
                    </td>
                    <td className="px-6 py-2">
                      {allRiwayatKelasSiswaData?.nama_jurusan || '-'}
                    </td>
                    <td className="px-6 py-2">
                      {allRiwayatKelasSiswaData?.no_absen || '-'}
                    </td>
                    <td className="px-6 py-2">
                      {allRiwayatKelasSiswaData?.nama_walikelas}
                    </td>
                    <td className="px-6 py-2">
                      {allRiwayatKelasSiswaData?.tahun_mulai_ajaran}-
                      {allRiwayatKelasSiswaData?.tahun_akhir_ajaran}
                    </td>
                    <td className="px-6 py-2">
                      {allRiwayatKelasSiswaData?.status_kelas_siswa == 1 ? (
                        <p className="text-[#45db6a]">Aktif</p>
                      ) : allRiwayatKelasSiswaData?.status_kelas_siswa == 2 ? (
                        <p className="text-[#51f84e]">Naik Kelas</p>
                      ) : allRiwayatKelasSiswaData?.status_kelas_siswa == 3 ? (
                        <p className="text-[#d14242]">Tinggal Kelas</p>
                      ) : allRiwayatKelasSiswaData?.status_kelas_siswa == 4 ? (
                        <p className="text-[#4ef887]">Lulus</p>
                      ) : allRiwayatKelasSiswaData?.status_kelas_siswa == 5 ? (
                        <p className="text-[#842a2a]">Tidak Lulus</p>
                      ) : (
                        ''
                      )}
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
        currentPage={currentPageRiwayatKelasSiswa}
        setCurrentPage={setCurrentPageRiwayatKelasSiswa}
        totalPage={totalPage}
        totalRecord={totalRecord}
        limitPerPage={limitPerPage}
      />
    </div>
  );
};

export default TableRiwayatKelasSiswa;
