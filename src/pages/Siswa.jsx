import React, { useState } from 'react';

import { PiUsersThreeFill } from 'react-icons/pi';
import { toast } from 'react-toastify';

import Layout from '../components/Layout';
import ButtonAdd from '../components/ButtonAdd';
import PopUpAdd from '../components/PopUpAdd';
import PopUpEdit from '../components/PopUpEdit';
import PopUpDelete from '../components/PopUpDelete';
import SelectFilter from '../components/SelectFilter';
import SearchFilter from '../components/SearchFilter';
import ButtonEdit from '../components/ButtonEdit';
import ButtonDelete from '../components/ButtonDelete';
import Button from '../components/Button';
import ButtonDetail from '../components/ButtonDetail';
import PopUpDetail from '../components/PopUpDetail';
import Pagination from '../components/Pagination';

import FormAddSiswa from '../components/siswa/FormAddSiswa';
import FormEditSiswa from '../components/siswa/FormEditSiswa';
import FormDetailSiswa from '../components/siswa/FormDetailSiswa';
import { TableSiswa, TableSiswaBaru } from '../components/siswa';
import { ButtonCustom, PopUpCustom } from '../components';

import {
  useGetSiswaBaruQuery,
  useGetSiswaAktifQuery,
  useDeleteSiswaMutation,
  useUpdateAktifSiswaMutation,
} from '../services/api/siswaApiSlice';
import useDebounce from '../helpers/useDebounce';
import { useGetAngkatanDimulaiOptionQuery } from '../services/api/angkatanApiSlice';

