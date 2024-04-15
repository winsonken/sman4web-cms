import React, { useEffect, useState } from 'react';
import Input from '../Input';
import SelectInput from '../SelectInput';
import Button from '../Button';
import InputDate from '../InputDate';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { useGetSiswaOptionQuery } from '../../services/api/siswaApiSlice';
import { formatDate } from '../../helpers/FormatDate';
import { useUpdatePrestasiMutation } from '../../services/api/prestasiApiSlice';
import Loading from '../Loading';

const validationSchema = yup
  .object({
    siswa: yup.string().required('Siswa is required'),
    jenis_prestasi: yup.string().required('Jenis prestasi is required'),
    nama_prestasi: yup.string().required('Nama prestasi is required'),
    tanggal_prestasi: yup.string().required('Tanggal prestasi is required'),
  })
  .required();

const FormDetailEditPrestasi = (props) => {
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

  const initialFormInput = {
    id_prestasi: '',
    nama_prestasi: '',
    jenis_prestasi: '',
    tanggal_prestasi: '',
    siswa: '',
  };

  const [formInput, setFormInput] = useState(initialFormInput);

  const [selectedSiswaValue, setSelectedSiswaValue] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleTanggalPrestasi = (date, field) => {
    field.onChange(date);
    setFormInput((prev) => ({
      ...prev,
      tanggal_prestasi: date,
    }));
  };

  const [updatePrestasi, { isLoading }] = useUpdatePrestasiMutation();

  const handleSubmitForm = async () => {
    let payload = {
      id_prestasi: formInput?.id_prestasi,
      nama_prestasi: formInput?.nama_prestasi,
      jenis_prestasi: formInput?.jenis_prestasi,
      tanggal_prestasi: formatDate(formInput?.tanggal_prestasi),
      siswa: selectedSiswaValue,
    };

    try {
      const response = await updatePrestasi(payload).unwrap();

      if (!response.error) {
        toast.success('Prestasi berhasil diubah!', {
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

  useEffect(() => {
    if (data) {
      setFormInput({
        id_prestasi: data?.id_prestasi,
        nama_prestasi: data?.nama_prestasi,
        jenis_prestasi: data?.jenis_prestasi,
        tanggal_prestasi: data?.tanggal_prestasi,
        siswa: data?.id_siswa,
      });
    }
    setSelectedSiswaValue(data?.id_siswa);
  }, [data, setFormInput]);

  useEffect(() => {
    const fieldsToCheck = [
      'nama_prestasi',
      'jenis_prestasi',
      'tanggal_prestasi',
      'siswa',
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
      setValue('nama_prestasi', data?.nama_prestasi);
      setValue('jenis_prestasi', data?.jenis_prestasi);
      setValue('tanggal_prestasi', data?.tanggal_prestasi);
      setValue('siswa', data?.id_siswa);
    }
  }, [data, setFormInput, setValue]);

  const { data: siswaOption } = useGetSiswaOptionQuery();
  const selectSiswa = siswaOption?.data?.map((e) => ({
    value: e?.id_siswa,
    label: e?.nama,
  }));

  useEffect(() => {
    setValue('siswa', selectedSiswaValue);
  }, [selectedSiswaValue, setValue]);

  return (
    <form onSubmit={handleSubmit(handleSubmitForm)}>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-3 ">
          <Controller
            name="siswa"
            control={control}
            render={({ field }) => (
              <SelectInput
                field={field}
                data={selectSiswa}
                label="Nama siswa"
                name="siswa"
                selectedValue={selectedSiswaValue}
                setSelectedValue={setSelectedSiswaValue}
                placeholder="Select siswa"
                errors={errors}
                isSearchable
                disabled
              />
            )}
          />
          <Input
            type="text"
            label="Jenis prestasi"
            name="jenis_prestasi"
            value={formInput?.jenis_prestasi}
            onChange={handleChange}
            register={register}
            errors={errors}
          />
          <Input
            type="text"
            label="Nama Prestasi"
            name="nama_prestasi"
            value={formInput?.nama_prestasi}
            onChange={handleChange}
            register={register}
            errors={errors}
          />

          <Controller
            name="tanggal_prestasi"
            control={control}
            render={({ field }) => (
              <InputDate
                field={field}
                label="Tanggal prestasi"
                name="tanggal_prestasi"
                dateFormat="yyyy/MM/dd"
                placeholder="Select tanggal prestasi"
                onChange={(date) => handleTanggalPrestasi(date, field)}
                errors={errors}
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

export default FormDetailEditPrestasi;
