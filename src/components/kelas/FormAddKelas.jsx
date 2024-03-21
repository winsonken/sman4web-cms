import React, { useState } from 'react';
import Input from '../Input';
import Button from '../Button';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const validationSchema = yup
  .object({
    kelas: yup.string().required('Kelas is required'),
    jurusan: yup.string().required('Jurusan is required'),
    nomor: yup.string().required('Nomor is required'),
  })
  .required();

const FormAddKelas = (props) => {
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
        <div className="flex flex-col gap-3">
          <div className='flex flex-col gap-4'>
            <div className='flex justify-between gap-7'>
              <Input
              className="w-4/5"
                label="Kelas"
                name="kelas"
                onChange={handleChange}
                register={register}
                errors={errors}
              />
              <Input
              className="w-4/5"
                label="Jurusan"
                name="jurusan"
                onChange={handleChange}
                register={register}
                errors={errors}
              />
            </div>
          </div>
          <Input
            type="number"
            label="Nomor"
            name="nomor"
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
          <Button title="Tambah" type="submit" />
        </div>
      </div>
    </form>
  );
};

export default FormAddKelas;
