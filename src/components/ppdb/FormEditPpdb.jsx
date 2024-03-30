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
    nama_siswa_ppdb: yup.string().required('Nama required'),
    no_pendaftaran_ppdb: yup.string().required('No Pendaftaran required'),
    nipd_ppdb: yup.string().required('NIPD required'),
    tanggal_lahir_ppdb: yup.string().required('Tanggal Lahir required'),
    email_ppdb: yup.string().required('Email required'),
    tempat_lahir_ppdb: yup.string().required('Tempat Lahir required'),
    jenis_kelamin_ppdb: yup.string().required('Jenis Kelamin required'),
    agama_ppdb: yup.string().required('Agama required'),
    status_ppdb: yup.string().required('Status PPDB required'),
    alamat_ppdb: yup.string().required('Alamat required'),
    angkatan_ppdb: yup.string().required('Angkatan required'),
    no_telp_ppdb: yup.string().required('No Telp PPDB required'),
    no_telp_ortu: yup.string().required('No Telp Ortu required'),
    nama_ortu: yup.string().required('Nama Ortu required'),
  })
  .required();

const FormEditPpdb = (props) => {
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

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:grid-cols-3 ">
          <Input
            type="file"
            label="Foto"
            name="foto_ppdb"
            register={register}
            errors={errors}
          />
          <Input
            type="text"
            label="Nama"
            name="nama_siswa_ppdb"
            register={register}
            errors={errors}
          />
          <Input
            type="text"
            label="No Pendaftaran"
            name="no_pendaftaran_ppdb"
            register={register}
            errors={errors}
          />

          <Input
            type="text"
            label="NIPD"
            name="nipd_ppdb"
            register={register}
            errors={errors}
          />

          <Input
            type="date"
            label="Tanggal Lahir"
            name="tanggal_lahir_ppdb"
            register={register}
            errors={errors}
          />
          <Input
            type="text"
            label="Email"
            name="email_ppdb"
            register={register}
            errors={errors}
          />
          <Input
            type="text"
            label="Tempat Lahir"
            name="tempat_lahir_ppdb"
            register={register}
            errors={errors}
          />
          <Input
            type="text"
            label="Jenis Kelamin"
            name="jenis_kelamin_ppdb"
            register={register}
            errors={errors}
          />
          <Input
            type="text"
            label="Agama"
            name="agama_ppdb"
            register={register}
            errors={errors}
          />
          <Input
            type="text"
            label="Status PPDB"
            name="status_ppdb"
            register={register}
            errors={errors}
          />
          <Input
            type="text"
            label="Alamat"
            name="alamat_ppdb"
            register={register}
            errors={errors}
          />
          <Input
            type="number"
            label="Angkatan"
            name="angkatan_ppdb"
            register={register}
            errors={errors}
          />
          <Input
            type="text"
            label="No Telp PPDB"
            name="no_telp_ppdb"
            register={register}
            errors={errors}
          />
          <Input
            type="text"
            label="No Telp Ortu"
            name="no_telp_ortu"
            register={register}
            errors={errors}
          />
          <Input
            type="text"
            label="Nama Ortu"
            name="nama_ortu"
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
          <Button title="Ubah" type="submit" />
        </div>
      </div>
    </form>
  );
};
export default FormEditPpdb;
