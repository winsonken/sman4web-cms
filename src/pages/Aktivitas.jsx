import React from 'react';
import { useState } from 'react';

import { FaMedal } from 'react-icons/fa6';

import {
  Button,
  ButtonAdd,
  Layout,
  PopUpAdd,
  PopUpAction,
  PopUpEdit,
  PopUpDelete,
  SelectFilter,
  SearchFilter,
} from '../components';
import { TableAktivitas } from '../components/aktivitas';
import { useGetSiswaQuery } from '../services/api/siswaApiSlice';
import useDebounce from '../helpers/useDebounce';
import { FormAddPrestasi } from '../components/prestasi';

const Aktivitas = () => {
  const [searchFilterSiswa, setSearchFilterSiswa] = useState('');

  const debouncedSearchSiswa = useDebounce(searchFilterSiswa, 500);

  const [isOpenPopUpAdd, setIsOpenPopUpAdd] = useState(false);
  const [isOpenPopUpEdit, setIsOpenPopUpEdit] = useState(false);
  const [isOpenPopUpDelete, setIsOpenPopUpDelete] = useState(false);
  const [isOpenPopUpDetail, setIsOpenPopUpDetail] = useState(false);
  const [isOpenPopUpMulai, setIsOpenPopUpMulai] = useState(false);
  const [isOpenPopUpLulus, setIsOpenPopUpLulus] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const limitPerPage = 10;
  const {
    data: siswa,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetSiswaQuery({
    q: debouncedSearchSiswa,
    page: currentPage,
    limit: limitPerPage,
  });
  return (
    <Layout>
      <div className="flex flex-col gap-5">
        <div>
          <h1 className="text-xl font-semibold md:text-2xl">Aktivitas</h1>
        </div>

        <div className="flex flex-col sm:flex-row sm:justify-between gap-3">
          <div className="flex flex-col gap-3 sm:flex-row">
            <ButtonAdd
              title="Tambah prestasi"
              isOpenPopUpAdd={isOpenPopUpAdd}
              setIsOpenPopUpAdd={setIsOpenPopUpAdd}
            />
            <ButtonAdd
              title="Tambah pelanggaran"
              // isOpenPopUpAdd={isOpenPopUpAdd}
              // setIsOpenPopUpAdd={setIsOpenPopUpAdd}
            />
            <ButtonAdd
              title="Tambah rapot"
              // isOpenPopUpAdd={isOpenPopUpAdd}
              // setIsOpenPopUpAdd={setIsOpenPopUpAdd}
            />
          </div>

          <div className="flex flex-col gap-3 sm:w-1/2 sm:flex-row 2xl:w-1/3 justify-end ">
            <div className="sm:w-1/2">
              <SearchFilter
                searchValue={searchFilterSiswa}
                setSearchValue={setSearchFilterSiswa}
              />
            </div>
          </div>
        </div>

        <TableAktivitas
          data={siswa}
          isLoading={isLoading}
          isSuccess={isSuccess}
          isError={isError}
          error={error}
          isOpenPopUpMulai={isOpenPopUpMulai}
          setIsOpenPopUpMulai={setIsOpenPopUpMulai}
          isOpenPopUpLulus={isOpenPopUpLulus}
          setIsOpenPopUpLulus={setIsOpenPopUpLulus}
          isOpenPopUpDetail={isOpenPopUpDetail}
          setIsOpenPopUpDetail={setIsOpenPopUpDetail}
          isOpenPopUpEdit={isOpenPopUpEdit}
          setIsOpenPopUpEdit={setIsOpenPopUpEdit}
          isOpenPopUpDelete={isOpenPopUpDelete}
          setIsOpenPopUpDelete={setIsOpenPopUpDelete}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          limitPerPage={limitPerPage}
        />

        <PopUpAdd
          title="Tambah prestasi"
          icon={<FaMedal />}
          isOpenPopUpAdd={isOpenPopUpAdd}
          setIsOpenPopUpAdd={setIsOpenPopUpAdd}
        >
          <FormAddPrestasi setIsOpenPopUpAdd={setIsOpenPopUpAdd} />
        </PopUpAdd>
      </div>
    </Layout>
  );
};

export default Aktivitas;
