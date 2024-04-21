import React, { useEffect, useState } from 'react';
import Button from '../Button';
import SelectInput from '../SelectInput';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { useGetJurusanOptionQuery } from '../../services/api/jurusanApiSlice';
import { useUpdateSetJurusanMutation } from '../../services/api/siswaApiSlice';
import Loading from '../Loading';

const validationSchema = yup
  .object({
    jurusan: yup.string().required('Jurusan is required'),
  })
  .required();

const FormPilihJurusan = (props) => {
  const { data, setIsOpenPopUpSetJurusan } = props;
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

  const [selectedJurusanValue, setSelectedJurusanValue] = useState('');

  const initialFormInput = {
    id_siswa: '',
    jurusan: '',
  };

  const [formInput, setFormInput] = useState(initialFormInput);

  const [updateSetJurusan, { isLoading, isSuccess, isError, error }] =
    useUpdateSetJurusanMutation();

  const handleFormSubmit = async () => {
    const payload = {
      id_siswa: formInput?.id_siswa,
      jurusan: selectedJurusanValue,
    };
    try {
      const response = await updateSetJurusan(payload).unwrap();

      if (!response.error) {
        toast.success('Jurusan berhasil dipilih!', {
          position: 'top-right',
          theme: 'light',
        });
        setIsOpenPopUpSetJurusan(false);
      }
    } catch (error) {
      const errorMessage = error?.data?.message;
      toast.error(`${errorMessage}`, {
        position: 'top-right',
        theme: 'light',
      });
    }
  };

  const { data: jurusan } = useGetJurusanOptionQuery();

  const selectJurusan = jurusan?.data?.map((e) => ({
    value: e?.id_jurusan,
    label: e?.nama_jurusan,
  }));

  useEffect(() => {
    if (data) {
      setFormInput({
        id_siswa: data?.id_siswa,
        jurusan: data?.jurusan,
      });
    }
  }, [data]);

  useEffect(() => {
    setValue('jurusan', selectedJurusanValue);
    clearErrors('jurusan');
  }, [selectedJurusanValue, setValue]);

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-1">
          <p className="text-sm font-medium">
            Silakan pilih jurusan yang anda minati
          </p>

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
            setIsOpenPopUp={setIsOpenPopUpSetJurusan}
          />
          <Button title={isLoading ? <Loading /> : 'Simpan'} type="submit" />
        </div>
      </div>
    </form>
  );
};

export default FormPilihJurusan;
