import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const sman4webApi = createApi({
  reducerPath: 'sman4webApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5500',
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
