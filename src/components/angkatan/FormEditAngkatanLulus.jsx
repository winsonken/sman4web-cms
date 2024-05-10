import React, { useEffect, useState } from 'react';
import Input from '../Input';
import SelectInput from '../SelectInput';
import Button from '../Button';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { useUpdateAngkatanMutation } from '../../services/api/angkatanApiSlice';
import Loading from '../Loading';

const validationSchema = yup
  .object({
    no_angkatan: yup.string().required('No Angkatan is required'),
    tahun: yup.string().required('Tahun is required'),
    // status_angkatan: yup.object().required('Status is required'),
  })
  .required();

const FormEditAngkatanLulus = (props) => {
  const { data, setIsOpenPopUpEdit } = props;

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

  const initialFormInput = {
    id_angkatan: '',
    no_angkatan: '',
    tahun: '',
    status_angkatan: '',
  };

  const [formInput, setFormInput] = useState(initialFormInput);
  const [selectedStatusValue, setSelectedStatusValue] = useState('');
  const [updateAngkatan, { isLoading, isError, error }] =
    useUpdateAngkatanMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmitForm = async () => {
    const payload = {
      id_angkatan: formInput?.id_angkatan,
      no_angkatan: formInput?.no_angkatan,
      tahun: formInput?.tahun,
      status_angkatan: selectedStatusValue,
    };

    try {
      const response = await updateAngkatan(payload).unwrap();

      if (!response.error) {
        toast.success('Angkatan berhasil diubah!', {
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
        id_angkatan: data?.id_angkatan,
        no_angkatan: data?.no_angkatan,
        tahun: data?.tahun,
        status_angkatan: data?.status_angkatan,
      });
    }
    setSelectedStatusValue(data?.status_angkatan);
  }, [data, setFormInput]);

  useEffect(() => {
    const fieldsToCheck = ['no_angkatan', 'tahun', 'status_angkatan'];

    fieldsToCheck.forEach((field) => {
      if (errors[field] && formInput[field] !== '') {
        if (errors[field].type === 'required') {
          clearErrors(field);
        }
      }
    });
  }, [formInput, clearErrors, errors]);

  useEffect(() => {
    if (data) {
      setValue('no_angkatan', data?.no_angkatan);
      setValue('tahun', data?.tahun);
      setValue('status_angkatan', data?.status_angkatan);
    }
  }, [data, setFormInput, setValue]);

  const statusAngkatan = [
    { value: 0, label: 'Belum dimulai' },
    { value: 1, label: 'Aktif' },
    { value: 2, label: 'Lulus' },
  ];

  return (
    <form onSubmit={handleSubmit(handleSubmitForm)}>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-3">
          <Input
            type="number"
            label="Angkatan ke-"
            name="no_angkatan"
            value={formInput?.no_angkatan}
            onChange={handleChange}
            register={register}
            errors={errors}
          />

          <Input
            type="number"
            label="Tahun"
            name="tahun"
            register={register}
            value={formInput?.tahun}
            onChange={handleChange}
            errors={errors}
          />

          <Controller
            name="status_angkatan"
            control={control}
            render={({ field }) => (
              <SelectInput
                field={field}
                data={statusAngkatan}
                label="Status"
                name="status_angkatan"
                selectedValue={selectedStatusValue}
                setSelectedValue={setSelectedStatusValue}
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

export default FormEditAngkatanLulus;
