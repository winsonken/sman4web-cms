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
import { useCreatePelanggaranMutation } from '../../services/api/pelanggaranApiSlice';
import Loading from '../Loading';

const validationSchema = yup
  .object({
    siswa: yup.string().required('Siswa is required'),
    jenis_pelanggaran: yup.string().required('Jenis pelanggaran is required'),
    tanggal_pelanggaran: yup
      .string()
      .required('Tanggal pelanggaran is required'),
  })
  .required();

const FormAddPelanggaran = (props) => {
  const { setIsOpenPopUpAdd } = props;
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    clearErrors,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const initialFormInput = {
    jenis_pelanggaran: '',
    tanggal_pelanggaran: '',
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

  const handleTanggalPelanggaran = (date, field) => {
    field.onChange(date);
    setFormInput((prev) => ({
      ...prev,
      tanggal_pelanggaran: date,
    }));
  };

  const [createPelanggaran, { isLoading }] = useCreatePelanggaranMutation();

  const handleSubmitForm = async () => {
    let payload = {
      jenis_pelanggaran: formInput?.jenis_pelanggaran,
      tanggal_pelanggaran: formatDate(formInput?.tanggal_pelanggaran),
      siswa: selectedSiswaValue,
    };

    try {
      const response = await createPelanggaran(payload).unwrap();

      if (!response.error) {
        toast.success('Pelanggaran berhasil ditambahkan!', {
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

  const { data: siswaOption } = useGetSiswaOptionQuery();
  const selectSiswa = siswaOption?.data?.map((e) => ({
    value: e?.id_siswa,
    label: e?.nama,
  }));

  useEffect(() => {
    const fieldsToCheck = ['jenis_pelanggaran', 'tanggal_pelanggaran', 'siswa'];

    fieldsToCheck.forEach((field) => {
      if (errors[field] && formInput[field] !== '') {
        if (errors[field].type === 'required') {
          clearErrors(field);
        }
      }
    });
  }, [formInput, clearErrors, errors]);

  useEffect(() => {
    setValue('siswa', selectedSiswaValue);
    clearErrors('siswa');
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
                isSearchable
                isClearable
                errors={errors}
              />
            )}
          />

          <Input
            type="text"
            label="Jenis Pelanggaran"
            name="jenis_pelanggaran"
            onChange={handleChange}
            register={register}
            errors={errors}
          />

          <Controller
            name="tanggal_pelanggaran"
            control={control}
            render={({ field }) => (
              <InputDate
                field={field}
                label="Tanggal pelanggaran"
                name="tanggal_pelanggaran"
                dateFormat="yyyy/MM/dd"
                placeholder="Select tanggal pelanggaran"
                onChange={(date) => handleTanggalPelanggaran(date, field)}
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

export default FormAddPelanggaran;
