import React, { useState } from 'react';

import { GrUserAdmin } from 'react-icons/gr';
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
  Loading,
} from '../components';

import useDebounce from '../helpers/useDebounce';
import {
  useDeleteTendikMutation,
  useGetTendikQuery,
} from '../services/api/tendikApiSlice';
import {
  FormAddTendik,
  FormDetailTendik,
  FormEditTendik,
  TableTendik,
} from '../components/tendik';
import { useGetRoleOptionQuery } from '../services/api/roleApiSlice';
import { useSelector } from 'react-redux';
import { selectCurrentModules } from '../services/features/authSlice';

const Tendik = () => {
  const [searchFilterTendik, setSearchFilterTendik] = useState('');
  const debouncedSearchTendik = useDebounce(searchFilterTendik, 500);

  const [isOpenPopUpAdd, setIsOpenPopUpAdd] = useState(false);
  const [isOpenPopUpEdit, setIsOpenPopUpEdit] = useState(false);
  const [isOpenPopUpDelete, setIsOpenPopUpDelete] = useState(false);
  const [isOpenPopUpDetail, setIsOpenPopUpDetail] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const limitPerPage = 10;
  const [getData, setGetData] = useState([]);

  const { data: role } = useGetRoleOptionQuery();

  const filterRole = role?.data?.filter(
    (e) => e.nama_role == 'tendik' || e.nama_role == 'admin'
  );

  const selectRole = filterRole?.map((e) => ({
    value: e?.id_role,
    label: e?.nama_role,
  }));

  const {
    data: tendik,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetTendikQuery({
    q: debouncedSearchTendik,
    page: currentPage,
    limit: limitPerPage,
  });

  const [deleteTendik, { isLoading: isLoadingDelete }] =
    useDeleteTendikMutation();

  const handleDelete = async () => {
    try {
      const response = await deleteTendik({
        id: getData?.id_tendik,
      }).unwrap();
      if (!response.error) {
        toast.success('Tendik berhasil dihapus!', {
          position: 'top-right',
          theme: 'light',
        });
        setIsOpenPopUpDelete(false);
      }
    } catch (error) {
      const errorMessage = error?.data?.message;
      toast.error(`${errorMessage}`, {
        position: 'top-right',
        theme: 'light',
      });
    }
  };

  const modules = useSelector(selectCurrentModules);

  const filterModule = (kodeModul) => {
    const module = modules?.find(
      (allModules) => allModules?.kode_modul == kodeModul
    );
    return module;
  };

  const modulesTendik = filterModule('data_tendik');

  return (
    <Layout>
      <div className="flex flex-col gap-5">
        <div>
          <h1 className="text-xl font-semibold md:text-2xl">Tendik</h1>
        </div>

        <div
          className={`flex flex-col sm:flex-row gap-3 ${
            modulesTendik?.tambah ? 'sm:justify-between' : 'sm:justify-end'
          }`}
        >
          {modulesTendik?.tambah && (
            <ButtonAdd
              title="Tambah Tendik"
              isOpenPopUpAdd={isOpenPopUpAdd}
              setIsOpenPopUpAdd={setIsOpenPopUpAdd}
            />
          )}

          <div className="w-full duration-100 sm:w-1/2 md:w-1/5">
            <SearchFilter
              searchValue={searchFilterTendik}
              setSearchValue={setSearchFilterTendik}
            />
          </div>
        </div>

        <TableTendik
          data={tendik}
          isLoading={isLoading}
          isSuccess={isSuccess}
          isError={isError}
          error={error}
          modules={modulesTendik}
          isOpenPopUpDetail={isOpenPopUpDetail}
          setIsOpenPopUpDetail={setIsOpenPopUpDetail}
          isOpenPopUpEdit={isOpenPopUpEdit}
          setIsOpenPopUpEdit={setIsOpenPopUpEdit}
          isOpenPopUpDelete={isOpenPopUpDelete}
          setIsOpenPopUpDelete={setIsOpenPopUpDelete}
          setGetData={setGetData}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          limitPerPage={limitPerPage}
        />

        <PopUpAdd
          title="Tambah Tendik"
          icon={<GrUserAdmin />}
          isOpenPopUpAdd={isOpenPopUpAdd}
          setIsOpenPopUpAdd={setIsOpenPopUpAdd}
          className="overflow-y-auto"
        >
          <FormAddTendik
            selectRole={selectRole}
            setIsOpenPopUpAdd={setIsOpenPopUpAdd}
          />
        </PopUpAdd>

        <PopUpEdit
          title="Ubah Tendik"
          icon={<GrUserAdmin />}
          isOpenPopUpEdit={isOpenPopUpEdit}
          setIsOpenPopUpEdit={setIsOpenPopUpEdit}
          className="overflow-y-auto"
        >
          <FormEditTendik
            data={getData}
            selectRole={selectRole}
            setIsOpenPopUpEdit={setIsOpenPopUpEdit}
          />
        </PopUpEdit>

        <PopUpDelete
          title="Hapus Tendik"
          icon={<GrUserAdmin />}
          isOpenPopUpDelete={isOpenPopUpDelete}
          setIsOpenPopUpDelete={setIsOpenPopUpDelete}
        >
          <div className="flex flex-col gap-3">
            <h1>
              Apakah anda yakin menghapus{' '}
              <span className="font-bold">{getData?.nama}</span>?
            </h1>

            <div className="flex justify-end gap-2">
              <Button
                title="Batal"
                type="cancel"
                setIsOpenPopUp={setIsOpenPopUpDelete}
              />
              <Button
                title={isLoadingDelete ? <Loading /> : 'Hapus'}
                onClick={handleDelete}
              />
            </div>
          </div>
        </PopUpDelete>

        <PopUpDetail
          title="Detail Tendik"
          icon={<GrUserAdmin />}
          isOpenPopUpDetail={isOpenPopUpDetail}
          setIsOpenPopUpDetail={setIsOpenPopUpDetail}
        >
          <FormDetailTendik
            data={getData}
            setIsOpenPopUpDetail={setIsOpenPopUpDetail}
          />
        </PopUpDetail>
      </div>
    </Layout>
  );
};

export default Tendik;
