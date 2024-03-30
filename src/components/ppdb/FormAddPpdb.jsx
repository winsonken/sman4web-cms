import React, { useState } from 'react';
import Input from '../Input';
import Button from '../Button';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import InputFile from '../InputFile';

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

const FormAddPpdb = (props) => {
  const { setIsOpenPopUpAdd } = props;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const initialFormInput = {
    nama_siswa_ppdb: '',
    no_pendaftaran_ppdb: '',
    nipd_ppdb: '',
    tanggal_lahir_ppdb: '',
    email_ppdb: '',
    tempat_lahir_ppdb: '',
    jenis_kelamin_ppdb: '',
    agama_ppdb: '',
    status_ppdb: '',
    alamat_ppdb: '',
    angkatan_ppdb: '',
    no_telp_ppdb: '',
    no_telp_ortu: '',
    nama_ortu: '',
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
            name="foto_ppdb"
            onChange={handleChange}
            register={register}
            errors={errors}
          />
          <Input
            type="text"
            label="Nama"
            name="nama_siswa_ppdb"
            onChange={handleChange}
            register={register}
            errors={errors}
          />
          <Input
            type="text"
            label="No Pendaftaran"
            name="no_pendaftaran_ppdb"
            onChange={handleChange}
            register={register}
            errors={errors}
          />

          <Input
            type="text"
            label="NIPD"
            name="nipd_ppdb"
            onChange={handleChange}
            register={register}
            errors={errors}
          />

          <Input
            type="date"
            label="Tanggal Lahir"
            name="tanggal_lahir_ppdb"
            onChange={handleChange}
            register={register}
            errors={errors}
          />
          <Input
            type="text"
            label="Email"
            name="email_ppdb"
            onChange={handleChange}
            register={register}
            errors={errors}
          />
          <Input
            type="text"
            label="Tempat Lahir"
            name="tempat_lahir_ppdb"
            onChange={handleChange}
            register={register}
            errors={errors}
          />
          <Input
            type="text"
            label="Jenis Kelamin"
            name="jenis_kelamin_ppdb"
            onChange={handleChange}
            register={register}
            errors={errors}
          />
          <Input
            type="text"
            label="Agama"
            name="agama_ppdb"
            onChange={handleChange}
            register={register}
            errors={errors}
          />
          <Input
            type="text"
            label="Status PPDB"
            name="status_ppdb"
            onChange={handleChange}
            register={register}
            errors={errors}
          />
          <Input
            type="text"
            label="Alamat"
            name="alamat_ppdb"
            onChange={handleChange}
            register={register}
            errors={errors}
          />
          <Input
            type="number"
            label="Angkatan"
            name="angkatan_ppdb"
            onChange={handleChange}
            register={register}
            errors={errors}
          />
          <Input
            type="text"
            label="No Telp PPDB"
            name="no_telp_ppdb"
            onChange={handleChange}
            register={register}
            errors={errors}
          />
          <Input
            type="text"
            label="No Telp Ortu"
            name="no_telp_ortu"
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
export default FormAddPpdb;
