import React, { useState } from 'react';
import { PiBookBookmarkFill } from 'react-icons/pi';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { toast } from 'react-toastify';
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

import { useLocation, useNavigate } from 'react-router-dom';

import { useGetRapotBySiswaQuery } from '../services/api/rapotApiSlice';
import {
  FormEditDetailRapot,
  TableDetailRapot,
} from '../components/detail-rapot';
import { useSelector } from 'react-redux';
import { selectCurrentModules } from '../services/features/authSlice';

const DetailRapot = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const limitPerPage = 10;
  const [getData, setGetData] = useState([]);

  const [isOpenPopUpEdit, setIsOpenPopUpEdit] = useState(false);

  const [isOpenPopUpGanjilAwal, setIsOpenPopUpGanjilAwal] = useState(false);
  const [isOpenPopUpGanjilAkhir, setIsOpenPopUpGanjilAkhir] = useState(false);
  const [isOpenPopUpGenapAwal, setIsOpenPopUpGenapAwal] = useState(false);
  const [isOpenPopUpGenapAkhir, setIsOpenPopUpGenapAkhir] = useState(false);

  const location = useLocation();
  const state = location.state;
  const { id_siswa, nama, nipd } = state;

  const navigate = useNavigate();

  const {
    data: rapot,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetRapotBySiswaQuery({
    siswa: id_siswa,
    page: currentPage,
    limit: limitPerPage,
  });

  const modules = useSelector(selectCurrentModules);

  const filterModule = (kodeModul) => {
    const module = modules?.find(
      (allModules) => allModules?.kode_modul == kodeModul
    );
    return module;
  };

  const modulesAktivitas = filterModule('data_aktivitas');

  const API_URL =
    import.meta.env.VITE_PRODUCTION === 'true'
      ? import.meta.env.VITE_API_URL_PROD
      : import.meta.env.VITE_API_URL_DEV;
  return (
    <Layout>
      <div className="flex flex-col gap-5">
        <div className="flex justify-between">
          <div>
            <h1 className="text-xl font-semibold md:text-2xl">Data rapot</h1>
            <p>Nama siswa: {nama}</p>
            <p>NIPD: {nipd}</p>
          </div>

          <div
            onClick={() => {
              navigate(-1);
            }}
            className="cursor-pointer w-fit h-fit text-2xl"
          >
            <IoMdArrowRoundBack />
          </div>
        </div>

        <TableDetailRapot
          data={rapot}
          isLoading={isLoading}
          isSuccess={isSuccess}
          isError={isError}
          error={error}
          modules={modulesAktivitas}
          setGetData={setGetData}
          isOpenPopUpEdit={isOpenPopUpEdit}
          setIsOpenPopUpEdit={setIsOpenPopUpEdit}
          isOpenPopUpGanjilAwal={isOpenPopUpGanjilAwal}
          setIsOpenPopUpGanjilAwal={setIsOpenPopUpGanjilAwal}
          isOpenPopUpGanjilAkhir={isOpenPopUpGanjilAkhir}
          setIsOpenPopUpGanjilAkhir={setIsOpenPopUpGanjilAkhir}
          isOpenPopUpGenapAwal={isOpenPopUpGenapAwal}
          setIsOpenPopUpGenapAwal={setIsOpenPopUpGenapAwal}
          isOpenPopUpGenapAkhir={isOpenPopUpGenapAkhir}
          setIsOpenPopUpGenapAkhir={setIsOpenPopUpGenapAkhir}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          limitPerPage={limitPerPage}
        />

        <PopUpEdit
          title="Ubah rapot"
          icon={<PiBookBookmarkFill />}
          isOpenPopUpEdit={isOpenPopUpEdit}
          setIsOpenPopUpEdit={setIsOpenPopUpEdit}
          className="md:max-w-2xl"
        >
          <FormEditDetailRapot
            setIsOpenPopUpEdit={setIsOpenPopUpEdit}
            data={getData}
          />
        </PopUpEdit>

        <PopUpAction
          title="Rapot ganjil awal"
          icon={<PiBookBookmarkFill />}
          isOpenPopUp={isOpenPopUpGanjilAwal}
          setIsOpenPopUp={setIsOpenPopUpGanjilAwal}
          className="md:max-w-5xl h-fit overflow-y-auto"
        >
          <div className="w-full h-[350px] sm:h-[500px] md:h-[630px] duration-100 bg-blue-100">
            <embed
              src={`${API_URL}${getData?.rapot_ganjil_awal}`}
              type="application/pdf"
              className="w-full h-full"
            />
          </div>
        </PopUpAction>

        <PopUpAction
          title="Rapot ganjil akhir"
          icon={<PiBookBookmarkFill />}
          isOpenPopUp={isOpenPopUpGanjilAkhir}
          setIsOpenPopUp={setIsOpenPopUpGanjilAkhir}
          className="md:max-w-5xl h-fit overflow-y-auto"
        >
          <div className="w-full h-[350px] sm:h-[500px] md:h-[630px] duration-100 bg-blue-100">
            <embed
              src={`${API_URL}${getData?.rapot_ganjil_akhir}`}
              type="application/pdf"
              className="w-full h-full"
            />
          </div>
        </PopUpAction>

        <PopUpAction
          title="Rapot genap awal"
          icon={<PiBookBookmarkFill />}
          isOpenPopUp={isOpenPopUpGenapAwal}
          setIsOpenPopUp={setIsOpenPopUpGenapAwal}
          className="md:max-w-5xl h-fit overflow-y-auto"
        >
          <div className="w-full h-[350px] sm:h-[500px] md:h-[630px] duration-100 bg-blue-100">
            <embed
              src={`${API_URL}${getData?.rapot_genap_awal}`}
              type="application/pdf"
              className="w-full h-full"
            />
          </div>
        </PopUpAction>

        <PopUpAction
          title="Rapot genap akhir"
          icon={<PiBookBookmarkFill />}
          isOpenPopUp={isOpenPopUpGenapAkhir}
          setIsOpenPopUp={setIsOpenPopUpGenapAkhir}
          className="md:max-w-5xl h-fit overflow-y-auto"
        >
          <div className="w-full h-[350px] sm:h-[500px] md:h-[630px] duration-100 bg-blue-100">
            <embed
              src={`${API_URL}${getData?.rapot_genap_akhir}`}
              type="application/pdf"
              className="w-full h-full"
            />
          </div>
        </PopUpAction>
      </div>
    </Layout>
  );
};

export default DetailRapot;
