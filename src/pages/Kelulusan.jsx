import React from 'react';

import { GiGraduateCap } from 'react-icons/gi';
import { toast } from 'react-toastify';

import {
  Button,
  ButtonAdd,
  ButtonCustom,
  Layout,
  PopUpCustom,
  PopUpAdd,
  PopUpAction,
  PopUpEdit,
  PopUpDelete,
  PopUpDetail,
  SelectFilter,
  SearchFilter,
  Loading,
} from '../components';

import { TableKelulusan } from '../components/kelulusan';
import {
  useGetSiswaLulusQuery,
  useUpdateSetAlumniMutation,
} from '../services/api/siswaApiSlice';
import { useState } from 'react';
import useDebounce from '../helpers/useDebounce';

const Kelulusan = () => {
  const [searchFilterSiswaLulus, setSearchFilterSiswaLulus] = useState('');
  const debouncedSearchSiswaLulus = useDebounce(searchFilterSiswaLulus, 500);

  const [isOpenPopUpSetAlumni, setIsOpenPopUpSetAlumni] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const limitPerPage = 10;
  const {
    data: siswaLulus,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetSiswaLulusQuery({
    q: debouncedSearchSiswaLulus,
    page: currentPage,
    limit: limitPerPage,
  });

  const [updateSetAlumni, { isLoading: isLoadingSetAlumni }] =
    useUpdateSetAlumniMutation();

  const handleSetAlumni = async () => {
    try {
      const response = await updateSetAlumni().unwrap();

      if (!response.error) {
        toast.success('Semua siswa lulus berhasil diubah ke alumni', {
          position: 'top-right',
          theme: 'light',
        });
        setIsOpenPopUpSetAlumni(false);
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
          <h1 className="text-xl font-semibold md:text-2xl">Kelulusan</h1>
        </div>

        <div className="flex flex-col sm:flex-row sm:justify-between gap-3">
          <ButtonCustom
            title="Set alumni"
            setIsOpenPopUp={setIsOpenPopUpSetAlumni}
          />
          <div className="w-full sm:w-1/2 duration-100 md:w-1/3 2xl:w-1/5">
            <SearchFilter
              searchValue={searchFilterSiswaLulus}
              setSearchValue={setSearchFilterSiswaLulus}
            />
          </div>
        </div>

        <TableKelulusan
          data={siswaLulus}
          isLoading={isLoading}
          isSuccess={isSuccess}
          isError={isError}
          error={error}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          limitPerPage={limitPerPage}
        />

        <PopUpCustom
          title="Ubah siswa lulus ke alumni"
          icon={<GiGraduateCap />}
          isOpenPopUp={isOpenPopUpSetAlumni}
          setIsOpenPopUp={setIsOpenPopUpSetAlumni}
          className="md:max-w-xl"
        >
          <div className="flex flex-col gap-3">
            <h1>
              Apakah anda yakin mengubah semua siswa lulus ini sebagai alumni?
            </h1>

            <div className="flex justify-end gap-2">
              <Button
                title="Batal"
                type="cancel"
                setIsOpenPopUp={setIsOpenPopUpSetAlumni}
              />
              <Button
                title={isLoadingSetAlumni ? <Loading /> : 'Simpan'}
                onClick={handleSetAlumni}
              />
            </div>
          </div>
        </PopUpCustom>
      </div>
    </Layout>
  );
};

export default Kelulusan;
