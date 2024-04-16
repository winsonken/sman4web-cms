import React, { useState } from 'react';
import LoadingTable from '../Loading/LoadingTable';
import Pagination from '../Pagination';
import ButtonAction from '../ButtonAction';
import ButtonDetail from '../ButtonDetail';
import ButtonEdit from '../ButtonEdit';
import ButtonDelete from '../ButtonDelete';
import Error from '../Error';

const TableRole = (props) => {
  const {
    data,
    isLoading,
    isSuccess,
    isError,
    error,
    modules,
    isOpenPopUpEdit,
    setIsOpenPopUpEdit,
    isOpenPopUpDelete,
    setIsOpenPopUpDelete,
    setGetData,
    currentPage,
    setCurrentPage,
    limitPerPage,
  } = props;

  const roleData = data?.data;
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
                  Nama role
                </th>
                <th scope="col" className="px-6 py-4">
                  Status
                </th>
                {modules?.ubah && (
                  <th scope="col" className="text-center px-6 py-4">
                    Aksi
                  </th>
                )}
              </tr>
            </thead>
            <tbody>
              {roleData.length > 0 ? (
                roleData.map((allRoleData, index) => (
                  <tr
                    key={allRoleData?.id_role}
                    className="bg-second-orange border-b"
                  >
                    <th
                      scope="row"
                      className="px-6 py-1 font-medium text-gray-900 whitespace-nowrap"
                    >
                      {index + 1}
                    </th>
                    <td className="px-6 py-1 capitalize">
                      {allRoleData?.nama_role}
                    </td>
                    <td className="px-6 py-1">
                      {allRoleData?.status_role == 1 ? 'Aktif' : 'Tidak aktif'}
                    </td>
                    {modules?.ubah && (
                      <td className="flex flex-row justify-center items-center gap-2 px-6 py-1">
                        <ButtonEdit
                          data={allRoleData}
                          isOpenPopUpEdit={isOpenPopUpEdit}
                          setIsOpenPopUpEdit={setIsOpenPopUpEdit}
                          setGetData={setGetData}
                        />
                      </td>
                    )}
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colspan="4"
                    class="px-6 py-3 whitespace-no-wrap bg-second-orange"
                  >
                    <div class="text-sm  text-gray-500 text-center">
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

export default TableRole;
