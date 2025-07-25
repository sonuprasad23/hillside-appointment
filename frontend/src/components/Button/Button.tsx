import React from 'react';
import { LoadingSpinner } from './LoadingSpinner';
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'tertiary' | 'destructive';
  size?: 'small' | 'medium' | 'large';
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  iconOnly?: React.ReactNode;
  children?: React.ReactNode;
}
export const Button = ({
  variant = 'primary',
  size = 'medium',
  loading = false,
  leftIcon,
  rightIcon,
  iconOnly,
  children,
  disabled,
  className = '',
  ...props
}: ButtonProps) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed';
  const variants = {
    primary: 'bg-black text-white hover:bg-gray-800 active:bg-gray-900 disabled:bg-gray-300',
    secondary: 'bg-white border-2 border-black text-black hover:bg-gray-50 active:bg-gray-100 disabled:border-gray-300 disabled:text-gray-300',
    tertiary: 'bg-transparent text-black hover:bg-gray-100 active:bg-gray-200 disabled:text-gray-300',
    destructive: 'bg-white border-2 border-black text-black hover:bg-gray-900 hover:border-gray-900 hover:text-white active:bg-black disabled:bg-gray-100 disabled:border-gray-300 disabled:text-gray-300'
  };
  const sizes = {
    small: 'text-sm px-3 py-1.5 gap-1.5',
    medium: 'text-base px-4 py-2 gap-2',
    large: 'text-lg px-6 py-3 gap-2.5'
  };
  const iconSizes = {
    small: 'p-1.5',
    medium: 'p-2',
    large: 'p-3'
  };
  return <button className={`
        ${baseStyles}
        ${variants[variant]}
        ${iconOnly ? iconSizes[size] : sizes[size]}
        ${className}
      `} disabled={disabled || loading} {...props}>
      {loading ? <LoadingSpinner className="mr-2" /> : <>
          {leftIcon}
          {iconOnly ? iconOnly : children}
          {rightIcon}
        </>}
    </button>;
};