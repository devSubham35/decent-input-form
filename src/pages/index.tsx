'use client'
import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { ThemeProvider } from 'styled-components';
import { Input, defaultDarkTheme, defaultLightTheme } from 'decent-input';
import { FaUser, FaMoon, FaSun } from 'react-icons/fa';
import { RiGitRepositoryPrivateFill } from "react-icons/ri";

const Page = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(true);

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  const currentTheme = isDarkTheme ? defaultDarkTheme : defaultLightTheme;

  const validationSchema = Yup.object({
    userName: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required'),
  });

  const formik = useFormik({
    initialValues: {
      userName: '',
      password: '',
    },
    validationSchema,
    onSubmit: (values) => {
      console.log('Form submitted successfully');
      console.log('Values:', values);
    },
  });

  return (
    <ThemeProvider theme={currentTheme}>
      <div style={{ backgroundColor: currentTheme.primaryColor }} className='w-full min-h-screen flex flex-col justify-center items-center pt-20 transition-colors duration-300'>
        <div className="absolute top-4 right-4">
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-full ${isDarkTheme ? 'bg-yellow-400' : 'bg-gray-800'}`}
          >
            {isDarkTheme ? <FaSun className="text-gray-800" /> : <FaMoon className="text-yellow-400" />}
          </button>
        </div>

        <div className='w-[90%] sm:w-[500px] md:w-[600px] xl:w-[30%]'>
          <h1 style={{ color: currentTheme.secondaryColor }} className='text-[22px] md:text-3xl font-bold mb-8 transition-colors duration-300 text-center'>Form Using decent-input</h1>

          <form onSubmit={formik.handleSubmit}>
            <div style={{ backgroundColor: currentTheme.inputBackgroundColor }} className='w-full p-6 rounded-xl shadow-2xl flex flex-col gap-6 transition-colors duration-300'>
              <Input
                value={formik.values.userName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                type="text"
                name="userName"
                label="User Name"
                placeholder="Enter Your email"
                suffix='.com'
                icon={<FaUser />}
                setTheme={isDarkTheme ? 'dark' : 'light'}
                validationMessage={formik.errors.userName}
                isError={formik.touched.userName && !!formik.errors.userName}
              />

              <Input
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                type="password"
                name="password"
                label="Password"
                placeholder="Enter your Password"
                icon={<RiGitRepositoryPrivateFill />}
                setTheme={isDarkTheme ? 'dark' : 'light'}
                validationMessage={formik.errors.password}
                isError={formik.touched.password && !!formik.errors.password}
              />

              <button 
                type="submit" 
                className={`${isDarkTheme ? 'bg-slate-800 hover:bg-slate-700' : 'bg-violet-500 hover:bg-violet-600'} text-white font-bold py-[13px] px-4 rounded transition-colors duration-300`}
              >
                Submit
              </button>
            </div>
          </form>
        </div>

      </div>
    </ThemeProvider>
  );
};

export default Page;


