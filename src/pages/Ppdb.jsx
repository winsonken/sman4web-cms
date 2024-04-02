import React, { useState } from 'react';
import { FaUserPlus } from 'react-icons/fa6';

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
  FormAddPpdb,
  FormEditPpdb,
  TablePpdb,
  DetailPpdb,
} from '../components/ppdb';

import { useGetAngkatanQuery } from '../services/api/angkatanApiSlice';

const Ppdb = () => {
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
          <h1 className="text-xl font-semibold md:text-2xl">
            PPDB (Penerimaan Peserta didik baru)
          </h1>
        </div>

        <div className="flex flex-col sm:flex-row sm:justify-between gap-3">
          <ButtonAdd
            title="Tambah ppdb"
            isOpenPopUpAdd={isOpenPopUpAdd}
            setIsOpenPopUpAdd={setIsOpenPopUpAdd}
          />

          <div className="flex flex-col gap-3 sm:w-1/2 sm:flex-row 2xl:w-1/3 justify-end ">
            <div className="sm:w-1/2">
              <SearchFilter />
            </div>
          </div>
        </div>

        <TablePpdb
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
          <FormEditPpdb setIsOpenPopUpEdit={setIsOpenPopUpEdit} />
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
              <Button title="Hapus" type="submit" />
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
            <DetailPpdb />
          </div>
        </PopUpDetail>

        <PopUpAction
          title="Terima ppdb"
          icon={<FaUserPlus />}
          isOpenPopUp={isOpenPopUpLulus}
          setIsOpenPopUp={setIsOpenPopUpLulus}
          className="md:max-w-xl"
        >
          <div className="flex flex-col gap-3">
            <h1>Apakah anda yakin menerima ppdb ini?</h1>

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
          title="Tolak ppdb"
          icon={<FaUserPlus />}
          isOpenPopUp={isOpenPopUpMulai}
          setIsOpenPopUp={setIsOpenPopUpMulai}
          className="md:max-w-xl"
        >
          <div className="flex flex-col gap-3">
            <h1>Apakah anda yakin menolak ppdb ini?</h1>

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

export default Ppdb;
