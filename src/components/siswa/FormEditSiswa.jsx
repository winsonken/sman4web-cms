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
    alamat: yup.string().required('Alamat required'),
    jenis_kelamin: yup.string().required('Jenis Kelamin required'),
    agama: yup.string().required('Agama required'),
    status_siswa: yup.string().required('Status Siswa required'),
    nama_ortu: yup.string().required('nama_ortu required'),
    angkatan: yup.string().required('Angkatan required'),
    no_telp_siswa: yup.string().required('No Telp Siswa required'),
    no_telp_ortu: yup.string().required('No Telp Ortu required'),
  })
  .required();

const FormEditSiswa = (props) => {
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

      <div className="flex justify-end gap-2 -mt-10 mb-6">
        <Button title="Pilih Jurusan" type="submit" />
      </div>

     <div className="flex flex-col gap-10">
        <div className='flex justify-between gap-10'>
          <div className='w-32 h-32 mx-9 mt-12 bg-gray-300 text-center text-xs'>
          <div className='w-20 h-10 mx-auto mt-14 text-xs text-white'>Tambah foto</div>
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
              label="Alamat"
              name="alamat"
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
              label="Status Siswa"
              name="status_siswa"
              register={register}
              errors={errors}
            />
          </div>
          <div className='flex justify-between gap-10'>
            <Input
              className="w-72"
              label="Nama Ortu"
              name="nama_ortu"
              register={register}
              errors={errors}
            />
            <Input
              className="w-72"
              label="Angkatan"
              name="angkatan"
              register={register}
              errors={errors}
            />
            <Input
              className="w-72"
              type="number"
              label="No Telp Siswa"
              name="no_telp_siswa"
              register={register}
              errors={errors}
            />
          </div>
          <div className='flex justify-between gap-0'>
            <Input
              className="w-72"
              label="No Telp Ortu"
              name="no_telp_ortu"
              register={register}
              errors={errors}
            />
            <div className='w-60'></div>
            <div className='w-60'></div>
          </div>
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
    </form>
  );
};

export default FormEditSiswa;
