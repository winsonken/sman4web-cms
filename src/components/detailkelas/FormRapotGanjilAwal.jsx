import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import InputFile from '../InputFile';
import Button from '../Button';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useUpdateRapotGanjilAwalMutation } from '../../services/api/rapotApiSlice';
import Loading from '../Loading';

const validationSchema = yup
  .object({
    // rapot_ganjil_awal: yup.string().required('Rapot ganjil awal is required'),
  })
  .required();

const FormRapotGanjilAwal = (props) => {
  const { data, setIsOpenPopUpGanjilAwal } = props;

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

  const [rapotGanjilAwal, setRapotGanjilAwal] = useState('');
  const [rapotGanjilAwalValue, setRapotGanjilAwalValue] = useState('');

  const initialFormInput = {
    id_rapot: '',
    file: '',
  };

  const [formInput, setFormInput] = useState(initialFormInput);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormInput((prev) => ({
        ...prev,
        file: file,
      }));
      setRapotGanjilAwal(file);
    }
  };

  const [updateRapotGanjilAwal, { isLoading, isSuccess, isError, error }] =
    useUpdateRapotGanjilAwalMutation();

  const handleFormSubmit = async () => {
    const formData = new FormData();
    formData.append('id_rapot', formInput?.id_rapot);
    formData.append('file', rapotGanjilAwalValue || rapotGanjilAwal);

    try {
      const response = await updateRapotGanjilAwal(formData).unwrap();
      if (!response.error) {
        toast.success('Rapot ganjil awal berhasil diupload!', {
          position: 'top-right',
          theme: 'light',
        });
        setIsOpenPopUpGanjilAwal(false);
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
        id_rapot: data?.rapot,
        file: data?.rapot_ganjil_awal,
      });
    }
  }, [data, setFormInput]);

  useEffect(() => {
    setRapotGanjilAwalValue(data?.rapot_ganjil_awal);
  }, [data]);

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <div className="flex flex-col gap-3">
        <InputFile
          label="Rapot ganjil awal"
          onChange={handleFileChange}
          name="rapot_ganjil_awal"
          fileValue={rapotGanjilAwalValue}
          setFileValue={setRapotGanjilAwalValue}
          selectedFile={rapotGanjilAwal}
          setSelectedFile={setRapotGanjilAwal}
        />

        <div className="flex justify-end gap-2 mt-3">
          <Button
            title="Batal"
            type="cancel"
            setIsOpenPopUp={setIsOpenPopUpGanjilAwal}
          />
          <Button title={isLoading ? <Loading /> : 'Simpan'} type="submit" />
        </div>
      </div>
    </form>
  );
};

export default FormRapotGanjilAwal;
