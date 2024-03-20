import React, { useState } from 'react';

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
  FormAddPelanggaran,
  FormEditPelanggaran,
  DetailPelanggaran,
  TablePelanggaran,
} from '../components/pelanggaran';

import { useGetAngkatanQuery } from '../services/api/angkatanApiSlice';
const Pelanggaran = () => {
  const [isOpenPopUpAdd, setIsOpenPopUpAdd] = useState(false);
  const [isOpenPopUpEdit, setIsOpenPopUpEdit] = useState(false);
  const [isOpenPopUpDelete, setIsOpenPopUpDelete] = useState(false);
  const [isOpenPopUpDetail, setIsOpenPopUpDetail] = useState(false);
  const [isOpenPopUpMulai, setIsOpenPopUpMulai] = useState(false);
  const [isOpenPopUpLulus, setIsOpenPopUpLulus] = useState(false);

  const dummyData = [];
  return (
    <Layout>
      <div className="flex flex-col gap-5">
        <div>
          <h1 className="text-xl font-semibold md:text-2xl">Pelanggaran</h1>
        </div>
        <div className="flex flex-col sm:flex-row sm:justify-between gap-3">
          <ButtonAdd
            title="Tambah pelanggaran"
            isOpenPopUpAdd={isOpenPopUpAdd}
            setIsOpenPopUpAdd={setIsOpenPopUpAdd}
          />

          <div className="flex flex-col gap-3 sm:w-1/2 sm:flex-row 2xl:w-1/3 justify-end ">
            <div className="sm:w-1/2">
              <SearchFilter />
            </div>
          </div>
        </div>

        <TablePelanggaran
          data={dummyData}
          // isLoading={isLoading}
          // isSuccess={isSuccess}
          // isError={isError}
          // error={error}
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
        />

        <PopUpAdd
          title="Tambah pelanggaran"
          icon={<MdDoNotDisturb />}
          isOpenPopUpAdd={isOpenPopUpAdd}
          setIsOpenPopUpAdd={setIsOpenPopUpAdd}
          className=""
        >
          <FormAddPelanggaran setIsOpenPopUpAdd={setIsOpenPopUpAdd} />
        </PopUpAdd>
        <PopUpEdit
          title="Ubah pelanggaran"
          icon={<MdDoNotDisturb />}
          isOpenPopUpEdit={isOpenPopUpEdit}
          setIsOpenPopUpEdit={setIsOpenPopUpEdit}
        >
          <FormEditPelanggaran setIsOpenPopUpEdit={setIsOpenPopUpEdit} />
        </PopUpEdit>

        <PopUpDelete
          title="Hapus pelanggaran"
          icon={<MdDoNotDisturb />}
          isOpenPopUpDelete={isOpenPopUpDelete}
          setIsOpenPopUpDelete={setIsOpenPopUpDelete}
        >
          <div className="flex flex-col gap-3">
            <h1>Apakah anda yakin menghapus pelanggaran nama-siswa ini?</h1>

            <div className="flex justify-end gap-2">
              <Button
                title="Batal"
                type="cancel"
                setIsOpenPopUp={setIsOpenPopUpDelete}
              />
              <Button title="Hapus" type="submit" />
            </div>
          </div>
        </PopUpDelete>

        <PopUpDetail
          title="Detail pelanggaran"
          icon={<MdDoNotDisturb />}
          isOpenPopUpDetail={isOpenPopUpDetail}
          setIsOpenPopUpDetail={setIsOpenPopUpDetail}
        >
          <div>
            <DetailPelanggaran />
          </div>
        </PopUpDetail>
      </div>
    </Layout>
  );
};

export default Pelanggaran;
