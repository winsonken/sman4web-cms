import React, { useEffect } from 'react';
import Input from '../Input';
import Button from '../Button';
import { toast } from 'react-toastify';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useState } from 'react';
import SelectInput from '../SelectInput';
import { useGetNaikKelasOptionQuery } from '../../services/api/kelasApiSlice';
import { tahunAjaran } from '../../services/api/tahunAjaranApiSlice';
import {
  useCreateKelasSiswaMutation,
  useUpdateLulusMutation,
  useUpdateNaikKelasMutation,
} from '../../services/api/kelasSiswaApiSlice';
import Loading from '../Loading';

const validationSchema = yup.object({}).required();

const FormLulus = (props) => {
  const { data, setIsOpenPopUpLulus } = props;
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

  const [updateLulus, { isLoading, isSuccess, isError, error }] =
    useUpdateLulusMutation();

  const handleSubmitForm = async () => {
    try {
      const response = await updateLulus({
        id_kelas_siswa: data?.id_kelas_siswa,
      }).unwrap();
      if (!response.error) {
        toast.success(`Siswa berhasil diluluskan`, {
          position: 'top-right',
          theme: 'light',
        });
        setIsOpenPopUpLulus(false);
      }
    } catch (error) {
      const errorMessage = error?.data?.message;
      toast.error(`${errorMessage}`, {
        position: 'top-right',
        theme: 'light',
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(handleSubmitForm)}>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-3">
          <Input type="file" label="Upload Rapot" name="upload_rapot" />
        </div>

        <div className="flex justify-end gap-2">
          <Button
            title="Batal"
            type="cancel"
            setIsOpenPopUp={setIsOpenPopUpLulus}
          />
          <Button title={isLoading ? <Loading /> : 'Simpan'} type="submit" />
        </div>
      </div>
    </form>
  );
};

export default FormLulus;
