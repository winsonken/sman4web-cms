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
  useUpdateTidakLulusMutation,
} from '../../services/api/kelasSiswaApiSlice';
import Loading from '../Loading';

const validationSchema = yup
  .object({
    kelas: yup.string().required('Kelas is required'),
  })
  .required();

const FormTidakLulus = (props) => {
  const { data, kelas, tahunAjaran, setIsOpenPopUpTidakLulus } = props;
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

  const [selectedKelas, setSelectedKelas] = useState('');
  const [createKelasSiswa] = useCreateKelasSiswaMutation();

  const [updateTidakLulus, { isLoading, isSuccess, isError, error }] =
    useUpdateTidakLulusMutation();

  const handleSubmitForm = async () => {
    const payload = {
      kelas: selectedKelas,
      siswa: data?.siswa,
    };

    try {
      const response = await updateTidakLulus({
        id_kelas_siswa: data?.id_kelas_siswa,
      }).unwrap();
      const response2 =
        !response.error && (await createKelasSiswa(payload).unwrap());
      if (!response2.error) {
        toast.success(`Siswa berhasil tidak diluluskan`, {
          position: 'top-right',
          theme: 'light',
        });
        setIsOpenPopUpTidakLulus(false);
      }
    } catch (error) {
      const errorMessage = error?.data?.message;
      toast.error(`${errorMessage}`, {
        position: 'top-right',
        theme: 'light',
      });
    }
  };

  const { data: tinggalKelasOption } = useGetNaikKelasOptionQuery({
    tahunAjaran: '',
    kelas: kelas == 12 ? 12 : '',
    jurusan: data?.jurusan || '',
  });

  const filterKelas = tinggalKelasOption?.data?.filter(
    (e) => e.tahun_ajaran != tahunAjaran
  );

  const selectTinggalKelas = filterKelas?.map((e) => ({
    value: e?.id_kelas,
    label: e?.nama_kelas,
  }));

  useEffect(() => {
    setValue('kelas', selectedKelas);
    clearErrors('kelas');
  }, [selectedKelas, setValue]);

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
                data={selectTinggalKelas}
                label="Kelas"
                name="kelas"
                selectedValue={selectedKelas}
                setSelectedValue={setSelectedKelas}
                placeholder="Select kelas"
                errors={errors}
              />
            )}
          />
        </div>

        <div className="flex justify-end gap-2">
          <Button
            title="Batal"
            type="cancel"
            setIsOpenPopUp={setIsOpenPopUpTidakLulus}
          />
          <Button title={isLoading ? <Loading /> : 'Simpan'} type="submit" />
        </div>
      </div>
    </form>
  );
};

export default FormTidakLulus;
