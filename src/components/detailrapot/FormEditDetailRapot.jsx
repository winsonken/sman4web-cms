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
    no_angkatan: yup.string().required('No Angkatan is required'),
    tahun: yup.string().required('Tahun is required'),
    status_angkatan: yup.object().required('Status is required'),
  })
  .required();

const FormEditDetailRapot = (props) => {
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
    toast.success('Angkatan berhasil diubah!', {
      position: 'top-right',
      theme: 'light',
    });
  };

  const statusAngkatan = [
    { value: '0', label: 'Belum dimulai' },
    { value: '1', label: 'Aktif' },
    { value: '2', label: 'Lulus' },
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-3">
          <Input
            type="file"
            label="Upload Rapot"
            name="upload_rapot"
            onChange={handleChange}
            register={register}
            errors={errors}
          />

          <Controller
            name="upload_rapot"
            control={control}
            render={({ field }) => (
              <SelectInput
                field={field}
                data={uploadRapot}
                label="Upload"
                name="upload_rapot"
                placeholder="Select rapot"
                errors={errors}
              />
            )}
          />
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

export default FormEditDetailRapot;
