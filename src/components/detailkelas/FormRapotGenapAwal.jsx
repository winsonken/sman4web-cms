import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import InputFile from '../InputFile';
import Button from '../Button';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useUpdateRapotGenapAwalMutation } from '../../services/api/rapotApiSlice';
import Loading from '../Loading';

const validationSchema = yup
  .object({
    // rapot_ganjil_awal: yup.string().required('Rapot ganjil awal is required'),
  })
  .required();

const FormRapotGenapAwal = (props) => {
  const { data, setIsOpenPopUpGenapAwal } = props;

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

  const [rapotGenapAwal, setRapotGenapAwal] = useState('');
  const [rapotGenapAwalValue, setRapotGenapAwalValue] = useState('');

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
      setRapotGenapAwal(file);
    }
  };

  const [updateRapotGenapAwal, { isLoading, isSuccess, isError, error }] =
    useUpdateRapotGenapAwalMutation();

  const handleFormSubmit = async () => {
    const formData = new FormData();
    formData.append('id_rapot', formInput?.id_rapot);
    formData.append('file', rapotGenapAwalValue || rapotGenapAwal);

    try {
      const response = await updateRapotGenapAwal(formData).unwrap();
      if (!response.error) {
        toast.success('Rapot genap awal berhasil diupload!', {
          position: 'top-right',
          theme: 'light',
        });
        setIsOpenPopUpGenapAwal(false);
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
        file: data?.rapot_genap_awal,
      });
    }
  }, [data, setFormInput]);

  useEffect(() => {
    setRapotGenapAwalValue(data?.rapot_genap_awal);
  }, [data]);

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <div className="flex flex-col gap-3">
        <InputFile
          label="Rapot genap awal"
          onChange={handleFileChange}
          name="rapot_genap_awal"
          fileValue={rapotGenapAwalValue}
          setFileValue={setRapotGenapAwalValue}
          selectedFile={rapotGenapAwal}
          setSelectedFile={setRapotGenapAwal}
        />

        <div className="flex justify-end gap-2 mt-3">
          <Button
            title="Batal"
            type="cancel"
            setIsOpenPopUp={setIsOpenPopUpGenapAwal}
          />
          <Button title={isLoading ? <Loading /> : 'Simpan'} type="submit" />
        </div>
      </div>
    </form>
  );
};

export default FormRapotGenapAwal;
