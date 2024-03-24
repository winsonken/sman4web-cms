import React, { useState } from 'react';

import { FaCalendar } from 'react-icons/fa';

import Layout from '../components/Layout';
import ButtonAdd from '../components/ButtonAdd';
import PopUpAdd from '../components/PopUpAdd';
import PopUpEdit from '../components/PopUpEdit';
import PopUpDelete from '../components/PopUpDelete';
import SearchFilter from '../components/SearchFilter';
import ButtonEdit from '../components/ButtonEdit';
import ButtonDelete from '../components/ButtonDelete';
import Button from '../components/Button';
import ButtonAction from '../components/ButtonAction';
import Pagination from '../components/Pagination';
import {
  FormAddTahunajaran,
  FormEditTahunajaran,
  TableTahunAjaran,
  TableTahunAjaranBerakhir,
} from '../components/tahun-ajaran';
import {
  useGetTahunAjaranBerakhirQuery,
  useGetTahunAjaranQuery,
} from '../services/api/tahunAjaranApiSlice';

const Tahunajaran = () => {
  const [isOpenPopUpAdd, setIsOpenPopUpAdd] = useState(false);
  const [isOpenPopUpEdit, setIsOpenPopUpEdit] = useState(false);
  const [isOpenPopUpDelete, setIsOpenPopUpDelete] = useState(false);
  const [isOpenPopUpMulai, setIsOpenPopUpMulai] = useState(false);
  const [isOpenPopUpSelesai, setIsOpenPopUpSelesai] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const limitPerPage = 10;

  const [currentPageTABerakhir, setCurrentPageTABerakhir] = useState(1);
  const limitPerPageTABerakhir = 10;

  const {
    data: tahunAjaran,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetTahunAjaranQuery({ page: currentPage, limit: limitPerPage });

  const {
    data: tahunAjaranBerakhir,
    isLoading: isLoadingTABerakhir,
    isSuccess: isSuccessTABerakhir,
    isError: isErrorTABerakhir,
    error: errorTABerakhir,
  } = useGetTahunAjaranBerakhirQuery({
    page: currentPageTABerakhir,
    limit: limitPerPageTABerakhir,
  });

  return (
    <Layout>
      <div className="flex flex-col gap-5">
        <div>
          <h1 className="text-xl font-semibold md:text-2xl">Tahun Ajaran</h1>
        </div>

        <div className="flex flex-col sm:flex-row sm:justify-between gap-3">
          <ButtonAdd
            title="Tambah tahun ajaran"
            isOpenPopUpAdd={isOpenPopUpAdd}
            setIsOpenPopUpAdd={setIsOpenPopUpAdd}
          />

          <div className="w-full duration-100 sm:w-1/2 md:w-1/5">
            <SearchFilter />
          </div>
        </div>

        <TableTahunAjaran
          data={tahunAjaran}
          isLoading={isLoading}
          isSuccess={isSuccess}
          isError={isError}
          error={error}
          isOpenPopUpMulai={isOpenPopUpMulai}
          setIsOpenPopUpMulai={setIsOpenPopUpMulai}
          isOpenPopUpSelesai={isOpenPopUpSelesai}
          setIsOpenPopUpSelesai={setIsOpenPopUpSelesai}
          isOpenPopUpEdit={isOpenPopUpEdit}
          setIsOpenPopUpEdit={setIsOpenPopUpEdit}
          isOpenPopUpDelete={isOpenPopUpDelete}
          setIsOpenPopUpDelete={setIsOpenPopUpDelete}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          limitPerPage={limitPerPage}
        />

        {/* Table kedua */}
        <div className="flex flex-col gap-5">
          <h1 className="mt-8 text-xl font-semibold md:text-2xl">
            Tahun Ajaran Berakhir
          </h1>

          <div className="flex sm:justify-end">
            <div className="w-full sm:w-1/2 duration-100 md:w-1/3 2xl:w-1/5">
              <SearchFilter />
            </div>
          </div>

          <TableTahunAjaranBerakhir
            data={tahunAjaranBerakhir}
            isLoading={isLoadingTABerakhir}
            isSuccess={isSuccessTABerakhir}
            isError={isErrorTABerakhir}
            error={errorTABerakhir}
            currentPage={currentPageTABerakhir}
            setCurrentPage={setCurrentPageTABerakhir}
            limitPerPage={limitPerPageTABerakhir}
          />
        </div>

        <PopUpAdd
          title="Tambah tahun ajaran"
          icon={<FaCalendar />}
          isOpenPopUpAdd={isOpenPopUpAdd}
          setIsOpenPopUpAdd={setIsOpenPopUpAdd}
        >
          <FormAddTahunajaran setIsOpenPopUpAdd={setIsOpenPopUpAdd} />
        </PopUpAdd>

        <PopUpEdit
          title="Ubah Tahun ajaran"
          icon={<FaCalendar />}
          isOpenPopUpEdit={isOpenPopUpEdit}
          setIsOpenPopUpEdit={setIsOpenPopUpEdit}
        >
          <FormEditTahunajaran setIsOpenPopUpEdit={setIsOpenPopUpEdit} />
        </PopUpEdit>

        <PopUpDelete
          title="Hapus Tahun Ajaran"
          icon={<FaCalendar />}
          isOpenPopUpDelete={isOpenPopUpDelete}
          setIsOpenPopUpDelete={setIsOpenPopUpDelete}
        >
          <div className="flex flex-col gap-3">
            <h1>Apakah anda yakin menghapus Tahun ajaran 2022/2023?</h1>

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
      </div>
    </Layout>
  );
};

export default Tahunajaran;
