import React, { useEffect } from 'react';
import InputCheckbox from '../InputCheckbox';
import { useState } from 'react';
import Button from '../Button';
import { useForm } from 'react-hook-form';
import { useUpdateModuleMutation } from '../../services/api/moduleApiSlice';
import { toast } from 'react-toastify';

// const FormEditRole = (props) => {
//   const { data, dataModule, setIsOpenPopUpEdit } = props;

//   const dataModules = dataModule?.data;

//   const {
//     control,
//     register,
//     handleSubmit,
//     formState: { errors },
//     clearErrors,
//     setValue,
//   } = useForm();

//   const initialFormInput = {
//     id_modul_user: '',
//     akses: '',
//     edit: '',
//     ubah: '',
//     hapus: '',
//   };

//   const [formInput, setFormInput] = useState(initialFormInput);
//   console.log(formInput);

//   const [updateModule, { isLoading }] = useUpdateModuleMutation();

//   const handleOnSubmit = async () => {};

//   const handleChange = () => {};

//   return (
//     <form onSubmit={handleSubmit(handleOnSubmit)}>
//       <div className="flex flex-row gap-3">
//         <h1>Nama role:</h1>
//         <p className="capitalize">{data?.nama_role}</p>
//       </div>
//       <div className="table-scroll overflow-scroll">
//         <table className="w-full text-center table-auto">
//           <thead>
//             <tr>
//               <th scope="col" className="px-6 py-4">
//                 No
//               </th>
//               <th scope="col" className="px-10 py-4">
//                 Modul
//               </th>
//               <th scope="col" className="px-6 py-4">
//                 Akses
//               </th>
//               <th scope="col" className="px-6 py-4">
//                 Edit
//               </th>
//               <th scope="col" className="px-6 py-4">
//                 Ubah
//               </th>
//               <th scope="col" className="px-6 py-4">
//                 Hapus
//               </th>
//             </tr>
//           </thead>

//           <tbody>
//             {dataModules.length > 0 ? (
//               dataModules.map((allDataModules, index) => (
//                 <tr>
//                   <td scope="row" className="px-6 py-1 font-medium">
//                     {index + 1}
//                   </td>
//                   <td className="px-6 py-1 font-medium text-left">
//                     {allDataModules?.nama_modul}
//                   </td>
//                   <td className="px-6 py-1 font-medium">
//                     <InputCheckbox
//                       name="akses"
//                       checked={allDataModules?.akses}
//                       onChange={handleChange}
//                     />
//                   </td>
//                   <td className="px-6 py-1 font-medium">
//                     <InputCheckbox
//                       name="edit"
//                       checked={allDataModules?.edit}
//                       onChange={handleChange}
//                     />
//                   </td>
//                   <td className="px-6 py-1 font-medium">
//                     <InputCheckbox
//                       name="ubah"
//                       checked={allDataModules?.ubah}
//                       onChange={handleChange}
//                     />
//                   </td>
//                   <td className="px-6 py-1 font-medium">
//                     <InputCheckbox
//                       name="hapus"
//                       checked={allDataModules?.hapus}
//                       onChange={handleChange}
//                     />
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="6" className="px-6 py-1 whitespace-no-wrap">
//                   <div className="text-sm  text-gray-500 text-center">
//                     Data tidak ditemukan
//                   </div>
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>

//       <div className="flex justify-end gap-2">
//         <Button
//           title="Batal"
//           type="cancel"
//           setIsOpenPopUp={setIsOpenPopUpEdit}
//         />
//         <Button title="Ubah" type="submit" />
//       </div>
//     </form>
//   );
// };

// export default FormEditRole;

