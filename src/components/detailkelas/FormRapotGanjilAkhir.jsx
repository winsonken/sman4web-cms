import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import InputFile from '../InputFile';
import Button from '../Button';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useUpdateRapotGanjilAkhirMutation } from '../../services/api/rapotApiSlice';
import Loading from '../Loading';

const validationSchema = yup
  .object({
    // rapot_ganjil_awal: yup.string().required('Rapot ganjil awal is required'),
  })
  .required();

const FormRapotGanjilAkhir = (props) => {
  const { data, setIsOpenPopUpGanjilAkhir } = props;

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

  const [rapotGanjilAkhir, setRapotGanjilAkhir] = useState('');
  const [rapotGanjilAkhirValue, setRapotGanjilAkhirValue] = useState('');

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
      setRapotGanjilAkhir(file);
    }
  };

  const [updateRapotGanjilAkhir, { isLoading, isSuccess, isError, error }] =
    useUpdateRapotGanjilAkhirMutation();

  const handleFormSubmit = async () => {
    const formData = new FormData();
    formData.append('id_rapot', formInput?.id_rapot);
    formData.append('file', rapotGanjilAkhirValue || rapotGanjilAkhir);

    try {
      const response = await updateRapotGanjilAkhir(formData).unwrap();
      if (!response.error) {
        toast.success('Rapot ganjil akhir berhasil diupload!', {
          position: 'top-right',
          theme: 'light',
        });
        setIsOpenPopUpGanjilAkhir(false);
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
        file: data?.rapot_ganjil_akhir,
      });
    }
  }, [data, setFormInput]);

  useEffect(() => {
    setRapotGanjilAkhirValue(data?.rapot_ganjil_akhir);
  }, [data]);

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <div className="flex flex-col gap-3">
        <InputFile
          label="Rapot ganjil akhir"
          onChange={handleFileChange}
          name="rapot_ganjil_akhir"
          fileValue={rapotGanjilAkhirValue}
          setFileValue={setRapotGanjilAkhirValue}
          selectedFile={rapotGanjilAkhir}
          setSelectedFile={setRapotGanjilAkhir}
        />

        <div className="flex justify-end gap-2 mt-3">
          <Button
            title="Batal"
            type="cancel"
            setIsOpenPopUp={setIsOpenPopUpGanjilAkhir}
          />
          <Button title={isLoading ? <Loading /> : 'Simpan'} type="submit" />
        </div>
      </div>
    </form>
  );
};

export default FormRapotGanjilAkhir;
