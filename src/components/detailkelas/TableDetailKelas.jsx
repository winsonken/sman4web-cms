import React, { useState } from 'react';
import LoadingTable from '../Loading/LoadingTable';
import Pagination from '../Pagination';
import ButtonAction from '../ButtonAction';
import ButtonDetail from '../ButtonDetail';
import ButtonEdit from '../ButtonEdit';
import ButtonDelete from '../ButtonDelete';

const TableDetailKelas = (props) => {
  const {
    data,
    isLoading,
    isSuccess,
    isError,
    error,
    isOpenPopUpGanjilAwal,
    setIsOpenPopUpGanjilAwal,
    isOpenPopUpGanjilAkhir,
    setIsOpenPopUpGanjilAkhir,
    isOpenPopUpGenapAwal,
    setIsOpenPopUpGenapAwal,
    isOpenPopUpGenapAkhir,
    setIsOpenPopUpGenapAkhir,
    isOpenPopUpEdit,
    setIsOpenPopUpEdit,
    isOpenPopUpDelete,
    setIsOpenPopUpDelete,
    isOpenPopUpNaikKelas,
    setIsOpenPopUpNaikKelas,
    isOpenPopUpTinggalKelas,
    setIsOpenPopUpTinggalKelas,
    isOpenPopUpLulus,
    setIsOpenPopUpLulus,
    isOpenPopUpTidakLulus,
    setIsOpenPopUpTidakLulus,
    setGetData,
    currentPage,
    setCurrentPage,
    limitPerPage,
  } = props;
  const kelasSiswaData = data?.data;
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
                  No absen
                </th>
                <th scope="col" className="px-6 py-4">
                  Status
                </th>
                <th scope="col" className="text-center px-6 py-4">
                  Status kelas
                </th>
                <th scope="col" className="text-center px-6 py-4">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody>
              {kelasSiswaData.length > 0 ? (
                kelasSiswaData.map((allKelasSiswaData, index) => (
                  <tr className="bg-second-orange border-b">
                    <th
                      scope="row"
                      className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap"
                    >
                      {index + 1}
                    </th>
                    <td className="px-6 py-2">
                      {allKelasSiswaData?.nama_siswa}
                    </td>
                    <td className="px-6 py-2">-</td>
                    <td className=" gap-2 px-6 py-2">
                      {allKelasSiswaData?.status_kelas_siswa == 1
                        ? 'Aktif'
                        : allKelasSiswaData?.status_kelas_siswa == 2
                        ? 'Naik kelas'
                        : allKelasSiswaData?.status_kelas_siswa == 3
                        ? 'Tinggal kelas'
                        : allKelasSiswaData?.status_kelas_siswa == 4
                        ? 'Lulus'
                        : allKelasSiswaData?.status_kelas_siswa == 5
                        ? 'Tidak lulus'
                        : ''}
                    </td>
                    <td className="px-6 py-2">
                      <div className="flex justify-center">
                        <div className="flex flex-col justify-center items-start gap-2">
                          <div className="flex flex-row gap-2">
                            {allKelasSiswaData?.rapot_ganjil_awal == null && (
                              <ButtonAction
                                title="Rapot ganjil awal"
                                isOpenPopUp={isOpenPopUpLulus}
                                setIsOpenPopUp={setIsOpenPopUpLulus}
                              />
                            )}

                            {allKelasSiswaData?.rapot_ganjil_akhir == null && (
                              <ButtonAction
                                title="Rapot ganjil akhir"
                                isOpenPopUp={isOpenPopUpLulus}
                                setIsOpenPopUp={setIsOpenPopUpLulus}
                              />
                            )}
                          </div>

                          <div className="flex flex-row gap-2">
                            {allKelasSiswaData?.rapot_genap_awal == null && (
                              <ButtonAction
                                title="Rapot genap awal"
                                isOpenPopUp={isOpenPopUpLulus}
                                setIsOpenPopUp={setIsOpenPopUpLulus}
                              />
                            )}

                            {allKelasSiswaData?.rapot_genap_awal == null && (
                              <ButtonAction
                                title="Rapot genap akhir"
                                isOpenPopUp={isOpenPopUpLulus}
                                setIsOpenPopUp={setIsOpenPopUpLulus}
                              />
                            )}
                          </div>

                          <div className="flex flex-row gap-2">
                            {allKelasSiswaData?.status_kelas_siswa == 1 &&
                              allKelasSiswaData?.no_kelas != 12 && (
                                <>
                                  <ButtonAction
                                    data={allKelasSiswaData}
                                    title="Naik Kelas"
                                    isOpenPopUp={isOpenPopUpNaikKelas}
                                    setIsOpenPopUp={setIsOpenPopUpNaikKelas}
                                    setGetData={setGetData}
                                  />
                                  <ButtonAction
                                    data={allKelasSiswaData}
                                    title="Tinggal Kelas"
                                    isOpenPopUp={isOpenPopUpTinggalKelas}
                                    setIsOpenPopUp={setIsOpenPopUpTinggalKelas}
                                    setGetData={setGetData}
                                  />
                                </>
                              )}
                          </div>

                          <div className="flex flex-row gap-2">
                            {allKelasSiswaData?.no_kelas == 12 && (
                              <>
                                <ButtonAction
                                  data={allKelasSiswaData}
                                  title="Lulus"
                                  isOpenPopUp={isOpenPopUpLulus}
                                  setIsOpenPopUp={setIsOpenPopUpLulus}
                                  setGetData={setGetData}
                                />
                                <ButtonAction
                                  data={allKelasSiswaData}
                                  title="Tidak lulus"
                                  isOpenPopUp={isOpenPopUpTidakLulus}
                                  setIsOpenPopUp={setIsOpenPopUpTidakLulus}
                                  setGetData={setGetData}
                                />
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-2">
                      <div className="flex flex-row justify-center items-center gap-2">
                        <ButtonEdit
                          data={allKelasSiswaData}
                          isOpenPopUpEdit={isOpenPopUpEdit}
                          setIsOpenPopUpEdit={setIsOpenPopUpEdit}
                          setGetData={setGetData}
                        />

                        <ButtonDelete
                          data={allKelasSiswaData}
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

export default TableDetailKelas;
