import React from 'react';
import { useSelector } from 'react-redux';
import { selectFullName } from '../../features/auth/authSlice';
import carGreen from '../../assets/img/car-green.svg';
import logo from '/logo.svg';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const fullName = useSelector(selectFullName);

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 relative">
      {/* Top Row with Title, Username, and Icon */}
      <div className="flex items-center justify-between w-full top-6 absolute pt-4 px-6">
        <div className="text-gray-800 text-lg font-medium">
          {fullName || 'ثبت نام'}
        </div>

        <h1 className="text-xl font-bold text-gray-800 hidden md:block">
          سامانه مقایسه و خرید آنلاین بیمه
        </h1>

        <img src={logo} alt="logo" className="w-6" />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col md:flex-row">
        <aside className="hidden md:block w-1/4 bg-secondary"></aside>

        <main className="flex-1 flex flex-col pt-32 md:pr-32 md:items-end items-center">
          <div className="px-4 md:px-0 max-w-xl w-full">{children}</div>
        </main>
      </div>

      {/* Car Image and Yellow Section */}
      <div className="absolute bottom-0">
        <div className="pl-8 md:pb-12">
          <img
            src={carGreen}
            alt="Car"
            className="md:w-auto object-contain w-4/5"
          />
        </div>
        <div className="w-full bg-secondary md:hidden h-[100px]"></div>
      </div>
    </div>
  );
};

export default MainLayout;
