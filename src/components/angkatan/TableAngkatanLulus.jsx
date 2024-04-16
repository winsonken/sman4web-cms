import React, { useState } from 'react';
import LoadingTable from '../Loading/LoadingTable';
import Pagination from '../Pagination';
import ButtonAction from '../ButtonAction';
import ButtonDetail from '../ButtonDetail';
import ButtonEdit from '../ButtonEdit';
import ButtonDelete from '../ButtonDelete';
import Error from '../Error';

const TableAngkatanLulus = (props) => {
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

  const angkatanLulusData = data?.data;
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
                  Angkatan
                </th>
                <th scope="col" className="px-6 py-4">
                  Tahun
                </th>
                <th scope="col" className="px-6 py-4">
                  Jumlah siswa
                </th>
                <th scope="col" className="px-6 py-4">
                  Siswa lulus
                </th>
                <th scope="col" className="px-6 py-4">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {angkatanLulusData.length > 0 ? (
                angkatanLulusData.map((allAngkatanLulusData, index) => (
                  <tr
                    key={allAngkatanLulusData?.id_angkatan}
                    className="bg-second-orange border-b"
                  >
                    <th
                      scope="row"
                      className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap"
                    >
                      {index + 1}
                    </th>
                    <td className="px-6 py-2">
                      {allAngkatanLulusData?.no_angkatan}
                    </td>
                    <td className="px-6 py-2">{allAngkatanLulusData?.tahun}</td>
                    <td className="px-6 py-2">
                      {allAngkatanLulusData?.jumlah_siswa || '-'}
                    </td>
                    <td className="px-6 py-2">
                      {allAngkatanLulusData?.siswa_lulus || '-'}
                    </td>
                    <td className="px-6 py-2">
                      {allAngkatanLulusData?.status_angkatan == 2 ? (
                        <p className="text-[#4ef887]">Lulus</p>
                      ) : (
                        '-'
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="7"
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

export default TableAngkatanLulus;
