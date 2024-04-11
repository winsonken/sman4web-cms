import React from 'react';
import LoadingTable from '../Loading/LoadingTable';
import Pagination from '../Pagination';
import ButtonAction from '../ButtonAction';
import ButtonDetail from '../ButtonDetail';
import ButtonEdit from '../ButtonEdit';
import ButtonDelete from '../ButtonDelete';

const TableTahunAjaran = (props) => {
  const {
    data,
    isLoading,
    isSuccess,
    isError,
    error,
    modules,
    isOpenPopUpMulai,
    setIsOpenPopUpMulai,
    isOpenPopUpSelesai,
    setIsOpenPopUpSelesai,
    isOpenPopUpEdit,
    setIsOpenPopUpEdit,
    isOpenPopUpDelete,
    setIsOpenPopUpDelete,
    setGetData,
    currentPage,
    setCurrentPage,
    limitPerPage,
  } = props;

  const tahunAjaranData = data?.data;
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
                {modules?.ubah && (
                  <th scope="col" className="px-6 py-4 text-center">
                    Status Tahun Ajaran
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
              {tahunAjaranData.length > 0 > 0 ? (
                tahunAjaranData.map((allTahunAjaran, index) => (
                  <tr className="bg-second-orange border-b">
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
                      {allTahunAjaran?.mulai_periode_ganjil}-
                      {allTahunAjaran?.akhir_periode_ganjil}
                    </td>
                    <td className="px-6 py-2">
                      {allTahunAjaran?.mulai_periode_genap}-
                      {allTahunAjaran?.akhir_periode_genap}
                    </td>
                    <td className="px-6 py-2">
                      {allTahunAjaran?.status_tahun_ajaran == 0
                        ? 'Belum dimulai'
                        : allTahunAjaran?.status_tahun_ajaran == 1
                        ? 'Dimulai'
                        : allTahunAjaran?.status_tahun_ajaran == 2
                        ? 'Berakhir'
                        : ''}
                    </td>
                    {modules?.ubah && (
                      <td className="px-6 py-2 text-center">
                        {allTahunAjaran?.status_tahun_ajaran == 0 && (
                          <ButtonAction
                            title="Mulai"
                            data={allTahunAjaran}
                            isOpenPopUp={isOpenPopUpMulai}
                            setIsOpenPopUp={setIsOpenPopUpMulai}
                            setGetData={setGetData}
                          />
                        )}

                        {allTahunAjaran?.status_tahun_ajaran == 1 && (
                          <ButtonAction
                            title="Selesai"
                            data={allTahunAjaran}
                            isOpenPopUp={isOpenPopUpSelesai}
                            setIsOpenPopUp={setIsOpenPopUpSelesai}
                            setGetData={setGetData}
                          />
                        )}
                      </td>
                    )}

                    {(modules?.ubah || modules?.hapus) && (
                      <td className="flex flex-row justify-center items-center gap-2 px-6 py-2">
                        {modules?.ubah && (
                          <ButtonEdit
                            data={allTahunAjaran}
                            isOpenPopUpEdit={isOpenPopUpEdit}
                            setIsOpenPopUpEdit={setIsOpenPopUpEdit}
                            setGetData={setGetData}
                          />
                        )}

                        {modules?.hapus && (
                          <ButtonDelete
                            data={allTahunAjaran}
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
                    colSpan="7"
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

export default TableTahunAjaran;
