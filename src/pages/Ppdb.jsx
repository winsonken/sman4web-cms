import React, { useState } from 'react';
import { FaUserPlus } from 'react-icons/fa6';
import { toast } from 'react-toastify';
import {
  Button,
  ButtonAdd,
  ButtonCustom,
  Layout,
  PopUpAdd,
  PopUpAction,
  PopUpEdit,
  PopUpDelete,
  PopUpDetail,
  PopUpCustom,
  SelectFilter,
  SearchFilter,
  Loading,
} from '../components';

import {
  FormAddPpdb,
  FormEditPpdb,
  TablePpdb,
  DetailPpdb,
} from '../components/ppdb';

import {
  useDeletePPDBMutation,
  useGetPPDBQuery,
  useUpdatePindahPpdbMutation,
  useUpdateTerimaPpdbMutation,
  useUpdateTerimaSemuaPpdbMutation,
  useUpdateTolakPpdbMutation,
} from '../services/api/ppdbApiSlice';
import useDebounce from '../helpers/useDebounce';
import { useSelector } from 'react-redux';
import { selectCurrentModules } from '../services/features/authSlice';

const Ppdb = () => {
  const [searchFilterPpdb, setSearchFilterPpdb] = useState('');
  const debouncedSearchPpdb = useDebounce(searchFilterPpdb, 500);

  const [currentPage, setCurrentPage] = useState(1);
  const limitPerPage = 10;
  const [getData, setGetData] = useState([]);

  const {
    data: ppdb,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetPPDBQuery({
    q: debouncedSearchPpdb,
    page: currentPage,
    limit: limitPerPage,
  });

  const [isOpenPopUpAdd, setIsOpenPopUpAdd] = useState(false);
  const [isOpenPopUpEdit, setIsOpenPopUpEdit] = useState(false);
  const [isOpenPopUpDelete, setIsOpenPopUpDelete] = useState(false);
  const [isOpenPopUpDetail, setIsOpenPopUpDetail] = useState(false);
  const [isOpenPopUpTerimaPpdb, setIsOpenPopUpTerimaPpdb] = useState(false);
  const [isOpenPopUpTolakPpdb, setIsOpenPopUpTolakPpdb] = useState(false);
  const [isOpenPopUpTerimaSemua, setIsOpenPopUpTerimaSemua] = useState(false);
  const [isOpenPopUpPindahPpdb, setIsOpenPopUpPindahPpdb] = useState(false);

  const [deletePpdb, { isLoading: isLoadingDelete }] = useDeletePPDBMutation();

  const handleDelete = async () => {
    try {
      const response = await deletePpdb({ id: getData?.id_ppdb }).unwrap();
      if (!response.error) {
        toast.success('Ppdb berhasil dihapus!', {
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

  const [updateTerimaPpdb, { isLoading: isLoadingTerimaPpdb }] =
    useUpdateTerimaPpdbMutation();

  const handleTerimaPpdb = async () => {
    const payload = {
      id_ppdb: getData?.id_ppdb,
    };

    try {
      const response = await updateTerimaPpdb(payload).unwrap();

      if (!response.error) {
        toast.success('Ppdb berhasil diterima!', {
          position: 'top-right',
          theme: 'light',
        });
        setIsOpenPopUpTerimaPpdb(false);
      }
    } catch (error) {
      const errorMessage = error?.data?.message;
      toast.error(`${errorMessage}`, {
        position: 'top-right',
        theme: 'light',
      });
    }
  };

  const [updateTolakPpdb, { isLoading: isLoadingTolakPpdb }] =
    useUpdateTolakPpdbMutation();

  const handleTolakPpdb = async () => {
    const payload = {
      id_ppdb: getData?.id_ppdb,
    };

    try {
      const response = await updateTolakPpdb(payload).unwrap();

      if (!response.error) {
        toast.success('Ppdb berhasil ditolak!', {
          position: 'top-right',
          theme: 'light',
        });
        setIsOpenPopUpTolakPpdb(false);
      }
    } catch (error) {
      const errorMessage = error?.data?.message;
      toast.error(`${errorMessage}`, {
        position: 'top-right',
        theme: 'light',
      });
    }
  };

  const [updateTerimaSemua, { isLoading: isLoadingTerimaSemua }] =
    useUpdateTerimaSemuaPpdbMutation();

  const handleTerimaSemua = async () => {
    try {
      const response = await updateTerimaSemua().unwrap();

      if (!response.error) {
        toast.success('Semua ppdb berhasil diterima!', {
          position: 'top-right',
          theme: 'light',
        });
        setIsOpenPopUpTerimaSemua(false);
      }
    } catch (error) {
      const errorMessage = error?.data?.message;
      toast.error(`${errorMessage}`, {
        position: 'top-right',
        theme: 'light',
      });
    }
  };

  const [updatePindahPpdb, { isLoading: isLoadingPindahPpdb }] =
    useUpdatePindahPpdbMutation();

  const handlePindahPpdb = async () => {
    try {
      const response = await updatePindahPpdb().unwrap();

      if (!response.error) {
        toast.success('Semua ppdb berhasil dipindahkan!', {
          position: 'top-right',
          theme: 'light',
        });
        setIsOpenPopUpPindahPpdb(false);
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

  const modulesPpdb = filterModule('data_ppdb');
  return (
    <Layout>
      <div className="flex flex-col gap-5">
        <div>
          <h1 className="text-xl font-semibold md:text-2xl">
            PPDB (Penerimaan Peserta didik baru)
          </h1>
        </div>

        <div
          className={`flex flex-col sm:flex-row sm:justify-between gap-3 ${
            modulesPpdb?.tambah ? 'sm:justify-between' : 'sm:justify-end'
          }`}
        >
          {modulesPpdb?.tambah && (
            <ButtonAdd
              title="Tambah ppdb"
              isOpenPopUpAdd={isOpenPopUpAdd}
              setIsOpenPopUpAdd={setIsOpenPopUpAdd}
            />
          )}

          <div className="flex flex-col gap-3 sm:w-1/2 sm:flex-row 2xl:w-1/3 justify-end ">
            <div className="sm:w-1/2">
              <SearchFilter
                searchValue={searchFilterPpdb}
                setSearchValue={setSearchFilterPpdb}
              />
            </div>
          </div>
        </div>
        {modulesPpdb?.ubah && (
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
            <ButtonCustom
              title="Terima semua"
              setIsOpenPopUp={setIsOpenPopUpTerimaSemua}
            />
            <ButtonCustom
              title="Pindahkan ppdb"
              setIsOpenPopUp={setIsOpenPopUpPindahPpdb}
            />
          </div>
        )}

        <TablePpdb
          data={ppdb}
          isLoading={isLoading}
          isSuccess={isSuccess}
          isError={isError}
          error={error}
          modules={modulesPpdb}
          isOpenPopUpTerimaPpdb={isOpenPopUpTerimaPpdb}
          setIsOpenPopUpTerimaPpdb={setIsOpenPopUpTerimaPpdb}
          isOpenPopUpTolakPpdb={isOpenPopUpTolakPpdb}
          setIsOpenPopUpTolakPpdb={setIsOpenPopUpTolakPpdb}
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
          title="Tambah ppdb"
          icon={<FaUserPlus />}
          isOpenPopUpAdd={isOpenPopUpAdd}
          setIsOpenPopUpAdd={setIsOpenPopUpAdd}
          className="xl:w-2/3"
        >
          <FormAddPpdb setIsOpenPopUpAdd={setIsOpenPopUpAdd} />
        </PopUpAdd>

        <PopUpEdit
          title="Ubah ppdb"
          icon={<FaUserPlus />}
          isOpenPopUpEdit={isOpenPopUpEdit}
          setIsOpenPopUpEdit={setIsOpenPopUpEdit}
          className="xl:w-2/3"
        >
          <FormEditPpdb
            setIsOpenPopUpEdit={setIsOpenPopUpEdit}
            data={getData}
          />
        </PopUpEdit>

        <PopUpDelete
          title="Hapus ppdb"
          icon={<FaUserPlus />}
          isOpenPopUpDelete={isOpenPopUpDelete}
          setIsOpenPopUpDelete={setIsOpenPopUpDelete}
        >
          <div className="flex flex-col gap-3">
            <h1>Apakah anda yakin menghapus nama-ppdb ini?</h1>

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
          title="Detail PPDB"
          icon={<FaUserPlus />}
          isOpenPopUpDetail={isOpenPopUpDetail}
          setIsOpenPopUpDetail={setIsOpenPopUpDetail}
          className="xl:w-2/3"
        >
          <div>
            <DetailPpdb data={getData} />
          </div>
        </PopUpDetail>

        <PopUpAction
          title="Terima ppdb"
          icon={<FaUserPlus />}
          isOpenPopUp={isOpenPopUpTerimaPpdb}
          setIsOpenPopUp={setIsOpenPopUpTerimaPpdb}
          className="md:max-w-xl"
        >
          <div className="flex flex-col gap-3">
            <h1>Apakah anda yakin menerima ppdb ini?</h1>

            <div className="flex justify-end gap-2">
              <Button
                title="Batal"
                type="cancel"
                setIsOpenPopUp={setIsOpenPopUpTerimaPpdb}
              />
              <Button
                title={isLoadingTerimaPpdb ? <Loading /> : 'Simpan'}
                onClick={handleTerimaPpdb}
              />
            </div>
          </div>
        </PopUpAction>

        <PopUpAction
          title="Tolak ppdb"
          icon={<FaUserPlus />}
          isOpenPopUp={isOpenPopUpTolakPpdb}
          setIsOpenPopUp={setIsOpenPopUpTolakPpdb}
          className="md:max-w-xl"
        >
          <div className="flex flex-col gap-3">
            <h1>Apakah anda yakin menolak ppdb ini?</h1>

            <div className="flex justify-end gap-2">
              <Button
                title="Batal"
                type="cancel"
                setIsOpenPopUp={setIsOpenPopUpTolakPpdb}
              />
              <Button
                title={isLoadingTolakPpdb ? <Loading /> : 'Simpan'}
                onClick={handleTolakPpdb}
              />
            </div>
          </div>
        </PopUpAction>

        <PopUpCustom
          title="Terima semua ppdb"
          icon={<FaUserPlus />}
          isOpenPopUp={isOpenPopUpTerimaSemua}
          setIsOpenPopUp={setIsOpenPopUpTerimaSemua}
          className="md:max-w-xl"
        >
          <div className="flex flex-col gap-3">
            <h1>Apakah anda yakin menerima semua ppdb ini?</h1>

            <div className="flex justify-end gap-2">
              <Button
                title="Batal"
                type="cancel"
                setIsOpenPopUp={setIsOpenPopUpTerimaSemua}
              />
              <Button
                title={isLoadingTerimaSemua ? <Loading /> : 'Simpan'}
                onClick={handleTerimaSemua}
              />
            </div>
          </div>
        </PopUpCustom>

        <PopUpCustom
          title="Pindah semua ppdb"
          icon={<FaUserPlus />}
          isOpenPopUp={isOpenPopUpPindahPpdb}
          setIsOpenPopUp={setIsOpenPopUpPindahPpdb}
          className="md:max-w-xl"
        >
          <div className="flex flex-col gap-3">
            <h1>
              Apakah anda yakin memindahkan semua ppdb ini sebagai siswa baru?
            </h1>

            <div className="flex justify-end gap-2">
              <Button
                title="Batal"
                type="cancel"
                setIsOpenPopUp={setIsOpenPopUpPindahPpdb}
              />
              <Button
                title={isLoadingPindahPpdb ? <Loading /> : 'Simpan'}
                onClick={handlePindahPpdb}
              />
            </div>
          </div>
        </PopUpCustom>
      </div>
    </Layout>
  );
};

export default Ppdb;
