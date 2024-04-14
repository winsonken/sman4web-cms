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
  useUpdateTinggalKelasMutation,
} from '../../services/api/kelasSiswaApiSlice';
import Loading from '../Loading';

const validationSchema = yup
  .object({
    kelas: yup.string().required('Kelas is required'),
  })
  .required();

const FormTinggalKelas = (props) => {
  const { data, kelas, tahunAjaran, setIsOpenPopUpTinggalKelas } = props;
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

  const [updateTinggalKelas, { isLoading, isSuccess, isError, error }] =
    useUpdateTinggalKelasMutation();

  const handleSubmitForm = async () => {
    const payload = {
      kelas: selectedKelas,
      siswa: data?.siswa,
    };

    try {
      const response = await createKelasSiswa(payload).unwrap();

      const response2 =
        !response.error &&
        (await updateTinggalKelas({
          id_kelas_siswa: data?.id_kelas_siswa,
        }).unwrap());
      if (!response2.error) {
        toast.success(`Siswa berhasil tinggal kelas`, {
          position: 'top-right',
          theme: 'light',
        });
        setIsOpenPopUpTinggalKelas(false);
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
    kelas: kelas == 10 ? 10 : kelas == 11 ? 11 : '',
    jurusan: kelas == 10 ? '' : data?.jurusan || '',
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
          <Input type="file" label="Upload Rapot" name="upload_rapot" />
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
            setIsOpenPopUp={setIsOpenPopUpTinggalKelas}
          />
          <Button title={isLoading ? <Loading /> : 'Simpan'} />
        </div>
      </div>
    </form>
  );
};

export default FormTinggalKelas;
