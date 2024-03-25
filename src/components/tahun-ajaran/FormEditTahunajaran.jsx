import React, { useEffect, useState } from 'react';
import SelectInput from '../SelectInput';
import Button from '../Button';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import InputDate from '../InputDate';
import { formatDateToYear } from '../../helpers/FormatDateToYear';
import { formatDate } from '../../helpers/FormatDate';
import { useUpdateTahunAjaranMutation } from '../../services/api/tahunAjaranApiSlice';

const validationSchema = yup
  .object({
    tahun_mulai_ajaran: yup.string().required('Tahun mulai ajaran is required'),
    tahun_akhir_ajaran: yup.string().required('Tahun akhir ajaran is required'),
    mulai_periode_ganjil: yup
      .string()
      .required('Mulai periode ganjil is required'),
    akhir_periode_ganjil: yup
      .string()
      .required('Akhir periode ganjil is required'),
    mulai_periode_genap: yup
      .string()
      .required('Mulai periode genap is required'),
    akhir_periode_genap: yup
      .string()
      .required('Akhir periode genap is required'),
  })
  .required();

const FormEditTahunajaran = (props) => {
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
    id_tahun_ajaran: '',
    tahun_mulai_ajaran: '',
    tahun_akhir_ajaran: '',
    mulai_periode_ganjil: '',
    akhir_periode_ganjil: '',
    mulai_periode_genap: '',
    akhir_periode_genap: '',
    status_tahun_ajaran: '',
  };

  const [formInput, setFormInput] = useState(initialFormInput);

  const [selectedStatusValue, setSelectedStatusValue] = useState('');

  const [updateTahunAjaran] = useUpdateTahunAjaranMutation();

  const handleSubmitForm = async () => {
    const formatIfChanged = (value, originalValue) => {
      return value !== originalValue ? formatDateToYear(value) : value;
    };

    const payload = {
      id_tahun_ajaran: formInput?.id_tahun_ajaran,
      tahun_mulai_ajaran: formatIfChanged(
        formInput?.tahun_mulai_ajaran,
        data?.tahun_mulai_ajaran
      ),
      tahun_akhir_ajaran: formatIfChanged(
        formInput?.tahun_akhir_ajaran,
        data?.tahun_akhir_ajaran
      ),
      mulai_periode_ganjil: formatDate(formInput?.mulai_periode_ganjil),
      akhir_periode_ganjil: formatDate(formInput?.akhir_periode_ganjil),
      mulai_periode_genap: formatDate(formInput?.mulai_periode_genap),
      akhir_periode_genap: formatDate(formInput?.akhir_periode_genap),
      status_tahun_ajaran: selectedStatusValue,
    };

    try {
      const response = await updateTahunAjaran(payload).unwrap();

      if (!response.error) {
        toast.success('Tahun ajaran berhasil diubah!', {
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

  const handleMulaiAjaran = (date, field) => {
    field.onChange(date);
    setFormInput((prev) => ({
      ...prev,
      tahun_mulai_ajaran: date,
    }));
  };

  const handleAkhirAjaran = (date, field) => {
    field.onChange(date);
    setFormInput((prev) => ({
      ...prev,
      tahun_akhir_ajaran: date,
    }));
  };

  const handleMulaiGanjil = (date, field) => {
    field.onChange(date);
    setFormInput((prev) => ({
      ...prev,
      mulai_periode_ganjil: date,
    }));
  };

  const handleAkhirGanjil = (date, field) => {
    field.onChange(date);
    setFormInput((prev) => ({
      ...prev,
      akhir_periode_ganjil: date,
    }));
  };

  const handleMulaiGenap = (date, field) => {
    field.onChange(date);
    setFormInput((prev) => ({
      ...prev,
      mulai_periode_genap: date,
    }));
  };

  const handleAkhirGenap = (date, field) => {
    field.onChange(date);
    setFormInput((prev) => ({
      ...prev,
      akhir_periode_genap: date,
    }));
  };

  useEffect(() => {
    if (data) {
      setFormInput({
        id_tahun_ajaran: data?.id_tahun_ajaran,
        tahun_mulai_ajaran: data?.tahun_mulai_ajaran,
        tahun_akhir_ajaran: data?.tahun_akhir_ajaran,
        mulai_periode_ganjil: data?.mulai_periode_ganjil,
        akhir_periode_ganjil: data?.akhir_periode_ganjil,
        mulai_periode_genap: data?.mulai_periode_genap,
        akhir_periode_genap: data?.akhir_periode_genap,
        status_tahun_ajaran: data?.status_tahun_ajaran,
      });
      setSelectedStatusValue(data?.status_tahun_ajaran);
    }
  }, [data, setFormInput]);

  useEffect(() => {
    const fieldsToCheck = [
      'tahun_mulai_ajaran',
      'tahun_akhir_ajaran',
      'mulai_periode_ganjil',
      'akhir_periode_ganjil',
      'mulai_periode_genap',
      'akhir_periode_genap',
      'status_tahun_ajaran',
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
      setValue('tahun_mulai_ajaran', data?.tahun_mulai_ajaran);
      setValue('tahun_akhir_ajaran', data?.tahun_akhir_ajaran);
      setValue('mulai_periode_ganjil', data?.mulai_periode_ganjil);
      setValue('akhir_periode_ganjil', data?.akhir_periode_ganjil);
      setValue('mulai_periode_genap', data?.mulai_periode_genap);
      setValue('akhir_periode_genap', data?.akhir_periode_genap);
      setValue('status_tahun_ajaran', data?.status_tahun_ajaran);
    }
  }, [data, setFormInput, setValue]);

  const statusTahunAjaran = [
    { value: 0, label: 'Belum dimulai' },
    { value: 1, label: 'Dimulai' },
    { value: 2, label: 'Berakhir' },
  ];
  return (
    <form onSubmit={handleSubmit(handleSubmitForm)}>
      <div className="flex flex-col gap-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Controller
            name="tahun_mulai_ajaran"
            control={control}
            render={({ field }) => (
              <InputDate
                field={field}
                label="Tahun mulai ajaran"
                name="tahun_mulai_ajaran"
                value={formInput.tahun_mulai_ajaran}
                dateFormat="yyyy"
                placeholder="Select tahun mulai"
                showYearPicker
                onChange={(date) => handleMulaiAjaran(date, field)}
                errors={errors}
              />
            )}
          />

          <Controller
            name="tahun_akhir_ajaran"
            control={control}
            render={({ field }) => (
              <InputDate
                field={field}
                label="Tahun akhir ajaran"
                name="tahun_akhir_ajaran"
                value={formInput?.tahun_akhir_ajaran}
                dateFormat="yyyy"
                placeholder="Select tahun akhir"
                showYearPicker
                onChange={(date) => handleAkhirAjaran(date, field)}
                errors={errors}
              />
            )}
          />

          <Controller
            name="mulai_periode_ganjil"
            control={control}
            render={({ field }) => (
              <InputDate
                field={field}
                label="Mulai periode ganjil"
                name="mulai_periode_ganjil"
                value={formInput?.mulai_periode_ganjil}
                dateFormat="yyyy/MM/dd"
                placeholder="Select mulai periode ganjil"
                onChange={(date) => handleMulaiGanjil(date, field)}
                errors={errors}
              />
            )}
          />

          <Controller
            name="akhir_periode_ganjil"
            control={control}
            render={({ field }) => (
              <InputDate
                field={field}
                label="Akhir periode ganjil"
                name="akhir_periode_ganjil"
                value={formInput?.akhir_periode_ganjil}
                dateFormat="yyyy/MM/dd"
                placeholder="Select akhir periode ganjil"
                onChange={(date) => handleAkhirGanjil(date, field)}
                errors={errors}
              />
            )}
          />

          <Controller
            name="mulai_periode_genap"
            control={control}
            render={({ field }) => (
              <InputDate
                field={field}
                label="Mulai periode genap"
                name="mulai_periode_genap"
                value={formInput?.mulai_periode_genap}
                dateFormat="yyyy/MM/dd"
                placeholder="Select mulai periode genap"
                onChange={(date) => handleMulaiGenap(date, field)}
                errors={errors}
              />
            )}
          />

          <Controller
            name="akhir_periode_genap"
            control={control}
            render={({ field }) => (
              <InputDate
                field={field}
                label="Akhir periode genap"
                name="akhir_periode_genap"
                value={formInput?.akhir_periode_genap}
                dateFormat="yyyy/MM/dd"
                placeholder="Select akhir periode genap"
                onChange={(date) => handleAkhirGenap(date, field)}
                errors={errors}
              />
            )}
          />

          <Controller
            name="status_tahun_ajaran"
            control={control}
            render={({ field }) => (
              <SelectInput
                field={field}
                data={statusTahunAjaran}
                label="Status"
                name="status_tahun_ajaran"
                selectedValue={selectedStatusValue}
                setSelectedValue={setSelectedStatusValue}
                placeholder="Select status"
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
          <Button title="Ubah" type="submit" />
        </div>
      </div>
    </form>
  );
};

export default FormEditTahunajaran;
