import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import InputFile from '../InputFile';
import Button from '../Button';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useUpdateRapotGenapAkhirMutation } from '../../services/api/rapotApiSlice';
import Loading from '../Loading';

const validationSchema = yup
  .object({
    // rapot_ganjil_awal: yup.string().required('Rapot ganjil awal is required'),
  })
  .required();

const FormRapotGenapAkhir = (props) => {
  const { data, setIsOpenPopUpGenapAkhir } = props;

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

  const [rapotGenapAkhir, setRapotGenapAkhir] = useState('');
  const [rapotGenapAkhirValue, setRapotGenapAkhirValue] = useState('');

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
      setRapotGenapAkhir(file);
    }
  };

  const [updateRapotGenapAkhir, { isLoading, isSuccess, isError, error }] =
    useUpdateRapotGenapAkhirMutation();

  const handleFormSubmit = async () => {
    const formData = new FormData();
    formData.append('id_rapot', formInput?.id_rapot);
    formData.append('file', rapotGenapAkhirValue || rapotGenapAkhir);

    try {
      const response = await updateRapotGenapAkhir(formData).unwrap();
      if (!response.error) {
        toast.success('Rapot genap akhir berhasil diupload!', {
          position: 'top-right',
          theme: 'light',
        });
        setIsOpenPopUpGenapAkhir(false);
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
        file: data?.rapot_genap_akhir,
      });
    }
  }, [data, setFormInput]);

  useEffect(() => {
    setRapotGenapAkhirValue(data?.rapot_genap_akhir);
  }, [data]);

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <div className="flex flex-col gap-3">
        <InputFile
          label="Rapot ganjil awal"
          onChange={handleFileChange}
          name="rapot_genap_akhir"
          fileValue={rapotGenapAkhirValue}
          setFileValue={setRapotGenapAkhirValue}
          selectedFile={rapotGenapAkhir}
          setSelectedFile={setRapotGenapAkhir}
        />

        <div className="flex justify-end gap-2 mt-3">
          <Button
            title="Batal"
            type="cancel"
            setIsOpenPopUp={setIsOpenPopUpGenapAkhir}
          />
          <Button title={isLoading ? <Loading /> : 'Simpan'} type="submit" />
        </div>
      </div>
    </form>
  );
};

export default FormRapotGenapAkhir;
