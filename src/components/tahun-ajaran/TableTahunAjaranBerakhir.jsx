import React from 'react';
import LoadingTable from '../Loading/LoadingTable';
import Pagination from '../Pagination';
import Error from '../Error';

const TableTahunAjaranBerakhir = (props) => {
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

  const tahunAjaranBerakhir = data?.data;
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
                  Tahun Ajaran
                </th>
                <th scope="col" className="px-6 py-4">
                  Periode ganjil
                </th>
                <th scope="col" className="px-6 py-4">
                  Periode Genap
                </th>
                <th scope="col" className="px-6 py-4">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {tahunAjaranBerakhir.length > 0 ? (
                tahunAjaranBerakhir.map((allTahunAjaran, index) => (
                  <tr
                    key={allTahunAjaran?.id_tahun_ajaran}
                    className="bg-second-orange border-b"
                  >
                    <th
                      scope="row"
                      className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap"
                    >
                      {index + 1}
                    </th>
                    <td className="px-6 py-2">
                      {allTahunAjaran?.tahun_mulai_ajaran}-
                      {allTahunAjaran?.tahun_akhir_ajaran}
                    </td>
                    <td className="px-6 py-2">
                      [{allTahunAjaran?.mulai_periode_ganjil}] - [
                      {allTahunAjaran?.akhir_periode_ganjil}]
                    </td>
                    <td className="px-6 py-2">
                      [{allTahunAjaran?.mulai_periode_genap}] - [
                      {allTahunAjaran?.akhir_periode_genap}]
                    </td>
                    <td className="px-6 py-2">
                      {allTahunAjaran?.status_tahun_ajaran == 2 ? (
                        <p className="text-[#d14242]">Berakhir</p>
                      ) : (
                        ''
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

export default TableTahunAjaranBerakhir;
