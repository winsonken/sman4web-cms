import React, { useState } from 'react';
import LoadingTable from '../Loading/LoadingTable';
import Pagination from '../Pagination';
import ButtonAction from '../ButtonAction';
import ButtonDetail from '../ButtonDetail';
import ButtonEdit from '../ButtonEdit';
import ButtonDelete from '../ButtonDelete';
import Loading from '../Loading';

const TablePrestasi = (props) => {
  const {
    data,
    isLoading,
    isSuccess,
    isError,
    error,
    isOpenPopUpDetail,
    setIsOpenPopUpDetail,
    setGetData,
    currentPage,
    setCurrentPage,
    limitPerPage,
  } = props;

  const alumniData = data?.data;
  const pagination = data?.pagination;

  const totalPage = pagination?.total_page;
  const totalRecord = pagination?.total_record;
  return (
    <div className="flex flex-col gap-3">
      {isError ? (
        ''
      ) : isLoading ? (
        <Loading />
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
                  Nama Siswa
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
                <th scope="col" className="text-center px-6 py-4">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody>
              {alumniData.length > 0 ? (
                alumniData.map((allAlumniData, index) => (
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
                          allAlumniData?.foto
                            ? `http://localhost:5500/${allAlumniData?.foto}`
                            : './default-user.jpeg'
                        }
                        alt="Alumni"
                        className="w-20 max-h-12 object-cover rounded-md"
                        loading="lazy"
                      />
                    </td>
                    <td className="px-6 py-2">{allAlumniData?.nama}</td>
                    <td className="px-6 py-2">{allAlumniData?.nipd}</td>
                    <td className="px-6 py-2">{allAlumniData?.no_angkatan}</td>
                    <td className="px-6 py-2">
                      {allAlumniData?.status_siswa == 3 ? 'Alumni' : ''}
                    </td>
                    <td className="px-6 py-2">
                      <div className="flex flex-row justify-center items-center gap-2 ">
                        <ButtonDetail
                          data={allAlumniData}
                          isOpenPopUpDetail={isOpenPopUpDetail}
                          setIsOpenPopUpDetail={setIsOpenPopUpDetail}
                          setGetData={setGetData}
                        />
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="7"
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

export default TablePrestasi;
