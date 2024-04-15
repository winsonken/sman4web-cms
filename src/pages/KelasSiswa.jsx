import React, { useState } from 'react';

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
import { TableKelasSiswa } from '../components/kelassiswa';
import { useGetKelasSiswaQuery } from '../services/api/kelasSiswaApiSlice';
import useDebounce from '../helpers/useDebounce';

const KelasSiswa = () => {
  const [searchFilterKelasSiswa, setSearchFilterKelasSiswa] = useState('');

  const debouncedSearchKelasSiswa = useDebounce(searchFilterKelasSiswa, 500);

  const [currentPage, setCurrentPage] = useState(1);
  const limitPerPage = 10;

  const {
    data: kelasSiswa,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetKelasSiswaQuery({
    kelas: '',
    q: debouncedSearchKelasSiswa,
    page: currentPage,
    limit: limitPerPage,
  });

  return (
    <Layout>
      <div className="flex flex-col gap-5">
        <div>
          <h1 className="text-xl font-semibold md:text-2xl">Kelas siswa</h1>
        </div>

        <div className="flex sm:justify-end">
          <div className="w-full sm:w-1/2 duration-100 md:w-1/3 2xl:w-1/5">
            <SearchFilter
              searchValue={searchFilterKelasSiswa}
              setSearchValue={setSearchFilterKelasSiswa}
            />
          </div>
        </div>

        <TableKelasSiswa
          data={kelasSiswa}
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

export default KelasSiswa;