const FormEditRole = (props) => {
  const { data, dataModule, setIsOpenPopUpEdit } = props;

  const dataModules = dataModule?.data;

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
    setValue,
  } = useForm();

  const [formInput, setFormInput] = useState([]);

  useEffect(() => {
    if (dataModules) {
      const initialFormInput = dataModules.map((module) => ({
        id_modul_user: module.id_modul_user,
        akses: module.akses,
        tambah: module.tambah,
        ubah: module.ubah,
        hapus: module.hapus,
      }));
      setFormInput(initialFormInput);
    }
  }, [dataModules]);

  const [updateModule, { isLoading }] = useUpdateModuleMutation();

  const handleOnSubmit = async () => {
    try {
      const response = await updateModule(formInput);
      if (!response.error) {
        toast.success('Role berhasil diubah', {
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

  const handleChange = (index, key, value) => {
    const updatedFormInput = [...formInput];
    updatedFormInput[index][key] = value;
    setFormInput(updatedFormInput);
  };

  return (
    <form onSubmit={handleSubmit(handleOnSubmit)}>
      <div className="flex flex-row gap-3">
        <h1>Nama role:</h1>
        <p className="capitalize">{data?.nama_role}</p>
      </div>
      <div className="table-scroll overflow-scroll">
        <table className="w-full text-center table-auto">
          <thead>
            <tr>
              <th scope="col" className="px-6 py-4">
                No
              </th>
              <th scope="col" className="px-10 py-4">
                Modul
              </th>
              <th scope="col" className="px-6 py-4">
                Akses
              </th>
              <th scope="col" className="px-6 py-4">
                Tambah
              </th>
              <th scope="col" className="px-6 py-4">
                Ubah
              </th>
              <th scope="col" className="px-6 py-4">
                Hapus
              </th>
            </tr>
          </thead>

          <tbody>
            {dataModules?.length > 0 ? (
              dataModules.map((allDataModules, index) => (
                <tr key={allDataModules.id_modul_user}>
                  <td scope="row" className="px-6 py-1 font-medium">
                    {index + 1}
                  </td>
                  <td className="px-6 py-1 font-medium text-left">
                    {allDataModules?.nama_modul}
                  </td>
                  <td className="px-6 py-1 font-medium">
                    <InputCheckbox
                      name="akses"
                      checked={allDataModules?.akses}
                      // onChange={(e) =>
                      //   handleChange(index, 'akses', e.target.checked)
                      // }
                      onChange={(checked) =>
                        handleChange(index, 'akses', checked ? 1 : 0)
                      }
                    />
                  </td>
                  <td className="px-6 py-1 font-medium">
                    <InputCheckbox
                      name="tambah"
                      checked={allDataModules?.tambah}
                      // onChange={(e) =>
                      //   handleChange(index, 'edit', e.target.checked)
                      // }
                      onChange={(checked) =>
                        handleChange(index, 'tambah', checked ? 1 : 0)
                      }
                    />
                  </td>
                  <td className="px-6 py-1 font-medium">
                    <InputCheckbox
                      name="ubah"
                      checked={allDataModules?.ubah}
                      // onChange={(e) =>
                      //   handleChange(index, 'ubah', e.target.checked)
                      // }
                      onChange={(checked) =>
                        handleChange(index, 'ubah', checked ? 1 : 0)
                      }
                    />
                  </td>
                  <td className="px-6 py-1 font-medium">
                    <InputCheckbox
                      name="hapus"
                      checked={allDataModules?.hapus}
                      // onChange={(e) =>
                      //   handleChange(index, 'hapus', e.target.checked)
                      // }
                      onChange={(checked) =>
                        handleChange(index, 'hapus', checked ? 1 : 0)
                      }
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="px-6 py-1 whitespace-no-wrap">
                  <div className="text-sm  text-gray-500 text-center">
                    Data tidak ditemukan
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex justify-end gap-2">
        <Button
          title="Batal"
          type="cancel"
          setIsOpenPopUp={setIsOpenPopUpEdit}
        />
        <Button title="Ubah" type="submit" />
      </div>
    </form>
  );
};

export default FormEditRole;
