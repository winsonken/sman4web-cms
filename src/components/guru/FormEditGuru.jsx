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
    nrtpk: yup.string().required('NRTPK required'),
    tempat_lahir: yup.string().required('Tempat Lahir required'),
    email: yup.string().required('Email required'),
    jenis_ptk: yup.string().required('PTK required'),
    jenis_kelamin: yup.string().required('Jenis Kelamin required'),
    agama: yup.string().required('Agama required'),
    alamat: yup.string().required('Alamat required'),
    no_telp_guru: yup.string().required('No Telp Guru required'),
    status_kepegawaian: yup.string().required('Status Pegawai required'),
    status_guru: yup.string().required('Status Guru required'),
    status_nikah: yup.string().required('Status Nikah required'),
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
    toast.success('Data guru berhasil diubah!', {
      position: 'top-right',
      theme: 'light',
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
     <div className="flex flex-col gap-6">
     <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:grid-cols-3 ">
        <Input
          type="file"
          label="Foto"
          name="foto"
          register={register}
          errors={errors}
        />
        <Input
          type="text"
          label="Nama"
          name="nama"
          register={register}
          errors={errors}
        />
        <Input
          type="date"
          label="Tanggal Lahir"
          name="tanggal_lahir"
          register={register}
          errors={errors}
        />

        <Input
          type="number"
          label="NRTPK"
          name="nrtpk"
          register={register}
          errors={errors}
        />

        <Input
          type="text"
          label="Tempat Lahir"
          name="tempat_lahir"
          register={register}
          errors={errors}
        />
        <Input
          type="text"
          label="Email"
          name="email"
          register={register}
          errors={errors}
        />
        <Input
          type="text"
          label="Jenis PTK"
          name="jenis_ptk"
          register={register}
          errors={errors}
        />
        <Input
          type="text"
          label="Jenis Kelamin"
          name="jenis_kelamin"
          register={register}
          errors={errors}
        />
        <Input
          type="text"
          label="Agama"
          name="agama"
          register={register}
          errors={errors}
        />
        <Input
          type="text"
          label="Alamat"
          name="alamat"
          register={register}
          errors={errors}
        />
        <Input
          type="number"
          label="No Telp Guru"
          name="no_telp_guru"
          register={register}
          errors={errors}
        />
        <Input
          type="text"
          label="Status Kepegawaian"
          name="status_kepegawaian"
          register={register}
          errors={errors}
        />
        <Input
          type="text"
          label="Status Guru"
          name="status_guru"
          register={register}
          errors={errors}
        />
        <Input
          type="text"
          label="Status Nikah"
          name="status_nikah"
          register={register}
          errors={errors}
        />
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
