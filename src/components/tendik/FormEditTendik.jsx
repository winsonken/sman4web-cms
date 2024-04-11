import React, { useEffect, useState } from 'react';
import Input from '../Input';
import Button from '../Button';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import SelectInput from '../SelectInput';
import InputImage from '../InputImage';
import InputDate from '../InputDate';

import { formatDate } from '../../helpers/FormatDate';
import Loading from '../Loading';

import { useUpdateTendikMutation } from '../../services/api/tendikApiSlice';

const validationSchema = yup
  .object({
    nama: yup.string().required('Nama tendik is required'),
    jenis_kelamin: yup.string().required('Jenis kelamin is required'),
    nik: yup
      .string()
      .max(16, 'NIK must be at most 16 characters')
      .required('NIK is required'),
    jenis_ptk: yup
      .string()
      .max(30, 'Jenis PTK must be at most 30 characters')
      .required('Jenis PTK is required'),
    no_tendik: yup
      .string()
      .max(20, 'NIP/NRPTK/NIG must be at most 20 characters')
      .required('NIP/NRPTK/NIG is required'),
    no_telepon_tendik: yup
      .string()
      .max(13, 'No telepon tendik must be at most 13 characters')
      .required('No Telepon tendik is required'),
    alamat: yup.string().required('Alamat is required'),
    email: yup
      .string()
      .max(30, 'Email must be at most 30 characters')
      .required('Email is required'),
    tempat_lahir: yup
      .string()
      .max(30, 'Tempat lahir must be at most 30 characters')
      .required('Tempat lahir is required'),
    tanggal_lahir: yup.string().required('Tanggal lahir is required'),
    agama: yup
      .string()
      .max(20, 'Agama must be at most 20 characters')
      .required('Agama is required'),
    status_kawin: yup.string().required('Status kawin is required'),
    status_kepegawaian: yup.string().required('Status kepegawaian is required'),
    role: yup.string().required('Role is required'),
  })
  .required();

