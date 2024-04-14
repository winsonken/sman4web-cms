import React, { useState } from 'react';
import LoadingTable from '../Loading/LoadingTable';
import Pagination from '../Pagination';
import ButtonAction from '../ButtonAction';
import ButtonDetail from '../ButtonDetail';
import ButtonEdit from '../ButtonEdit';
import ButtonDelete from '../ButtonDelete';

const TableTendik = (props) => {
  const {
    data,
    isLoading,
    isSuccess,
    isError,
    error,
    modules,
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

  const tendikData = data?.data;
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
                  Nama Tendik
                </th>
                <th scope="col" className="px-6 py-4">
                  NIP/NRPTK/NIG
                </th>
                <th scope="col" className="px-6 py-4">
                  Status kepegawaian
                </th>
                <th scope="col" className="px-6 py-4">
                  Jenis PTK
                </th>
                <th scope="col" className="px-6 py-4">
                  Status
                </th>
                {(modules?.ubah || modules?.hapus) && (
                  <th scope="col" className="text-center px-6 py-4">
                    Aksi
                  </th>
                )}
              </tr>
            </thead>
            <tbody>
              {tendikData.length > 0 ? (
                tendikData?.map((allTendikData, index) => (
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
                          allTendikData?.foto
                            ? `http://localhost:5500/${allTendikData?.foto}`
                            : './default-user.jpeg'
                        }
                        alt="Tendik"
                        className="w-20 max-h-12 object-cover rounded-md"
                        loading="lazy"
                      />
                    </td>
                    <td className="px-6 py-2">{allTendikData?.nama}</td>
                    <td className="px-6 py-2">{allTendikData?.no_tendik}</td>
                    <td className="px-6 py-2">
                      {allTendikData?.status_kepegawaian}
                    </td>
                    <td className="px-6 py-2">{allTendikData?.jenis_ptk}</td>
                    <td className="px-6 py-2">
                      {allTendikData?.status_tendik == 1 ? (
                        <p className="text-[#45db6a]">Aktif</p>
                      ) : (
                        ''
                      )}
                    </td>

                    {(modules?.ubah || modules?.hapus) && (
                      <td className="px-6 py-2">
                        <div className="flex flex-row justify-center items-center gap-2">
                          <ButtonDetail
                            data={allTendikData}
                            isOpenPopUpDetail={isOpenPopUpDetail}
                            setIsOpenPopUpDetail={setIsOpenPopUpDetail}
                            setGetData={setGetData}
                          />

                          {modules?.ubah && (
                            <ButtonEdit
                              data={allTendikData}
                              isOpenPopUpEdit={isOpenPopUpEdit}
                              setIsOpenPopUpEdit={setIsOpenPopUpEdit}
                              setGetData={setGetData}
                            />
                          )}

                          {modules?.hapus && (
                            <ButtonDelete
                              data={allTendikData}
                              isOpenPopUpDelete={isOpenPopUpDelete}
                              setIsOpenPopUpDelete={setIsOpenPopUpDelete}
                              setGetData={setGetData}
                            />
                          )}
                        </div>
                      </td>
                    )}
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

export default TableTendik;
