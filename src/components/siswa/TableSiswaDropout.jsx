import React, { useState } from 'react';
import LoadingTable from '../Loading/LoadingTable';
import Pagination from '../Pagination';
import ButtonAction from '../ButtonAction';
import ButtonDetail from '../ButtonDetail';
import ButtonEdit from '../ButtonEdit';
import ButtonDelete from '../ButtonDelete';
import Error from '../Error';

const TableSiswaDropout = (props) => {
  const {
    data,
    isLoading,
    isSuccess,
    isError,
    error,
    modules,
    isOpenPopUpDetailSiswaDropout,
    setIsOpenPopUpDetailSiswaDropout,
    isOpenPopUpEdit,
    setIsOpenPopUpEdit,
    isOpenPopUpDelete,
    setIsOpenPopUpDelete,
    setGetData,
    currentPage,
    setCurrentPage,
    limitPerPage,
  } = props;

  const siswaDropoutData = data?.data;
  const pagination = data?.pagination;

  const totalPage = pagination?.total_page;
  const totalRecord = pagination?.total_record;

  const API_URL =
    import.meta.env.VITE_PRODUCTION === 'true'
      ? import.meta.env.VITE_API_URL_PROD
      : import.meta.env.VITE_API_URL_DEV;
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

                <th scope="col" className="text-center px-6 py-4">
                  Aksi
                </th>
              </tr>
            </thead>

            <tbody>
              {siswaDropoutData.length > 0 ? (
                siswaDropoutData.map((allSiswaDropoutData, index) => (
                  <tr
                    key={allSiswaDropoutData?.id_siswa}
                    className="bg-second-orange border-b"
                  >
                    <th
                      scope="row"
                      className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap"
                    >
                      {index + 1}
                    </th>
                    <td className="px-6 py-2">
                      <img
                        src={
                          allSiswaDropoutData?.foto
                            ? `${API_URL}${allSiswaDropoutData?.foto}`
                            : './default-user.jpeg'
                        }
                        alt="Siswa"
                        className="w-20 max-h-12 object-cover rounded-md"
                        loading="lazy"
                      />
                    </td>
                    <td className="px-6 py-2">
                      {allSiswaDropoutData?.no_pendaftaran}
                    </td>
                    <td className="px-6 py-2">{allSiswaDropoutData?.nama}</td>
                    <td className="px-6 py-2">{allSiswaDropoutData?.nipd}</td>
                    <td className="px-6 py-2">
                      {allSiswaDropoutData?.no_angkatan}
                    </td>
                    <td className="px-6 py-2">
                      {allSiswaDropoutData?.status_siswa == 4 ? (
                        <p className="text-red-500">Dropout</p>
                      ) : (
                        ''
                      )}
                    </td>

                    <td className="px-6 py-1">
                      <div className="flex flex-row justify-center items-center gap-2">
                        <ButtonDetail
                          data={allSiswaDropoutData}
                          isOpenPopUpDetail={isOpenPopUpDetailSiswaDropout}
                          setIsOpenPopUpDetail={
                            setIsOpenPopUpDetailSiswaDropout
                          }
                          setGetData={setGetData}
                        />

                        {modules?.ubah && (
                          <ButtonEdit
                            data={allSiswaDropoutData}
                            isOpenPopUpEdit={isOpenPopUpEdit}
                            setIsOpenPopUpEdit={setIsOpenPopUpEdit}
                            setGetData={setGetData}
                          />
                        )}
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

export default TableSiswaDropout;
