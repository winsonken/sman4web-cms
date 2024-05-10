import React, { useState } from 'react';
import LoadingTable from '../Loading/LoadingTable';
import Pagination from '../Pagination';
import ButtonAction from '../ButtonAction';
import ButtonDetail from '../ButtonDetail';
import ButtonEdit from '../ButtonEdit';
import ButtonDelete from '../ButtonDelete';
import Error from '../Error';
import { useGetPelanggaranBySiswaQuery } from '../../services/api/pelanggaranApiSlice';

const TableRiwayatPelanggaranAlumni = (props) => {
  const { data } = props;

  const [
    currentPageRiwayatPelanggaranAlumni,
    setCurrentPageRiwayatPelanggaranAlumni,
  ] = useState(1);
  const limitPerPage = 10;

  const {
    data: riwayatPelanggaranAlumni,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetPelanggaranBySiswaQuery({
    siswa: data?.id_siswa,
    page: currentPageRiwayatPelanggaranAlumni,
    limit: limitPerPage,
  });

  const pelanggaranAlumniData = riwayatPelanggaranAlumni?.data;
  const pagination = riwayatPelanggaranAlumni?.pagination;

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
                  Nama siswa
                </th>
                <th scope="col" className="px-6 py-4">
                  NIPD
                </th>
                <th scope="col" className="px-6 py-4">
                  Jenis pelanggaran
                </th>
                <th scope="col" className="px-6 py-4">
                  Tanggal pelanggaran
                </th>
              </tr>
            </thead>
            <tbody>
              {pelanggaranAlumniData.length > 0 > 0 ? (
                pelanggaranAlumniData.map((allPelanggaranAlumniData, index) => (
                  <tr
                    key={allPelanggaranAlumniData?.id_pelanggaran}
                    className="bg-second-orange border-b"
                  >
                    <th
                      scope="row"
                      className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap"
                    >
                      {index + 1}
                    </th>
                    <td className="px-6 py-2">
                      {allPelanggaranAlumniData?.nama_siswa}
                    </td>
                    <td className="px-6 py-2">
                      {allPelanggaranAlumniData?.nipd}
                    </td>
                    <td className="px-6 py-2">
                      {allPelanggaranAlumniData?.jenis_pelanggaran}
                    </td>
                    <td className="px-6 py-2">
                      {allPelanggaranAlumniData?.tanggal_pelanggaran}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="6"
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
        currentPage={currentPageRiwayatPelanggaranAlumni}
        setCurrentPage={setCurrentPageRiwayatPelanggaranAlumni}
        totalPage={totalPage}
        totalRecord={totalRecord}
        limitPerPage={limitPerPage}
      />
    </div>
  );
};

export default TableRiwayatPelanggaranAlumni;
