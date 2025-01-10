import React from "react";

interface MainLayoutProps {
    children: React.ReactNode;
}

const HeaderLayout: React.FC<MainLayoutProps> = ({ children }) => {

    return (
        <div className="mb-12">
            <h1 className="text-center md:text-right text-2xl font-bold mb-16">بیمه شخص ثالث</h1>
            <p className="text-right font-bold text-gray-500">{children}</p>
        </div>
    );
};

export default HeaderLayout;

