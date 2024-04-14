import React, { useState } from 'react';
import LoadingTable from '../Loading/LoadingTable';
import Pagination from '../Pagination';
import ButtonAction from '../ButtonAction';
import ButtonDetail from '../ButtonDetail';
import ButtonEdit from '../ButtonEdit';
import ButtonDelete from '../ButtonDelete';

const TableSiswaBaru = (props) => {
  const {
    data,
    isLoading,
    isSuccess,
    isError,
    error,
    isOpenPopUpDetailSiswaBaru,
    setIsOpenPopUpDetailSiswaBaru,
    setGetData,
    currentPage,
    setCurrentPage,
    limitPerPage,
  } = props;

  const siswaBaruData = data?.data;
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
                  Foto
                </th>
                <th scope="col" className="px-6 py-4">
                  No pendaftaran
                </th>
                <th scope="col" className="px-6 py-4">
                  Nama siswa
                </th>
                <th scope="col" className="px-6 py-4">
                  NIPD
                </th>
                <th scope="col" className="px-6 py-4">
                  Angkatan
                </th>
                <th scope="col" className="px-6 py-4">
                  Status
                </th>
                <th scope="col" className="px-6 py-4 text-center">
                  Aksi
                </th>
              </tr>
            </thead>

            <tbody>
              {siswaBaruData.length > 0 ? (
                siswaBaruData.map((allSiswaBaruData, index) => (
                  <tr className="bg-second-orange border-b">
                    <th
                      scope="row"
                      className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap"
                    >
                      {index + 1}
                    </th>
                    <td className="px-6 py-2">
                      <img
                        src={
                          allSiswaBaruData?.foto
                            ? `http://localhost:5500/${allSiswaBaruData?.foto}`
                            : './default-user.jpeg'
                        }
                        alt="Siswa"
                        className="w-20 max-h-12 object-cover rounded-md"
                        loading="lazy"
                      />
                    </td>
                    <td className="px-6 py-2">
                      {allSiswaBaruData?.no_pendaftaran}
                    </td>
                    <td className="px-6 py-2">{allSiswaBaruData?.nama}</td>
                    <td className="px-6 py-2">{allSiswaBaruData?.nipd}</td>
                    <td className="px-6 py-2">
                      {allSiswaBaruData?.no_angkatan}
                    </td>
                    <td className="px-6 py-2">
                      {allSiswaBaruData?.status_siswa == 0 ? (
                        <p className="text-[#f9ab58]">Baru</p>
                      ) : (
                        ''
                      )}
                    </td>
                    <td className="px-6 py-1">
                      <div className="flex flex-row justify-center items-center gap-2">
                        <ButtonDetail
                          data={allSiswaBaruData}
                          isOpenPopUpDetail={isOpenPopUpDetailSiswaBaru}
                          setIsOpenPopUpDetail={setIsOpenPopUpDetailSiswaBaru}
                          setGetData={setGetData}
                        />
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="9"
                    class="px-6 py-3 whitespace-no-wrap bg-second-orange"
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

export default TableSiswaBaru;
