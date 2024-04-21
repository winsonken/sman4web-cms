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
  useUpdateNaikKelasMutation,
} from '../../services/api/kelasSiswaApiSlice';
import Loading from '../Loading';
import InputFile from '../InputFile';

const validationSchema = yup
  .object({
    kelas: yup.string().required('Kelas is required'),
  })
  .required();

const FormNaikKelas = (props) => {
  const { data, kelas, tahunAjaran, setIsOpenPopUpNaikKelas } = props;
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

  const [updateNaikKelas, { isLoading, isSuccess, isError, error }] =
    useUpdateNaikKelasMutation();

  const handleSubmitForm = async () => {
    const payload = {
      kelas: selectedKelas,
      siswa: data?.siswa,
    };

    try {
      const response = await createKelasSiswa(payload).unwrap();

      const response2 =
        !response.error &&
        (await updateNaikKelas({
          id_kelas_siswa: data?.id_kelas_siswa,
        }).unwrap());
      if (!response2.error) {
        toast.success(`Siswa berhasil naik kelas`, {
          position: 'top-right',
          theme: 'light',
        });
        setIsOpenPopUpNaikKelas(false);
      }
    } catch (error) {
      const errorMessage = error?.data?.message;
      toast.error(`${errorMessage}`, {
        position: 'top-right',
        theme: 'light',
      });
    }
  };

  const { data: naikKelasOption } = useGetNaikKelasOptionQuery({
    tahunAjaran: '',
    kelas: kelas == 10 ? 11 : kelas == 11 ? 12 : '',
    jurusan: data?.jurusan,
  });

  const filterKelas = naikKelasOption?.data?.filter(
    (e) => e.tahun_ajaran != tahunAjaran && e.status_kelas == 0
  );

  const selectNaikKelas = filterKelas?.map((e) => ({
    value: e?.id_kelas,
    label: `${e?.nama_kelas} - (${e?.tahun_mulai_ajaran}-${e?.tahun_akhir_ajaran})`,
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
                data={selectNaikKelas}
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
            setIsOpenPopUp={setIsOpenPopUpNaikKelas}
          />
          <Button title={isLoading ? <Loading /> : 'Simpan'} />
        </div>
      </div>
    </form>
  );
};

export default FormNaikKelas;
