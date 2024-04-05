import React from 'react';
import { Layout } from '../components';
import { PiUsersThreeFill } from 'react-icons/pi';
import { FaChalkboardTeacher } from 'react-icons/fa';
import { MdStairs } from 'react-icons/md';
import { FaUserGraduate } from 'react-icons/fa';

const Dashboard = () => {
  return (
    <Layout>
      <div className="flex flex-col">
        <div>
          <h1 className="text-xl font-semibold md:text-2xl">Dashboard</h1>
        </div>
        <div class="grid xl:grid-cols-4 xl:gap-4 lg:grid-cols-2 lg:gap-2 sm:grid-cols-1 mt-5">
          <div className='bg-red-400 rounded-lg w-11/12 sm:mt-3'>
            <div className='flex flex-row justify-center gap-8 px-6 py-1'>
              <div>
                <PiUsersThreeFill className='size-20'/>
              </div>
              <div>
                <p className='text-5xl mt-5'>1500</p>
              </div>
            </div>
            <div>
              <p className='text-center'>Jumlah siswa aktif</p>
            </div>
          </div>

          <div className='bg-green-200 rounded-lg w-11/12 sm:mt-3'>
          <div className='flex flex-row justify-center gap-8 px-6 py-1'>
              <div>
                <FaChalkboardTeacher className='size-20'/>
              </div>
              <div>
                <p className='text-5xl mt-5'>30</p>
              </div>
            </div>
            <div>
              <p className='text-center'>Jumlah guru</p>
            </div>
          </div>

          <div className='bg-blue-200 rounded-lg w-11/12 sm:mt-3'>
          <div className='flex flex-row justify-center gap-8 px-6 py-1'>
              <div>
                <MdStairs className='size-20'/>
              </div>
              <div>
                <p className='text-5xl mt-5'>7</p>
              </div>
            </div>
            <div>
              <p className='text-center'>Jumlah angkatan</p>
            </div>
          </div>

          <div className='bg-yellow-200 rounded-lg w-11/12 sm:mt-3'>
          <div className='flex flex-row justify-center gap-8 px-6 py-1'>
              <div>
                <FaUserGraduate className='size-16 mt-3'/>
              </div>
              <div>
                <p className='text-5xl mt-5'>500</p>
              </div>
            </div>
            <div className='mt-1'>
              <p className='text-center'>Jumlah alumni</p>
            </div>
          </div>
        </div>

        <div></div>
      </div>
    </Layout>
  );
};

export default Dashboard;
