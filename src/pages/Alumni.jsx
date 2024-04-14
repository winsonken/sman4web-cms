import React, { useState } from 'react';

import { FaUserGraduate } from 'react-icons/fa';

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

  const {
    data: alumni,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetAlumniQuery({
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
      </div>
    </Layout>
  );
};

export default Alumni;
