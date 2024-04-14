import React, { useEffect, useState } from 'react';
import Input from '../Input';
import Button from '../Button';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import SelectInput from '../SelectInput';
import { useUpdateKelasMutation } from '../../services/api/kelasApiSlice';
import Loading from '../Loading';

const validationSchema = yup
  .object({
    kelas: yup.string().required('Kelas is required'),
    no_kelas: yup.string().when(['kelas'], (kelas, schema) => {
      return kelas == 10
        ? schema.notRequired()
        : schema.required('No kelas is required');
    }),
    alphabet_kelas: yup.string().when(['kelas'], (kelas, schema) => {
      return kelas != 10
        ? schema.notRequired()
        : schema.required('Alphabet kelas is required');
    }),

    walikelas: yup.string().required('Walikelas is required'),
    jurusan: yup.string().when(['kelas'], (kelas, schema) => {
      return kelas == 10
        ? schema.notRequired()
        : schema.required('Jurusan is required');
    }),
    angkatan: yup.string().required('Angkatan is required'),
    tahun_ajaran: yup.string().required('Tahun ajaran is required'),
  })
  .required();

const FormEditKelas = (props) => {
  const {
    data,
    selectTahunAjaranBelumDimulai,
    selectAngkatanBelumDimulai,
    selectAngkatanDimulai,
    selectGuru,
    selectJurusan,
    jurusanOption,
    setIsOpenPopUpEdit,
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

  const [selectedKelas, setSelectedKelas] = useState('');
  const [selectedJurusan, setSelectedJurusan] = useState('');
  const [selectedAngkatan, setSelectedAngkatan] = useState('');
  const [selectedTahunAjaran, setSelectedTahunAjaran] = useState('');
  const [selectedGuru, setSelectedGuru] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const initialFormInput = {
    id_kelas: '',
    kelas: '',
    nama_kelas: '',
    no_kelas: '',
    alphabet_kelas: '',
    walikelas: '',
    jurusan: '',
    angkatan: '',
    tahun_ajaran: '',
  };

  const [formInput, setFormInput] = useState(initialFormInput);

  const [updateKelas, { isLoading, isSuccess, isError, error }] =
    useUpdateKelasMutation();

  const handleSubmitForm = async () => {
    const payload = {
      id_kelas: formInput?.id_kelas,
      kelas: selectedKelas,
      nama_kelas: `${
        selectedKelas == 10
          ? 'X'
          : selectedKelas == 11
          ? 'XI'
          : selectedKelas == 12
          ? 'XII'
          : ''
      }${
        selectedKelas == 10
          ? formInput?.alphabet_kelas
          : ` ${
              jurusanOption?.data?.find((e) => e.id_jurusan == selectedJurusan)
                .nama_jurusan
            } ${formInput?.no_kelas}`
      }`,

      walikelas: selectedGuru,
      jurusan: selectedJurusan,
      angkatan: selectedAngkatan,
      tahun_ajaran: selectedTahunAjaran,
    };

    try {
      const response = await updateKelas(payload).unwrap();
      if (!response.error) {
        toast.success('Kelas berhasil diubah!', {
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
        id_kelas: data?.id_kelas,
        nama_kelas: data?.nama_kelas,
        no_kelas:
          data?.kelas == 11 || data?.kelas == 12
            ? data?.nama_kelas?.split(' ')[2]
            : '',
        alphabet_kelas: data?.kelas == 10 ? data?.nama_kelas?.substring(1) : '',
        walikelas: data?.id_guru,
        jurusan: data?.jurusan,
        angkatan: data?.angkatan,
        tahun_ajaran: data?.tahun_ajaran,
      });
    }
    setSelectedKelas(data?.kelas);
    setSelectedGuru(data?.id_guru);
    setSelectedJurusan(data?.jurusan);
    setSelectedAngkatan(data?.angkatan);
    setSelectedTahunAjaran(data?.tahun_ajaran);
  }, [data, setFormInput]);

  useEffect(() => {
    const fieldsToCheck = ['no_kelas', 'alphabet_kelas'];

    fieldsToCheck.forEach((field) => {
      if (errors[field] && formInput[field] !== '') {
        if (errors[field].type === 'required') {
          clearErrors(field);
        }
      }
    });
  }, [formInput, clearErrors, errors]);

  // useEffect(() => {
  //   setSelectedAngkatan('');
  //   setSelectedJurusan('');
  // }, [selectedKelas]);

  useEffect(() => {
    if (data) {
      setValue(
        'no_kelas',
        data?.kelas == 11 || data?.kelas == 12
          ? data?.nama_kelas?.split(' ')[2]
          : ''
      );
      setValue(
        'alphabet_kelas',
        data?.kelas == 10 ? data?.nama_kelas?.substring(1) : ''
      );
    }
  }, [data, setFormInput, setValue]);

  useEffect(() => {
    setValue('kelas', selectedKelas);
    clearErrors('kelas');
  }, [selectedKelas, setValue]);

  useEffect(() => {
    setValue('walikelas', selectedGuru);
    clearErrors('walikelas');
  }, [selectedGuru, setValue]);

  useEffect(() => {
    setValue('jurusan', selectedJurusan);
    clearErrors('jurusan');
  }, [selectedJurusan, setValue]);

  useEffect(() => {
    setValue('angkatan', selectedAngkatan);
    clearErrors('angkatan');
  }, [selectedAngkatan, setValue]);

  useEffect(() => {
    setValue('tahun_ajaran', selectedTahunAjaran);
    clearErrors('tahun_ajaran');
  }, [selectedTahunAjaran, setValue]);

  const selectKelas = [
    { value: 10, label: 10 },
    { value: 11, label: 11 },
    { value: 12, label: 12 },
  ];

  return (
    <form onSubmit={handleSubmit(handleSubmitForm)}>
      <div className="flex flex-col gap-6">
        <div className="grid grid-flow-row-dense grid-cols-1 sm:grid-cols-2 gap-3">
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

          {selectedKelas == 10 && (
            <Input
              type="text"
              label="Alphabet kelas"
              name="alphabet_kelas"
              onChange={handleChange}
              register={register}
              errors={errors}
            />
          )}

          {(selectedKelas == 11 || selectedKelas == 12) && (
            <Input
              type="number"
              label="No kelas"
              name="no_kelas"
              onChange={handleChange}
              register={register}
              errors={errors}
            />
          )}

          {(selectedKelas == 11 || selectedKelas == 12) && (
            <Controller
              name="jurusan"
              control={control}
              render={({ field }) => (
                <SelectInput
                  field={field}
                  data={selectJurusan}
                  label="Jurusan"
                  name="jurusan"
                  selectedValue={selectedJurusan}
                  setSelectedValue={setSelectedJurusan}
                  placeholder="Select jurusan"
                  errors={errors}
                />
              )}
            />
          )}

          <Controller
            name="angkatan"
            control={control}
            render={({ field }) => (
              <SelectInput
                field={field}
                data={
                  selectedKelas == 10
                    ? selectAngkatanBelumDimulai
                    : selectedKelas == 11 || selectedKelas == 12
                    ? selectAngkatanDimulai
                    : []
                }
                label="Angkatan"
                name="angkatan"
                selectedValue={selectedAngkatan}
                setSelectedValue={setSelectedAngkatan}
                placeholder="Select angkatan"
                errors={errors}
              />
            )}
          />

          <Controller
            name="tahun_ajaran"
            control={control}
            render={({ field }) => (
              <SelectInput
                field={field}
                data={selectTahunAjaranBelumDimulai}
                label="Tahun ajaran"
                name="tahun_ajaran"
                selectedValue={selectedTahunAjaran}
                setSelectedValue={setSelectedTahunAjaran}
                placeholder="Select tahun ajaran"
                isSearchable
                isClearable
                errors={errors}
              />
            )}
          />

          <Controller
            name="walikelas"
            control={control}
            render={({ field }) => (
              <SelectInput
                field={field}
                data={selectGuru}
                label="Walikelas"
                name="walikelas"
                selectedValue={selectedGuru}
                setSelectedValue={setSelectedGuru}
                placeholder="Select walikelas"
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
            setIsOpenPopUp={setIsOpenPopUpEdit}
          />
          <Button title={isLoading ? <Loading /> : 'Ubah'} type="submit" />
        </div>
      </div>
    </form>
  );
};

export default FormEditKelas;
