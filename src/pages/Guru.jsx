import React, { useState } from 'react';

import { FaChalkboardTeacher } from 'react-icons/fa';
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

import {
  FormAddGuru,
  FormEditGuru,
  FormDetailGuru,
  TableGuru,
} from '../components/guru';
import {
  useDeleteGuruMutation,
  useGetGuruQuery,
} from '../services/api/guruApiSlice';
import useDebounce from '../helpers/useDebounce';
import { useSelector } from 'react-redux';
import { selectCurrentModules } from '../services/features/authSlice';

const Guru = () => {
  const [searchFilterGuru, setSearchFilterGuru] = useState('');
  const debouncedSearchGuru = useDebounce(searchFilterGuru, 500);

  const [isOpenPopUpAdd, setIsOpenPopUpAdd] = useState(false);
  const [isOpenPopUpEdit, setIsOpenPopUpEdit] = useState(false);
  const [isOpenPopUpDelete, setIsOpenPopUpDelete] = useState(false);
  const [isOpenPopUpDetail, setIsOpenPopUpDetail] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const limitPerPage = 10;
  const [getData, setGetData] = useState([]);

  const {
    data: guru,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetGuruQuery({
    q: debouncedSearchGuru,
    page: currentPage,
    limit: limitPerPage,
  });

  const [deleteGuru, { isLoading: isLoadingDelete }] = useDeleteGuruMutation();

  const handleDelete = async () => {
    try {
      const response = await deleteGuru({
        id: getData?.id_guru,
      }).unwrap();
      if (!response.error) {
        toast.success('Guru berhasil dihapus!', {
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

  const modulesGuru = filterModule('data_guru');

  return (
    <Layout>
      <div className="flex flex-col gap-5">
        <div>
          <h1 className="text-xl font-semibold md:text-2xl">Guru</h1>
        </div>

        <div
          className={`flex flex-col sm:flex-row sm:justify-between gap-3 ${
            modulesGuru?.tambah ? 'sm:justify-between' : 'sm:justify-end'
          }`}
        >
          {modulesGuru?.tambah && (
            <ButtonAdd
              title="Tambah Guru"
              isOpenPopUpAdd={isOpenPopUpAdd}
              setIsOpenPopUpAdd={setIsOpenPopUpAdd}
            />
          )}

          <div className="w-full duration-100 sm:w-1/2 md:w-1/5">
            <SearchFilter
              searchValue={searchFilterGuru}
              setSearchValue={setSearchFilterGuru}
            />
          </div>
        </div>

        <TableGuru
          data={guru}
          isLoading={isLoading}
          isSuccess={isSuccess}
          isError={isError}
          error={error}
          modules={modulesGuru}
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
          title="Tambah Guru"
          icon={<FaChalkboardTeacher />}
          isOpenPopUpAdd={isOpenPopUpAdd}
          setIsOpenPopUpAdd={setIsOpenPopUpAdd}
          className="overflow-y-auto"
        >
          <FormAddGuru setIsOpenPopUpAdd={setIsOpenPopUpAdd} />
        </PopUpAdd>

        <PopUpEdit
          title="Ubah Guru"
          icon={<FaChalkboardTeacher />}
          isOpenPopUpEdit={isOpenPopUpEdit}
          setIsOpenPopUpEdit={setIsOpenPopUpEdit}
          className="overflow-y-auto"
        >
          <FormEditGuru
            data={getData}
            setIsOpenPopUpEdit={setIsOpenPopUpEdit}
          />
        </PopUpEdit>

        <PopUpDelete
          title="Hapus guru"
          icon={<FaChalkboardTeacher />}
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
          title="Detail Guru"
          icon={<FaChalkboardTeacher />}
          isOpenPopUpDetail={isOpenPopUpDetail}
          setIsOpenPopUpDetail={setIsOpenPopUpDetail}
        >
          <FormDetailGuru
            data={getData}
            setIsOpenPopUpDetail={setIsOpenPopUpDetail}
          />
        </PopUpDetail>
      </div>
    </Layout>
  );
};

export default Guru;
