import React, { useState } from 'react';
import Input from '../Input';
import Button from '../Button';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import SelectFilter from '../SelectFilter';

const validationSchema = yup
  .object({
    foto: yup.string().required('Foto required'),
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
    jurusan: yup.string().required('Jurusan required'),
  })
  .required();

const FormAddSiswa = (props) => {
  const { setIsOpenPopUpAdd } = props;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const initialFormInput = {
    foto: '',
    nama: '',
    tanggal_lahir: '',
    nipd: '',
    tempat_lahir: '',
    email: '',
    alamat: '',
    jenis_kelamin: '',
    agama: '',
    status_siswa: '',
    nama_ortu: '',
    angkatan: '',
    no_telp_siswa: '',
    no_telp_ortu: '',
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
      <div className="flex justify-end gap-2 -mt-10 mb-6">
      <SelectFilter placeholder="Pilih Jurusan" />
      </div>
      
      <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:grid-cols-3 ">
        <Input
          type="file"
          label="Foto"
          name="foto"
          onChange={handleChange}
          register={register}
          errors={errors}
        />
        <Input
          type="text"
          label="Nama"
          name="nama"
          onChange={handleChange}
          register={register}
          errors={errors}
        />
        <Input
          type="date"
          label="Tanggal Lahir"
          name="tanggal_lahir"
          onChange={handleChange}
          register={register}
          errors={errors}
        />

        <Input
          type="number"
          label="NIPD"
          name="nipd"
          onChange={handleChange}
          register={register}
          errors={errors}
        />

        <Input
          type="text"
          label="Tempat Lahir"
          name="tempat_lahir"
          onChange={handleChange}
          register={register}
          errors={errors}
        />
        <Input
          type="text"
          label="Email"
          name="email"
          onChange={handleChange}
          register={register}
          errors={errors}
        />
        <Input
          type="text"
          label="Alamat"
          name="alamat"
          onChange={handleChange}
          register={register}
          errors={errors}
        />
        <Input
          type="text"
          label="Jenis Kelamin"
          name="jenis_kelamin"
          onChange={handleChange}
          register={register}
          errors={errors}
        />
        <Input
          type="text"
          label="Agama"
          name="agama"
          onChange={handleChange}
          register={register}
          errors={errors}
        />
        <Input
          type="text"
          label="Status Siswa"
          name="status_siswa"
          onChange={handleChange}
          register={register}
          errors={errors}
        />
        <Input
          type="text"
          label="Nama Ortu"
          name="nama_ortu"
          onChange={handleChange}
          register={register}
          errors={errors}
        />
        <Input
          type="text"
          label="Angkatan"
          name="angkatan"
          onChange={handleChange}
          register={register}
          errors={errors}
        />
        <Input
          type="number"
          label="No Telp Siswa"
          name="no_telp_siswa"
          onChange={handleChange}
          register={register}
          errors={errors}
        />
        <Input
          type="number"
          label="No Telp Ortu"
          name="no_telp_ortu"
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

export default FormAddSiswa;
