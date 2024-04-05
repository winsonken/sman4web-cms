import React, { useState } from 'react';
import LoadingTable from '../Loading/LoadingTable';
import Pagination from '../Pagination';
import ButtonAction from '../ButtonAction';
import ButtonDetail from '../ButtonDetail';
import ButtonEdit from '../ButtonEdit';
import ButtonDelete from '../ButtonDelete';

const TablePpdb = (props) => {
  const {
    data,
    isLoading,
    isSuccess,
    isError,
    error,
    isOpenPopUpTerimaPpdb,
    setIsOpenPopUpTerimaPpdb,
    isOpenPopUpTolakPpdb,
    setIsOpenPopUpTolakPpdb,
    isOpenPopUpDetail,
    setIsOpenPopUpDetail,
    isOpenPopUpEdit,
    setIsOpenPopUpEdit,
    isOpenPopUpDelete,
    setIsOpenPopUpDelete,
    setGetData,
    currentPage,
    setCurrentPage,
    limitPerPage,
  } = props;

  const ppdbData = data?.data;
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
                  Nama Calon Siswa
                </th>
                <th scope="col" className="px-6 py-4">
                  NIPD
                </th>
                <th scope="col" className="px-6 py-4">
                  Status
                </th>
                <th scope="col" className="px-6 py-4">
                  Status Penerimaan
                </th>
                <th scope="col" className="text-center px-6 py-4">
                  Aksi
                </th>
              </tr>
            </thead>

            <tbody>
              {ppdbData.length > 0 ? (
                ppdbData.map((allPpdbData, index) => (
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
                          allPpdbData?.foto
                            ? `http://localhost:5500/${allPpdbData?.foto}`
                            : './default-user.jpeg'
                        }
                        alt="Siswa"
                        className="w-20 max-h-12 object-cover rounded-md"
                      />
                    </td>
                    <td className="px-6 py-2">{allPpdbData?.no_pendaftaran}</td>
                    <td className="px-6 py-2">{allPpdbData?.nama}</td>
                    <td className="px-6 py-2">{allPpdbData?.nipd}</td>
                    <td className="px-6 py-2">
                      {allPpdbData?.status_ppdb == 0
                        ? 'Menunggu penerimaan'
                        : allPpdbData?.status_ppdb == 1
                        ? 'Diterima'
                        : allPpdbData?.status_ppdb == 2
                        ? 'Ditolak'
                        : ''}
                    </td>
                    <td className="px-6 py-2">
                      <div className="flex flex-row gap-2">
                        {allPpdbData?.status_ppdb == 0 && (
                          <>
                            <ButtonAction
                              data={allPpdbData}
                              title="Diterima"
                              isOpenPopUp={isOpenPopUpTerimaPpdb}
                              setIsOpenPopUp={setIsOpenPopUpTerimaPpdb}
                              setGetData={setGetData}
                            />

                            <ButtonAction
                              data={allPpdbData}
                              title="Ditolak"
                              isOpenPopUp={isOpenPopUpTolakPpdb}
                              setIsOpenPopUp={setIsOpenPopUpTolakPpdb}
                              setGetData={setGetData}
                            />
                          </>
                        )}
                      </div>
                    </td>
                    <td className=" px-6 py-1">
                      <div className="flex flex-row justify-center items-center gap-2">
                        <ButtonDetail
                          data={allPpdbData}
                          isOpenPopUpDetail={isOpenPopUpDetail}
                          setIsOpenPopUpDetail={setIsOpenPopUpDetail}
                          setGetData={setGetData}
                        />

                        <ButtonEdit
                          data={allPpdbData}
                          isOpenPopUpEdit={isOpenPopUpEdit}
                          setIsOpenPopUpEdit={setIsOpenPopUpEdit}
                          setGetData={setGetData}
                        />

                        <ButtonDelete
                          data={allPpdbData}
                          isOpenPopUpDelete={isOpenPopUpDelete}
                          setIsOpenPopUpDelete={setIsOpenPopUpDelete}
                          setGetData={setGetData}
                        />
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="8"
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

export default TablePpdb;
