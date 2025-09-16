import { forwardRef, InputHTMLAttributes, useState } from 'react';

interface TextFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  type?: 'default' | 'search';
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  showLeftIcon?: boolean;
  showRightIcon?: boolean;
  error?: string;
  label?: string;
}

const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  ({ 
    type = 'default',
    leftIcon,
    rightIcon,
    showLeftIcon = false,
    showRightIcon = false,
    error,
    label,
    className = '',
    placeholder = 'Placeholder goes here',
    disabled = false,
    ...props 
  }, ref) => {
    const [isFocused, setIsFocused] = useState(false);

    const baseClasses = `
      w-full transition-all duration-300 outline-none
      disabled:opacity-50 disabled:cursor-not-allowed
    `;

    const typeClasses = {
      default: `
        h-13 px-4 py-3 rounded-2xl
        bg-neutral-100 border border-neutral-200
        focus:border-primary-500 focus:ring-2 focus:ring-primary-alpha-10
      `,
      search: `
        h-12 pl-4 pr-3 py-3 rounded-xl
        bg-neutral-100 border border-neutral-300
        focus:border-primary-500 focus:ring-2 focus:ring-primary-alpha-10
      `
    };

    const inputClasses = `
      ${baseClasses} 
      ${typeClasses[type]}
      ${showLeftIcon ? 'pl-12' : ''}
      ${showRightIcon ? 'pr-12' : ''}
      ${error ? 'border-red-500 focus:border-red-500' : ''}
      ${className}
    `.replace(/\s+/g, ' ').trim();

    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-neutral-700 mb-2">
            {label}
          </label>
        )}
        <div className="relative">
          {showLeftIcon && leftIcon && (
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-500">
              {leftIcon}
            </div>
          )}
          
          <input
            ref={ref}
            className={inputClasses}
            placeholder={placeholder}
            disabled={disabled}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            {...props}
          />
          
          {showRightIcon && rightIcon && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-500">
              {rightIcon}
            </div>
          )}
        </div>
        
        {error && (
          <p className="mt-1 text-sm text-red-500">{error}</p>
        )}
      </div>
    );
  }
);

TextField.displayName = 'TextField';

export default TextField;