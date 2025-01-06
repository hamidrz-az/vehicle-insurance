import React from "react";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-100 relative">
      {/* Left Sidebar */}
      <div className="hidden md:block w-1/4 bg-yellow-100 relative">
        {/* User Name */}
        <div className="absolute top-4 left-4 text-xl font-bold text-gray-800">
          ثبت نام
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-end p-6 relative">
        {/* User Name for Mobile */}
        <div className="block md:hidden absolute top-4 left-4 text-xl font-bold text-gray-800">
          ثبت نام
        </div>
        <div className="max-w-md w-full">{children}</div>
      </div>

      {/* Car Background Image */}
      <div
        className="absolute bottom-4 left-4 bg-no-repeat bg-contain pointer-events-none bg-car_green"
        style={{
        //   backgroundImage: "url('/assets/img/car-green.svg')",
          backgroundPosition: "left 20px bottom 20px", 
          width: "-webkit-fill-available",
          height: "50%",
        }}
      ></div>
    </div>
  );
};

export default MainLayout;
