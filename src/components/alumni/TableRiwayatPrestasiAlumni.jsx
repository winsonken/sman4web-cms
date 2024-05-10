import React, { useState } from 'react';
import LoadingTable from '../Loading/LoadingTable';
import Pagination from '../Pagination';
import ButtonAction from '../ButtonAction';
import ButtonDetail from '../ButtonDetail';
import ButtonEdit from '../ButtonEdit';
import ButtonDelete from '../ButtonDelete';
import { Link } from 'react-router-dom';
import Error from '../Error';
import { useGetPrestasiBySiswaQuery } from '../../services/api/prestasiApiSlice';

const TableRiwayatPrestasiAlumni = (props) => {
  const { data } = props;

  const [
    currentPageRiwayatPrestasiAlumni,
    setCurrentPageRiwayatPrestasiAlumni,
  ] = useState(1);
  const limitPerPage = 10;

  const {
    data: riwayatPrestasiAlumni,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetPrestasiBySiswaQuery({
    siswa: data?.id_siswa,
    page: currentPageRiwayatPrestasiAlumni,
    limit: limitPerPage,
  });

  const prestasiAlumniData = riwayatPrestasiAlumni?.data;
  const pagination = riwayatPrestasiAlumni?.pagination;

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
                  Nama prestasi
                </th>
                <th scope="col" className="px-6 py-4">
                  Jenis prestasi
                </th>
                <th scope="col" className="px-6 py-4">
                  Tahun prestasi
                </th>
              </tr>
            </thead>
            <tbody>
              {prestasiAlumniData.length > 0 > 0 ? (
                prestasiAlumniData.map((allPrestasiAlumniData, index) => (
                  <tr
                    key={allPrestasiAlumniData?.id_prestasi}
                    className="bg-second-orange border-b"
                  >
                    <th
                      scope="row"
                      className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap"
                    >
                      {index + 1}
                    </th>
                    <td className="px-6 py-2">
                      {allPrestasiAlumniData?.nama_siswa}
                    </td>
                    <td className="px-6 py-2">{allPrestasiAlumniData?.nipd}</td>
                    <td className="px-6 py-2">
                      {allPrestasiAlumniData?.nama_prestasi}
                    </td>
                    <td className="px-6 py-2">
                      {allPrestasiAlumniData?.jenis_prestasi}
                    </td>
                    <td className="px-6 py-2">
                      {allPrestasiAlumniData?.tanggal_prestasi}
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
        currentPage={currentPageRiwayatPrestasiAlumni}
        setCurrentPage={setCurrentPageRiwayatPrestasiAlumni}
        totalPage={totalPage}
        totalRecord={totalRecord}
        limitPerPage={limitPerPage}
      />
    </div>
  );
};

export default TableRiwayatPrestasiAlumni;