const FormEditTendik = (props) => {
  const { data, selectRole, setIsOpenPopUpEdit } = props;

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
    setValue,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const [jenisKelaminValue, setJenisKelaminValue] = useState('');
  const [selectedRoleValue, setSelectedRoleValue] = useState('');
  const [selectedStatusValue, setSelectedStatusValue] = useState('');
  const [selectedImage, setSelectedImage] = useState('');
  const [imageValue, setImageValue] = useState('');

  const initialFormInput = {
    id_tendik: '',
    nama: '',
    jenis_kelamin: '',
    nik: '',
    no_tendik: '',
    jenis_ptk: '',
    no_telepon_tendik: '',
    alamat: '',
    email: '',
    tempat_lahir: '',
    tanggal_lahir: '',
    agama: '',
    image: '',
    status_kawin: '',
    status_tendik: '',
    status_kepegawaian: '',
    username: '',
    password: '',
    role: '',
  };
  const [formInput, setFormInput] = useState(initialFormInput);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setFormInput((prev) => ({
        ...prev,
        image: file,
      }));
      setSelectedImage(file);
    }
  };

  const [updateTendik, { isLoading, isSuccess, isError, error }] =
    useUpdateTendikMutation();

  const handleSubmitForm = async () => {
    const formData = new FormData();
    formData.append('id_tendik', formInput?.id_tendik);
    formData.append('nama', formInput?.nama);
    formData.append('jenis_kelamin', jenisKelaminValue);
    formData.append('nik', formInput?.nik);
    formData.append('jenis_ptk', formInput?.jenis_ptk);
    formData.append('no_tendik', formInput?.no_tendik);
    formData.append('no_telepon_tendik', formInput?.no_telepon_tendik);
    formData.append('alamat', formInput?.alamat);
    formData.append('email', formInput?.email);
    formData.append('tempat_lahir', formInput?.tempat_lahir);
    formData.append('tanggal_lahir', formatDate(formInput?.tanggal_lahir));
    formData.append('agama', formInput?.agama);
    formData.append('image', selectedImage);
    formData.append('status_kawin', formInput?.status_kawin);
    formData.append('status_tendik', selectedStatusValue);
    formData.append('status_kepegawaian', formInput?.status_kepegawaian);
    formData.append('username', formInput?.username);
    formData.append('password', formInput?.password);
    formData.append('role', selectedRoleValue);

    try {
      const response = await updateTendik(formData).unwrap();
      if (!response.error) {
        toast.success('Tendik berhasil diubah!', {
          position: 'top-right',
          theme: 'light',
        });
        setIsOpenPopUpEdit(false);
      }
    } catch (error) {
      const errorMessage = error?.data?.message;
      toast.error(`${errorMessage}`, {
        position: 'top-right',
        theme: 'light',
      });
    }
  };

  const handleTanggalLahir = (date, field) => {
    field.onChange(date);
    setFormInput((prev) => ({
      ...prev,
      tanggal_lahir: date,
    }));
  };

  useEffect(() => {
    if (data) {
      setFormInput({
        id_tendik: data?.id_tendik,
        nama: data?.nama,
        jenis_kelamin: data?.jenis_kelamin,
        nik: data?.nik,
        no_tendik: data?.no_tendik,
        jenis_ptk: data?.jenis_ptk,
        no_telepon_tendik: data?.no_telepon_tendik,
        alamat: data?.alamat,
        email: data?.email,
        tempat_lahir: data?.tempat_lahir,
        tanggal_lahir: data?.tanggal_lahir,
        agama: data?.agama,
        image: data?.foto,
        status_kawin: data?.status_kawin,
        status_tendik: data?.status_tendik,
        status_kepegawaian: data?.status_kepegawaian,
        username: data?.username,
        password: '',
        role: data?.role,
      });
    }
    setJenisKelaminValue(data?.jenis_kelamin);
    setSelectedStatusValue(data?.status_tendik);
    setSelectedRoleValue(data?.role);
    setImageValue(data?.foto);
  }, [data, setFormInput]);

  useEffect(() => {
    const fieldsToCheck = [
      'nama',
      'nik',
      'jenis_ptk',
      'no_tendik',
      'no_telepon_tendik',
      'alamat',
      'email',
      'tempat_lahir',
      'agama',
      'status_kawim',
      'status_kepegawaian',
    ];

    fieldsToCheck.forEach((field) => {
      if (errors[field] && formInput[field] !== '') {
        if (errors[field].type === 'required') {
          clearErrors(field);
        }
      }
    });
  }, [formInput, clearErrors, errors]);

  useEffect(() => {
    if (data) {
      setValue('nama', data?.nama);
      setValue('jenis_kelamin', data?.jenis_kelamin);
      setValue('nik', data?.nik);
      setValue('no_tendik', data?.no_tendik);
      setValue('jenis_ptk', data?.jenis_ptk);
      setValue('no_telepon_tendik', data?.no_telepon_tendik);
      setValue('alamat', data?.alamat);
      setValue('email', data?.email);
      setValue('tempat_lahir', data?.tempat_lahir);
      setValue('tanggal_lahir', data?.tanggal_lahir);
      setValue('agama', data?.agama);
      setValue('image', data?.foto);
      setValue('status_kawin', data?.status_kawin);
      setValue('status_tendik', data?.status_tendik);
      setValue('status_kepegawaian', data?.status_kepegawaian);
      setValue('username', data?.username);
      // setValue('password', data?.password);
      setValue('role', data?.role);
    }
  }, [data, setFormInput, setValue]);

  useEffect(() => {
    setValue('jenis_kelamin', jenisKelaminValue);
    clearErrors('jenis_kelamin');
  }, [jenisKelaminValue, setValue]);

  useEffect(() => {
    setValue('role', selectedRoleValue);
    clearErrors('role');
  }, [selectedRoleValue, setValue]);

  const jenisKelamin = [
    { value: 'Laki-laki', label: 'Laki-laki' },
    { value: 'Perempuan', label: 'Perempuan' },
  ];

  const statusTendik = [
    // { value: 0, label: 'Baru' },
    { value: 1, label: 'Aktif' },
    { value: 2, label: 'Tidak aktif' },
  ];

  return (
    <form onSubmit={handleSubmit(handleSubmitForm)}>
      <div className="flex flex-col gap-6">
        <div className="grid grid-flow-row-dense grid-cols-1 sm:grid-cols-2 gap-3 md:grid-cols-3 ">
          <div className="sm:row-span-2">
            <InputImage
              imageValue={imageValue}
              setImageValue={setImageValue}
              onChange={handleImageChange}
              selectedImage={selectedImage}
              setSelectedImage={setSelectedImage}
            />
          </div>

          <Input
            type="text"
            label="Nama tendik"
            name="nama"
            onChange={handleChange}
            register={register}
            errors={errors}
          />

          <Controller
            name="jenis_kelamin"
            control={control}
            render={({ field }) => (
              <SelectInput
                field={field}
                data={jenisKelamin}
                label="Jenis kelamin"
                name="jenis_kelamin"
                selectedValue={jenisKelaminValue}
                setSelectedValue={setJenisKelaminValue}
                placeholder="Select jenis kelamin"
                isClearable
                errors={errors}
              />
            )}
          />

          <Input
            type="number"
            label="NIK"
            name="nik"
            // max="16"
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
            label="NIP/NRPTK/NIG"
            name="no_tendik"
            onChange={handleChange}
            register={register}
            errors={errors}
          />

          <Input
            type="number"
            label="No Telp tendik"
            name="no_telepon_tendik"
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
            label="Email"
            name="email"
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

          <Controller
            name="tanggal_lahir"
            control={control}
            render={({ field }) => (
              <InputDate
                field={field}
                label="Tanggal lahir"
                name="tanggal_lahir"
                dateFormat="yyyy/MM/dd"
                placeholder="Select tanggal lahir"
                onChange={(date) => handleTanggalLahir(date, field)}
                errors={errors}
              />
            )}
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
            label="Status kawin"
            name="status_kawin"
            onChange={handleChange}
            register={register}
            errors={errors}
          />

          <Input
            type="text"
            label="Status kepegawaian"
            name="status_kepegawaian"
            onChange={handleChange}
            register={register}
            errors={errors}
          />

          <Controller
            name="status_tendik"
            control={control}
            render={({ field }) => (
              <SelectInput
                field={field}
                data={statusTendik}
                label="Status"
                name="status_tendik"
                selectedValue={selectedStatusValue}
                setSelectedValue={setSelectedStatusValue}
                placeholder="Select status tendik"
                errors={errors}
                disabled={
                  data?.id_tendik == 'a8c8fe0b97996298eb084322c9d525f3'
                    ? true
                    : false
                }
              />
            )}
          />

          <Input
            type="text"
            label="Username"
            name="username"
            onChange={handleChange}
            register={register}
            errors={errors}
          />

          <Input
            type="password"
            label="Password"
            name="password"
            onChange={handleChange}
            register={register}
            errors={errors}
          />

          <Controller
            name="role"
            control={control}
            render={({ field }) => (
              <SelectInput
                field={field}
                data={selectRole}
                label="Role"
                name="role"
                selectedValue={selectedRoleValue}
                setSelectedValue={setSelectedRoleValue}
                placeholder="Select role"
                errors={errors}
                isSearchable
                isClearable
                disabled={
                  data?.id_tendik == 'a8c8fe0b97996298eb084322c9d525f3'
                    ? true
                    : false
                }
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
          <Button title={isLoading ? <Loading /> : 'Ubah'} type="submit" />
        </div>
      </div>
    </form>
  );
};
export default FormEditTendik;
