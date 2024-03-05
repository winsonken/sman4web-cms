import React, { useState } from 'react';
import Layout from '../components/Layout';
import ButtonAdd from '../components/ButtonAdd';
import PopUp from '../components/PopUp';

const Angkatan = () => {
  const [isOpenPopUp, setIsOpenPopUp] = useState(false);

  return (
    <Layout>
      <div className="flex flex-col gap-5">
        <div>
          <h1 className="text-xl font-semibold md:text-2xl">Angkatan</h1>
        </div>

        <div>
          <ButtonAdd
            title="Tambah angkatan"
            onClick={() => {
              setIsOpenPopUp(!isOpenPopUp);
            }}
          />

          <PopUp isOpenPopUp={isOpenPopUp} />
        </div>
      </div>
    </Layout>
  );
};

export default Angkatan;
