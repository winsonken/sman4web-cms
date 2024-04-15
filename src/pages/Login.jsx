import React, { useEffect, useState } from 'react';
import logo from '../assets/logo-sman4.png';
import { FaEye } from 'react-icons/fa';
import { FaEyeSlash } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useLoginMutation } from '../services/api/authApiSlice';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectCurrentToken,
  setCredentials,
} from '../services/features/authSlice';
import { Loading } from '../components';

const validationSchema = yup
  .object({
    username: yup.string().required('Username is required'),
    password: yup.string().required('Password is required'),
  })
  .required();

const Login = () => {
  const [showPassword, setShowPassword] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const token = useSelector(selectCurrentToken);

  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const handlePassword = () => {
    setShowPassword(!showPassword);
  };

  const initialFormInput = {
    username: '',
    password: '',
  };

  const [formInput, setFormInput] = useState(initialFormInput);

  const [login, { isLoading, error: errorServer }] = useLoginMutation();

  const handleOnSubmit = async () => {
    const response = await login({
      username: formInput?.username,
      password: formInput?.password,
    });

    try {
      if (!response.error) {
        dispatch(setCredentials({ ...response }));
        navigate('/');
      } else {
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    const fieldsToCheck = ['username', 'password'];

    fieldsToCheck.forEach((field) => {
      if (errors[field] && formInput[field] !== '') {
        if (errors[field].type === 'required') {
          clearErrors(field);
        }
      }
    });
  }, [formInput, clearErrors, errors]);

  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [token]);

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
                {...register('username')}
                placeholder="Username"
                className="bg-transparent py-2 border-b border-main-cream placeholder-main-cream placeholder:font-medium focus:outline-0 caret-second-blue"
                autoComplete="off"
                style={{ color: '#FFFDDE' }}
                onChange={handleChange}
              />
              {errors.username && (
                <span className="text-xs font-medium text-main-red">
                  {errors.username?.message}
                </span>
              )}

              {errorServer?.data && (
                <span className="text-xs font-medium text-main-red">
                  {errorServer.data?.message}
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
                  {...register('password')}
                  placeholder="Password"
                  className="w-full bg-transparent py-2 border-b border-main-cream placeholder-main-cream placeholder:font-medium focus:outline-0 caret-second-blue"
                  style={{ color: '#FFFDDE' }}
                  onChange={handleChange}
                />

                <div
                  className="text-xl text-main-cream absolute top-1/2 right-0 -translate-y-1/2 cursor-pointer"
                  onClick={handlePassword}
                >
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                </div>
              </div>

              {errors.password && (
                <span className="text-xs font-medium text-main-red">
                  {errors.password?.message}
                </span>
              )}

              {errorServer?.data && (
                <span className="text-xs font-medium text-main-red">
                  {errorServer.data?.message}
                </span>
              )}
            </div>

            <div className="mt-5">
              <button
                type="submit"
                className="w-full text-base font-medium text-white bg-second-blue py-3 rounded"
              >
                {isLoading ? <Loading /> : 'Login'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
