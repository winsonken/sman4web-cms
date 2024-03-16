import React, { useState } from 'react';
import Input from '../Input';
import Button from '../Button';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const validationSchema = yup
  .object({
    tahun_ajaran: yup.string().required('Tahun ajaran is required'),
    periode_ganjil: yup.string().required('Periode ganjil is required'),
    periode_genap: yup.string().required('Periode genap is required'),
  })
  .required();

const FormAddTahunajaran = (props) => {
  const { setIsOpenPopUpAdd } = props;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const initialFormInput = {
    tahun_ajaran: '',
    periode_ganjil: '',
    periode_genap: '',
  };

  const [formInput, setFormInput] = useState(initialFormInput);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmitForm = (e) => {
    alert(JSON.stringify(e));
  };

  return (
    <form onSubmit={handleSubmit(handleSubmitForm)}>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-3">
          <Input
            type="number"
            label="Tahun ajaran"
            name="tahun_ajaran"
            onChange={handleChange}
            register={register}
            errors={errors}
          />
          <div className='flex justify-between'>
            <Input
              className="w-80"
              type="number"
              label="Periode ganjil"
              name="periode_ganjil"
              onChange={handleChange}
              register={register}
              errors={errors}
            />
            <Input
            className="w-80"
              type="number"
              label="Periode genap"
              name="periode_genap"
              onChange={handleChange}
              register={register}
              errors={errors}
            />
          </div>
        </div>
        

        <div className="flex justify-end gap-2">
          <Button
            title="Batal"
            type="cancel"
            setIsOpenPopUp={setIsOpenPopUpAdd}
          />
          <Button 
            title="Tambah" 
            type="submit" 
          />
        </div>
      </div>
    </form>
  );
};

export default FormAddTahunajaran;
