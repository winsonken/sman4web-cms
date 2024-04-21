import React, { useState } from 'react';
import LoadingTable from '../Loading/LoadingTable';
import Pagination from '../Pagination';
import ButtonAction from '../ButtonAction';
import ButtonDetail from '../ButtonDetail';
import ButtonEdit from '../ButtonEdit';
import ButtonDelete from '../ButtonDelete';
import Error from '../Error';

const TableAngkatan = (props) => {
  const {
    data,
    isLoading,
    isSuccess,
    isError,
    error,
    modules,
    isOpenPopUpMulai,
    setIsOpenPopUpMulai,
    isOpenPopUpLulus,
    setIsOpenPopUpLulus,
    isOpenPopUpEdit,
    setIsOpenPopUpEdit,
    isOpenPopUpDelete,
    setIsOpenPopUpDelete,
    setGetData,
    currentPage,
    setCurrentPage,
    limitPerPage,
  } = props;

  const angkatanData = data?.data;
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
                {modules?.ubah && (
                  <th scope="col" className="px-3 py-4 text-center">
                    Status angkatan
                  </th>
                )}
                {(modules?.ubah || modules?.hapus) && (
                  <th scope="col" className="text-center px-6 py-4">
                    Aksi
                  </th>
                )}
              </tr>
            </thead>
            <tbody>
              {angkatanData.length > 0 ? (
                angkatanData.map((allAngkatanData, index) => (
                  <tr
                    key={allAngkatanData?.id_angkatan}
                    className="bg-second-orange border-b"
                  >
                    <th
                      scope="row"
                      className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap"
                    >
                      {index + 1}
                    </th>
                    <td className="px-6 py-2">
                      {allAngkatanData?.no_angkatan}
                    </td>
                    <td className="px-6 py-2">{allAngkatanData?.tahun}</td>
                    <td className="px-6 py-2">
                      {allAngkatanData?.jumlah_siswa || '-'}
                    </td>
                    <td className="px-6 py-2">
                      {allAngkatanData?.siswa_lulus || '-'}
                    </td>
                    <td className="px-6 py-2">
                      {allAngkatanData?.status_angkatan == 0 ? (
                        <p className="text-[#cec7cd]">Belum Dimulai</p>
                      ) : allAngkatanData?.status_angkatan == 1 ? (
                        <p className="text-[#45db6a]">Aktif</p>
                      ) : allAngkatanData?.status_angkatan == 2 ? (
                        <p className="text-[#4ef887]">Lulus</p>
                      ) : (
                        '-'
                      )}
                    </td>
                    {modules?.ubah && (
                      <td className="px-6 py-2">
                        <div className="flex justify-center items-center">
                          {allAngkatanData?.status_angkatan == 0 ? (
                            <ButtonAction
                              title="Mulai"
                              data={allAngkatanData}
                              isOpenPopUp={isOpenPopUpMulai}
                              setIsOpenPopUp={setIsOpenPopUpMulai}
                              setGetData={setGetData}
                            />
                          ) : (
                            ''
                          )}

                          {allAngkatanData?.status_angkatan == 1 && (
                            <ButtonAction
                              title="Lulus"
                              data={allAngkatanData}
                              isOpenPopUp={isOpenPopUpLulus}
                              setIsOpenPopUp={setIsOpenPopUpLulus}
                              setGetData={setGetData}
                            />
                          )}
                        </div>
                      </td>
                    )}
                    {(modules?.ubah || modules?.hapus) && (
                      <td className="flex flex-row justify-center items-center gap-2 px-6 py-1">
                        {modules?.ubah && (
                          <ButtonEdit
                            data={allAngkatanData}
                            isOpenPopUpEdit={isOpenPopUpEdit}
                            setIsOpenPopUpEdit={setIsOpenPopUpEdit}
                            setGetData={setGetData}
                          />
                        )}

                        {modules?.hapus && (
                          <ButtonDelete
                            data={allAngkatanData}
                            isOpenPopUpDelete={isOpenPopUpDelete}
                            setIsOpenPopUpDelete={setIsOpenPopUpDelete}
                            setGetData={setGetData}
                          />
                        )}
                      </td>
                    )}
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="8"
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

export default TableAngkatan;
