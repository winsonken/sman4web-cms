import React, { useState } from 'react';

import { FaBookOpen } from 'react-icons/fa';
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
import {
  useDeleteJurusanMutation,
  useGetJurusanQuery,
} from '../services/api/jurusanApiSlice';
import useDebounce from '../helpers/useDebounce';
import {
  FormAddJurusan,
  FormEditJurusan,
  TableJurusan,
} from '../components/jurusan';

const Jurusan = () => {
  const [searchFilterJurusan, setSearchFilterJurusan] = useState('');
  const debouncedSearchJurusan = useDebounce(searchFilterJurusan, 500);

  const [isOpenPopUpAdd, setIsOpenPopUpAdd] = useState(false);
  const [isOpenPopUpEdit, setIsOpenPopUpEdit] = useState(false);
  const [isOpenPopUpDelete, setIsOpenPopUpDelete] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const limitPerPage = 10;

  const [getData, setGetData] = useState([]);

  const {
    data: jurusan,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetJurusanQuery({
    q: debouncedSearchJurusan,
    page: currentPage,
    limit: limitPerPage,
  });

  const [deleteJurusan, { isLoadingDelete, isErrorDelete, errorDelete }] =
    useDeleteJurusanMutation();

  const handleDelete = async () => {
    try {
      const response = await deleteJurusan({
        id: getData?.id_jurusan,
      }).unwrap();
      if (!response.error) {
        toast.success('Jurusan berhasil dihapus!', {
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

  return (
    <Layout>
      <div className="flex flex-col gap-5">
        <div>
          <h1 className="text-xl font-semibold md:text-2xl">Jurusan</h1>
        </div>

        <div className="flex flex-col sm:flex-row sm:justify-between gap-3">
          <ButtonAdd
            title="Tambah jurusan"
            isOpenPopUpAdd={isOpenPopUpAdd}
            setIsOpenPopUpAdd={setIsOpenPopUpAdd}
          />

          <div className="w-full duration-100 sm:w-1/2 md:w-1/5">
            <SearchFilter
              searchValue={searchFilterJurusan}
              setSearchValue={setSearchFilterJurusan}
            />
          </div>
        </div>

        <TableJurusan
          data={jurusan}
          isLoading={isLoading}
          isSuccess={isSuccess}
          isError={isError}
          error={error}
          isOpenPopUpEdit={isOpenPopUpEdit}
          setIsOpenPopUpEdit={setIsOpenPopUpEdit}
          isOpenPopUpDelete={isOpenPopUpDelete}
          setIsOpenPopUpDelete={setIsOpenPopUpDelete}
          setGetData={setGetData}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          limitPerPage={limitPerPage}
        />

        <PopUpAdd
          title="Tambah jurusan"
          icon={<FaBookOpen />}
          isOpenPopUpAdd={isOpenPopUpAdd}
          setIsOpenPopUpAdd={setIsOpenPopUpAdd}
        >
          <FormAddJurusan setIsOpenPopUpAdd={setIsOpenPopUpAdd} />
        </PopUpAdd>

        <PopUpEdit
          title="Ubah jurusan"
          icon={<FaBookOpen />}
          isOpenPopUpEdit={isOpenPopUpEdit}
          setIsOpenPopUpEdit={setIsOpenPopUpEdit}
        >
          <FormEditJurusan
            setIsOpenPopUpEdit={setIsOpenPopUpEdit}
            data={getData}
          />
        </PopUpEdit>

        <PopUpDelete
          title="Hapus jurusan"
          icon={<FaBookOpen />}
          isOpenPopUpDelete={isOpenPopUpDelete}
          setIsOpenPopUpDelete={setIsOpenPopUpDelete}
        >
          <div className="flex flex-col gap-3">
            <h1>Apakah anda yakin menghapus jurusan ini?</h1>

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
      </div>
    </Layout>
  );
};

export default Jurusan;
