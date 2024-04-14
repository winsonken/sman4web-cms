import React, { useState } from 'react';

import { RiDoorOpenFill } from 'react-icons/ri';
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
  ButtonDetailKelas,
  SelectFilter,
  SearchFilter,
  Input,
  Loading,
} from '../components';

import {
  FormAddDetailKelas,
  FormEditDetailKelas,
  FormNaikKelas,
  FormTinggalKelas,
  TableDetailKelas,
} from '../components/detailkelas';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  useDeleteKelasSiswaMutation,
  useGetKelasSiswaQuery,
} from '../services/api/kelasSiswaApiSlice';
import useDebounce from '../helpers/useDebounce';
import { useGetSiswaBelumAdaKelasOptionQuery } from '../services/api/siswaApiSlice';
import { useGetKelasOptionQuery } from '../services/api/kelasApiSlice';
import FormLulus from '../components/detailkelas/FormLulus';
import FormTidakLulus from '../components/detailkelas/FormTidakLulus';

const DetailKelas = () => {
  const [searchFilterKelasSiswa, setSearchFilterKelasSiswa] = useState('');
  const debouncedSearchKelasSiswa = useDebounce(searchFilterKelasSiswa, 500);

  const location = useLocation();
  const state = location.state;
  const {
    id_kelas,
    nama_kelas,
    kelas,
    tahun_ajaran,
    tahun_mulai_ajaran,
    tahun_akhir_ajaran,
    jurusan,
    walikelas,
  } = state;

  const navigate = useNavigate();
  const [isOpenPopUpAdd, setIsOpenPopUpAdd] = useState(false);
  const [isOpenPopUpEdit, setIsOpenPopUpEdit] = useState(false);
  const [isOpenPopUpDelete, setIsOpenPopUpDelete] = useState(false);

  const [isOpenPopUpGanjilAwal, setIsOpenPopUpGanjilAwal] = useState(false);
  const [isOpenPopUpGanjilAkhir, setIsOpenPopUpGanjilAkhir] = useState(false);
  const [isOpenPopUpGenapAwal, setIsOpenPopUpGenapAwal] = useState(false);
  const [isOpenPopUpGenapAkhir, setIsOpenPopUpGenapAkhir] = useState(false);

  const [isOpenPopUpNaikKelas, setIsOpenPopUpNaikKelas] = useState(false);
  const [isOpenPopUpTinggalKelas, setIsOpenPopUpTinggalKelas] = useState(false);
  const [isOpenPopUpLulus, setIsOpenPopUpLulus] = useState(false);
  const [isOpenPopUpTidakLulus, setIsOpenPopUpTidakLulus] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const limitPerPage = 10;
  const [getData, setGetData] = useState([]);

  const {
    data: kelasSiswa,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetKelasSiswaQuery({
    kelas: id_kelas,
    q: debouncedSearchKelasSiswa,
    page: currentPage,
    limit: limitPerPage,
  });

  const { data: siswaBelumAdaKelasOption } =
    useGetSiswaBelumAdaKelasOptionQuery();

  const selectSiswaBelumAdaKelas = siswaBelumAdaKelasOption?.data?.map((e) => ({
    value: e?.id_siswa,
    label: e?.nama,
  }));

  const { data: kelasOption } = useGetKelasOptionQuery({
    tahunAjaran: tahun_ajaran,
    kelas: kelas,
  });

  const selectKelas = kelasOption?.data?.map((e) => ({
    value: e?.id_kelas,
    label: e?.nama_kelas,
  }));

  const [deleteKelasSiswa, { isLoadingDelete, isErrorDelete, errorDelete }] =
    useDeleteKelasSiswaMutation();

  const handleDelete = async () => {
    try {
      const response = await deleteKelasSiswa({
        id: getData?.id_kelas_siswa,
      }).unwrap();
      if (!response.error) {
        toast.success(
          `${getData?.nama_siswa} berhasil berhasil dihapus dari kelas ${getData?.nama_kelas}!`,
          {
            position: 'top-right',
            theme: 'light',
          }
        );
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

  return (
    <Layout>
      <div className="flex flex-col gap-5">
        <div className="flex justify-between">
          <div>
            <h1 className="text-xl font-semibold md:text-2xl">
              Kelas {nama_kelas}
            </h1>
            <p>
              Tahun ajaran {tahun_mulai_ajaran}-{tahun_akhir_ajaran}
            </p>
            <p>Walikelas: {walikelas}</p>
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

        <div className="flex flex-col sm:flex-row sm:justify-between gap-3">
          <ButtonAdd
            title="Tambah siswa"
            isOpenPopUpAdd={isOpenPopUpAdd}
            setIsOpenPopUpAdd={setIsOpenPopUpAdd}
          />

          <div className="flex flex-col gap-3 sm:w-1/2 sm:flex-row 2xl:w-1/3  ">
            <div className="sm:w-1/2">
              <SelectFilter placeholder="Pilih angkatan" />
            </div>
            <div className="sm:w-1/2">
              <SearchFilter
                searchValue={searchFilterKelasSiswa}
                setSearchValue={setSearchFilterKelasSiswa}
              />
            </div>
          </div>
        </div>

        <TableDetailKelas
          data={kelasSiswa}
          isLoading={isLoading}
          isSuccess={isSuccess}
          isError={isError}
          error={error}
          isOpenPopUpEdit={isOpenPopUpEdit}
          setIsOpenPopUpEdit={setIsOpenPopUpEdit}
          isOpenPopUpDelete={isOpenPopUpDelete}
          setIsOpenPopUpDelete={setIsOpenPopUpDelete}
          isOpenPopUpGanjilAwal={isOpenPopUpGanjilAwal}
          setIsOpenPopUpGanjilAwal={setIsOpenPopUpGanjilAwal}
          isOpenPopUpGanjilAkhir={isOpenPopUpGanjilAkhir}
          setIsOpenPopUpGanjilAkhir={setIsOpenPopUpGanjilAkhir}
          isOpenPopUpGenapAwal={isOpenPopUpGenapAwal}
          setIsOpenPopUpGenapAwal={setIsOpenPopUpGenapAwal}
          isOpenPopUpGenapAkhir={isOpenPopUpGenapAkhir}
          setIsOpenPopUpGenapAkhir={setIsOpenPopUpGenapAkhir}
          isOpenPopUpNaikKelas={isOpenPopUpNaikKelas}
          setIsOpenPopUpNaikKelas={setIsOpenPopUpNaikKelas}
          isOpenPopUpTinggalKelas={isOpenPopUpTinggalKelas}
          setIsOpenPopUpTinggalKelas={setIsOpenPopUpTinggalKelas}
          isOpenPopUpLulus={isOpenPopUpLulus}
          setIsOpenPopUpLulus={setIsOpenPopUpLulus}
          isOpenPopUpTidakLulus={isOpenPopUpTidakLulus}
          setIsOpenPopUpTidakLulus={setIsOpenPopUpTidakLulus}
          setGetData={setGetData}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          limitPerPage={limitPerPage}
        />

        <PopUpAdd
          title="Tambah kelas siswa"
          icon={<RiDoorOpenFill />}
          isOpenPopUpAdd={isOpenPopUpAdd}
          setIsOpenPopUpAdd={setIsOpenPopUpAdd}
          className="md:max-w-2xl"
        >
          <FormAddDetailKelas
            id_kelas={id_kelas}
            namaKelas={nama_kelas}
            selectSiswaBelumAdaKelas={selectSiswaBelumAdaKelas}
            selectKelas={selectKelas}
            setIsOpenPopUpAdd={setIsOpenPopUpAdd}
          />
        </PopUpAdd>

        <PopUpEdit
          title="Ubah kelas siswa"
          icon={<RiDoorOpenFill />}
          isOpenPopUpEdit={isOpenPopUpEdit}
          setIsOpenPopUpEdit={setIsOpenPopUpEdit}
          className="md:max-w-2xl"
        >
          <FormEditDetailKelas
            id_kelas={id_kelas}
            namaKelas={nama_kelas}
            selectSiswaBelumAdaKelas={selectSiswaBelumAdaKelas}
            selectKelas={selectKelas}
            setIsOpenPopUpEdit={setIsOpenPopUpEdit}
            data={getData}
          />
        </PopUpEdit>

        <PopUpDelete
          title="Hapus Siswa Dari Kelas"
          icon={<RiDoorOpenFill />}
          isOpenPopUpDelete={isOpenPopUpDelete}
          setIsOpenPopUpDelete={setIsOpenPopUpDelete}
        >
          <div className="flex flex-col gap-3">
            <h1>
              Apakah anda yakin menghapus {getData?.nama_siswa} dari kelas{' '}
              {getData?.nama_kelas}?
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

        <PopUpAction
          title="Form kenaikan kelas"
          icon={<RiDoorOpenFill />}
          isOpenPopUp={isOpenPopUpNaikKelas}
          setIsOpenPopUp={setIsOpenPopUpNaikKelas}
          className="md:max-w-2xl"
        >
          <div className="flex flex-col gap-3">
            <h1>
              Apakah anda yakin menaikkan{' '}
              <span className="font-bold">{getData?.nama_siswa}</span> ke kelas{' '}
              <span className="font-bold">{kelas == 10 ? 11 : 12}</span>?
            </h1>
            <FormNaikKelas
              data={getData}
              kelas={kelas}
              tahunAjaran={tahun_ajaran}
              setIsOpenPopUpNaikKelas={setIsOpenPopUpNaikKelas}
            />
          </div>
        </PopUpAction>

        <PopUpAction
          title="Form Tinggal kelas"
          icon={<RiDoorOpenFill />}
          isOpenPopUp={isOpenPopUpTinggalKelas}
          setIsOpenPopUp={setIsOpenPopUpTinggalKelas}
          className="md:max-w-2xl"
        >
          <div className="flex flex-col gap-3">
            <h1>
              Apakah anda yakin tidak menaikkan{' '}
              <span className="font-bold">{getData?.nama_siswa}</span> ke kelas{' '}
              <span className="font-bold">{kelas == 10 ? 11 : 12}</span>?
            </h1>
            <FormTinggalKelas
              data={getData}
              kelas={kelas}
              tahunAjaran={tahun_ajaran}
              setIsOpenPopUpTinggalKelas={setIsOpenPopUpTinggalKelas}
            />
          </div>
        </PopUpAction>

        <PopUpAction
          title="Form kelulusan"
          icon={<RiDoorOpenFill />}
          isOpenPopUp={isOpenPopUpLulus}
          setIsOpenPopUp={setIsOpenPopUpLulus}
          className="md:max-w-2xl"
        >
          <div className="flex flex-col gap-3">
            <h1>
              Apakah anda yakin meluluskan{' '}
              <span className="font-bold">{getData?.nama_siswa}</span>?
            </h1>
            <FormLulus
              data={getData}
              setIsOpenPopUpLulus={setIsOpenPopUpLulus}
            />
          </div>
        </PopUpAction>

        <PopUpAction
          title="Form kelulusan"
          icon={<RiDoorOpenFill />}
          isOpenPopUp={isOpenPopUpTidakLulus}
          setIsOpenPopUp={setIsOpenPopUpTidakLulus}
          className="md:max-w-2xl"
        >
          <div className="flex flex-col gap-3">
            <h1>
              Apakah anda yakin tidak meluluskan{' '}
              <span className="font-bold">{getData?.nama_siswa}</span>?
            </h1>
            <FormTidakLulus
              data={getData}
              kelas={kelas}
              tahunAjaran={tahun_ajaran}
              setIsOpenPopUpTidakLulus={setIsOpenPopUpTidakLulus}
            />
          </div>
        </PopUpAction>
      </div>
    </Layout>
  );
};

export default DetailKelas;
