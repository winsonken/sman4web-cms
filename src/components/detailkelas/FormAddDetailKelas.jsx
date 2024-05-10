import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Input from '../Input';
import Button from '../Button';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import SelectInput from '../SelectInput';
import { useGetSiswaBelumAdaKelasOptionQuery } from '../../services/api/siswaApiSlice';
import { useGetKelasOptionQuery } from '../../services/api/kelasApiSlice';
import { useCreateKelasSiswaMutation } from '../../services/api/kelasSiswaApiSlice';
import Loading from '../Loading';

const validationSchema = yup
  .object({
    kelas: yup.string().required('Kelas is required'),
    siswa: yup.string().required('Siswa is required'),
  })
  .required();

const FormAddDetailKelas = (props) => {
  const {
    id_kelas,
    namaKelas,
    tahunAjaran,
    selectSiswaBelumAdaKelas,
    selectKelas,
    setIsOpenPopUpAdd,
  } = props;
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

  const [selectedSiswa, setSelectedSiswa] = useState('');
  const [selectedKelas, setSelectedKelas] = useState('');

  const initialFormInput = {
    kelas: '',
    siswa: '',
  };

  const [formInput, setFormInput] = useState(initialFormInput);

  const [createKelasSiswa, { isLoading, isSuccess, isError, error }] =
    useCreateKelasSiswaMutation();

  const handleSubmitForm = async () => {
    const payload = {
      kelas: selectedKelas,
      siswa: selectedSiswa,
      tahun_ajaran: tahunAjaran,
    };

    try {
      const response = await createKelasSiswa(payload).unwrap();
      if (!response.error) {
        toast.success(`Siswa berhasil ditambahkan ke kelas ${namaKelas}`, {
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

  useEffect(() => {
    setSelectedKelas(id_kelas);
  }, []);

  useEffect(() => {
    setValue('kelas', selectedKelas);
    clearErrors('kelas');
  }, [selectedKelas, setValue]);

  useEffect(() => {
    setValue('siswa', selectedSiswa);
    clearErrors('siswa');
  }, [selectedSiswa, setValue]);

  return (
    <form onSubmit={handleSubmit(handleSubmitForm)}>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-3">
          <Controller
            name="kelas"
            control={control}
            render={({ field }) => (
              <SelectInput
                field={field}
                data={selectKelas}
                label="Kelas"
                name="kelas"
                selectedValue={selectedKelas}
                setSelectedValue={setSelectedKelas}
                placeholder="Select kelas"
                errors={errors}
                disabled
              />
            )}
          />

          <Controller
            name="siswa"
            control={control}
            render={({ field }) => (
              <SelectInput
                field={field}
                data={selectSiswaBelumAdaKelas}
                label="Siswa"
                name="siswa"
                selectedValue={selectedSiswa}
                setSelectedValue={setSelectedSiswa}
                placeholder="Select siswa"
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

export default FormAddDetailKelas;
