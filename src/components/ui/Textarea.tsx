import React from "react";

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  className?: string;
}

const Textarea: React.FC<TextareaProps> = ({ label, error, className = "", ...props }) => {
  const baseClasses =
    "w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-md text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200 resize-vertical";
  const errorClasses = error ? "border-red-500 focus:ring-red-500" : "";
  const classes = `${baseClasses} ${errorClasses} ${className}`;

  return (
    <div className="w-full">
      {label && <label className="block text-sm font-medium text-gray-300 mb-2">{label}</label>}
      <textarea className={classes} {...props} />
      {error && <p className="mt-1 text-sm text-red-400">{error}</p>}
    </div>
  );
};

export { Textarea };
