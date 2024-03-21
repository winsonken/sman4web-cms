import React, { useState } from 'react';
import Input from '../Input';
import Button from '../Button';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

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

const FormAddGuru = (props) => {
  const { setIsOpenPopUpAdd } = props;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const initialFormInput = {
    nama: '',
    tanggal_lahir: '',
    nrtpk: '',
    tempat_lahir: '',
    email: '',
    jenis_ptk: '',
    jenis_kelamin: '',
    agama: '',
    alamat: '',
    no_telp_guru: '',
    status_kepegawaian: '',
    status_guru: '',
    status_nikah: '',
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
          label="NRTPK"
          name="nrtpk"
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
          label="Jenis PTK"
          name="jenis_ptk"
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
          label="Alamat"
          name="alamat"
          onChange={handleChange}
          register={register}
          errors={errors}
        />
        <Input
          type="number"
          label="No Telp Guru"
          name="no_telp_guru"
          onChange={handleChange}
          register={register}
          errors={errors}
        />
        <Input
          type="text"
          label="Status Kepegawaian"
          name="status_kepegawaian"
          onChange={handleChange}
          register={register}
          errors={errors}
        />
        <Input
          type="text"
          label="Status Guru"
          name="status_guru"
          onChange={handleChange}
          register={register}
          errors={errors}
        />
        <Input
          type="text"
          label="Status Nikah"
          name="status_nikah"
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

export default FormAddGuru;
