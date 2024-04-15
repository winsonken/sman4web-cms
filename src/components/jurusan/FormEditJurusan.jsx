import React, { useEffect, useState } from 'react';
import Input from '../Input';
import SelectInput from '../SelectInput';
import Button from '../Button';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { useUpdateJurusanMutation } from '../../services/api/jurusanApiSlice';
import Loading from '../Loading';

const validationSchema = yup
  .object({
    nama_jurusan: yup.string().required('Nama jurusan is required'),
  })
  .required();

const FormEditJurusan = (props) => {
  const { data, setIsOpenPopUpEdit } = props;

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
    setValue,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const initialFormInput = {
    id_jurusan: '',
    nama_jurusan: '',
  };

  const [formInput, setFormInput] = useState(initialFormInput);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const [updateJurusan, { isLoading }] = useUpdateJurusanMutation();

  const handleSubmitForm = async () => {
    try {
      const response = await updateJurusan(formInput).unwrap();
      if (!response.error) {
        toast.success('Jurusan berhasil diubah!', {
          position: 'top-right',
          theme: 'light',
        });
        setIsOpenPopUpEdit(false);
      }
    } catch (error) {
      const errorMessage = error?.data?.message;
      toast.error(`${errorMessage}`, {
        position: 'top-right',
        theme: 'light',
      });
    }
  };

  useEffect(() => {
    if (data) {
      setFormInput({
        id_jurusan: data?.id_jurusan,
        nama_jurusan: data?.nama_jurusan,
      });
    }
  }, [data, setFormInput]);

  useEffect(() => {
    const fieldsToCheck = ['nama_jurusan'];

    fieldsToCheck.forEach((field) => {
      if (errors[field] && formInput[field] !== '') {
        if (errors[field].type === 'required') {
          clearErrors(field);
        }
      }
    });
  }, [formInput, clearErrors, errors]);

  useEffect(() => {
    if (data) {
      setValue('nama_jurusan', data?.nama_jurusan);
    }
  }, [data, setFormInput, setValue]);

  return (
    <form onSubmit={handleSubmit(handleSubmitForm)}>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-3">
          <Input
            type="text"
            label="Nama jurusan"
            name="nama_jurusan"
            onChange={handleChange}
            register={register}
            errors={errors}
          />
        </div>

        <div className="flex justify-end gap-2">
          <Button
            title="Batal"
            type="cancel"
            setIsOpenPopUp={setIsOpenPopUpEdit}
          />
          <Button title={isLoading ? <Loading /> : 'Ubah'} type="submit" />
        </div>
      </div>
    </form>
  );
};

export default FormEditJurusan;
