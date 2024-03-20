import React from 'react';
import Input from '../Input';
import SelectInput from '../SelectInput';
import Button from '../Button';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { toast } from 'react-toastify';

const validationSchema = yup
  .object({
    no_angkatan: yup.string().required('No Angkatan is required'),
    tahun: yup.string().required('Tahun is required'),
    status_angkatan: yup.object().required('Status is required'),
  })
  .required();

const FormEditPpdb = (props) => {
  const { setIsOpenPopUpEdit } = props;
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (e) => {
    toast.success('Angkatan berhasil diubah!', {
      position: 'top-right',
      theme: 'light',
    });
  };

  const statusAngkatan = [
    { value: '0', label: 'Belum dimulai' },
    { value: '1', label: 'Aktif' },
    { value: '2', label: 'Lulus' },
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-3">
          <Input
            type="file"
            label="Foto"
            name="foto_ppdb"
            onChange={handleChange}
            register={register}
            errors={errors}
          />
          <Input
            type="text"
            label="Nama"
            name="nama_siswa_ppdb"
            onChange={handleChange}
            register={register}
            errors={errors}
          />
          <Input
            type="text"
            label="No Pendaftaran"
            name="no_pendaftaran_ppdb"
            onChange={handleChange}
            register={register}
            errors={errors}
          />

          <Input
            type="text"
            label="NIPD"
            name="nipd_ppdb"
            onChange={handleChange}
            register={register}
            errors={errors}
          />

          <Input
            type="date"
            label="Tanggal Lahir"
            name="tanggal_lahir_ppdb"
            onChange={handleChange}
            register={register}
            errors={errors}
          />
          <Input
            type="text"
            label="Email"
            name="email_ppdb"
            onChange={handleChange}
            register={register}
            errors={errors}
          />
          <Input
            type="text"
            label="Tempat Lahir"
            name="tempat_lahir_ppdb"
            onChange={handleChange}
            register={register}
            errors={errors}
          />
          <Input
            type="text"
            label="Jenis Kelamin"
            name="jenis_kelamin_ppdb"
            onChange={handleChange}
            register={register}
            errors={errors}
          />
          <Input
            type="text"
            label="Agama"
            name="agama_ppdb"
            onChange={handleChange}
            register={register}
            errors={errors}
          />
          <Input
            type="text"
            label="Status PPDB"
            name="status_ppdb"
            onChange={handleChange}
            register={register}
            errors={errors}
          />
          <Input
            type="text"
            label="Alamat"
            name="alamat_ppdb"
            onChange={handleChange}
            register={register}
            errors={errors}
          />
          <Input
            type="number"
            label="Angkatan"
            name="angkatan_ppdb"
            onChange={handleChange}
            register={register}
            errors={errors}
          />
          <Input
            type="text"
            label="No Telp PPDB"
            name="no_telp_ppdb"
            onChange={handleChange}
            register={register}
            errors={errors}
          />
          <Input
            type="text"
            label="No Telp Ortu"
            name="no_telp_ortu"
            onChange={handleChange}
            register={register}
            errors={errors}
          />
          <Input
            type="text"
            label="Nama Ortu"
            name="nama_ortu"
            onChange={handleChange}
            register={register}
            errors={errors}
          />

          <Controller
            name="upload_ppdb"
            control={control}
            render={({ field }) => (
              <SelectInput
                field={field}
                data={uploadRapot}
                label="Upload"
                name="upload_ppdb"
                placeholder="Select ppdb"
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
          <Button title="Ubah" type="submit" />
        </div>
      </div>
    </form>
  );
};
export default FormEditPpdb;
