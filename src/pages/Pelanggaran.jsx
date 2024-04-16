import React, { useState } from 'react';

import { MdDoNotDisturb } from 'react-icons/md';

import {
  Button,
  ButtonAdd,
  Layout,
  PopUpAdd,
  PopUpAction,
  PopUpEdit,
  PopUpDelete,
  PopUpDetail,
  SelectFilter,
  SearchFilter,
} from '../components';

import {
  FormAddPelanggaran,
  FormEditPelanggaran,
  DetailPelanggaran,
  TablePelanggaran,
} from '../components/pelanggaran';
import { useGetPelanggaranQuery } from '../services/api/pelanggaranApiSlice';
import useDebounce from '../helpers/useDebounce';

const Pelanggaran = () => {
  const [searchFilterPelanggaran, setSearchFilterPelanggaran] = useState('');

  const debouncedSearchPelanggaran = useDebounce(searchFilterPelanggaran, 500);

  const [currentPage, setCurrentPage] = useState(1);
  const limitPerPage = 10;
  const {
    data: pelanggaranSiswa,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetPelanggaranQuery({
    q: debouncedSearchPelanggaran,
    page: currentPage,
    limit: limitPerPage,
  });
  return (
    <Layout>
      <div className="flex flex-col gap-5">
        <div>
          <h1 className="text-xl font-semibold md:text-2xl">Pelanggaran</h1>
        </div>

        <div className="flex sm:justify-end">
          <div className="w-full sm:w-1/2 duration-100 md:w-1/3 2xl:w-1/5">
            <SearchFilter
              searchValue={searchFilterPelanggaran}
              setSearchValue={setSearchFilterPelanggaran}
            />
          </div>
        </div>

        <TablePelanggaran
          data={pelanggaranSiswa}
          isLoading={isLoading}
          isSuccess={isSuccess}
          isError={isError}
          error={error}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          limitPerPage={limitPerPage}
        />
      </div>
    </Layout>
  );
};

export default Pelanggaran;
