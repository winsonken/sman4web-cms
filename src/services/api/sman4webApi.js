import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API_URL =
  import.meta.env.VITE_PRODUCTION === 'true'
    ? import.meta.env.VITE_API_URL_PROD
    : import.meta.env.VITE_API_URL_DEV;

export const sman4webApi = createApi({
  reducerPath: 'sman4webApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_URL}`,
    prepareHeaders: (headers, { getState }) => {
      let token = getState().auth.token;

      if (token) {
        headers.set('auth-token', `${token}`);
        return headers;
      }
    },
  }),
  tagTypes: [
    'Profile',
    'Angkatan',
    'Tahun ajaran',
    'Jurusan',
    'Siswa',
    'Guru',
    'Tendik',
    'Kelas',
    'Kelas_siswa',
    'Prestasi',
    'Pelanggaran',
    'Rapot',
    'Ppdb',
    'Role',
    'Module',
  ],
  endpoints: () => ({}),
});
