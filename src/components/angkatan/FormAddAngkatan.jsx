import React, { useState } from 'react';
import Input from '../Input';
import Button from '../Button';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { useCreateAngkatanMutation } from '../../services/api/angkatanApiSlice';

const validationSchema = yup
  .object({
    no_angkatan: yup.string().required('No Angkatan is required'),
    tahun: yup.string().required('Tahun is required'),
  })
  .required();

const FormAddAngkatan = (props) => {
  const { setIsOpenPopUpAdd } = props;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const [createAngkatan, { isLoading, isError, error }] =
    useCreateAngkatanMutation();

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

  const handleSubmitForm = async () => {
    try {
      const response = await createAngkatan(formInput).unwrap();
      if (!response.error) {
        toast.success('Angkatan berhasil ditambahkan!', {
          position: 'top-right',
          theme: 'light',
        });
        setIsOpenPopUpAdd(false);
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
    <form onSubmit={handleSubmit(handleSubmitForm)}>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-3">
          <Input
            type="number"
            label="Angkatan ke-"
            name="no_angkatan"
            onChange={handleChange}
            register={register}
            errors={errors}
          />
          <Input
            type="number"
            label="Tahun"
            name="tahun"
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

export default FormAddAngkatan;
