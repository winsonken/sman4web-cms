import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Input from '../Input';
import Button from '../Button';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import SelectInput from '../SelectInput';
import { useUpdateKelasSiswaMutation } from '../../services/api/kelasSiswaApiSlice';
import Loading from '../Loading';

const validationSchema = (originalKelas) =>
  yup
    .object({
      kelas: yup.string().required('Kelas is required'),
      no_absen: yup.number().when(['kelas'], (kelas, schema) => {
        return kelas != originalKelas
          ? schema.nullable()
          : schema
              .required('No kelas is required')
              .max(100, 'No absen max is 100')
              .min(1, 'No absen min is 1');
      }),
      status_kelas_siswa: yup
        .string()
        .required('Status kelas siswa is required'),
    })
    .required();

const FormEditDetailKelas = (props) => {
  const { data, id_kelas, namaKelas, selectKelas, setIsOpenPopUpEdit } = props;

  const [originalKelas, setOriginalKelas] = useState('');

  useEffect(() => {
    if (data) {
      setOriginalKelas(data?.kelas);
    }
  }, [data]);

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
    setValue,
  } = useForm({
    resolver: yupResolver(validationSchema(originalKelas)),
  });

  const [selectedKelas, setSelectedKelas] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');

  const initialFormInput = {
    id_kelas_siswa: '',
    kelas: '',
    no_absen: '',
    status_kelas_siswa: '',
  };

  const [formInput, setFormInput] = useState(initialFormInput);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const [updateKelasSiswa, { isLoading, isSuccess, isError, error }] =
    useUpdateKelasSiswaMutation();

  const handleSubmitForm = async () => {
    const payload = {
      id_kelas_siswa: formInput?.id_kelas_siswa,
      kelas: selectedKelas,
      no_absen: selectedKelas != data?.kelas ? null : formInput?.no_absen,
      status_kelas_siswa: selectedStatus,
    };

    try {
      const response = await updateKelasSiswa(payload).unwrap();
      if (!response.error) {
        toast.success(`Siswa berhasil diubah di kelas ${namaKelas}`, {
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

  useEffect(() => {
    if (data) {
      setFormInput({
        id_kelas_siswa: data?.id_kelas_siswa,
        kelas: data?.kelas,
        no_absen: data?.no_absen,
        status_kelas_siswa: data?.status_kelas_siswa,
      });
      setSelectedKelas(data?.kelas);
      setSelectedStatus(data?.status_kelas_siswa);
    }
  }, [data, setFormInput]);

  useEffect(() => {
    if (data) {
      setValue('kelas', data?.kelas);
      setValue(
        'no_absen',
        selectedKelas != data?.kelas ? null : data?.no_absen
      );
      setValue('status_kelas_siswa', data?.status_kelas_siswa);
    }
  }, [data, selectedKelas, setFormInput, setValue]);

  useEffect(() => {
    setSelectedKelas(id_kelas);
  }, []);

  useEffect(() => {
    setValue('status_kelas_Siswa', selectedStatus);
    clearErrors('status_kelas_siswa');
  }, [selectedStatus, setValue]);

  useEffect(() => {
    setValue('kelas', selectedKelas);
    clearErrors('kelas');
  }, [selectedKelas, setValue]);

  const selectStatusKelasSiswa = [
    { value: 1, label: 'Aktif' },
    { value: 2, label: 'Naik kelas' },
    { value: 3, label: 'Tinggal kelas' },
  ];

  useEffect(() => {
    if (selectedKelas != data?.kelas) {
      setFormInput((prev) => ({
        ...prev,
        no_absen: null,
      }));
    } else {
      setFormInput((prev) => ({
        ...prev,
        no_absen: data?.no_absen,
      }));
    }
  }, [data, selectedKelas]);

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
              />
            )}
          />

          <Input
            type="text"
            label="Siswa"
            name="siswa"
            value={data?.nama_siswa}
            register={register}
            errors={errors}
            disabled
          />

          <Input
            type="number"
            label="No absen"
            name="no_absen"
            onChange={handleChange}
            register={register}
            errors={errors}
            disabled={selectedKelas != data?.kelas}
          />

          <Controller
            name="status_kelas_soswa"
            control={control}
            render={({ field }) => (
              <SelectInput
                field={field}
                data={selectStatusKelasSiswa}
                label="Status"
                name="status_kelas_siswa"
                selectedValue={selectedStatus}
                setSelectedValue={setSelectedStatus}
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
          <Button title={isLoading ? <Loading /> : 'Ubah'} type="submit" />
        </div>
      </div>
    </form>
  );
};

export default FormEditDetailKelas;
