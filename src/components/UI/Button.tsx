import React from 'react';

type ButtonVariant = 'fill' | 'outlined';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  fullWidth?: boolean;
  icon?: React.ReactElement;
  iconPosition?: 'left' | 'right';
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'fill',
  fullWidth = false,
  icon,
  iconPosition = 'left',
  className = '',
  disabled = false,
  ...props
}) => {
  const baseClasses = `
    inline-flex items-center justify-center px-6 py-3 text-sm font-medium 
    rounded-full transition-all duration-300
    ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
  `;

  const variantClasses = variant === 'fill'
    ? disabled
      ? "bg-gray-300 text-gray-500"
      : "bg-primary text-white hover:bg-primary-600 active:bg-primary-700"
    : disabled
      ? "bg-transparent border border-gray-300 text-gray-500"
      : "bg-transparent border border-primary text-primary hover:bg-primary-100 active:bg-primary-200";

  const widthClass = fullWidth ? "w-full" : "min-w-36";
  const iconClass = icon ? `p${iconPosition === 'left' ? 'l' : 'r'}-0 justify-evenly` : '';

  const buttonClasses = `
    ${baseClasses}
    ${variantClasses}
    ${widthClass}
    ${iconClass}
    ${className}
  `.trim();

  const iconBaseClasses = "w-4 h-4";
  const iconWithSpacing = iconPosition === 'left' ? '' : '';

  return (
    <button 
      className={buttonClasses} 
      disabled={disabled}
      {...props}
    >
      {icon && iconPosition === 'left' && React.cloneElement(icon, { 
        className: `${iconBaseClasses} ${iconWithSpacing}` 
      })}
      {children}
      {icon && iconPosition === 'right' && React.cloneElement(icon, { 
        className: `${iconBaseClasses} ${iconWithSpacing}` 
      })}
    </button>
  );
};

export default Button;