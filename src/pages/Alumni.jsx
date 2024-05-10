import React, { useState } from 'react';

import { FaUserGraduate } from 'react-icons/fa';
import { RiDoorOpenFill } from 'react-icons/ri';
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
  PopUpDetail,
  SelectFilter,
  SearchFilter,
} from '../components';

import {
  FormAddAlumni,
  FormEditAlumni,
  FormDetailAlumni,
  TableAlumni,
  TableRiwayatKelasAlumni,
  TableRiwayatPrestasiAlumni,
  TableRiwayatPelanggaranAlumni,
} from '../components/alumni';
import { useGetAlumniQuery } from '../services/api/siswaApiSlice';
import useDebounce from '../helpers/useDebounce';

import { useSelector } from 'react-redux';
import { selectCurrentModules } from '../services/features/authSlice';
import {
  useGetAngkatanLulusOptionQuery,
  useGetAngkatanOptionQuery,
} from '../services/api/angkatanApiSlice';

const Alumni = () => {
  const [searchFilterAlumni, setSearchFilterAlumni] = useState('');
  const debouncedSearchAlumni = useDebounce(searchFilterAlumni, 500);

  const [selectedAngkatanValue, setSelectedAngkatanValue] = useState('');

  const [currentPage, setCurrentPage] = useState(1);
  const limitPerPage = 10;
  const [getData, setGetData] = useState([]);

  const [isOpenPopUpDetail, setIsOpenPopUpDetail] = useState(false);
  const [isOpenPopUpRiwayatKelas, setIsOpenPopUpRiwayatKelas] = useState(false);
  const [isOpenPopUpRiwayatPrestasi, setIsOpenPopUpRiwayatPrestasi] =
    useState(false);
  const [isOpenPopUpRiwayatPelanggaran, setIsOpenPopUpRiwayatPelanggaran] =
    useState(false);

  const {
    data: alumni,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetAlumniQuery({
    angkatan: selectedAngkatanValue,
    q: debouncedSearchAlumni,
    page: currentPage,
    limit: limitPerPage,
  });

  const { data: angkatanOption } = useGetAngkatanLulusOptionQuery();
  const selectAngkatan = angkatanOption?.data?.map((e) => ({
    value: e?.id_angkatan,
    label: e?.no_angkatan,
  }));

  if (Array.isArray(selectAngkatan)) {
    selectAngkatan.unshift({ value: '', label: 'Select angkatan' });
  }

  const modules = useSelector(selectCurrentModules);

  const filterModule = (kodeModul) => {
    const module = modules?.find(
      (allModules) => allModules?.kode_modul == kodeModul
    );
    return module;
  };

  const modulesAlumni = filterModule('data_alumni');

  return (
    <Layout>
      <div className="flex flex-col gap-5">
        <div>
          <h1 className="text-xl font-semibold md:text-2xl">Alumni</h1>
        </div>

        <div className="flex flex-col sm:flex-row sm:justify-end">
          <div className="flex flex-col gap-3 sm:w-1/2 sm:flex-row 2xl:w-1/3">
            <div className="sm:w-1/2">
              <SelectFilter
                placeholder="Select angkatan"
                data={selectAngkatan}
                selectedValue={selectedAngkatanValue}
                setSelectedValue={setSelectedAngkatanValue}
              />
            </div>
            <div className="sm:w-1/2">
              <SearchFilter
                searchValue={searchFilterAlumni}
                setSearchValue={setSearchFilterAlumni}
              />
            </div>
          </div>
        </div>

        <TableAlumni
          data={alumni}
          isLoading={isLoading}
          isSuccess={isSuccess}
          isError={isError}
          error={error}
          setGetData={setGetData}
          isOpenPopUpDetail={isOpenPopUpDetail}
          setIsOpenPopUpDetail={setIsOpenPopUpDetail}
          isOpenPopUpRiwayatKelas={isOpenPopUpRiwayatKelas}
          setIsOpenPopUpRiwayatKelas={setIsOpenPopUpRiwayatKelas}
          isOpenPopUpRiwayatPrestasi={isOpenPopUpRiwayatPrestasi}
          setIsOpenPopUpRiwayatPrestasi={setIsOpenPopUpRiwayatPrestasi}
          isOpenPopUpRiwayatPelanggaran={isOpenPopUpRiwayatPelanggaran}
          setIsOpenPopUpRiwayatPelanggaran={setIsOpenPopUpRiwayatPelanggaran}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          limitPerPage={limitPerPage}
        />

        <PopUpDetail
          title="Detail alumni"
          icon={<FaUserGraduate />}
          isOpenPopUpDetail={isOpenPopUpDetail}
          setIsOpenPopUpDetail={setIsOpenPopUpDetail}
        >
          <FormDetailAlumni
            data={getData}
            setIsOpenPopUpDetail={setIsOpenPopUpDetail}
          />
        </PopUpDetail>

        <PopUpDetail
          title="Riwayat kelas alumni"
          icon={<RiDoorOpenFill />}
          isOpenPopUpDetail={isOpenPopUpRiwayatKelas}
          setIsOpenPopUpDetail={setIsOpenPopUpRiwayatKelas}
        >
          <TableRiwayatKelasAlumni
            data={getData}
            setIsOpenPopUpDetail={setIsOpenPopUpRiwayatKelas}
          />
        </PopUpDetail>

        <PopUpDetail
          title="Riwayat prestasi alumni"
          icon={<FaMedal />}
          isOpenPopUpDetail={isOpenPopUpRiwayatPrestasi}
          setIsOpenPopUpDetail={setIsOpenPopUpRiwayatPrestasi}
        >
          <TableRiwayatPrestasiAlumni
            data={getData}
            setIsOpenPopUpDetail={setIsOpenPopUpRiwayatPrestasi}
          />
        </PopUpDetail>

        <PopUpDetail
          title="Riwayat pelanggaran alumni"
          icon={<MdDoNotDisturb />}
          isOpenPopUpDetail={isOpenPopUpRiwayatPelanggaran}
          setIsOpenPopUpDetail={setIsOpenPopUpRiwayatPelanggaran}
        >
          <TableRiwayatPelanggaranAlumni
            data={getData}
            setIsOpenPopUpDetail={setIsOpenPopUpRiwayatPelanggaran}
          />
        </PopUpDetail>
      </div>
    </Layout>
  );
};

export default Alumni;
