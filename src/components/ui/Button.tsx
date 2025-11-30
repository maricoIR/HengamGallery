import React from "react";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";
type IconPosition = "left" | "right" | "only";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  variant?: ButtonVariant;
  icon?: React.ReactNode;
  iconPosition?: IconPosition;
  fullWidth?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
  loading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  icon,
  iconPosition = "left",
  fullWidth = false,
  size = "md",
  className = "",
  disabled,
  loading = false,
  ...props
}) => {
  const baseClasses =
    "inline-flex cursor-pointer outline-none items-center justify-center gap-2 whitespace-nowrap font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

  const sizeClasses = {
    sm: "text-xs h-8 px-4 rounded-md",
    md: "text-sm h-11 px-8 rounded-md",
    lg: "text-base h-12 px-10 rounded-lg",
  };

  const variantClasses = {
    primary:
      "bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-slate-900 gold-glow",
    secondary: "bg-slate-700 hover:bg-slate-600 text-gray-300",
    outline: "border-2 border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-slate-900",
    ghost: "text-gray-300 hover:text-yellow-400 hover:bg-slate-800",
  };

  const widthClass = fullWidth ? "w-full" : "";

  const classes = `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${widthClass} ${className}`;

  const renderContent = () => {
    if (iconPosition === "only") {
      return icon;
    }

    if (icon) {
      return (
        <>
          <span className="ml-1">{icon}</span>
          {children}
        </>
      );
    }

    return children;
  };

  return (
    <button className={classes} disabled={disabled || loading} {...props}>
      {loading ? (
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current ml-2"></div>
          {children}
        </div>
      ) : (
        renderContent()
      )}
    </button>
  );
};

export default Button;
