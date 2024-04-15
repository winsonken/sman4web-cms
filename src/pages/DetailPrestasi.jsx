import React, { useState } from 'react';
import { FaMedal } from 'react-icons/fa6';
import { IoMdArrowRoundBack } from 'react-icons/io';
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
} from '../components';
import {
  FormDetailAddPrestasi,
  FormDetailEditPrestasi,
  TableDetailPrestasi,
} from '../components/detail-prestasi';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  useDeletePrestasiMutation,
  useGetPrestasiBySiswaQuery,
} from '../services/api/prestasiApiSlice';
import { useSelector } from 'react-redux';
import { selectCurrentModules } from '../services/features/authSlice';

const DetailPrestasi = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const limitPerPage = 10;

  const location = useLocation();
  const state = location.state;
  const { id_siswa, nama, nipd } = state;

  const navigate = useNavigate();

  const [isOpenPopUpAdd, setIsOpenPopUpAdd] = useState(false);
  const [isOpenPopUpEdit, setIsOpenPopUpEdit] = useState(false);
  const [isOpenPopUpDelete, setIsOpenPopUpDelete] = useState(false);
  const [getData, setGetData] = useState([]);

  const {
    data: pelanggaran,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetPrestasiBySiswaQuery({
    siswa: id_siswa,
    page: currentPage,
    limit: limitPerPage,
  });

  const [deletePrestasi, { isLoading: isLoadingDelete }] =
    useDeletePrestasiMutation();

  const handleDelete = async () => {
    try {
      const response = await deletePrestasi({
        id: getData?.id_prestasi,
      }).unwrap();
      if (!response.error) {
        toast.success('Prestasi berhasil dihapus!', {
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

  const modulesAktivitas = filterModule('data_aktivitas');

  return (
    <Layout>
      <div className="flex flex-col gap-5">
        <div className="flex justify-between">
          <div>
            <h1 className="text-xl font-semibold md:text-2xl">Data prestasi</h1>
            <p>Nama siswa: {nama}</p>
            <p>NIPD: {nipd}</p>
          </div>

          <div
            onClick={() => {
              navigate(-1);
            }}
            className="cursor-pointer w-fit h-fit text-2xl"
          >
            <IoMdArrowRoundBack />
          </div>
        </div>

        <div className={`flex flex-col sm:flex-row gap-3`}>
          {modulesAktivitas?.tambah && (
            <ButtonAdd
              title="Tambah prestasi"
              isOpenPopUpAdd={isOpenPopUpAdd}
              setIsOpenPopUpAdd={setIsOpenPopUpAdd}
            />
          )}
        </div>

        <TableDetailPrestasi
          data={pelanggaran}
          isLoading={isLoading}
          isSuccess={isSuccess}
          isError={isError}
          error={error}
          modules={modulesAktivitas}
          isOpenPopUpEdit={isOpenPopUpEdit}
          setIsOpenPopUpEdit={setIsOpenPopUpEdit}
          isOpenPopUpDelete={isOpenPopUpDelete}
          setIsOpenPopUpDelete={setIsOpenPopUpDelete}
          setGetData={setGetData}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          limitPerPage={limitPerPage}
        />
      </div>

      <PopUpAdd
        title="Tambah prestasi"
        icon={<FaMedal />}
        isOpenPopUpAdd={isOpenPopUpAdd}
        setIsOpenPopUpAdd={setIsOpenPopUpAdd}
        className="md:max-w-3xl"
      >
        <FormDetailAddPrestasi
          siswa={id_siswa}
          isOpenPopUpAdd={isOpenPopUpAdd}
          setIsOpenPopUpAdd={setIsOpenPopUpAdd}
        />
      </PopUpAdd>

      <PopUpEdit
        title="Ubah prestasi"
        icon={<FaMedal />}
        isOpenPopUpEdit={isOpenPopUpEdit}
        setIsOpenPopUpEdit={setIsOpenPopUpEdit}
        className="md:max-w-3xl"
      >
        <FormDetailEditPrestasi
          setIsOpenPopUpEdit={setIsOpenPopUpEdit}
          data={getData}
        />
      </PopUpEdit>

      <PopUpDelete
        title="Hapus prestasi"
        icon={<FaMedal />}
        isOpenPopUpDelete={isOpenPopUpDelete}
        setIsOpenPopUpDelete={setIsOpenPopUpDelete}
      >
        <div className="flex flex-col gap-3">
          <h1>Apakah anda yakin menghapus prestasi siswa ini?</h1>

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
    </Layout>
  );
};

export default DetailPrestasi;
