import React, { useState } from 'react';
import { MdDoNotDisturb } from 'react-icons/md';
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

import { useLocation, useNavigate } from 'react-router-dom';
import {
  useDeletePelanggaranMutation,
  useGetPelanggaranBySiswaQuery,
} from '../services/api/pelanggaranApiSlice';
import {
  FormDetailAddPelanggaran,
  FormDetailEditPelanggaran,
  TableDetailPelanggaran,
} from '../components/detail-pelanggaran';
import { useSelector } from 'react-redux';
import { selectCurrentModules } from '../services/features/authSlice';

const DetailPelanggaran = () => {
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
  } = useGetPelanggaranBySiswaQuery({
    siswa: id_siswa,
    page: currentPage,
    limit: limitPerPage,
  });

  const [deletePelanggaran] = useDeletePelanggaranMutation();

  const handleDelete = async () => {
    try {
      const response = await deletePelanggaran({
        id: getData?.id_pelanggaran,
      }).unwrap();
      if (!response.error) {
        toast.success('Pelanggaran berhasil dihapus!', {
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
            <h1 className="text-xl font-semibold md:text-2xl">
              Data pelanggaran
            </h1>
            <p>Nama siswa: {nama}</p>
            <p>NIPD: {nipd}</p>
          </div>

          <div
            onClick={() => {
              navigate(-1);
            }}
            className="cursor-pointer"
          >
            Back
          </div>
        </div>

        <div className={`flex flex-col sm:flex-row gap-3`}>
          {modulesAktivitas?.tambah && (
            <ButtonAdd
              title="Tambah pelanggaran"
              isOpenPopUpAdd={isOpenPopUpAdd}
              setIsOpenPopUpAdd={setIsOpenPopUpAdd}
            />
          )}
        </div>

        <TableDetailPelanggaran
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

        <PopUpAdd
          title="Tambah pelanggaran"
          icon={<MdDoNotDisturb />}
          isOpenPopUpAdd={isOpenPopUpAdd}
          setIsOpenPopUpAdd={setIsOpenPopUpAdd}
          className="md:max-w-xl"
        >
          <FormDetailAddPelanggaran
            siswa={id_siswa}
            isOpenPopUpAdd={isOpenPopUpAdd}
            setIsOpenPopUpAdd={setIsOpenPopUpAdd}
          />
        </PopUpAdd>

        <PopUpEdit
          title="Ubah pelanggaran"
          icon={<MdDoNotDisturb />}
          isOpenPopUpEdit={isOpenPopUpEdit}
          setIsOpenPopUpEdit={setIsOpenPopUpEdit}
          className="md:max-w-3xl"
        >
          <FormDetailEditPelanggaran
            setIsOpenPopUpEdit={setIsOpenPopUpEdit}
            data={getData}
          />
        </PopUpEdit>

        <PopUpDelete
          title="Hapus pelanggaran"
          icon={<MdDoNotDisturb />}
          isOpenPopUpDelete={isOpenPopUpDelete}
          setIsOpenPopUpDelete={setIsOpenPopUpDelete}
        >
          <div className="flex flex-col gap-3">
            <h1>Apakah anda yakin menghapus pelanggaran siswa ini?</h1>

            <div className="flex justify-end gap-2">
              <Button
                title="Batal"
                type="cancel"
                setIsOpenPopUp={setIsOpenPopUpDelete}
              />
              <Button title="Hapus" onClick={handleDelete} />
            </div>
          </div>
        </PopUpDelete>
      </div>
    </Layout>
  );
};

export default DetailPelanggaran;
