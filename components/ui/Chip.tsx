import { forwardRef, ButtonHTMLAttributes } from 'react';

interface ChipProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  selected?: boolean;
  children: React.ReactNode;
}

const Chip = forwardRef<HTMLButtonElement, ChipProps>(
  ({ 
    selected = false,
    children, 
    className = '', 
    ...props 
  }, ref) => {
    const baseClasses = `
      inline-flex items-center justify-center font-medium text-sm
      px-3 py-1.5 rounded-lg border transition-all duration-300 ease-out
      focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-primary-500
      hover:shadow-sm cursor-pointer
      ${className}
    `;

    const stateClasses = selected
      ? `
          bg-primary-alpha-10 border-primary-200 text-primary-600
          hover:bg-primary-100 hover:border-primary-300
        `
      : `
          bg-transparent border-neutral-400 text-neutral-700
          hover:bg-neutral-100 hover:border-neutral-500
        `;

    const classes = `${baseClasses} ${stateClasses}`.replace(/\s+/g, ' ').trim();

    return (
      <button
        ref={ref}
        className={classes}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Chip.displayName = 'Chip';

export default Chip;