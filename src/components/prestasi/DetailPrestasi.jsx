import React from 'react';
import Button from '../Button';

const DetailPrestasi = (props) => {
  const { setIsOpenPopUpAdd } = props;
  const {
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });
  return (
    <div className="grid gap-5 max-w-xl h-fit max-h-[80%] p-3 rounded-md xl:max-w-2xl duration-200 overflow-y-auto ${className}">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:grid-cols-2">
        <div>
          <h1 className="font-medium text-second-blue">Kelas</h1>
          <p className="w-full text-sm font-medium text-main-cream  bg-main-blue px-3 py-2 rounded ">
            X IPA
          </p>
        </div>
        <div>
          <h1 className="font-medium text-second-blue">Nama</h1>
          <p className="w-full text-sm font-medium text-main-cream  bg-main-blue px-3 py-2 rounded ">
            Maria Zhang
          </p>
        </div>
        <div>
          <h1 className="font-medium text-second-blue">Prestasi</h1>
          <p className="w-full text-sm font-medium text-main-cream  bg-main-blue px-3 py-2 rounded ">
            Juara 3
          </p>
        </div>

        <div>
          <h1 className="font-medium text-second-blue">Nama Prestasi</h1>
          <p className="w-full text-sm font-medium text-main-cream  bg-main-blue px-3 py-2 rounded ">
            Olimpiade IPA
          </p>
        </div>
        <div>
          <h1 className="font-medium text-second-blue">Tanggal Prestasi</h1>
          <p className="w-full text-sm font-medium text-main-cream  bg-main-blue px-3 py-2 rounded ">
            04/07/2023
          </p>
        </div>
      </div>
      <div className="flex justify-end gap-2">
        <Button
          title="Batal"
          type="cancel"
          setIsOpenPopUp={setIsOpenPopUpAdd}
        />
        <Button title="Simpan" type="submit" />
      </div>
    </div>
  );
};

export default DetailPrestasi;
