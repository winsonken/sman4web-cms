import React from 'react';
import Input from '../Input';
import SelectInput from '../SelectInput';
import Button from '../Button';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { toast } from 'react-toastify';

const validationSchema = yup
  .object({
    tahun_ajaran: yup.string().required('Tahun ajaran is required'),
    periode_ganjil: yup.string().required('Periode ganjil is required'),
    periode_genap: yup.string().required('Periode genap is required'),
  })
  .required();

const FormEditTahunajaran = (props) => {
  const { setIsOpenPopUpEdit } = props;
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (e) => {
    toast.success('Tahun Ajaran berhasil diubah!', {
      position: 'top-right',
      theme: 'light',
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-3">
          <Input
            type="number"
            label="Tahun ajaran"
            name="tahun_ajaran"
            register={register}
            errors={errors}
          />
          <div className='flex justify-between'>
            <Input
              className="w-80"
              type="number"
              label="Periode ganjil"
              name="periode_ganjil"
              register={register}
              errors={errors}
            />

            <Input
              className="w-80"
              type="number"
              label="Periode genap"
              name="periode_genap"
              register={register}
              errors={errors}
            />
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <Button
            title="Batal"
            type="cancel"
            setIsOpenPopUp={setIsOpenPopUpEdit}
          />
          <Button title="Ubah" type="submit" />
        </div>
      </div>
    </form>
  );
};

export default FormEditTahunajaran;
