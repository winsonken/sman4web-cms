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
import { useCreateSiswaMutation } from '../../services/api/siswaApiSlice';
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

const FormAddSiswa = (props) => {
  const { setIsOpenPopUpAdd } = props;
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
  const [selectedImage, setSelectedImage] = useState('');

  const { data: angkatanOption } = useGetAngkatanDimulaiOptionQuery();
  const selectAngkatan = angkatanOption?.data?.map((e) => ({
    value: e?.id_angkatan,
    label: e?.no_angkatan,
  }));

  const initialFormInput = {
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
    // jurusan: '',
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

  const [createSiswa, { isLoading, isSuccess, isError, error }] =
    useCreateSiswaMutation();

  const handleSubmitForm = async () => {
    const formData = new FormData();
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
    // formData.append('jurusan', formInput?.jurusan);

    try {
      const response = await createSiswa(formData).unwrap();
      if (!response.error) {
        toast.success('Siswa berhasil ditambahkan!', {
          position: 'top-right',
          theme: 'light',
        });
        setIsOpenPopUpAdd(false);
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

  return (
    <form onSubmit={handleSubmit(handleSubmitForm)}>
      <div className="flex flex-col gap-6">
        <div className="grid grid-flow-row-dense grid-cols-1 sm:grid-cols-2 gap-3 md:grid-cols-3 ">
          <div className="sm:row-span-2">
            <InputImage
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
                errors={errors}
              />
            )}
          />
        </div>

        <div className="flex justify-end gap-2">
          <Button
            title="Batal"
            type="cancel"
            setIsOpenPopUp={setIsOpenPopUpAdd}
          />
          <Button title={isLoading ? <Loading /> : 'Simpan'} type="submit" />
        </div>
      </div>
    </form>
  );
};
export default FormAddSiswa;
