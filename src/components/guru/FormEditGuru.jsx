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
    nama: yup.string().required('Nama required'),
    tanggal_lahir: yup.string().required('Tanggal Lahir required'),
    nipd: yup.string().required('NIPD required'),
    tempat_lahir: yup.string().required('Tempat Lahir required'),
    email: yup.string().required('Email required'),
    jenis_ptk: yup.string().required('PTK required'),
    jenis_kelamin: yup.string().required('Jenis Kelamin required'),
    agama: yup.string().required('Agama required'),
    alamat: yup.string().required('Alamat required'),
    no_telp_guru: yup.string().required('No Telp Guru required'),
    status_kepegawaian: yup.string().required('Status Pegawai required'),
    status_guru: yup.string().required('Status Guru required'),
  })
  .required();

const FormEditGuru = (props) => {
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
    toast.success('Guru berhasil diubah!', {
      position: 'top-right',
      theme: 'light',
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
     <div className="flex flex-col gap-10">
        <div className='flex justify-between gap-10'>
          <div className='w-32 h-32 mx-9 mt-12 bg-gray-300 text-center text-xs'>
          <div className='w-20 h-10 mx-auto mt-12 text-xs text-white'>Tambah foto</div>
          </div>

          <div className='flex flex-col gap-4'>
            <div className='flex justify-between gap-10'>
            <Input
            className="w-72"
              label="Nama"
              name="nama"
              register={register}
              errors={errors}
            />
            <Input
            className="w-72"
              label="Tanggal Lahir"
              name="tanggal_lahir"
              register={register}
              errors={errors}
            />
            </div>

            <div className='flex justify-between gap-10'>
            <Input
            className="w-72"
              type="number"
              label="NIPD"
              name="nipd"
              register={register}
              errors={errors}
            />
            <Input
            className="w-72"
              label="Tempat Lahir"
              name="tempat_lahir"
              register={register}
              errors={errors}
            />
            </div>

            <div className='flex justify-between gap-10'>
            <Input
            className="w-72"
              label="Email"
              name="email"
              register={register}
              errors={errors}
            />
            <Input
            className="w-72"
              label="Jenis PTK"
              name="jenis_ptk"
              register={register}
              errors={errors}
            />
            </div>
          </div>
        </div>

        <div className='flex flex-col gap-4 -mt-5' >
          <div className='flex justify-between gap-10'>
            <Input
              className="w-72"
              label="Jenis Kelamin"
              name="jenis_kelamin"
              register={register}
              errors={errors}
            />
            <Input
              className="w-72"
              label="Agama"
              name="agama"
              register={register}
              errors={errors}
            />
            <Input
            className="w-72"
              label="Alamat"
              name="alamat"
              register={register}
              errors={errors}
            />
          </div>
          <div className='flex justify-between gap-10'>
            <Input
              className="w-72"
              type="number"
              label="Nomor Telp Guru"
              name="no_telp_guru"
              register={register}
              errors={errors}
            />
            <Input
              className="w-72"
              label="Status Kepegawaian"
              name="status_kepegawaian"
              register={register}
              errors={errors}
            />
            <Input
            className="w-72"
              label="Status Guru"
              name="status_guru"
              register={register}
              errors={errors}
            />
          </div>
        </div>
       </div>
        
        <div className="flex justify-end gap-2 pt-10">
          <Button
            title="Batal"
            type="cancel"
            setIsOpenPopUp={setIsOpenPopUpEdit}
          />
          <Button title="Ubah" type="submit" />
        </div>
    </form>
  );
};

export default FormEditGuru;
