import insurance from '../../assets/img/insurance.svg';

interface InsuranceOptionProps {
  title: string;
  isDisabled?: boolean;
  isSelected?: boolean;
  onClick?: () => void;
}

const InsuranceOption: React.FC<InsuranceOptionProps> = ({
  title,
  isDisabled = false,
  isSelected = false,
  onClick,
}) => {
  return (
    <div
      onClick={!isDisabled ? onClick : undefined}
      className={`
          aspect-square relative flex flex-col items-center justify-center p-4
          rounded-3xl border-2 transition-colors
          ${
            isDisabled
              ? 'border-gray-400 opacity-50 cursor-not-allowed'
              : isSelected
                ? 'border-primary bg-primary/5 cursor-pointer'
                : 'border-gray-400 hover:border-primary/50 cursor-pointer'
          }
        `}
    >
      <div
        className={`w-16 h-16 mb-4 ${
          isDisabled ? 'text-gray-300' : 'text-gray-900'
        }`}
      >
        <img src={insurance} alt="Car with tick icon" />
      </div>
      <span
        className={`text-lg font-medium ${
          isDisabled ? 'text-gray-400' : 'text-gray-900'
        }`}
      >
        {title}
      </span>
    </div>
  );
};

export default InsuranceOption;
