import React, { useState } from 'react';
import Input from '../Input';
import Button from '../Button';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const validationSchema = yup
  .object({
    no_angkatan: yup.string().required('No Angkatan is required'),
    tahun: yup.string().required('Tahun is required'),
  })
  .required();

const FormAddPelanggaran = (props) => {
  const { setIsOpenPopUpAdd } = props;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const initialFormInput = {
    no_angkatan: '',
    tahun: '',
  };
  const [formInput, setFormInput] = useState(initialFormInput);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmitForm = (e) => {
    alert(JSON.stringify(e));
  };
  return (
    <form onSubmit={handleSubmit(handleSubmitForm)}>
      <div className="flex flex-col gap-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:grid-cols-2 ">
          <Input
            type="text"
            label="Kelas"
            name="kelas_siswa"
            onChange={handleChange}
            register={register}
            errors={errors}
          />
          <Input
            type="text"
            label="Nama Siswa"
            name="nama_siswa"
            onChange={handleChange}
            register={register}
            errors={errors}
          />

          <Input
            type="text"
            label="Nama Pelanggaran"
            name="nama_pelanggaran"
            onChange={handleChange}
            register={register}
            errors={errors}
          />

          <Input
            type="date"
            label="Tanggal Pelanggaran"
            name="tanggal_pelanggaran"
            onChange={handleChange}
            register={register}
            errors={errors}
          />
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
    </form>
  );
};

export default FormAddPelanggaran;
