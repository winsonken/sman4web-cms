import React, { useState } from 'react';

import { RiDoorOpenFill } from 'react-icons/ri';

import {
  Button,
  ButtonAdd,
  Layout,
  PopUpAdd,
  PopUpAction,
  PopUpEdit,
  PopUpDelete,
  PopUpDetail,
  ButtonDetailKelas,
  SelectFilter,
  SearchFilter,
  Input,
} from '../components';

import {
  FormAddDetailKelas,
  TableDetailKelas,
} from '../components/detailkelas';
import { useGetAngkatanQuery } from '../services/api/angkatanApiSlice';
const DetailKelas = () => {
  const [isOpenPopUpAdd, setIsOpenPopUpAdd] = useState(false);
  const [isOpenPopUpEdit, setIsOpenPopUpEdit] = useState(false);
  const [isOpenPopUpDelete, setIsOpenPopUpDelete] = useState(false);
  const [isOpenPopUpDetail, setIsOpenPopUpDetail] = useState(false);
  const [isOpenPopUpMulai, setIsOpenPopUpMulai] = useState(false);
  const [isOpenPopUpLulus, setIsOpenPopUpLulus] = useState(false);
  const [isOpenPopUpTinggal, setIsOpenPopUpTinggal] = useState(false);
  const [isOpenPopUpGanjilAwal, setIsOpenPopUpGanjilAwal] = useState(false);
  const [isOpenPopUpGanjilAkhir, setIsOpenPopUpGanjilAkhir] = useState(false);
  const [isOpenPopUpGenapAwal, setIsOpenPopUpGenapAwal] = useState(false);

  const dummyData = [];

  return (
    <Layout>
      <div className="flex flex-col gap-5">
        <div>
          <h1 className="text-xl font-semibold md:text-2xl">Detail kelas</h1>
        </div>

        {/* <div className="flex flex-col sm:flex-row sm:justify-between gap-3">
          <ButtonAdd
            title="Tambah kelas"
            isOpenPopUpAdd={isOpenPopUpAdd}
            setIsOpenPopUpAdd={setIsOpenPopUpAdd}
          />

          <div className="flex flex-col gap-3 sm:w-1/2 sm:flex-row 2xl:w-1/3  ">
            <div className="sm:w-1/2">
              <SelectFilter placeholder="Pilih angkatan" />
            </div>
            <div className="sm:w-1/2">
              <SearchFilter />
            </div>
          </div>
        </div> */}

        <TableDetailKelas
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
          isOpenPopUpTinggal={isOpenPopUpTinggal}
          setIsOpenPopUpTinggal={setIsOpenPopUpTinggal}
          isOpenPopUpGanjilAwal={isOpenPopUpGanjilAwal}
          setIsOpenPopUpGanjilAwal={setIsOpenPopUpGanjilAwal}
          isOpenPopUpGanjilAkhir={isOpenPopUpGanjilAkhir}
          setIsOpenPopUpGanjilAkhir={setIsOpenPopUpGanjilAkhir}
          isOpenPopUpGenapAwal={isOpenPopUpGenapAwal}
          setIsOpenPopUpGenapAwal={setIsOpenPopUpGenapAwal}
        />

        <PopUpAdd
          title="Tambah kelas"
          icon={<RiDoorOpenFill />}
          isOpenPopUpAdd={isOpenPopUpAdd}
          setIsOpenPopUpAdd={setIsOpenPopUpAdd}
        >
          <FormAddDetailKelas setIsOpenPopUpAdd={setIsOpenPopUpAdd} />
        </PopUpAdd>

        <PopUpDetail
          title="Detail Kelas"
          icon={<RiDoorOpenFill />}
          isOpenPopUpDetail={isOpenPopUpDetail}
          setIsOpenPopUpDetail={setIsOpenPopUpDetail}
        >
        </PopUpDetail>

        <PopUpDelete
          title="Hapus Siswa Dari Kelas"
          icon={<RiDoorOpenFill />}
          isOpenPopUpDelete={isOpenPopUpDelete}
          setIsOpenPopUpDelete={setIsOpenPopUpDelete}
        >
          <div className="flex flex-col gap-3">
            <h1>Apakah anda yakin menghapus (nama-siswa) dari kelas XA?</h1>

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

        <PopUpAction
          title="Form kenaikan kelas"
          icon={<RiDoorOpenFill />}
          isOpenPopUp={isOpenPopUpLulus}
          setIsOpenPopUp={setIsOpenPopUpLulus}
        >
          <div className="flex flex-col gap-3">
            <h1>Apakah anda yakin menaikan (nama-siswa) ke kelas 11?</h1>

          <div className="flex flex-col gap-3">
            <Input
              type="file"
              label="Upload Rapot"
              name="upload_rapot"
            />
            <Input
              type="text"
              label="Kelas"
              name="kelas"
            />
          </div>

            <div className="flex justify-end gap-2">
              <Button
                title="Batal"
                type="cancel"
                setIsOpenPopUp={setIsOpenPopUpLulus}
              />
              <Button title="Simpan"/>
            </div>
          </div>
        </PopUpAction>

        <PopUpAction
          title="Form kenaikan kelas"
          icon={<RiDoorOpenFill />}
          isOpenPopUp={isOpenPopUpTinggal}
          setIsOpenPopUp={setIsOpenPopUpTinggal}
        >
          <div className="flex flex-col gap-3">
            <h1>Apakah anda yakin tidak menaikan (nama-siswa) ke kelas 11?</h1>

          <div className="flex flex-col gap-3">
            <Input
              type="file"
              label="Upload Rapot"
              name="upload_rapot"
            />
            <Input
              type="text"
              label="Kelas"
              name="kelas"
            />
          </div>

            <div className="flex justify-end gap-2">
              <Button
                title="Batal"
                type="cancel"
                setIsOpenPopUp={setIsOpenPopUpTinggal}
              />
              <Button title="Simpan"/>
            </div>
          </div>
        </PopUpAction>

        <PopUpAction
          title="Apakah anda yakin meluluskan siswa ini?"
          icon={<RiDoorOpenFill />}
          isOpenPopUp={isOpenPopUpGanjilAwal}
          setIsOpenPopUp={setIsOpenPopUpGanjilAwal}
        >
          <div className="flex flex-col gap-3">

          <div className="flex flex-col gap-3">
            <Input
              type="file"
              label="Upload rapot awal semester ganjil"
              name="upload_rapot"
            />
          </div>

            <div className="flex justify-end gap-2">
              <Button
                title="Batal"
                type="cancel"
                setIsOpenPopUp={setIsOpenPopUpGanjilAwal}
              />
              <Button title="Simpan"/>
            </div>
          </div>
        </PopUpAction>

        <PopUpAction
          title="Apakah anda yakin meluluskan siswa ini?"
          icon={<RiDoorOpenFill />}
          isOpenPopUp={isOpenPopUpGanjilAkhir}
          setIsOpenPopUp={setIsOpenPopUpGanjilAkhir}
        >
          <div className="flex flex-col gap-3">

          <div className="flex flex-col gap-3">
            <Input
              type="file"
              label="Upload rapot akhir semester ganjil"
              name="upload_rapot"
            />
          </div>

            <div className="flex justify-end gap-2">
              <Button
                title="Batal"
                type="cancel"
                setIsOpenPopUp={setIsOpenPopUpGanjilAkhir}
              />
              <Button title="Simpan"/>
            </div>
          </div>
        </PopUpAction>

        <PopUpAction
          title="Apakah anda yakin meluluskan siswa ini?"
          icon={<RiDoorOpenFill />}
          isOpenPopUp={isOpenPopUpGenapAwal}
          setIsOpenPopUp={setIsOpenPopUpGenapAwal}
        >
          <div className="flex flex-col gap-3">

          <div className="flex flex-col gap-3">
            <Input
              type="file"
              label="Upload rapot awal semester genap"
              name="upload_rapot"
            />
          </div>

            <div className="flex justify-end gap-2">
              <Button
                title="Batal"
                type="cancel"
                setIsOpenPopUp={setIsOpenPopUpGenapAwal}
              />
              <Button title="Simpan"/>
            </div>
          </div>
        </PopUpAction>
      </div>
    </Layout>
  );
};

export default DetailKelas;
