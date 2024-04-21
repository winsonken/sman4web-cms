import React, { useEffect, useState } from 'react';

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
  Loading,
} from '../components';

import {
  FormAddKelas,
  TableKelas,
  DetailKelas,
  FormEditKelas,
} from '../components/kelas';
import {
  useGetAngkatanBelumMulaiOptionQuery,
  useGetAngkatanDimulaiOptionQuery,
  useGetAngkatanQuery,
} from '../services/api/angkatanApiSlice';
import {
  useGetAllTahunAjaranOptionQuery,
  useGetTahunAjaranAktifQuery,
  useGetTahunAjaranBelumMulaiOptionQuery,
} from '../services/api/tahunAjaranApiSlice';
import {
  useDeleteKelasMutation,
  useGetKelasQuery,
  useUpdateBerakhirKelasMutation,
  useUpdateMulaiKelasMutation,
} from '../services/api/kelasApiSlice';
import useDebounce from '../helpers/useDebounce';
import { useGetJurusanOptionQuery } from '../services/api/jurusanApiSlice';
import { useGetGuruOptionQuery } from '../services/api/guruApiSlice';
import { useSelector } from 'react-redux';
import { selectCurrentModules } from '../services/features/authSlice';

const Kelas = () => {
  const [selectFilterTahunAjaran, setSelectFilterTahunAjaran] = useState('');
  const [selectFilterKelas, setSelectFilterKelas] = useState('');
  const [searchFilterKelas, setSearchFilterKelas] = useState('');
  const debouncedSearchKelas = useDebounce(searchFilterKelas, 500);

  const [isOpenPopUpAdd, setIsOpenPopUpAdd] = useState(false);
  const [isOpenPopUpEdit, setIsOpenPopUpEdit] = useState(false);
  const [isOpenPopUpDelete, setIsOpenPopUpDelete] = useState(false);
  const [isOpenPopUpDetail, setIsOpenPopUpDetail] = useState(false);
  const [isOpenPopUpMulaiKelas, setIsOpenPopUpMulaiKelas] = useState(false);
  const [isOpenPopUpAkhiriKelas, setIsOpenPopUpAkhiriKelas] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const limitPerPage = 10;
  const [getData, setGetData] = useState([]);

  const { data: tahunAjaranAktif } = useGetTahunAjaranAktifQuery();

  const selectTahunAjaranAktif = tahunAjaranAktif?.data?.find(
    (e) => e.status_tahun_ajaran == 1
  );
  ``;
  const { data: tahunAjaranOption } = useGetAllTahunAjaranOptionQuery();

  const selectTahunAjaran = tahunAjaranOption?.data?.map((e) => ({
    value: e?.id_tahun_ajaran,
    label: `${e?.tahun_mulai_ajaran}-${e?.tahun_akhir_ajaran}`,
  }));

  const {
    data: kelas,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetKelasQuery({
    tahunAjaran: selectFilterTahunAjaran || '',
    kelas: selectFilterKelas,
    q: debouncedSearchKelas,
    page: currentPage,
    limit: limitPerPage,
  });

  const { data: jurusanOption } = useGetJurusanOptionQuery();
  const selectJurusan = jurusanOption?.data?.map((e) => ({
    value: e?.id_jurusan,
    label: e?.nama_jurusan,
  }));

  if (Array.isArray(selectJurusan)) {
    selectJurusan.unshift({ value: '', label: 'Select jurusan' });
  }

  const { data: tahunAjaranBelumDimulaiOption } =
    useGetTahunAjaranBelumMulaiOptionQuery();
  const selectTahunAjaranBelumDimulai =
    tahunAjaranBelumDimulaiOption?.data?.map((e) => ({
      value: e?.id_tahun_ajaran,
      label: `${e?.tahun_mulai_ajaran}-${e?.tahun_akhir_ajaran}`,
    }));

  const { data: angkatanBelumDimulaiOption } =
    useGetAngkatanBelumMulaiOptionQuery();

  const selectAngkatanBelumDimulai = angkatanBelumDimulaiOption?.data?.map(
    (e) => ({
      value: e?.id_angkatan,
      label: e?.no_angkatan,
    })
  );

  if (Array.isArray(selectAngkatanBelumDimulai)) {
    selectAngkatanBelumDimulai.unshift({ value: '', label: 'Select angkatan' });
  }

  const { data: angkatanDimulaiOption } = useGetAngkatanDimulaiOptionQuery();

  const selectAngkatanDimulai = angkatanDimulaiOption?.data?.map((e) => ({
    value: e?.id_angkatan,
    label: e?.no_angkatan,
  }));

  if (Array.isArray(selectAngkatanDimulai)) {
    selectAngkatanDimulai.unshift({ value: '', label: 'Select angkatan' });
  }

  const { data: guruOption } = useGetGuruOptionQuery();

  const selectGuru = guruOption?.data?.map((e) => ({
    value: e?.id_guru,
    label: e?.nama,
  }));

  const selectKelas = [
    { value: 10, label: 10 },
    { value: 11, label: 11 },
    { value: 12, label: 12 },
  ];

  if (Array.isArray(selectKelas)) {
    selectKelas.unshift({ value: '', label: 'Select kelas' });
  }

  const [
    deleteKelas,
    { isLoading: isLoadingDelete, isErrorDelete, errorDelete },
  ] = useDeleteKelasMutation();

  const handleDelete = async () => {
    try {
      const response = await deleteKelas({
        id: getData?.id_kelas,
      }).unwrap();
      if (!response.error) {
        toast.success('Kelas berhasil dihapus!', {
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

  const [updateMulaiKelas, { isLoading: isLoadingMulaiKelas }] =
    useUpdateMulaiKelasMutation();

  const handleMulaiKelas = async () => {
    try {
      const response = await updateMulaiKelas({
        id_kelas: getData?.id_kelas,
      }).unwrap();
      if (!response.error) {
        toast.success('Kelas berhasil dimulai!', {
          position: 'top-right',
          theme: 'light',
        });
        setIsOpenPopUpMulaiKelas(false);
      }
    } catch (error) {
      const errorMessage = error?.data?.message;
      toast.error(`${errorMessage}`, {
        position: 'top-right',
        theme: 'light',
      });
    }
  };

  const [updateBerakhirKelas, { isLoading: isLoadingBerakhirKelas }] =
    useUpdateBerakhirKelasMutation();

  const handleBerakhirKelas = async () => {
    try {
      const response = await updateBerakhirKelas({
        id_kelas: getData?.id_kelas,
      }).unwrap();
      if (!response.error) {
        toast.success('Kelas berhasil diakhiri!', {
          position: 'top-right',
          theme: 'light',
        });
        setIsOpenPopUpAkhiriKelas(false);
      }
    } catch (error) {
      const errorMessage = error?.data?.message;
      toast.error(`${errorMessage}`, {
        position: 'top-right',
        theme: 'light',
      });
    }
  };

  useEffect(() => {
    if (selectTahunAjaranAktif) {
      setSelectFilterTahunAjaran(selectTahunAjaranAktif?.id_tahun_ajaran);
    } else {
      setSelectFilterTahunAjaran(tahunAjaranOption?.data[0]?.id_tahun_ajaran);
    }
  }, [selectTahunAjaranAktif, tahunAjaranOption]);

  const modules = useSelector(selectCurrentModules);

  const filterModule = (kodeModul) => {
    const module = modules?.find(
      (allModules) => allModules?.kode_modul == kodeModul
    );
    return module;
  };

  const modulesKelas = filterModule('data_kelas');

  return (
    <Layout>
      <div className="flex flex-col gap-5">
        <div>
          <h1 className="text-xl font-semibold md:text-2xl">Kelas</h1>
        </div>

        <div
          className={`flex flex-col sm:flex-row gap-3 ${
            modulesKelas?.tambah ? 'sm:justify-between' : 'sm:justify-end'
          }`}
        >
          {modulesKelas?.tambah && (
            <ButtonAdd
              title="Tambah kelas"
              isOpenPopUpAdd={isOpenPopUpAdd}
              setIsOpenPopUpAdd={setIsOpenPopUpAdd}
            />
          )}

          <div className="flex flex-col gap-3 md:w-3/4 md:flex-row 2xl:w-1/2">
            <div className="md:w-1/3">
              <SelectFilter
                placeholder="Select tahun ajaran"
                data={selectTahunAjaran}
                selectedValue={selectFilterTahunAjaran}
                setSelectedValue={setSelectFilterTahunAjaran}
              />
            </div>
            <div className="md:w-1/3">
              <SelectFilter
                placeholder="Select kelas"
                data={selectKelas}
                selectedValue={selectFilterKelas}
                setSelectedValue={setSelectFilterKelas}
              />
            </div>
            <div className="md:w-1/3">
              <SearchFilter
                searchValue={searchFilterKelas}
                setSearchValue={setSearchFilterKelas}
              />
            </div>
          </div>
        </div>

        <TableKelas
          data={kelas}
          isLoading={isLoading}
          isSuccess={isSuccess}
          isError={isError}
          error={error}
          modules={modulesKelas}
          isOpenPopUpDetail={isOpenPopUpDetail}
          setIsOpenPopUpDetail={setIsOpenPopUpDetail}
          isOpenPopUpEdit={isOpenPopUpEdit}
          setIsOpenPopUpEdit={setIsOpenPopUpEdit}
          isOpenPopUpDelete={isOpenPopUpDelete}
          setIsOpenPopUpDelete={setIsOpenPopUpDelete}
          isOpenPopUpMulaiKelas={isOpenPopUpMulaiKelas}
          setIsOpenPopUpMulaiKelas={setIsOpenPopUpMulaiKelas}
          isOpenPopUpAkhiriKelas={isOpenPopUpAkhiriKelas}
          setIsOpenPopUpAkhiriKelas={setIsOpenPopUpAkhiriKelas}
          setGetData={setGetData}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          limitPerPage={limitPerPage}
        />

        <PopUpAdd
          title="Tambah kelas"
          icon={<RiDoorOpenFill />}
          isOpenPopUpAdd={isOpenPopUpAdd}
          setIsOpenPopUpAdd={setIsOpenPopUpAdd}
          className="md:max-w-2xl"
        >
          <FormAddKelas
            selectTahunAjaranBelumDimulai={selectTahunAjaranBelumDimulai}
            selectAngkatanBelumDimulai={selectAngkatanBelumDimulai}
            selectAngkatanDimulai={selectAngkatanDimulai}
            selectGuru={selectGuru}
            selectJurusan={selectJurusan}
            jurusanOption={jurusanOption}
            setIsOpenPopUpAdd={setIsOpenPopUpAdd}
          />
        </PopUpAdd>

        <PopUpEdit
          title="Ubah Kelas"
          icon={<RiDoorOpenFill />}
          isOpenPopUpEdit={isOpenPopUpEdit}
          setIsOpenPopUpEdit={setIsOpenPopUpEdit}
          className="md:max-w-2xl"
        >
          <FormEditKelas
            selectTahunAjaranBelumDimulai={selectTahunAjaranBelumDimulai}
            selectAngkatanBelumDimulai={selectAngkatanBelumDimulai}
            selectAngkatanDimulai={selectAngkatanDimulai}
            selectGuru={selectGuru}
            selectJurusan={selectJurusan}
            jurusanOption={jurusanOption}
            setIsOpenPopUpEdit={setIsOpenPopUpEdit}
            data={getData}
          />
        </PopUpEdit>

        <PopUpDelete
          title="Hapus Kelas"
          icon={<RiDoorOpenFill />}
          isOpenPopUpDelete={isOpenPopUpDelete}
          setIsOpenPopUpDelete={setIsOpenPopUpDelete}
        >
          <div className="flex flex-col gap-3">
            <h1>
              Apakah anda yakin menghapus kelas{' '}
              <span className="font-bold">{getData?.nama_kelas}</span>?
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
          title="Mulai kelas"
          icon={<RiDoorOpenFill />}
          isOpenPopUp={isOpenPopUpMulaiKelas}
          setIsOpenPopUp={setIsOpenPopUpMulaiKelas}
          className="md:max-w-xl"
        >
          <div className="flex flex-col gap-3">
            <h1>
              Apakah anda yakin memulai kelas{' '}
              <span className="font-bold">{getData?.nama_kelas}</span>?
            </h1>

            <div className="flex justify-end gap-2">
              <Button
                title="Batal"
                type="cancel"
                setIsOpenPopUp={setIsOpenPopUpMulaiKelas}
              />
              <Button
                title={isLoadingMulaiKelas ? <Loading /> : 'Simpan'}
                onClick={handleMulaiKelas}
              />
            </div>
          </div>
        </PopUpAction>

        <PopUpAction
          title="Akhiri kelas"
          icon={<RiDoorOpenFill />}
          isOpenPopUp={isOpenPopUpAkhiriKelas}
          setIsOpenPopUp={setIsOpenPopUpAkhiriKelas}
          className="md:max-w-xl"
        >
          <div className="flex flex-col gap-3">
            <h1>
              Apakah anda yakin mengakhiri kelas{' '}
              <span className="font-bold">{getData?.nama_kelas}</span>?
            </h1>

            <div className="flex justify-end gap-2">
              <Button
                title="Batal"
                type="cancel"
                setIsOpenPopUp={setIsOpenPopUpAkhiriKelas}
              />
              <Button
                title={isLoadingBerakhirKelas ? <Loading /> : 'Simpan'}
                onClick={handleBerakhirKelas}
              />
            </div>
          </div>
        </PopUpAction>
      </div>
    </Layout>
  );
};

export default Kelas;
