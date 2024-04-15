import React, { useState } from 'react';

import { FaCalendar } from 'react-icons/fa';
import { toast } from 'react-toastify';

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
  Loading,
} from '../components';
import {
  FormAddTahunajaran,
  FormEditTahunajaran,
  TableTahunAjaran,
  TableTahunAjaranBerakhir,
} from '../components/tahun-ajaran';
import {
  useDeleteTahunAjaranMutation,
  useGetTahunAjaranBerakhirQuery,
  useGetTahunAjaranQuery,
  useUpdateMulaiAjaranMutation,
  useUpdateSelesaiAjaranMutation,
} from '../services/api/tahunAjaranApiSlice';

import useDebounce from '../helpers/useDebounce';
import { useSelector } from 'react-redux';
import { selectCurrentModules } from '../services/features/authSlice';

const Tahunajaran = () => {
  const [searchFilterTahunAjaran, setSearchFilterTahunAjaran] = useState('');
  const debouncedSearchTahunAjaran = useDebounce(searchFilterTahunAjaran, 500);

  const [searchFilterTABerakhir, setSearchFilterTABerakhir] = useState('');
  const debouncedSearchTABerakhir = useDebounce(searchFilterTABerakhir, 500);

  const [isOpenPopUpAdd, setIsOpenPopUpAdd] = useState(false);
  const [isOpenPopUpEdit, setIsOpenPopUpEdit] = useState(false);
  const [isOpenPopUpDelete, setIsOpenPopUpDelete] = useState(false);
  const [isOpenPopUpMulai, setIsOpenPopUpMulai] = useState(false);
  const [isOpenPopUpSelesai, setIsOpenPopUpSelesai] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const limitPerPage = 3;

  const [currentPageTABerakhir, setCurrentPageTABerakhir] = useState(1);
  const limitPerPageTABerakhir = 10;

  const [getData, setGetData] = useState([]);

  const {
    data: tahunAjaran,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetTahunAjaranQuery({
    q: debouncedSearchTahunAjaran,
    page: currentPage,
    limit: limitPerPage,
  });

  const {
    data: tahunAjaranBerakhir,
    isLoading: isLoadingTABerakhir,
    isSuccess: isSuccessTABerakhir,
    isError: isErrorTABerakhir,
    error: errorTABerakhir,
  } = useGetTahunAjaranBerakhirQuery({
    q: debouncedSearchTABerakhir,
    page: currentPageTABerakhir,
    limit: limitPerPageTABerakhir,
  });

  const [deleteTahunAjaran, { isLoading: isLoadingDelete }] =
    useDeleteTahunAjaranMutation();

  const handleDelete = async () => {
    try {
      const response = await deleteTahunAjaran({
        id: getData?.id_tahun_ajaran,
      }).unwrap();
      if (!response.error) {
        toast.success('Tahun ajaran berhasil dihapus!', {
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

  const [updateMulaiAjaran, { isLoading: isLoadingMulaiAjaran }] =
    useUpdateMulaiAjaranMutation();

  const handleMulaiTahunAjaran = async () => {
    const payload = {
      id_tahun_ajaran: getData?.id_tahun_ajaran,
    };

    try {
      const response = await updateMulaiAjaran(payload).unwrap();

      if (!response.error) {
        toast.success('Tahun ajaran berhasil dimulai!', {
          position: 'top-right',
          theme: 'light',
        });
        setIsOpenPopUpMulai(false);
      }
    } catch (error) {
      const errorMessage = error?.data?.message;
      toast.error(`${errorMessage}`, {
        position: 'top-right',
        theme: 'light',
      });
    }
  };

  const [updateSelesaiAjaran, { isLoading: isLoadingSelesaiAjaran }] =
    useUpdateSelesaiAjaranMutation();

  const handleSelesaiTahunAjaran = async () => {
    const payload = {
      id_tahun_ajaran: getData?.id_tahun_ajaran,
    };

    try {
      const response = await updateSelesaiAjaran(payload).unwrap();

      if (!response.error) {
        toast.success('Tahun ajaran berhasil diakhiri!', {
          position: 'top-right',
          theme: 'light',
        });
        setIsOpenPopUpSelesai(false);
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

  const modulesTahunAjaran = filterModule('data_tahun_ajaran');

  return (
    <Layout>
      <div className="flex flex-col gap-5">
        <div>
          <h1 className="text-xl font-semibold md:text-2xl">Tahun Ajaran</h1>
        </div>

        <div
          className={`flex flex-col sm:flex-row gap-3 ${
            modulesTahunAjaran?.tambah ? 'sm:justify-between' : 'sm:justify-end'
          }`}
        >
          {modulesTahunAjaran?.tambah && (
            <ButtonAdd
              title="Tambah tahun ajaran"
              isOpenPopUpAdd={isOpenPopUpAdd}
              setIsOpenPopUpAdd={setIsOpenPopUpAdd}
            />
          )}

          <div className="w-full duration-100 sm:w-1/2 md:w-1/5">
            <SearchFilter
              searchValue={searchFilterTahunAjaran}
              setSearchValue={setSearchFilterTahunAjaran}
            />
          </div>
        </div>

        <TableTahunAjaran
          data={tahunAjaran}
          isLoading={isLoading}
          isSuccess={isSuccess}
          isError={isError}
          error={error}
          modules={modulesTahunAjaran}
          isOpenPopUpMulai={isOpenPopUpMulai}
          setIsOpenPopUpMulai={setIsOpenPopUpMulai}
          isOpenPopUpSelesai={isOpenPopUpSelesai}
          setIsOpenPopUpSelesai={setIsOpenPopUpSelesai}
          isOpenPopUpEdit={isOpenPopUpEdit}
          setIsOpenPopUpEdit={setIsOpenPopUpEdit}
          isOpenPopUpDelete={isOpenPopUpDelete}
          setIsOpenPopUpDelete={setIsOpenPopUpDelete}
          setGetData={setGetData}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          limitPerPage={limitPerPage}
        />

        <div className="flex flex-col gap-5 mt-5">
          <h1 className="text-xl font-semibold md:text-2xl">
            Tahun Ajaran Berakhir
          </h1>

          <div className="flex sm:justify-end">
            <div className="w-full sm:w-1/2 duration-100 md:w-1/3 2xl:w-1/5">
              <SearchFilter
                searchValue={searchFilterTABerakhir}
                setSearchValue={setSearchFilterTABerakhir}
              />
            </div>
          </div>

          <TableTahunAjaranBerakhir
            data={tahunAjaranBerakhir}
            isLoading={isLoadingTABerakhir}
            isSuccess={isSuccessTABerakhir}
            isError={isErrorTABerakhir}
            error={errorTABerakhir}
            currentPage={currentPageTABerakhir}
            setCurrentPage={setCurrentPageTABerakhir}
            limitPerPage={limitPerPageTABerakhir}
          />
        </div>

        <PopUpAdd
          title="Tambah tahun ajaran"
          icon={<FaCalendar />}
          isOpenPopUpAdd={isOpenPopUpAdd}
          setIsOpenPopUpAdd={setIsOpenPopUpAdd}
          className="md:max-w-3xl"
        >
          <FormAddTahunajaran setIsOpenPopUpAdd={setIsOpenPopUpAdd} />
        </PopUpAdd>

        <PopUpEdit
          title="Ubah Tahun ajaran"
          icon={<FaCalendar />}
          isOpenPopUpEdit={isOpenPopUpEdit}
          setIsOpenPopUpEdit={setIsOpenPopUpEdit}
          className="md:max-w-3xl"
        >
          <FormEditTahunajaran
            setIsOpenPopUpEdit={setIsOpenPopUpEdit}
            data={getData}
          />
        </PopUpEdit>

        <PopUpDelete
          title="Hapus Tahun Ajaran"
          icon={<FaCalendar />}
          isOpenPopUpDelete={isOpenPopUpDelete}
          setIsOpenPopUpDelete={setIsOpenPopUpDelete}
        >
          <div className="flex flex-col gap-3">
            <h1>
              Apakah anda yakin menghapus tahun ajaran{' '}
              <span className="font-bold">
                {getData?.tahun_mulai_ajaran}-{getData?.tahun_akhir_ajaran}
              </span>
              ?
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

        <PopUpAction
          title="Mulai tahun ajaran"
          icon={<FaCalendar />}
          isOpenPopUp={isOpenPopUpMulai}
          setIsOpenPopUp={setIsOpenPopUpMulai}
          className="md:max-w-xl"
        >
          <div className="flex flex-col gap-3">
            <h1>
              Apakah anda yakin memulai tahun ajaran{' '}
              <span className="font-bold">
                {getData?.tahun_mulai_ajaran}-{getData?.tahun_akhir_ajaran}
              </span>
              ?
            </h1>

            <div className="flex justify-end gap-2">
              <Button
                title="Batal"
                type="cancel"
                setIsOpenPopUp={setIsOpenPopUpMulai}
              />
              <Button
                title={isLoadingMulaiAjaran ? <Loading /> : 'Simpan'}
                onClick={handleMulaiTahunAjaran}
              />
            </div>
          </div>
        </PopUpAction>

        <PopUpAction
          title="Akhiri tahun ajaran"
          icon={<FaCalendar />}
          isOpenPopUp={isOpenPopUpSelesai}
          setIsOpenPopUp={setIsOpenPopUpSelesai}
          className="md:max-w-xl"
        >
          <div className="flex flex-col gap-3">
            <h1>
              Apakah anda yakin mengakhiri tahun ajaran{' '}
              <span className="font-bold">
                {getData?.tahun_mulai_ajaran}-{getData?.tahun_akhir_ajaran}
              </span>
              ?
            </h1>

            <div className="flex justify-end gap-2">
              <Button
                title="Batal"
                type="cancel"
                setIsOpenPopUp={setIsOpenPopUpSelesai}
              />
              <Button
                title={isLoadingSelesaiAjaran ? <Loading /> : 'Simpan'}
                onClick={handleSelesaiTahunAjaran}
              />
            </div>
          </div>
        </PopUpAction>
      </div>
    </Layout>
  );
};

export default Tahunajaran;
