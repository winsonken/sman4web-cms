import React, { useState } from 'react';
import LoadingTable from '../Loading/LoadingTable';
import Pagination from '../Pagination';
import ButtonAction from '../ButtonAction';
import ButtonDetail from '../ButtonDetail';
import ButtonEdit from '../ButtonEdit';
import ButtonDelete from '../ButtonDelete';
import ButtonPage from '../ButtonPage';

const TableRapot = (props) => {
  const {
    data,
    isLoading,
    isSuccess,
    isError,
    error,
    isOpenPopUpGanjilAwal,
    setIsOpenPopUpGanjilAwal,
    setGetData,
    currentPage,
    setCurrentPage,
    limitPerPage,
  } = props;

  const rapotSiswaData = data?.data;
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
                  Tahun ajaran
                </th>
                <th scope="col" className="px-6 py-4">
                  Rapot ganjil awal
                </th>
                <th scope="col" className="px-6 py-4">
                  Rapot ganjil akhir
                </th>
                <th scope="col" className="px-6 py-4">
                  Rapot genap awal
                </th>
                <th scope="col" className="px-6 py-4">
                  Rapot genap akhir
                </th>
              </tr>
            </thead>
            <tbody>
              {rapotSiswaData.length > 0 > 0 ? (
                rapotSiswaData.map((allRapotSiswaData, index) => (
                  <tr className="bg-second-orange border-b">
                    <th
                      scope="row"
                      className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap"
                    >
                      {index + 1}
                    </th>
                    <td className="px-6 py-2">
                      {allRapotSiswaData?.nama_siswa}
                    </td>
                    <td className="px-6 py-2">{allRapotSiswaData?.nipd}</td>
                    <td className="px-6 py-2">
                      {allRapotSiswaData?.tahun_mulai_ajaran}-
                      {allRapotSiswaData?.tahun_akhir_ajaran}
                    </td>
                    <td className="px-6 py-2">
                      {allRapotSiswaData?.rapot_ganjil_awal ? (
                        <ButtonAction
                          title="Lihat rapot"
                          data={allRapotSiswaData}
                          isOpenPopUp={isOpenPopUpGanjilAwal}
                          setIsOpenPopUp={setIsOpenPopUpGanjilAwal}
                          setGetData={setGetData}
                        />
                      ) : (
                        'Belum ada'
                      )}
                    </td>
                    <td className="px-6 py-2">
                      {allRapotSiswaData?.rapot_ganjil_akhir ? (
                        <ButtonAction
                          title="Lihat rapot"
                          data={allRapotSiswaData}
                          isOpenPopUp={isOpenPopUpGanjilAwal}
                          setIsOpenPopUp={setIsOpenPopUpGanjilAwal}
                          setGetData={setGetData}
                        />
                      ) : (
                        'Belum ada'
                      )}
                    </td>
                    <td className="px-6 py-2">
                      {allRapotSiswaData?.rapot_genap_awal ? (
                        <ButtonAction
                          title="Lihat rapot"
                          data={allRapotSiswaData}
                          isOpenPopUp={isOpenPopUpGanjilAwal}
                          setIsOpenPopUp={setIsOpenPopUpGanjilAwal}
                          setGetData={setGetData}
                        />
                      ) : (
                        'Belum ada'
                      )}
                    </td>
                    <td className="px-6 py-2">
                      {allRapotSiswaData?.rapot_genap_akhir ? (
                        <ButtonAction
                          title="Lihat rapot"
                          data={allRapotSiswaData}
                          isOpenPopUp={isOpenPopUpGanjilAwal}
                          setIsOpenPopUp={setIsOpenPopUpGanjilAwal}
                          setGetData={setGetData}
                        />
                      ) : (
                        'Belum ada'
                      )}
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

export default TableRapot;
