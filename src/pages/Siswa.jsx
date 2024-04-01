import React, { useState } from 'react';

import { PiUsersThreeFill } from 'react-icons/pi';

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
  FormAddSiswa,
  FormEditSiswa,
  FormDetailSiswa,
  TableSiswa,
} from '../components/siswa';

const Siswa = () => {
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
          <h1 className="text-xl font-semibold md:text-2xl">Siswa</h1>
        </div>

        <div className="flex flex-col sm:flex-row sm:justify-between gap-3">
            <ButtonAdd
              title="Tambah Siswa"
              isOpenPopUpAdd={isOpenPopUpAdd}
              setIsOpenPopUpAdd={setIsOpenPopUpAdd}
            />

          <div className="flex flex-col gap-3 sm:w-1/2 sm:flex-row 2xl:w-1/2  ">
            <div className="sm:w-1/2">
              <SelectFilter placeholder="Pilih Angkatan" />
            </div>
            <div className="sm:w-1/2">
              <SelectFilter placeholder="Pilih Kelas" />
            </div>
            <div className="sm:w-1/2">
              <SearchFilter />
            </div>
          </div>
        </div>

        <TableSiswa
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
          title="Tambah siswa"
          icon={<PiUsersThreeFill />}
          isOpenPopUpAdd={isOpenPopUpAdd}
          setIsOpenPopUpAdd={setIsOpenPopUpAdd}
        >
          <FormAddSiswa setIsOpenPopUpAdd={setIsOpenPopUpAdd} />
        </PopUpAdd>

        <PopUpEdit
          title="Ubah siswa"
          icon={<PiUsersThreeFill />}
          isOpenPopUpEdit={isOpenPopUpEdit}
          setIsOpenPopUpEdit={setIsOpenPopUpEdit}
        >
          <FormEditSiswa setIsOpenPopUpEdit={setIsOpenPopUpEdit} />
        </PopUpEdit>

        <PopUpDelete
          title="Hapus siswa"
          icon={<PiUsersThreeFill />}
          isOpenPopUpDelete={isOpenPopUpDelete}
          setIsOpenPopUpDelete={setIsOpenPopUpDelete}
        >
          <div className="flex flex-col gap-3">
            <h1>Apakah anda yakin menghapus siswa bernama kurniawan?</h1>

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
          title="Detail siswa"
          icon={<PiUsersThreeFill />}
          isOpenPopUpDetail={isOpenPopUpDetail}
          setIsOpenPopUpDetail={setIsOpenPopUpDetail}
        >
           <FormDetailSiswa setIsOpenPopUpDetail={setIsOpenPopUpDetail} />
        </PopUpDetail>
      </div>
    </Layout>
  );
};

export default Siswa;
