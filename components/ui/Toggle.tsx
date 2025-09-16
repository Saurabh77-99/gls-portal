import { forwardRef, ButtonHTMLAttributes } from 'react';

interface ToggleOption {
  value: string;
  label: string;
}

interface ToggleProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'value'> {
  options: ToggleOption[];
  value: string;
  onValueChange: (value: string) => void;
}

const Toggle = forwardRef<HTMLButtonElement, ToggleProps>(
  ({ 
    options,
    value,
    onValueChange,
    className = '',
    ...props 
  }, ref) => {
    const containerClasses = `
      inline-flex p-2 rounded-xl border border-neutral-200
      bg-neutral-100 backdrop-filter backdrop-blur-sm
      ${className}
    `.replace(/\s+/g, ' ').trim();

    return (
      <div className={containerClasses}>
        {options.map((option, index) => {
          const isSelected = value === option.value;
          const isFirst = index === 0;
          const isLast = index === options.length - 1;
          
          const buttonClasses = `
            px-4 py-1.5 text-sm font-medium transition-all duration-200
            focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1
            ${isSelected 
              ? 'bg-white text-primary-600 shadow-sm border border-primary-200' 
              : 'bg-transparent text-neutral-600 hover:bg-white/50'
            }
            ${isFirst ? 'rounded-l-lg' : ''}
            ${isLast ? 'rounded-r-lg' : ''}
          `.replace(/\s+/g, ' ').trim();

          return (
            <button
              key={option.value}
              ref={index === 0 ? ref : undefined}
              className={buttonClasses}
              onClick={() => onValueChange(option.value)}
              type="button"
              {...(index === 0 ? props : {})}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    );
  }
);

Toggle.displayName = 'Toggle';

export default Toggle;