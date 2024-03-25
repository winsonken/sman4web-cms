import React, { useState } from 'react';

import { FaMedal } from 'react-icons/fa6';

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
  FormAddPrestasi,
  FormEditPrestasi,
  DetailPrestasi,
  TablePrestasi,
} from '../components/prestasi';

import useDebounce from '../helpers/useDebounce';
import { useGetPrestasiQuery } from '../services/api/prestasiApiSlice';

const Prestasi = () => {
  const [searchFilterPrestasi, setSearchFilterPrestasi] = useState('');

  const debouncedSearchPrestasi = useDebounce(searchFilterPrestasi, 500);

  const [currentPage, setCurrentPage] = useState(1);
  const limitPerPage = 10;

  const {
    data: prestasiSiswa,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetPrestasiQuery({
    q: debouncedSearchPrestasi,
    page: currentPage,
    limit: limitPerPage,
  });

  return (
    <Layout>
      <div className="flex flex-col gap-5">
        <div>
          <h1 className="text-xl font-semibold md:text-2xl">Prestasi</h1>
        </div>

        <div className="flex sm:justify-end">
          <div className="w-full sm:w-1/2 duration-100 md:w-1/3 2xl:w-1/5">
            <SearchFilter
              searchValue={searchFilterPrestasi}
              setSearchValue={setSearchFilterPrestasi}
            />
          </div>
        </div>

        <TablePrestasi
          data={prestasiSiswa}
          isLoading={isLoading}
          isSuccess={isSuccess}
          isError={isError}
          error={error}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          limitPerPage={limitPerPage}
        />

        {/* <PopUpEdit
          title="Ubah prestasi"
          icon={<FaMedal />}
          isOpenPopUpEdit={isOpenPopUpEdit}
          setIsOpenPopUpEdit={setIsOpenPopUpEdit}
        >
          <FormEditPrestasi setIsOpenPopUpEdit={setIsOpenPopUpEdit} />
        </PopUpEdit>

        <PopUpDelete
          title="Hapus prestasi"
          icon={<FaMedal />}
          isOpenPopUpDelete={isOpenPopUpDelete}
          setIsOpenPopUpDelete={setIsOpenPopUpDelete}
        >
          <div className="flex flex-col gap-3">
            <h1>Apakah anda yakin menghapus prestasi nama-siswaini?</h1>

            <div className="flex justify-end gap-2">
              <Button
                title="Batal"
                type="cancel"
                setIsOpenPopUp={setIsOpenPopUpDelete}
              />
              <Button title="Hapus" type="submit" />
            </div>
          </div>
        </PopUpDelete> */}
      </div>
    </Layout>
  );
};

export default Prestasi;
