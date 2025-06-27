import React, { useState } from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface InputFieldProps {
  icon: LucideIcon;
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  type?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  icon: Icon,
  label,
  placeholder,
  value,
  onChange,
  required = false,
  type = 'text'
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-light-gray/80">
        {label} {required && <span className="text-light-cyan">*</span>}
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Icon className={`h-5 w-5 transition-colors duration-200 ${
            isFocused ? 'text-light-cyan' : 'text-light-gray/60'
          }`} />
        </div>
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          required={required}
          className={`w-full pl-12 pr-4 py-4 bg-slate-gray/50 border rounded-2xl text-light-gray placeholder-light-gray/50 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-light-cyan/50 focus:border-light-cyan/50 hover:bg-slate-gray/70 ${
            isFocused ? 'border-light-cyan/50 bg-slate-gray/70' : 'border-light-gray/20'
          }`}
        />
        <div className={`absolute inset-0 rounded-2xl transition-all duration-300 pointer-events-none ${
          isFocused ? 'ring-2 ring-light-cyan/20' : ''
        }`} />
      </div>
    </div>
  );
};

export default InputField;