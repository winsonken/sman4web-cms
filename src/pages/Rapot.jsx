import React, { useState } from 'react';

import { PiBookBookmarkFill } from 'react-icons/pi';

import {
  Button,
  ButtonAdd,
  Layout,
  PopUpAdd,
  PopUpAction,
  PopUpEdit,
  PopUpDelete,
  PopUpDetail,
  ButtonPage,
  SelectFilter,
  SearchFilter,
} from '../components';

import {
  FormEditRapot,
  DetailRapot,
  TableRapotSebelum,
  TableRapot,
} from '../components/rapot';
import { useGetAngkatanQuery } from '../services/api/angkatanApiSlice';
const Rapot = () => {
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
          <h1 className="text-xl font-semibold md:text-2xl">Rapot Siswa</h1>
        </div>
        <div className="flex flex-col sm:flex-row sm:justify-end gap-3">
          <div className="flex flex-col gap-3 sm:w-1/2 sm:flex-row 2xl:w-1/3  ">
            <div className="sm:w-1/2">
              <SelectFilter placeholder="pilih kelas" />
            </div>
            <div className="sm:w-1/2">
              <SearchFilter />
            </div>
          </div>
        </div>

        <TableRapot
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

        <PopUpEdit
          title="Ubah rapot"
          icon={<PiBookBookmarkFill />}
          isOpenPopUpEdit={isOpenPopUpEdit}
          setIsOpenPopUpEdit={setIsOpenPopUpEdit}
        >
          <FormEditRapot setIsOpenPopUpEdit={setIsOpenPopUpEdit} />
        </PopUpEdit>

        <PopUpDelete
          title="Hapus rapot"
          icon={<PiBookBookmarkFill />}
          isOpenPopUpDelete={isOpenPopUpDelete}
          setIsOpenPopUpDelete={setIsOpenPopUpDelete}
        >
          <div className="flex flex-col gap-3">
            <h1>Apakah anda yakin menghapus rapot nama-siswa ini?</h1>

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
          title="Detail rapot"
          icon={<PiBookBookmarkFill />}
          isOpenPopUpDetail={isOpenPopUpDetail}
          setIsOpenPopUpDetail={setIsOpenPopUpDetail}
        >
          <div>
            <DetailRapot />
          </div>
        </PopUpDetail>
      </div>
    </Layout>
  );
};

export default Rapot;
