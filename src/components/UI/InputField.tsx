import React from "react";
import { FieldError, FieldErrorsImpl, Merge } from "react-hook-form";
import { SelectData } from "../../types/dropdownOptions";

type InputType = "text" | "password" | "tel" | "select";

type InputFieldProps = {
  label?: string;
  name: string;
  type: InputType;
  placeholder?: string;
  options?: { value: string; label: string }[];
  error?: Merge<FieldError, FieldErrorsImpl<SelectData>>;
} & React.InputHTMLAttributes<HTMLInputElement>;

const InputField = React.forwardRef<HTMLInputElement | HTMLSelectElement, InputFieldProps>(
  ({ label, name, type = "text", placeholder, options, error, className, ...rest }, ref) => {
    const baseClasses =
      "w-full text-right border-2 rounded-lg px-4 py-3 text-sm transition-colors bg-transparent";
    const focusClasses = "focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary";
    const errorClasses = error ? "border-red-500" : "border-gray-300";
    const selectClasses = type === "select" ? "appearance-none pr-4 pl-8" : "";

    const classNames = `${baseClasses} ${focusClasses} ${errorClasses} ${selectClasses} ${className || ""}`;

    return (
      <div className="flex flex-col mb-4 text-right">
        {label && (
          <label htmlFor={name} className="text-sm font-medium text-gray-700 mb-1">
            {label}
          </label>
        )}

        <div className="relative">
          {type === "select" && options ? (
            <>
              <select
                id={name}
                name={name}
                ref={ref as React.Ref<HTMLSelectElement>}
                className={classNames}
                dir="rtl"
                {...(rest as React.SelectHTMLAttributes<HTMLSelectElement>)}
              >
                <option value="">{placeholder}</option>
                {options.map(({ value, label }) => (
                  <option key={value} value={value} className="flex items-center space-x-2">
                    {label}
                  </option>
                ))}
              </select>
              <svg
                className="absolute left-2 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600 pointer-events-none"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </>
          ) : (
            <input
              id={name}
              name={name}
              type={type}
              placeholder={placeholder}
              ref={ref as React.Ref<HTMLInputElement>}
              className={classNames}
              {...(rest as React.InputHTMLAttributes<HTMLInputElement>)}
            />
          )}
        </div>

        {error && (
          <p className="text-xs text-red-500 mt-1">{error.message}</p>
        )}
      </div>
    );
  }
);

InputField.displayName = "InputField";

export default InputField;
