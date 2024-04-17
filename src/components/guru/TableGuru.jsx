import React, { useState } from 'react';
import LoadingTable from '../Loading/LoadingTable';
import Pagination from '../Pagination';
import ButtonAction from '../ButtonAction';
import ButtonDetail from '../ButtonDetail';
import ButtonEdit from '../ButtonEdit';
import ButtonDelete from '../ButtonDelete';
import Error from '../Error';

const TableGuru = (props) => {
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

  const guruData = data?.data;
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
                  Nama Guru
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

                <th scope="col" className="text-center px-6 py-4">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody>
              {guruData.length > 0 ? (
                guruData?.map((allGuruData, index) => (
                  <tr
                    key={allGuruData?.id_guru}
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
                          allGuruData?.foto
                            ? `${API_URL}${allGuruData?.foto}`
                            : './default-user.jpeg'
                        }
                        alt="Guru"
                        className="w-20 max-h-12 object-cover rounded-md"
                        loading="lazy"
                      />
                    </td>
                    <td className="px-6 py-2">{allGuruData?.nama}</td>
                    <td className="px-6 py-2">{allGuruData?.no_guru}</td>
                    <td className="px-6 py-2">
                      {allGuruData?.status_kepegawaian}
                    </td>
                    <td className="px-6 py-2">{allGuruData?.jenis_ptk}</td>
                    <td className="px-6 py-2">
                      {allGuruData?.status_guru == 1 ? (
                        <p className="text-[#45db6a]">Aktif</p>
                      ) : (
                        ''
                      )}
                    </td>

                    <td className="px-6 py-2">
                      <div className="flex flex-row justify-center items-center gap-2">
                        <ButtonDetail
                          data={allGuruData}
                          isOpenPopUpDetail={isOpenPopUpDetail}
                          setIsOpenPopUpDetail={setIsOpenPopUpDetail}
                          setGetData={setGetData}
                        />

                        {modules?.ubah && (
                          <ButtonEdit
                            data={allGuruData}
                            isOpenPopUpEdit={isOpenPopUpEdit}
                            setIsOpenPopUpEdit={setIsOpenPopUpEdit}
                            setGetData={setGetData}
                          />
                        )}

                        {modules?.hapus && (
                          <ButtonDelete
                            data={allGuruData}
                            isOpenPopUpDelete={isOpenPopUpDelete}
                            setIsOpenPopUpDelete={setIsOpenPopUpDelete}
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

export default TableGuru;
