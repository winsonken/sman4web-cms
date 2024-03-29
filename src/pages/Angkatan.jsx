import React, { useState } from 'react';

import { MdStairs } from 'react-icons/md';
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
  FormAddAngkatan,
  FormEditAngkatan,
  TableAngkatan,
} from '../components/angkatan';

import {
  useDeleteAngkatanMutation,
  useGetAngkatanOptionQuery,
  useGetAngkatanQuery,
  useUpdateMulaiAngkatanMutation,
  useUpdateLulusAngkatanMutation,
} from '../services/api/angkatanApiSlice';
import useDebounce from '../helpers/useDebounce';

const Angkatan = () => {
  const [selectFilterAngkatan, setSelectFilterAngkatan] = useState('');
  const [searchFilterAngkatan, setSearchFilterAngkatan] = useState('');
  const debouncedSearchAngkatan = useDebounce(searchFilterAngkatan, 500);

  const [isOpenPopUpAdd, setIsOpenPopUpAdd] = useState(false);
  const [isOpenPopUpEdit, setIsOpenPopUpEdit] = useState(false);
  const [isOpenPopUpDelete, setIsOpenPopUpDelete] = useState(false);
  const [isOpenPopUpMulai, setIsOpenPopUpMulai] = useState(false);
  const [isOpenPopUpLulus, setIsOpenPopUpLulus] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const limitPerPage = 10;
  const [getData, setGetData] = useState([]);

  const {
    data: angkatan,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetAngkatanQuery({
    no: selectFilterAngkatan,
    q: debouncedSearchAngkatan,
    page: currentPage,
    limit: limitPerPage,
  });

  const [deleteAngkatan, { isLoadingDelete, isErrorDelete, errorDelete }] =
    useDeleteAngkatanMutation();

  const handleDelete = async () => {
    try {
      const response = await deleteAngkatan({
        id: getData?.id_angkatan,
      }).unwrap();
      if (!response.error) {
        toast.success('Angkatan berhasil dihapus!', {
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

  const { data: angkatanOption } = useGetAngkatanOptionQuery();

  const selectAngkatan = angkatanOption?.data?.map((e) => ({
    value: e?.no_angkatan,
    label: e?.no_angkatan,
  }));

  const [updateMulaiAngkatan] = useUpdateMulaiAngkatanMutation();

  const handleMulaiAngkatan = async () => {
    const payload = {
      id_angkatan: getData?.id_angkatan,
    };

    try {
      const response = await updateMulaiAngkatan(payload).unwrap();

      if (!response.error) {
        toast.success('Angkatan berhasil dimulai!', {
          position: 'top-right',
          theme: 'light',
        });
        setIsOpenPopUpMulai(false);
      }
    } catch (error) {
      const errorMessage = error?.data?.message;
      toast.error(`${errorMessage}`, {
        position: 'top-right',
        theme: 'light',
      });
    }
  };

  const [updateLulusAngkatan] = useUpdateLulusAngkatanMutation();

  const handleLulusAngkatan = async () => {
    const payload = {
      id_angkatan: getData?.id_angkatan,
    };

    try {
      const response = await updateLulusAngkatan(payload).unwrap();

      if (!response.error) {
        toast.success('Angkatan berhasil diluluskan!', {
          position: 'top-right',
          theme: 'light',
        });
        setIsOpenPopUpLulus(false);
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
          <h1 className="text-xl font-semibold md:text-2xl">Angkatan</h1>
        </div>

        <div className="flex flex-col sm:flex-row sm:justify-between gap-3">
          <ButtonAdd
            title="Tambah angkatan"
            isOpenPopUpAdd={isOpenPopUpAdd}
            setIsOpenPopUpAdd={setIsOpenPopUpAdd}
          />

          <div className="flex flex-col gap-3 sm:w-1/2 sm:flex-row 2xl:w-1/3  ">
            <div className="sm:w-1/2">
              <SelectFilter
                placeholder="Select angkatan"
                data={selectAngkatan}
                selectedValue={selectFilterAngkatan}
                setSelectedValue={setSelectFilterAngkatan}
              />
            </div>
            <div className="sm:w-1/2">
              <SearchFilter
                searchValue={searchFilterAngkatan}
                setSearchValue={setSearchFilterAngkatan}
              />
            </div>
          </div>
        </div>

        <TableAngkatan
          data={angkatan}
          isLoading={isLoading}
          isSuccess={isSuccess}
          isError={isError}
          error={error}
          isOpenPopUpMulai={isOpenPopUpMulai}
          setIsOpenPopUpMulai={setIsOpenPopUpMulai}
          isOpenPopUpLulus={isOpenPopUpLulus}
          setIsOpenPopUpLulus={setIsOpenPopUpLulus}
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
          title="Tambah angkatan"
          icon={<MdStairs />}
          isOpenPopUpAdd={isOpenPopUpAdd}
          setIsOpenPopUpAdd={setIsOpenPopUpAdd}
          className="md:max-w-2xl"
        >
          <FormAddAngkatan setIsOpenPopUpAdd={setIsOpenPopUpAdd} />
        </PopUpAdd>

        <PopUpEdit
          title="Ubah angkatan"
          icon={<MdStairs />}
          isOpenPopUpEdit={isOpenPopUpEdit}
          setIsOpenPopUpEdit={setIsOpenPopUpEdit}
        >
          <FormEditAngkatan
            setIsOpenPopUpEdit={setIsOpenPopUpEdit}
            data={getData}
          />
        </PopUpEdit>

        <PopUpDelete
          title="Hapus angkatan"
          icon={<MdStairs />}
          isOpenPopUpDelete={isOpenPopUpDelete}
          setIsOpenPopUpDelete={setIsOpenPopUpDelete}
        >
          <div className="flex flex-col gap-3">
            <h1>Apakah anda yakin menghapus data angkatan ini?</h1>

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

        <PopUpAction
          title="Luluskan angkatan"
          icon={<MdStairs />}
          isOpenPopUp={isOpenPopUpLulus}
          setIsOpenPopUp={setIsOpenPopUpLulus}
        >
          <div className="flex flex-col gap-3">
            <h1>Apakah anda yakin meluluskan angkatan ini?</h1>

            <div className="flex justify-end gap-2">
              <Button
                title="Batal"
                type="cancel"
                setIsOpenPopUp={setIsOpenPopUpLulus}
              />
              <Button title="Simpan" onClick={handleLulusAngkatan} />
            </div>
          </div>
        </PopUpAction>

        <PopUpAction
          title="Mulai angkatan"
          icon={<MdStairs />}
          isOpenPopUp={isOpenPopUpMulai}
          setIsOpenPopUp={setIsOpenPopUpMulai}
        >
          <div className="flex flex-col gap-3">
            <h1>Apakah anda yakin memulai pembelajaran angkatan ini?</h1>

            <div className="flex justify-end gap-2">
              <Button
                title="Batal"
                type="cancel"
                setIsOpenPopUp={setIsOpenPopUpMulai}
              />
              <Button title="Simpan" onClick={handleMulaiAngkatan} />
            </div>
          </div>
        </PopUpAction>
      </div>
    </Layout>
  );
};

export default Angkatan;
