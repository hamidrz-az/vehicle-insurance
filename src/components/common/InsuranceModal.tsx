import React from 'react';
import { useSelector } from 'react-redux';
import { selectInsurance } from '../../features/insurance/InsuranceSlice';
import Button from './Button';

interface InsuranceModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const InsuranceModal: React.FC<InsuranceModalProps> = ({ isOpen, onClose }) => {
    const { insuranceType, vehicleType, vehicleModel, insuranceCompany, thirdPersonDiscount, driverDiscount } = useSelector(selectInsurance);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 max-w-md w-full max-h-[90vh] overflow-y-auto" dir="rtl">
                <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">جزئیات بیمه</h2>
                <div className="space-y-4">
                    <InfoItem label="نوع بیمه" value={insuranceType === "third-person" ? "شخص ثالث" : "بدنه"} />
                    <InfoItem label="نوع خودرو" value={vehicleType?.title || 'انتخاب نشده است'} />
                    <InfoItem label="مدل خودرو" value={vehicleModel?.title || 'انتخاب نشده است'} />
                    <InfoItem label="شرکت بیمه گر قبلی" value={insuranceCompany?.title || 'انتخاب نشده است'} />
                    <InfoItem label="تخفیف شخص ثالث" value={thirdPersonDiscount?.title || 'انتخاب نشده است'} />
                    <InfoItem label="تخفیف حوادث راننده" value={driverDiscount?.title || 'انتخاب نشده است'} />
                </div>
                <Button variant="fill" fullWidth={true} className="mt-6" onClick={onClose}>بستن</Button>
            </div>
        </div>
    );
};

const InfoItem: React.FC<{ label: string; value: string }> = ({ label, value }) => (
    <div className="flex justify-between items-center border-b border-gray-200 pb-2">
        <span className="font-medium text-gray-600">{label} :</span>
        <span className="text-gray-800">{value}</span>
    </div>
);

export default InsuranceModal;