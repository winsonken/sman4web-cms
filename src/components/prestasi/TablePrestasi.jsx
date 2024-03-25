import React, { useState } from 'react';
import LoadingTable from '../Loading/LoadingTable';
import Pagination from '../Pagination';
import ButtonAction from '../ButtonAction';
import ButtonDetail from '../ButtonDetail';
import ButtonEdit from '../ButtonEdit';
import ButtonDelete from '../ButtonDelete';
import { Link } from 'react-router-dom';

const TablePrestasi = (props) => {
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

  const prestasiSiswaData = data?.data;
  const pagination = data?.pagination;

  const totalPage = pagination?.total_page;
  const totalRecord = pagination?.total_record;
  return (
    <div className="flex flex-col gap-3">
      {isError ? (
        ''
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
              {prestasiSiswaData.length > 0 > 0 ? (
                prestasiSiswaData.map((allPrestasiSiswaData, index) => (
                  <tr className="bg-second-orange border-b">
                    <th
                      scope="row"
                      className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap"
                    >
                      {index + 1}
                    </th>
                    <td className="px-6 py-2">
                      {allPrestasiSiswaData?.nama_siswa}
                    </td>
                    <td className="px-6 py-2">{allPrestasiSiswaData?.nipd}</td>
                    <td className="px-6 py-2">
                      {allPrestasiSiswaData?.nama_prestasi}
                    </td>
                    <td className="px-6 py-2">
                      {allPrestasiSiswaData?.jenis_prestasi}
                    </td>
                    <td className="px-6 py-2">
                      {allPrestasiSiswaData?.tahun_prestasi}
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
