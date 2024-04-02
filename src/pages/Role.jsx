import React, { useState } from 'react';

import { MdStairs } from 'react-icons/md';
import { toast } from 'react-toastify';

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
import { TableRole, FormEditRole } from '../components/role';
import { useGetRoleQuery } from '../services/api/roleApiSlice';
import useDebounce from '../helpers/useDebounce';
import { useGetModuleQuery } from '../services/api/moduleApiSlice';
import { useSelector } from 'react-redux';
import { selectCurrentModules } from '../services/features/authSlice';

const Role = () => {
  const [isOpenPopUpEdit, setIsOpenPopUpEdit] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const limitPerPage = 10;
  const debouncedSearchValue = useDebounce(searchValue, 500);
  const [getData, setGetData] = useState([]);

  const {
    data: role,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetRoleQuery({
    search: debouncedSearchValue,
    page: currentPage,
    limit: limitPerPage,
  });

  const { data: module } = useGetModuleQuery({
    role: getData?.id_role,
  });

  const modules = useSelector(selectCurrentModules);

  const filterModule = (kodeModul) => {
    const module = modules?.find(
      (allModules) => allModules?.kode_modul == kodeModul
    );
    return module;
  };

  const modulesRole = filterModule('data_role');

  return (
    <Layout>
      <div className="flex flex-col gap-5">
        <div>
          <h1 className="text-xl font-semibold md:text-2xl">Role</h1>
        </div>

        <div className="flex sm:justify-end">
          <div className="w-full sm:w-1/2 duration-100 md:w-1/3 2xl:w-1/5">
            <SearchFilter
              searchValue={searchValue}
              setSearchValue={setSearchValue}
            />
          </div>
        </div>

        <TableRole
          data={role}
          isLoading={isLoading}
          isSuccess={isSuccess}
          isError={isError}
          error={error}
          modules={modulesRole}
          isOpenPopUpEdit={isOpenPopUpEdit}
          setIsOpenPopUpEdit={setIsOpenPopUpEdit}
          setGetData={setGetData}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          limitPerPage={limitPerPage}
        />

        <PopUpEdit
          title="Ubah role"
          icon={<MdStairs />}
          isOpenPopUpEdit={isOpenPopUpEdit}
          setIsOpenPopUpEdit={setIsOpenPopUpEdit}
          className="md:max-w-3xl"
        >
          <FormEditRole
            setIsOpenPopUpEdit={setIsOpenPopUpEdit}
            data={getData}
            dataModule={module}
          />
        </PopUpEdit>
      </div>
    </Layout>
  );
};

export default Role;
