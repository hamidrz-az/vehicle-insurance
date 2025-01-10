import { useNavigate } from 'react-router-dom';
import InsuranceOption from '../components/common/InsuranceOption';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectInsurance,
  setInsuranceType,
} from '../features/insurance/InsuranceSlice';
import { InsuranceType } from '../types/insuranceType';

const InsuranceTypePage: React.FC = () => {
  const dispatch = useDispatch();
  const { insuranceType } = useSelector(selectInsurance);
  const navigate = useNavigate();

  const handleInsuranceType = (insuranceType: InsuranceType) => {
    dispatch(setInsuranceType(insuranceType));
    setTimeout(() => {
      navigate('/vehicle');
    }, 500);
  };
  return (
    <>
      <h1 className="text-center md:text-right text-2xl font-bold mb-16">
        انتخاب بیمه
      </h1>
      <div className="grid grid-cols-2 gap-4 max-w-sm ml-auto">
        <InsuranceOption
          title="بدنه"
          isDisabled={true}
          isSelected={insuranceType === 'body'}
          onClick={() => handleInsuranceType('body')}
        />
        <InsuranceOption
          title="شخص ثالث"
          isSelected={insuranceType === 'third-person'}
          onClick={() => handleInsuranceType('third-person')}
        />
      </div>
    </>
  );
};

export default InsuranceTypePage;
