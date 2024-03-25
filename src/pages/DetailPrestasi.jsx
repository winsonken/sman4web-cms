import React, { useState } from 'react';

import {
  Button,
  ButtonAdd,
  Layout,
  PopUpAdd,
  PopUpAction,
  PopUpEdit,
  PopUpDelete,
  SelectFilter,
  SearchFilter,
} from '../components';
import { TableDetailPrestasi } from '../components/detail-prestasi';
import { useLocation, useNavigate } from 'react-router-dom';
import { useGetPrestasiQuery } from '../services/api/prestasiApiSlice';

const DetailPrestasi = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const limitPerPage = 10;

  const location = useLocation();
  const state = location.state;
  const { id_siswa, nama } = state;

  const navigate = useNavigate();

  const {
    data: prestasi,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetPrestasiQuery({
    siswa: id_siswa,
    page: currentPage,
    limit: limitPerPage,
  });

  return (
    <Layout>
      <div className="flex flex-col gap-5">
        <div className="flex justify-between">
          <div>
            <h1 className="text-xl font-semibold md:text-2xl">
              Detail prestasi
            </h1>
            <p>Nama siswa: {nama}</p>
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

        <TableDetailPrestasi
          data={prestasi}
          isLoading={isLoading}
          isSuccess={isSuccess}
          isError={isError}
          error={error}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          limitPerPage={limitPerPage}
        />
      </div>
    </Layout>
  );
};

export default DetailPrestasi;
