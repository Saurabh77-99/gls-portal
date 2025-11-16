import { forwardRef, ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "filled" | "outlined";
  size?: "small" | "medium" | "large";
  showLeftIcon?: boolean;
  showRightIcon?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children: React.ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "filled",
      size = "medium",
      showLeftIcon = false,
      showRightIcon = false,
      leftIcon,
      rightIcon,
      children,
      className = "",
      disabled = false,
      ...props
    },
    ref
  ) => {
    const baseClasses = `
      inline-flex items-center justify-center font-medium transition-all duration-300 
      focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500
      disabled:opacity-50 disabled:cursor-not-allowed
      ${className}
    `;

    const sizeClasses = {
      small: "px-3 py-1.5 text-sm rounded-lg gap-1",
      medium: "px-4 py-2 text-base rounded-xl gap-1",
      large: "px-5 py-3 text-lg rounded-2xl gap-1",
    };

    const variantClasses = {
      filled: `
        btn-gradient text-white shadow-button-inset-light 
        hover:shadow-button-inset-dark
        active:scale-95
      `,
      outlined: `
        bg-transparent text-primary-500 border-2 border-primary-500
        hover:bg-primary-50 hover:text-primary-600 hover:border-primary-600
        active:scale-95
      `,
    };

    const classes = `
      ${baseClasses} 
      ${sizeClasses[size]} 
      ${variantClasses[variant]}
    `
      .replace(/\s+/g, " ")
      .trim();

    return (
      <button ref={ref} className={classes} disabled={disabled} {...props}>
        {showLeftIcon && leftIcon && (
          <span className="flex-shrink-0">{leftIcon}</span>
        )}
        <span className="flex-shrink-0">{children}</span>
        {showRightIcon && rightIcon && (
          <span className="flex-shrink-0">{rightIcon}</span>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
