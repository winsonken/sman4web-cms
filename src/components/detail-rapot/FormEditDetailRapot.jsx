import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import InputFile from '../InputFile';
import Button from '../Button';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  useUpdateRapotGanjilAkhirMutation,
  useUpdateRapotGanjilAwalMutation,
  useUpdateRapotGenapAkhirMutation,
  useUpdateRapotGenapAwalMutation,
} from '../../services/api/rapotApiSlice';

const validationSchema = yup
  .object({
    // rapot_ganjil_awal: yup.string().required('Rapot ganjil awal is required'),
  })
  .required();

const FormEditDetailRapot = (props) => {
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

  const [rapotGanjilAwal, setRapotGanjilAwal] = useState('');
  const [rapotGanjilAwalValue, setRapotGanjilAwalValue] = useState('');
  const [rapotGanjilAkhir, setRapotGanjilAkhir] = useState('');
  const [rapotGanjilAkhirValue, setRapotGanjilAkhirValue] = useState('');
  const [rapotGenapAwal, setRapotGenapAwal] = useState('');
  const [rapotGenapAwalValue, setRapotGenapAwalValue] = useState('');
  const [rapotGenapAkhir, setRapotGenapAkhir] = useState('');
  const [rapotGenapAkhirValue, setRapotGenapAkhirValue] = useState('');

  const initialFormInput = {
    id_rapot: '',
    rapot_ganjil_awal: '',
    rapot_ganjil_akhir: '',
    rapot_genap_awal: '',
    rapot_genap_akhir: '',
  };

  const [formInput, setFormInput] = useState(initialFormInput);

  const handleGanjilAwalChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setFormInput((prev) => ({
        ...prev,
        rapot_ganjil_awal: file,
      }));
      setRapotGanjilAwal(file);
    }
  };
  const handleGanjilAkhirChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setFormInput((prev) => ({
        ...prev,
        rapot_ganjil_awal: file,
      }));
      setRapotGanjilAkhir(file);
    }
  };
  const handleGenapAwalChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setFormInput((prev) => ({
        ...prev,
        rapot_ganjil_awal: file,
      }));
      setRapotGenapAwal(file);
    }
  };
  const handleGenapAkhirChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setFormInput((prev) => ({
        ...prev,
        rapot_ganjil_awal: file,
      }));
      setRapotGenapAkhir(file);
    }
  };

  const [updateRapotGanjilAwal, { isLoading: isLoadingGanjilAwal }] =
    useUpdateRapotGanjilAwalMutation();

  const [updateRapotGanjilAkhir, { isLoading: isLoadingGanjilAkhir }] =
    useUpdateRapotGanjilAkhirMutation();

  const [updateRapotGenapAwal, { isLoading: isLoadingGenapAwal }] =
    useUpdateRapotGenapAwalMutation();

  const [updateRapotGenapAkhir, { isLoading: isLoadingGenapAkhir }] =
    useUpdateRapotGenapAkhirMutation();

  const handleFormSubmit = async () => {
    const formDataGanjilAwal = new FormData();
    formDataGanjilAwal.append('id_rapot', formInput?.id_rapot);
    formDataGanjilAwal.append('file', rapotGanjilAwalValue || rapotGanjilAwal);

    const formDataGanjilAkhir = new FormData();
    formDataGanjilAkhir.append('id_rapot', formInput?.id_rapot);
    formDataGanjilAkhir.append(
      'file',
      rapotGanjilAkhirValue || rapotGanjilAkhir
    );

    const formDataGenapAwal = new FormData();
    formDataGenapAwal.append('id_rapot', formInput?.id_rapot);
    formDataGenapAwal.append('file', rapotGenapAwalValue || rapotGenapAwal);

    const formDataGenapAkhir = new FormData();
    formDataGenapAkhir.append('id_rapot', formInput?.id_rapot);
    formDataGenapAkhir.append('file', rapotGenapAkhirValue || rapotGenapAkhir);

    try {
      const response1 = await updateRapotGanjilAwal(
        formDataGanjilAwal
      ).unwrap();
      const response2 = await updateRapotGanjilAkhir(
        formDataGanjilAkhir
      ).unwrap();
      const response3 = await updateRapotGenapAwal(formDataGenapAwal).unwrap();
      const response4 = await updateRapotGenapAkhir(
        formDataGenapAkhir
      ).unwrap();

      if (
        !response1.error &&
        !response2.error &&
        !response3.error &&
        !response4.error
      ) {
        toast.success('Rapot berhasil diubah!', {
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
        id_rapot: data?.id_rapot,
        rapot_ganjil_awal: data?.rapot_ganjil_awal,
        rapot_ganjil_akhir: data?.rapot_ganjil_akhir,
        rapot_genap_awal: data?.rapot_genap_awal,
        rapot_genap_akhir: data?.rapot_genap_akhir,
      });
    }
  }, [data, setFormInput]);

  useEffect(() => {
    if (data) {
      setValue('rapot_ganjil_awal', data?.rapot_ganjil_awal);
      setValue('rapot_ganjil_akhir', data?.rapot_ganjil_akhir);
      setValue('rapot_genap_awal', data?.rapot_genap_awal);
      setValue('rapot_ganjil_akhir', data?.rapot_ganjil_akhir);
    }
  }, [data, setFormInput, setValue]);

  useEffect(() => {
    setRapotGanjilAwalValue(data?.rapot_ganjil_awal);
    setRapotGanjilAkhirValue(data?.rapot_ganjil_akhir);
    setRapotGenapAwalValue(data?.rapot_genap_awal);
    setRapotGenapAkhirValue(data?.rapot_genap_akhir);
  }, [data]);
  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <div className="flex flex-col gap-3">
        <InputFile
          label="Rapot ganjil awal"
          onChange={handleGanjilAwalChange}
          name="rapot_ganjil_awal"
          fileValue={rapotGanjilAwalValue}
          setFileValue={setRapotGanjilAwalValue}
          selectedFile={rapotGanjilAwal}
          setSelectedFile={setRapotGanjilAwal}
        />
        <InputFile
          label="Rapot ganjil akhir"
          onChange={handleGanjilAkhirChange}
          name="rapot_ganjil_akhir"
          fileValue={rapotGanjilAkhirValue}
          setFileValue={setRapotGanjilAkhirValue}
          selectedFile={rapotGanjilAkhir}
          setSelectedFile={setRapotGanjilAkhir}
        />
        <InputFile
          label="Rapot genap awal"
          onChange={handleGenapAwalChange}
          name="rapot_genap_awal"
          fileValue={rapotGenapAwalValue}
          setFileValue={setRapotGenapAwalValue}
          selectedFile={rapotGenapAwal}
          setSelectedFile={setRapotGenapAwal}
        />
        <InputFile
          label="Rapot genap akhir"
          onChange={handleGenapAkhirChange}
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
            setIsOpenPopUp={setIsOpenPopUpEdit}
          />
          <Button title="Simpan" type="submit" />
        </div>
      </div>
    </form>
  );
};

export default FormEditDetailRapot;
