import React, { useState } from 'react';
import logo from '../assets/logo-sman4.png';
import { FaEye } from 'react-icons/fa';
import { FaEyeSlash } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const validationSchema = yup
  .object({
    username: yup.string().required('Username is required'),
    password: yup.string().required('Password is required'),
  })
  .required();

const Login = () => {
  const [showPassword, setShowPassword] = useState(true);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const handlePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleOnSubmit = (e) => {
    alert(JSON.stringify(e));
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center p-3">
      <div className="w-full max-w-sm h-fit flex flex-col gap-5 bg-main-blue px-5 py-8 rounded-xl">
        <div className="flex flex-col items-center gap-3">
          <div className="w-40">
            <img src={logo} alt="SMAN4 Logo" />
          </div>

          <h1 className="text-xl font-semibold text-second-blue xs:text-2xl">
            Sistem Database SMAN4
          </h1>
        </div>

        <div>
          <form onSubmit={handleSubmit(handleOnSubmit)}>
            <div className="flex flex-col gap-3">
              <label
                htmlFor="username"
                className="text-base font-medium text-second-blue"
              >
                Username
              </label>
              <input
                type="text"
                name="username"
                id="username"
                placeholder="Username"
                className="bg-transparent py-2 border-b border-main-cream placeholder-main-cream placeholder:font-medium focus:outline-0 caret-second-blue"
                autoComplete="off"
                style={{ color: '#FFFDDE' }}
                {...register('username')}
              />
              {errors.username && (
                <span className="text-sm font-medium text-main-red">
                  {errors.username?.message}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-3 mt-5">
              <label
                htmlFor="password"
                className="text-base font-medium text-second-blue"
              >
                Password
              </label>

              <div className="relative">
                <input
                  type={showPassword ? 'password' : 'text'}
                  name="password"
                  id="password"
                  placeholder="Password"
                  className="w-full bg-transparent py-2 border-b border-main-cream placeholder-main-cream placeholder:font-medium focus:outline-0 caret-second-blue"
                  style={{ color: '#FFFDDE' }}
                  {...register('password')}
                />

                <div
                  className="text-xl text-main-cream absolute top-1/2 right-0 -translate-y-1/2 cursor-pointer"
                  onClick={handlePassword}
                >
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                </div>
              </div>

              {errors.password && (
                <span className="text-sm font-medium text-main-red">
                  {errors.password?.message}
                </span>
              )}
            </div>

            <div className="mt-5">
              <button
                type="submit"
                className="w-full text-base font-medium text-white bg-second-blue py-3 rounded"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
