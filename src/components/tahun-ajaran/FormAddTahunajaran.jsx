import React, { useState } from 'react';
import Button from '../Button';

import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import InputDate from '../InputDate';
import { formatDateToYear } from '../../helpers/FormatDateToYear';
import { formatDate } from '../../helpers/FormatDate';
import { useCreateTahunAjaranMutation } from '../../services/api/tahunAjaranApiSlice';
import SelectInput from '../SelectInput';
import Loading from '../Loading';

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

const FormAddTahunajaran = (props) => {
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

  const initialFormInput = {
    tahun_mulai_ajaran: '',
    tahun_akhir_ajaran: '',
    mulai_periode_ganjil: '',
    akhir_periode_ganjil: '',
    mulai_periode_genap: '',
    akhir_periode_genap: '',
  };

  const [formInput, setFormInput] = useState(initialFormInput);

  const [createTahunAjaran, { isLoading, isSuccess, isError, error }] =
    useCreateTahunAjaranMutation();

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormInput((prev) => ({
  //     ...prev,
  //     [name]: value,
  //   }));
  // };

  const handleSubmitForm = async () => {
    const payload = {
      tahun_mulai_ajaran: formatDateToYear(formInput?.tahun_mulai_ajaran),
      tahun_akhir_ajaran: formatDateToYear(formInput?.tahun_akhir_ajaran),
      mulai_periode_ganjil: formatDate(formInput?.mulai_periode_ganjil),
      akhir_periode_ganjil: formatDate(formInput?.akhir_periode_ganjil),
      mulai_periode_genap: formatDate(formInput?.mulai_periode_genap),
      akhir_periode_genap: formatDate(formInput?.akhir_periode_genap),
    };

    try {
      const response = await createTahunAjaran(payload).unwrap();

      if (!response.error) {
        toast.success('success!', {
          position: 'top-right',
          theme: 'light',
        });
        setIsOpenPopUpAdd(false);
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
                dateFormat="yyyy/MM/dd"
                placeholder="Select akhir periode genap"
                onChange={(date) => handleAkhirGenap(date, field)}
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
          <Button title={isLoading ? <Loading /> : 'Tambah'} type="submit" />
        </div>
      </div>
    </form>
  );
};

export default FormAddTahunajaran;
