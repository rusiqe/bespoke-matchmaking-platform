import React from 'react';

interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  label?: string;
  error?: string;
  onChange?: (checked: boolean, value?: string) => void;
}

const Checkbox: React.FC<CheckboxProps> = ({ label, error, className, onChange, value, ...props }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e.target.checked, value);
    }
  };

  return (
    <div className="mb-2">
      <div className="flex items-center">
        <input
          type="checkbox"
          className={`h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded ${
            error ? 'border-red-500' : ''
          } ${className || ''}`}
          onChange={handleChange}
          value={value}
          {...props}
        />
        {label && (
          <label className="ml-2 block text-sm text-neutral-700">
            {label}
          </label>
        )}
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};

export default Checkbox;
