import React, { useState } from 'react';
import Input from '../Input';
import SelectInput from '../SelectInput';
import Button from '../Button';
import InputDate from '../InputDate';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useGetSiswaOptionQuery } from '../../services/api/siswaApiSlice';

const validationSchema = yup
  .object({
    siswa: yup.string().required('Siswa is required'),
    jenis_prestasi: yup.string().required('Jenis prestasi is required'),
    nama_prestasi: yup.string().required('Nama prestasi is required'),
    tahun_prestasi: yup.string().required('Tahun prestasi is required'),
  })
  .required();

const FormAddPrestasi = (props) => {
  const { setIsOpenPopUpAdd } = props;
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const initialFormInput = {
    nama_prestasi: '',
    jenis_prestasi: '',
    tahun_prestasi: '',
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

  const handleTahunPrestasi = (date, field) => {
    field.onChange(date);
    setFormInput((prev) => ({
      ...prev,
      tahun_prestasi: date,
    }));
  };

  const handleSubmitForm = (e) => {
    alert(JSON.stringify(e));
  };

  const { data: siswaOption } = useGetSiswaOptionQuery();
  const selectSiswa = siswaOption?.data?.map((e) => ({
    value: e?.id_siswa,
    label: e?.nama,
  }));
  console.log(selectSiswa);
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
              />
            )}
          />
          <Input
            type="text"
            label="Jenis prestasi"
            name="jenis_prestasi"
            onChange={handleChange}
            register={register}
            errors={errors}
          />
          <Input
            type="text"
            label="Nama Prestasi"
            name="nama_prestasi"
            onChange={handleChange}
            register={register}
            errors={errors}
          />

          <Controller
            name="tahun_prestasi"
            control={control}
            render={({ field }) => (
              <InputDate
                field={field}
                label="Tanggal prestasi"
                name="tahun_prestasi"
                dateFormat="yyyy/MM/dd"
                placeholder="Select tanggal prestasi"
                onChange={(date) => handleTahunPrestasi(date, field)}
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
          <Button title="Simpan" type="submit" />
        </div>
      </div>
    </form>
  );
};

export default FormAddPrestasi;
