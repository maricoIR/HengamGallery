import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helper?: string;
  className?: string;
}

const Input: React.FC<InputProps> = ({ label, error, helper, className = "", ...props }) => {
  const baseClasses =
    "w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-md text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200";
  const errorClasses = error ? "border-red-500 focus:ring-red-500" : "";
  const classes = `${baseClasses} ${errorClasses} ${className}`;

  return (
    <div className="w-full">
      {label && <label className="block text-sm font-medium text-gray-300 mb-2">{label}</label>}
      <input className={classes} {...props} />
      {error && <p className="mt-1 text-sm text-red-400">{error}</p>}
      {helper && !error && <p className="mt-1 text-sm text-gray-400">{helper}</p>}
    </div>
  );
};

export { Input };
