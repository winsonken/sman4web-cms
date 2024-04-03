import React from 'react';

import {
  Button,
  ButtonAdd,
  Layout,
  PopUpAdd,
  PopUpAction,
  PopUpEdit,
  PopUpDelete,
  PopUpDetail,
  SelectFilter,
  SearchFilter,
} from '../components';
import { TableKelasSiswa } from '../components/kelassiswa';

const KelasSiswa = () => {
  return (
    <Layout>
      <div className="flex flex-col gap-5">
        <div>
          <h1 className="text-xl font-semibold md:text-2xl">Kelas Siswa</h1>
        </div>

        <div className="flex sm:justify-end">
          <div className="w-full sm:w-1/2 duration-100 md:w-1/3 2xl:w-1/5">
            <SearchFilter />
          </div>
        </div>
        <TableKelasSiswa />
      </div>
    </Layout>
  );
};

export default KelasSiswa;
