import React from 'react';
import { useState } from 'react';

import { FaMedal } from 'react-icons/fa6';
import { MdDoNotDisturb } from 'react-icons/md';

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
import { FormAddPelanggaran } from '../components/pelanggaran';
import { useSelector } from 'react-redux';
import { selectCurrentModules } from '../services/features/authSlice';

const Aktivitas = () => {
  const [searchFilterSiswa, setSearchFilterSiswa] = useState('');

  const debouncedSearchSiswa = useDebounce(searchFilterSiswa, 500);

  const [isOpenPopUpAddPrestasi, setIsOpenPopUpAddPrestasi] = useState(false);
  const [isOpenPopUpAddPelanggaran, setIsOpenPopUpAddPelanggaran] =
    useState(false);
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

  const modules = useSelector(selectCurrentModules);

  const filterModule = (kodeModul) => {
    const module = modules?.find(
      (allModules) => allModules?.kode_modul == kodeModul
    );
    return module;
  };

  const modulesAktivitas = filterModule('data_aktivitas');
  return (
    <Layout>
      <div className="flex flex-col gap-5">
        <div>
          <h1 className="text-xl font-semibold md:text-2xl">Aktivitas</h1>
        </div>

        <div
          className={`flex flex-col sm:flex-row gap-3 ${
            modulesAktivitas?.tambah ? 'sm:justify-between' : 'sm:justify-end'
          }`}
        >
          <div className="flex flex-col gap-3 sm:flex-row">
            {modulesAktivitas?.tambah && (
              <>
                <ButtonAdd
                  title="Tambah prestasi"
                  isOpenPopUpAdd={isOpenPopUpAddPrestasi}
                  setIsOpenPopUpAdd={setIsOpenPopUpAddPrestasi}
                />
                <ButtonAdd
                  title="Tambah pelanggaran"
                  isOpenPopUpAdd={isOpenPopUpAddPelanggaran}
                  setIsOpenPopUpAdd={setIsOpenPopUpAddPelanggaran}
                />
              </>
            )}
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
          isOpenPopUpAdd={isOpenPopUpAddPrestasi}
          setIsOpenPopUpAdd={setIsOpenPopUpAddPrestasi}
          className="md:max-w-3xl"
        >
          <FormAddPrestasi setIsOpenPopUpAdd={setIsOpenPopUpAddPrestasi} />
        </PopUpAdd>

        <PopUpAdd
          title="Tambah pelanggaran"
          icon={<MdDoNotDisturb />}
          isOpenPopUpAdd={isOpenPopUpAddPelanggaran}
          setIsOpenPopUpAdd={setIsOpenPopUpAddPelanggaran}
          className="md:max-w-3xl"
        >
          <FormAddPelanggaran
            setIsOpenPopUpAdd={setIsOpenPopUpAddPelanggaran}
          />
        </PopUpAdd>
      </div>
    </Layout>
  );
};

export default Aktivitas;
