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
    nipd: '',
    tempat_lahir: '',
    email: '',
    jenis_ptk: '',
    jenis_kelamin: '',
    agama: '',
    alamat: '',
    no_telp_guru: '',
    status_kepegawaian: '',
    status_guru: '',
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
      <div className="flex flex-col gap-10">
        <div className='flex justify-between gap-10'>
          <div className='w-32 h-32 mx-9 mt-12 bg-gray-300'>
            <div className='w-20 h-10 mx-auto mt-12 text-xs text-white'>Tambah foto</div>
          </div>

          <div className='flex flex-col gap-4'>
            <div className='flex justify-between gap-10'>
            <Input
            className="w-72"
              label="Nama"
              name="nama"
              onChange={handleChange}
              register={register}
              errors={errors}
            />
            <Input
            className="w-72"
              label="Tanggal Lahir"
              name="tanggal_lahir"
              onChange={handleChange}
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
              onChange={handleChange}
              register={register}
              errors={errors}
            />
            <Input
            className="w-72"
              label="Tempat Lahir"
              name="tempat_lahir"
              onChange={handleChange}
              register={register}
              errors={errors}
            />
            </div>

            <div className='flex justify-between gap-10'>
            <Input
            className="w-72"
              label="Email"
              name="email"
              onChange={handleChange}
              register={register}
              errors={errors}
            />
            <Input
            className="w-72"
              label="Jenis PTK"
              name="jenis_ptk"
              onChange={handleChange}
              register={register}
              errors={errors}
            />
            </div>
          </div>
        </div>

        <div className='flex flex-col gap-4 -mt-5'>       
          <div className='flex justify-between gap-10'>
            <Input
              className="w-72"
              label="Jenis Kelamin"
              name="jenis_kelamin"
              onChange={handleChange}
              register={register}
              errors={errors}
            />
            <Input
              className="w-72"
              label="Agama"
              name="agama"
              onChange={handleChange}
              register={register}
              errors={errors}
            />
            <Input
            className="w-72"
              label="Alamat"
              name="alamat"
              onChange={handleChange}
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
              onChange={handleChange}
              register={register}
              errors={errors}
            />
            <Input
              className="w-72"
              label="Status Kepegawaian"
              name="status_kepegawaian"
              onChange={handleChange}
              register={register}
              errors={errors}
            />
            <Input
            className="w-72"
              label="Status Guru"
              name="status_guru"
              onChange={handleChange}
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
            setIsOpenPopUp={setIsOpenPopUpAdd}
          />
          <Button 
            title="Tambah" 
            type="submit" 
          />
        </div>
    </form>
  );
};

export default FormAddGuru;