const Siswa = () => {
  const [searchFilterSiswa, setSearchFilterSiswa] = useState('');
  const debouncedSearchSiswa = useDebounce(searchFilterSiswa, 500);

  const [searchFilterSiswaBaru, setSearchFilterSiswaBaru] = useState('');
  const debouncedSearchSiswaBaru = useDebounce(searchFilterSiswaBaru, 500);

  const [selectedAngkatanValue, setSelectedAngkatanValue] = useState('');

  const [isOpenPopUpAdd, setIsOpenPopUpAdd] = useState(false);
  const [isOpenPopUpEdit, setIsOpenPopUpEdit] = useState(false);
  const [isOpenPopUpDelete, setIsOpenPopUpDelete] = useState(false);
  const [isOpenPopUpDetail, setIsOpenPopUpDetail] = useState(false);
  const [isOpenPopUpAktifSiswa, setIsOpenPopUpAktifSiswa] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const limitPerPage = 10;
  const [getData, setGetData] = useState([]);

  const [currentPageSiswaBaru, setCurrentPageSiswaBaru] = useState(1);
  const limitPerPageSiswaBaru = 10;

  const {
    data: siswa,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetSiswaAktifQuery({
    angkatan: selectedAngkatanValue,
    q: debouncedSearchSiswa,
    page: currentPage,
    limit: limitPerPage,
  });

  const {
    data: siswaBaru,
    isLoading: isLoadingSiswaBaru,
    isSuccess: isSuccessSiswaBaru,
    isError: isErrorSiswaBaru,
    error: errorSiswaBaru,
  } = useGetSiswaBaruQuery({
    q: debouncedSearchSiswaBaru,
    page: currentPageSiswaBaru,
    limit: limitPerPageSiswaBaru,
  });

  const { data: angkatanOption } = useGetAngkatanDimulaiOptionQuery();
  const selectAngkatan = angkatanOption?.data?.map((e) => ({
    value: e?.id_angkatan,
    label: e?.no_angkatan,
  }));

  const [deleteSiswa] = useDeleteSiswaMutation();

  const handleDelete = async () => {
    try {
      const response = await deleteSiswa({
        id: getData?.id_siswa,
      }).unwrap();
      if (!response.error) {
        toast.success('Siswa berhasil dihapus!', {
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

  const [aktifSiwa] = useUpdateAktifSiswaMutation();

  const handleAktifSiswa = async () => {
    try {
      const response = await aktifSiwa().unwrap();
      if (!response.error) {
        toast.success('Semua siswa baru berhasil diaktifkan!', {
          position: 'top-right',
          theme: 'light',
        });
        setIsOpenPopUpAktifSiswa(false);
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
              <SelectFilter
                data={selectAngkatan}
                selectedValue={selectedAngkatanValue}
                setSelectedValue={setSelectedAngkatanValue}
                placeholder="Pilih Angkatan"
              />
            </div>

            <div className="sm:w-1/2">
              <SearchFilter
                searchValue={searchFilterSiswa}
                setSearchValue={setSearchFilterSiswa}
              />
            </div>
          </div>
        </div>

        <TableSiswa
          data={siswa}
          isLoading={isLoading}
          isSuccess={isSuccess}
          isError={isError}
          error={error}
          isOpenPopUpDetail={isOpenPopUpDetail}
          setIsOpenPopUpDetail={setIsOpenPopUpDetail}
          isOpenPopUpEdit={isOpenPopUpEdit}
          setIsOpenPopUpEdit={setIsOpenPopUpEdit}
          isOpenPopUpDelete={isOpenPopUpDelete}
          setIsOpenPopUpDelete={setIsOpenPopUpDelete}
          setGetData={setGetData}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          limitPerPage={limitPerPage}
        />

        <div className="flex flex-col gap-5 mt-5">
          <div>
            <h1 className="text-xl font-semibold md:text-2xl">Siswa baru</h1>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:justify-between">
            <ButtonCustom
              title="Aktifkan semua"
              setIsOpenPopUp={setIsOpenPopUpAktifSiswa}
            />

            <div className="w-full sm:w-1/2 duration-100 md:w-1/3 2xl:w-1/5">
              <SearchFilter
                searchValue={searchFilterSiswaBaru}
                setSearchValue={setSearchFilterSiswaBaru}
              />
            </div>
          </div>

          <TableSiswaBaru
            data={siswaBaru}
            isLoading={isLoadingSiswaBaru}
            isSuccess={isSuccessSiswaBaru}
            isError={isErrorSiswaBaru}
            error={errorSiswaBaru}
            currentPage={currentPageSiswaBaru}
            setCurrentPage={setCurrentPageSiswaBaru}
            limitPerPage={limitPerPageSiswaBaru}
          />
        </div>

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
          <FormEditSiswa
            setIsOpenPopUpEdit={setIsOpenPopUpEdit}
            data={getData}
          />
        </PopUpEdit>

        <PopUpDelete
          title="Hapus siswa"
          icon={<PiUsersThreeFill />}
          isOpenPopUpDelete={isOpenPopUpDelete}
          setIsOpenPopUpDelete={setIsOpenPopUpDelete}
        >
          <div className="flex flex-col gap-3">
            <h1>
              Apakah anda yakin menghapus siswa bernama{' '}
              <span className="font-bold">{getData?.nama}?</span>
            </h1>

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

        <PopUpDetail
          title="Detail siswa"
          icon={<PiUsersThreeFill />}
          isOpenPopUpDetail={isOpenPopUpDetail}
          setIsOpenPopUpDetail={setIsOpenPopUpDetail}
        >
          <FormDetailSiswa
            data={getData}
            setIsOpenPopUpDetail={setIsOpenPopUpDetail}
          />
        </PopUpDetail>

        <PopUpCustom
          title="Aktifkan semua siswa"
          icon={<PiUsersThreeFill />}
          isOpenPopUp={isOpenPopUpAktifSiswa}
          setIsOpenPopUp={setIsOpenPopUpAktifSiswa}
          className="md:max-w-xl"
        >
          <div className="flex flex-col gap-3">
            <h1>Apakah anda yakin mengaktifkan semua siswa baru ini?</h1>

            <div className="flex justify-end gap-2">
              <Button
                title="Batal"
                type="cancel"
                setIsOpenPopUp={setIsOpenPopUpAktifSiswa}
              />
              <Button title="Simpan" onClick={handleAktifSiswa} />
            </div>
          </div>
        </PopUpCustom>
      </div>
    </Layout>
  );
};

export default Siswa;
