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
  FormAddDetailRapot,
  FormEditDetailRapot,
  DownloadDetailRapot,
  TableDetailRapot,
} from '../components/detailrapot';
import { useGetAngkatanQuery } from '../services/api/angkatanApiSlice';
const DetailRapot = (props) => {
  const [isOpenPopUpUpload, setIsOpenPopUpUpload] = useState(false);
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
            Rapot Siswa Maria Zhang 2023/2024
          </h1>
        </div>

        <div className="flex flex-col sm:flex-row sm:justify-end gap-3"></div>

        <TableDetailRapot
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
          isOpenPopUpUpload={isOpenPopUpUpload}
          setIsOpenPopUpUpload={setIsOpenPopUpUpload}
        />

        <PopUpAdd
          title="Upload Rapot"
          icon={<PiBookBookmarkFill />}
          isOpenPopUpAdd={isOpenPopUpUpload}
          setIsOpenPopUpAdd={setIsOpenPopUpUpload}
          className=""
        >
          <FormAddDetailRapot setIsOpenPopUpAdd={setIsOpenPopUpUpload} />
        </PopUpAdd>

        <PopUpEdit
          title="Ubah rapot"
          icon={<PiBookBookmarkFill />}
          isOpenPopUpEdit={isOpenPopUpEdit}
          setIsOpenPopUpEdit={setIsOpenPopUpEdit}
        >
          <FormEditDetailRapot setIsOpenPopUpEdit={setIsOpenPopUpEdit} />
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
            <h1>Download PDF</h1>
          </div>
        </PopUpDetail>
      </div>
    </Layout>
  );
};

export default DetailRapot;
