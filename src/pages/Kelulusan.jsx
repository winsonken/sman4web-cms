import React from 'react';

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
import { TableKelulusan } from '../components/kelulusan';
import { useGetSiswaLulusQuery } from '../services/api/siswaApiSlice';
import { useState } from 'react';
import useDebounce from '../helpers/useDebounce';

const Kelulusan = () => {
  const [searchFilterSiswaLulus, setSearchFilterSiswaLulus] = useState('');
  const debouncedSearchSiswaLulus = useDebounce(searchFilterSiswaLulus, 500);

  const [currentPage, setCurrentPage] = useState(1);
  const limitPerPage = 10;
  const {
    data: siswaLulus,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetSiswaLulusQuery({
    q: debouncedSearchSiswaLulus,
    page: currentPage,
    limit: limitPerPage,
  });
  return (
    <Layout>
      <div className="flex flex-col gap-5">
        <div>
          <h1 className="text-xl font-semibold md:text-2xl">Kelulusan</h1>
        </div>

        <div className="flex sm:justify-end">
          <div className="w-full sm:w-1/2 duration-100 md:w-1/3 2xl:w-1/5">
            <SearchFilter />
          </div>
        </div>

        <TableKelulusan
          data={siswaLulus}
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

export default Kelulusan;
