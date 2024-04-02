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
import { useGetRapotQuery } from '../services/api/rapotApiSlice';
import useDebounce from '../helpers/useDebounce';

const Rapot = () => {
  const [searchFilterRapot, setSearchFilterRapot] = useState('');

  const debouncedSearchRapot = useDebounce(searchFilterRapot, 500);

  const [currentPage, setCurrentPage] = useState(1);
  const limitPerPage = 10;
  const [getData, setGetData] = useState([]);

  const [isOpenPopUpAdd, setIsOpenPopUpAdd] = useState(false);
  const [isOpenPopUpEdit, setIsOpenPopUpEdit] = useState(false);
  const [isOpenPopUpDelete, setIsOpenPopUpDelete] = useState(false);
  const [isOpenPopUpDetail, setIsOpenPopUpDetail] = useState(false);
  const [isOpenPopUpGanjilAwal, setIsOpenPopUpGanjilAwal] = useState(false);

  const {
    data: rapot,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetRapotQuery({
    q: debouncedSearchRapot,
    page: currentPage,
    limit: limitPerPage,
  });

  console.log(getData?.rapot_ganjil_awal);
  return (
    <Layout>
      <div className="flex flex-col gap-5">
        <div>
          <h1 className="text-xl font-semibold md:text-2xl">Rapot Siswa</h1>
        </div>

        <div className="flex sm:justify-end">
          <div className="w-full sm:w-1/2 duration-100 md:w-1/3 2xl:w-1/5">
            <SearchFilter
              searchValue={searchFilterRapot}
              setSearchValue={setSearchFilterRapot}
            />
          </div>
        </div>

        <TableRapot
          data={rapot}
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
          isOpenPopUpGanjilAwal={isOpenPopUpGanjilAwal}
          setIsOpenPopUpGanjilAwal={setIsOpenPopUpGanjilAwal}
          setGetData={setGetData}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          limitPerPage={limitPerPage}
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

        <PopUpAction
          title="Rapot ganjil awal"
          icon={<PiBookBookmarkFill />}
          isOpenPopUp={isOpenPopUpGanjilAwal}
          setIsOpenPopUp={setIsOpenPopUpGanjilAwal}
          className="md:max-w-5xl h-fit overflow-y-auto"
        >
          <div className="w-full h-[350px] sm:h-[500px] md:h-[630px] duration-100 bg-blue-100">
            <embed
              src={`http://localhost:5500/${getData?.rapot_ganjil_awal}`}
              type="application/pdf"
              className="w-full h-full"
            />
          </div>
        </PopUpAction>
      </div>
    </Layout>
  );
};

export default Rapot;
