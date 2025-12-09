import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: Array<{ value: string; label: string }>;
}

export const Input: React.FC<InputProps> = ({ label, error, className = '', disabled, ...props }) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-300 mb-1">
          {label}
        </label>
      )}
      <input
        disabled={disabled}
        className={`
          w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg
          text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
          transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed
          ${error ? 'border-red-500' : ''}
          ${className}
        `}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-red-400">{error}</p>}
    </div>
  );
};

export const Select: React.FC<SelectProps> = ({ label, error, options, className = '', ...props }) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-300 mb-1">
          {label}
        </label>
      )}
      <select
        className={`
          w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg
          text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
          transition-colors duration-200
          ${error ? 'border-red-500' : ''}
          ${className}
        `}
        {...props}
      >
        {options.map((option: { value: string; label: string }) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="mt-1 text-sm text-red-400">{error}</p>}
    </div>
  );
};

export const Textarea: React.FC<React.TextareaHTMLAttributes<HTMLTextAreaElement> & { label?: string; error?: string }> = ({
  label,
  error,
  className = '',
  ...props
}) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-300 mb-1">
          {label}
        </label>
      )}
      <textarea
        className={`
          w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg
          text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
          transition-colors duration-200 resize-none
          ${error ? 'border-red-500' : ''}
          ${className}
        `}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-red-400">{error}</p>}
    </div>
  );
};

interface CollapsibleProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

export const Collapsible: React.FC<CollapsibleProps> = ({ title, children, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border border-gray-700 rounded-lg overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 bg-gray-800 hover:bg-gray-700 transition-colors flex items-center justify-between"
      >
        <span className="font-semibold text-white">{title}</span>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-gray-400" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-400" />
        )}
      </button>
      {isOpen && <div className="p-4 bg-gray-900">{children}</div>}
    </div>
  );
};
