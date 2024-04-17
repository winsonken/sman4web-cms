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
import { useGetAngkatanDimulaiOptionQuery } from '../../services/api/angkatanApiSlice';

import { formatDate } from '../../helpers/FormatDate';
import {
  useCreateSiswaMutation,
  useUpdateSiswaMutation,
} from '../../services/api/siswaApiSlice';
import { useGetJurusanOptionQuery } from '../../services/api/jurusanApiSlice';
import Loading from '../Loading';

const validationSchema = yup
  .object({
    no_pendaftaran: yup
      .string()
      .max(15, 'No pendaftaran must be at most 15 characters')
      .required('No Pendaftaran is required'),
    nama: yup.string().required('Nama siswa is required'),
    jenis_kelamin: yup.string().required('Jenis kelamin is required'),
    nipd: yup
      .string()
      .max(10, 'NIPD must be at most 10 characters')
      .required('NIPD is required'),
    nik: yup
      .string()
      .max(16, 'NIK must be at most 16 characters')
      .required('NIK is required'),
    no_telepon_siswa: yup
      .string()
      .max(13, 'No telepon siswa must be at most 13 characters')
      .required('No Telepon siswa is required'),
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
    nama_ortu: yup.string().required('Nama ortu is required'),
    no_telepon_ortu: yup
      .string()
      .max(13, 'No telepon ortu must be at most 13 characters')
      .required('No telepon ortu is required'),
    angkatan: yup.string().required('Angkatan is required'),
  })
  .required();

