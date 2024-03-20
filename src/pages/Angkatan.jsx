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

import {
  FormAddAngkatan,
  FormEditAngkatan,
  TableAngkatan,
} from '../components/angkatan';

import {
  useDeleteAngkatanMutation,
  useGetAngkatanQuery,
} from '../services/api/angkatanApiSlice';

const Angkatan = () => {
  const [isOpenPopUpAdd, setIsOpenPopUpAdd] = useState(false);
  const [isOpenPopUpEdit, setIsOpenPopUpEdit] = useState(false);
  const [isOpenPopUpDelete, setIsOpenPopUpDelete] = useState(false);
  const [isOpenPopUpDetail, setIsOpenPopUpDetail] = useState(false);
  const [isOpenPopUpMulai, setIsOpenPopUpMulai] = useState(false);
  const [isOpenPopUpLulus, setIsOpenPopUpLulus] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const limitPerPage = 5;
  const [editData, setEditData] = useState([]);

  const {
    data: angkatan,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetAngkatanQuery({ page: currentPage, limit: limitPerPage });

  const [deleteAngkatan, { isLoadingDelete, isErrorDelete, errorDelete }] =
    useDeleteAngkatanMutation();

  const handleDelete = async () => {
    try {
      const response = await deleteAngkatan({
        id: editData?.id_angkatan,
      }).unwrap();
      if (!response.error) {
        toast.success('Angkatan berhasil dihapus!', {
          position: 'top-right',
          theme: 'light',
        });
      }
    } catch (error) {
      toast.error('Angkatan gagal  diubah!', {
        position: 'top-right',
        theme: 'light',
      });
    }
  };

  return (
    <Layout>
      <div className="flex flex-col gap-5">
        <div>
          <h1 className="text-xl font-semibold md:text-2xl">Angkatan</h1>
        </div>

        <div className="flex flex-col sm:flex-row sm:justify-between gap-3">
          <ButtonAdd
            title="Tambah angkatan"
            isOpenPopUpAdd={isOpenPopUpAdd}
            setIsOpenPopUpAdd={setIsOpenPopUpAdd}
          />

          <div className="flex flex-col gap-3 sm:w-1/2 sm:flex-row 2xl:w-1/3  ">
            <div className="sm:w-1/2">
              <SelectFilter placeholder="Select angkatan" />
            </div>
            <div className="sm:w-1/2">
              <SearchFilter />
            </div>
          </div>
        </div>

        <TableAngkatan
          data={angkatan}
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
          setEditData={setEditData}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          limitPerPage={limitPerPage}
        />

        <PopUpAdd
          title="Tambah angkatan"
          icon={<MdStairs />}
          isOpenPopUpAdd={isOpenPopUpAdd}
          setIsOpenPopUpAdd={setIsOpenPopUpAdd}
        >
          <FormAddAngkatan setIsOpenPopUpAdd={setIsOpenPopUpAdd} />
        </PopUpAdd>

        <PopUpEdit
          title="Ubah angkatan"
          icon={<MdStairs />}
          isOpenPopUpEdit={isOpenPopUpEdit}
          setIsOpenPopUpEdit={setIsOpenPopUpEdit}
        >
          <FormEditAngkatan
            setIsOpenPopUpEdit={setIsOpenPopUpEdit}
            data={editData}
          />
        </PopUpEdit>

        <PopUpDelete
          title="Hapus angkatan"
          icon={<MdStairs />}
          isOpenPopUpDelete={isOpenPopUpDelete}
          setIsOpenPopUpDelete={setIsOpenPopUpDelete}
        >
          <div className="flex flex-col gap-3">
            <h1>Apakah anda yakin menghapus data angkatan ini?</h1>

            <div className="flex justify-end gap-2">
              <Button
                title="Batal"
                type="cancel"
                setIsOpenPopUp={setIsOpenPopUpDelete}
              />
              <Button title="Hapus" />
            </div>
          </div>
        </PopUpDelete>

        <PopUpDetail
          title="Detail angkatan"
          icon={<MdStairs />}
          isOpenPopUpDetail={isOpenPopUpDetail}
          setIsOpenPopUpDetail={setIsOpenPopUpDetail}
        >
          <div>Bagian ini ganti jadi file contoh: DetailAngkatan.jsx</div>
        </PopUpDetail>

        <PopUpAction
          title="Luluskan angkatan"
          icon={<MdStairs />}
          isOpenPopUp={isOpenPopUpLulus}
          setIsOpenPopUp={setIsOpenPopUpLulus}
        >
          <div className="flex flex-col gap-3">
            <h1>Apakah anda yakin meluluskan angkatan ini?</h1>

            <div className="flex justify-end gap-2">
              <Button
                title="Batal"
                type="cancel"
                setIsOpenPopUp={setIsOpenPopUpLulus}
              />
              <Button title="Simpan" type="submit" />
            </div>
          </div>
        </PopUpAction>

        <PopUpAction
          title="Mulai angkatan"
          icon={<MdStairs />}
          isOpenPopUp={isOpenPopUpMulai}
          setIsOpenPopUp={setIsOpenPopUpMulai}
        >
          <div className="flex flex-col gap-3">
            <h1>Apakah anda yakin memulai pembelajaran angkatan ini?</h1>

            <div className="flex justify-end gap-2">
              <Button
                title="Batal"
                type="cancel"
                setIsOpenPopUp={setIsOpenPopUpMulai}
              />
              <Button title="Simpan" type="submit" />
            </div>
          </div>
        </PopUpAction>
      </div>
    </Layout>
  );
};

export default Angkatan;
