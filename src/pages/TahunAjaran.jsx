import React, { useState } from 'react';

import { FaCalendar } from 'react-icons/fa';
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
  FormAddTahunajaran,
  FormEditTahunajaran,
  TableTahunAjaran,
  TableTahunAjaranBerakhir,
} from '../components/tahun-ajaran';
import {
  useDeleteTahunAjaranMutation,
  useGetTahunAjaranBerakhirQuery,
  useGetTahunAjaranQuery,
  useUpdateMulaiAjaranMutation,
  useUpdateSelesaiAjaranMutation,
} from '../services/api/tahunAjaranApiSlice';

import useDebounce from '../helpers/useDebounce';
import { useSelector } from 'react-redux';
import { selectCurrentModules } from '../services/features/authSlice';

const Tahunajaran = () => {
  const [searchFilterTahunAjaran, setSearchFilterTahunAjaran] = useState('');
  const debouncedSearchTahunAjaran = useDebounce(searchFilterTahunAjaran, 500);

  const [searchFilterTABerakhir, setSearchFilterTABerakhir] = useState('');
  const debouncedSearchTABerakhir = useDebounce(searchFilterTABerakhir, 500);

  const [isOpenPopUpAdd, setIsOpenPopUpAdd] = useState(false);
  const [isOpenPopUpEdit, setIsOpenPopUpEdit] = useState(false);
  const [isOpenPopUpDelete, setIsOpenPopUpDelete] = useState(false);
  const [isOpenPopUpMulai, setIsOpenPopUpMulai] = useState(false);
  const [isOpenPopUpSelesai, setIsOpenPopUpSelesai] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const limitPerPage = 3;

  const [currentPageTABerakhir, setCurrentPageTABerakhir] = useState(1);
  const limitPerPageTABerakhir = 10;

  const [getData, setGetData] = useState([]);

  const {
    data: tahunAjaran,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetTahunAjaranQuery({
    q: debouncedSearchTahunAjaran,
    page: currentPage,
    limit: limitPerPage,
  });

  const {
    data: tahunAjaranBerakhir,
    isLoading: isLoadingTABerakhir,
    isSuccess: isSuccessTABerakhir,
    isError: isErrorTABerakhir,
    error: errorTABerakhir,
  } = useGetTahunAjaranBerakhirQuery({
    q: debouncedSearchTABerakhir,
    page: currentPageTABerakhir,
    limit: limitPerPageTABerakhir,
  });

  const [deleteTahunAjaran] = useDeleteTahunAjaranMutation();

  const handleDelete = async () => {
    try {
      const response = await deleteTahunAjaran({
        id: getData?.id_tahun_ajaran,
      }).unwrap();
      if (!response.error) {
        toast.success('Tahun ajaran berhasil dihapus!', {
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

  const [updateMulaiAjaran] = useUpdateMulaiAjaranMutation();

  const handleMulaiTahunAjaran = async () => {
    const payload = {
      id_tahun_ajaran: getData?.id_tahun_ajaran,
    };

    try {
      const response = await updateMulaiAjaran(payload).unwrap();

      if (!response.error) {
        toast.success('Tahun ajaran berhasil dimulai!', {
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

  const [updateSelesaiAjaran] = useUpdateSelesaiAjaranMutation();

  const handleSelesaiTahunAjaran = async () => {
    const payload = {
      id_tahun_ajaran: getData?.id_tahun_ajaran,
    };

    try {
      const response = await updateSelesaiAjaran(payload).unwrap();

      if (!response.error) {
        toast.success('Tahun ajaran berhasil diakhiri!', {
          position: 'top-right',
          theme: 'light',
        });
        setIsOpenPopUpSelesai(false);
      }
    } catch (error) {
      const errorMessage = error?.data?.message;
      toast.error(`${errorMessage}`, {
        position: 'top-right',
        theme: 'light',
      });
    }
  };

  const modules = useSelector(selectCurrentModules);

  const filterModule = (kodeModul) => {
    const module = modules?.find(
      (allModules) => allModules?.kode_modul == kodeModul
    );
    return module;
  };

  const modulesTahunAjaran = filterModule('data_tahun_ajaran');

  return (
    <Layout>
      <div className="flex flex-col gap-5">
        <div>
          <h1 className="text-xl font-semibold md:text-2xl">Tahun Ajaran</h1>
        </div>

        <div
          className={`flex flex-col sm:flex-row gap-3 ${
            modulesTahunAjaran?.tambah ? 'sm:justify-between' : 'sm:justify-end'
          }`}
        >
          {modulesTahunAjaran?.tambah && (
            <ButtonAdd
              title="Tambah tahun ajaran"
              isOpenPopUpAdd={isOpenPopUpAdd}
              setIsOpenPopUpAdd={setIsOpenPopUpAdd}
            />
          )}

          <div className="w-full duration-100 sm:w-1/2 md:w-1/5">
            <SearchFilter
              searchValue={searchFilterTahunAjaran}
              setSearchValue={setSearchFilterTahunAjaran}
            />
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
          setGetData={setGetData}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          limitPerPage={limitPerPage}
        />

        <div className="flex flex-col gap-5">
          <h1 className="mt-8 text-xl font-semibold md:text-2xl">
            Tahun Ajaran Berakhir
          </h1>


        <div className="flex flex-col sm:flex-row sm:justify-between gap-3">
        <div></div>
          <div className="flex flex-reverse">
            <div className="sm:w-48">
              <SearchFilter />
            </div>
          </div>
        </div>


        <div className="flex flex-col gap-3">
          <div className="table-scroll relative overflow-x-auto rounded-t-lg">
            <table className="w-full text-sm text-left rtl:text-right text-black">
              <thead className="text-xs text-gray-700 uppercase bg-main-orange">
                <tr>
                  <th scope="col" className="px-6 py-4">
                    No
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Tahun Ajaran
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Periode ganjil
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Periode Genap
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Status
                  </th>
                  <th scope="col" className="text-center px-6 py-4">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-second-orange border-b">
                  <th
                    scope="row"
                    className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap"
                  >
                    1
                  </th>
                  <td className="px-6 py-2">2022-2023</td>
                  <td className="px-6 py-2">19/07/22 - 13/12/22</td>
                  <td className="px-6 py-2">05/01/23 - 15/06/23</td>
                  <td className="px-6 py-2">Berakhir</td>
                  <td className="flex flex-row justify-center items-center gap-2 px-6 py-2">

                    <ButtonEdit
                      isOpenPopUpEdit={isOpenPopUpEdit}
                      setIsOpenPopUpEdit={setIsOpenPopUpEdit}
                    />

                    <ButtonDelete
                      isOpenPopUpDelete={isOpenPopUpDelete}
                      setIsOpenPopUpDelete={setIsOpenPopUpDelete}
                    />
                  </td>
                </tr>

                <tr className="bg-green-100 border-b">
                  <th
                    scope="row"
                    className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap"
                  > 2
                  </th>
                  <td className="px-6 py-2">2023-2024</td>
                  <td className="px-6 py-2">19/07/22 - 13/12/22</td>
                  <td className="px-6 py-2">05/01/24 - 15/06/24</td>
                  <td className="px-6 py-2">Berakhir</td>
                  <td className="flex flex-row justify-center items-center gap-2 px-6 py-2">

                    <ButtonEdit
                      isOpenPopUpEdit={isOpenPopUpEdit}
                      setIsOpenPopUpEdit={setIsOpenPopUpEdit}
                    />

                    <ButtonDelete
                      isOpenPopUpDelete={isOpenPopUpDelete}
                      setIsOpenPopUpDelete={setIsOpenPopUpDelete}
                    />
                  </td>
                </tr>
                <tr className="bg-second-orange border-b">
                  <th
                    scope="row"
                    className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap"
                  >
                    3
                  </th>
                  <td className="px-6 py-2">2022-2023</td>
                  <td className="px-6 py-2">19/07/22 - 13/12/22</td>
                  <td className="px-6 py-2">05/01/23 - 15/06/23</td>
                  <td className="px-6 py-2">Berakhir</td>
                  <td className="flex flex-row justify-center items-center gap-2 px-6 py-2">

                    <ButtonEdit
                      isOpenPopUpEdit={isOpenPopUpEdit}
                      setIsOpenPopUpEdit={setIsOpenPopUpEdit}
                    />

                    <ButtonDelete
                      isOpenPopUpDelete={isOpenPopUpDelete}
                      setIsOpenPopUpDelete={setIsOpenPopUpDelete}
                    />
                  </td>
                </tr>

                <tr className="bg-green-100 border-b">
                  <th
                    scope="row"
                    className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap"
                  > 4
                  </th>
                  <td className="px-6 py-2">2023-2024</td>
                  <td className="px-6 py-2">19/07/22 - 13/12/22</td>
                  <td className="px-6 py-2">05/01/24 - 15/06/24</td>
                  <td className="px-6 py-2">Berakhir</td>
                  <td className="flex flex-row justify-center items-center gap-2 px-6 py-2">

                    <ButtonEdit
                      isOpenPopUpEdit={isOpenPopUpEdit}
                      setIsOpenPopUpEdit={setIsOpenPopUpEdit}
                    />

                    <ButtonDelete
                      isOpenPopUpDelete={isOpenPopUpDelete}
                      setIsOpenPopUpDelete={setIsOpenPopUpDelete}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          
          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPage={totalPage}
            totalRecord={totalRecord}
            limitPerPage={limitPerPage}
          />
        </div>

        <PopUpAdd
          title="Tambah tahun ajaran"
          icon={<FaCalendar />}
          isOpenPopUpAdd={isOpenPopUpAdd}
          setIsOpenPopUpAdd={setIsOpenPopUpAdd}
          className="md:max-w-3xl"
        >
          <FormAddTahunajaran setIsOpenPopUpAdd={setIsOpenPopUpAdd} />
        </PopUpAdd>

        <PopUpEdit
          title="Ubah Tahun ajaran"
          icon={<FaCalendar />}
          isOpenPopUpEdit={isOpenPopUpEdit}
          setIsOpenPopUpEdit={setIsOpenPopUpEdit}
          className="md:max-w-3xl"
        >
          <FormEditTahunajaran
            setIsOpenPopUpEdit={setIsOpenPopUpEdit}
            data={getData}
          />
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
              <Button title="Hapus" onClick={handleDelete} />
            </div>
          </div>
        </PopUpDelete>

        <PopUpAction
          title="Mulai tahun ajaran"
          icon={<FaCalendar />}
          isOpenPopUp={isOpenPopUpMulai}
          setIsOpenPopUp={setIsOpenPopUpMulai}
          className="md:max-w-xl"
        >
          <div className="flex flex-col gap-3">
            <h1>Apakah anda yakin memulai tahun ajaran ini?</h1>

            <div className="flex justify-end gap-2">
              <Button
                title="Batal"
                type="cancel"
                setIsOpenPopUp={setIsOpenPopUpMulai}
              />
              <Button title="Simpan" onClick={handleMulaiTahunAjaran} />
            </div>
          </div>
        </PopUpAction>

        <PopUpAction
          title="Akhiri tahun ajaran"
          icon={<FaCalendar />}
          isOpenPopUp={isOpenPopUpSelesai}
          setIsOpenPopUp={setIsOpenPopUpSelesai}
          className="md:max-w-xl"
        >
          <div className="flex flex-col gap-3">
            <h1>Apakah anda yakin mengakhiri tahun ajaran ini?</h1>

            <div className="flex justify-end gap-2">
              <Button
                title="Batal"
                type="cancel"
                setIsOpenPopUp={setIsOpenPopUpSelesai}
              />
              <Button title="Simpan" onClick={handleSelesaiTahunAjaran} />
            </div>
          </div>
        </PopUpAction>
      </div>
    </Layout>
  );
};

export default Tahunajaran;