const FormEditSiswa = (props) => {
  const { data, setIsOpenPopUpEdit } = props;
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
  const [selectedAngkatanValue, setSelectedAngkatanValue] = useState('');
  const [selectedJurusanValue, setSelectedJurusanValue] = useState('');
  const [selectedStatusValue, setSelectedStatusValue] = useState('');
  const [selectedImage, setSelectedImage] = useState('');
  const [imageValue, setImageValue] = useState('');

  const { data: angkatanOption } = useGetAngkatanDimulaiOptionQuery();
  const selectAngkatan = angkatanOption?.data?.map((e) => ({
    value: e?.id_angkatan,
    label: e?.no_angkatan,
  }));

  const { data: jurusanOption } = useGetJurusanOptionQuery();
  const selectJurusan = jurusanOption?.data?.map((e) => ({
    value: e?.id_jurusan,
    label: e?.nama_jurusan,
  }));

  const initialFormInput = {
    id_siswa: '',
    no_pendaftaran: '',
    nama: '',
    jenis_kelamin: '',
    nipd: '',
    nik: '',
    no_telepon_siswa: '',
    alamat: '',
    email: '',
    tempat_lahir: '',
    tanggal_lahir: '',
    agama: '',
    nama_ortu: '',
    no_telepon_ortu: '',
    image: '',
    angkatan: '',
    jurusan: '',
    status_siswa: '',
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

  const [updateSiswa, { isLoading, isSuccess, isError, error }] =
    useUpdateSiswaMutation();

  const handleSubmitForm = async () => {
    const formData = new FormData();
    formData.append('id_siswa', formInput?.id_siswa);
    formData.append('no_pendaftaran', formInput?.no_pendaftaran);
    formData.append('nama', formInput?.nama);
    formData.append('jenis_kelamin', jenisKelaminValue);
    formData.append('nipd', formInput?.nipd);
    formData.append('nik', formInput?.nik);
    formData.append('no_telepon_siswa', formInput?.no_telepon_siswa);
    formData.append('alamat', formInput?.alamat);
    formData.append('email', formInput?.email);
    formData.append('tempat_lahir', formInput?.tempat_lahir);
    formData.append('tanggal_lahir', formatDate(formInput?.tanggal_lahir));
    formData.append('agama', formInput?.agama);
    formData.append('nama_ortu', formInput?.nama_ortu);
    formData.append('no_telepon_ortu', formInput?.no_telepon_ortu);
    formData.append('image', selectedImage);
    formData.append('angkatan', selectedAngkatanValue);
    formData.append('jurusan', selectedJurusanValue || '');
    formData.append('status_siswa', selectedStatusValue);
    formData.append('username', formInput?.username);
    formData.append('password', formInput?.password);
    formData.append('role', formInput?.role);

    try {
      const response = await updateSiswa(formData).unwrap();
      if (!response.error) {
        toast.success('Siswa berhasil diubah!', {
          position: 'top-right',
          theme: 'light',
        });
        setIsOpenPopUpEdit(false);
      }
    } catch (error) {
      console.log(error);
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
        id_siswa: data?.id_siswa,
        no_pendaftaran: data?.no_pendaftaran,
        nama: data?.nama,
        jenis_kelamin: data?.jenis_kelamin,
        nipd: data?.nipd,
        nik: data?.nik,
        no_telepon_siswa: data?.no_telepon_siswa,
        alamat: data?.alamat,
        email: data?.email,
        tempat_lahir: data?.tempat_lahir,
        tanggal_lahir: data?.tanggal_lahir,
        agama: data?.agama,
        nama_ortu: data?.nama_ortu,
        no_telepon_ortu: data?.no_telepon_ortu,
        image: data?.foto,
        angkatan: data?.angkatan,
        jurusan: data?.jurusan,
        status_siswa: data?.status_siswa,
        username: data?.username,
        password: '',
        role: data?.role,
      });
    }
    setJenisKelaminValue(data?.jenis_kelamin);
    setSelectedAngkatanValue(data?.angkatan);
    setSelectedJurusanValue(data?.jurusan);
    setSelectedStatusValue(data?.status_siswa);
    setImageValue(data?.foto);
  }, [data, setFormInput]);

  useEffect(() => {
    const fieldsToCheck = [
      'no_pendaftaran',
      'nama',
      'nipd',
      'nik',
      'no_telepon_siswa',
      'alamat',
      'email',
      'tempat_lahir',
      'agama',
      'nama_ortu',
      'no_telepon_ortu',
      'foto',
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
      setValue('no_pendaftaran', data?.no_pendaftaran);
      setValue('nama', data?.nama);
      setValue('jenis_kelamin', data?.jenis_kelamin);
      setValue('nipd', data?.nipd);
      setValue('nik', data?.nik);
      setValue('no_telepon_siswa', data?.no_telepon_siswa);
      setValue('alamat', data?.alamat);
      setValue('email', data?.email);
      setValue('tempat_lahir', data?.tempat_lahir);
      setValue('tanggal_lahir', data?.tanggal_lahir);
      setValue('agama', data?.agama);
      setValue('nama_ortu', data?.nama_ortu);
      setValue('no_telepon_ortu', data?.no_telepon_ortu);
      setValue('image', data?.foto);
      setValue('angkatan', data?.angkatan);
      setValue('jurusan', data?.jurusan);
      setValue('status_siswa', data?.status_siswa);
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
    setValue('angkatan', selectedAngkatanValue);
    clearErrors('angkatan');
  }, [selectedAngkatanValue, setValue]);

  const jenisKelamin = [
    { value: 'Laki-laki', label: 'Laki-laki' },
    { value: 'Perempuan', label: 'Perempuan' },
  ];

  const statusSiswa = [
    // { value: 0, label: 'Baru' },
    { value: 1, label: 'Aktif' },
    { value: 2, label: 'Lulus' },
    { value: 4, label: 'Dropout' },
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
            label="No pendaftaran"
            name="no_pendaftaran"
            onChange={handleChange}
            register={register}
            errors={errors}
          />

          <Input
            type="text"
            label="Nama siswa"
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
            type="text"
            label="NIPD"
            name="nipd"
            onChange={handleChange}
            register={register}
            errors={errors}
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
            type="number"
            label="No Telp siswa"
            name="no_telepon_siswa"
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
            label="Nama Ortu"
            name="nama_ortu"
            onChange={handleChange}
            register={register}
            errors={errors}
          />

          <Input
            type="number"
            label="No Telp ortu"
            name="no_telepon_ortu"
            onChange={handleChange}
            register={register}
            errors={errors}
          />

          <Controller
            name="angkatan"
            control={control}
            render={({ field }) => (
              <SelectInput
                field={field}
                data={selectAngkatan}
                label="Angkatan"
                name="angkatan"
                selectedValue={selectedAngkatanValue}
                setSelectedValue={setSelectedAngkatanValue}
                placeholder="Select angkatan"
                isSearchable
                isClearable
                disabled
                errors={errors}
              />
            )}
          />

          <Controller
            name="jurusan"
            control={control}
            render={({ field }) => (
              <SelectInput
                field={field}
                data={selectJurusan}
                label="Jurusan"
                name="jurusan"
                selectedValue={selectedJurusanValue}
                setSelectedValue={setSelectedJurusanValue}
                placeholder="Select jurusan"
                isSearchable
                errors={errors}
              />
            )}
          />

          <Controller
            name="status_siswa"
            control={control}
            render={({ field }) => (
              <SelectInput
                field={field}
                data={statusSiswa}
                label="Status"
                name="status_siswa"
                selectedValue={selectedStatusValue}
                setSelectedValue={setSelectedStatusValue}
                placeholder="Select status siswa"
                errors={errors}
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
export default FormEditSiswa;
