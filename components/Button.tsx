import { useState } from 'react';
import classNames from 'classnames';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  children: React.ReactNode;
  disabled?: boolean;
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  onClick,
  children,
  disabled = false,
  fullWidth = false,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    if (disabled || isLoading) return;

    setIsLoading(true);
    try {
      if (onClick) {
        await onClick();
      }
    } catch (error) {
      console.error('Error during button click:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const buttonClasses = classNames(
    'rounded-md px-4 py-2 font-medium text-white transition-colors duration-200 ease-in-out',
    {
      'bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300':
        variant === 'primary',
      'bg-gray-300 hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300':
        variant === 'secondary',
      'text-gray-700 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-300':
        variant === 'ghost',
      'border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-300':
        variant === 'outline',
      'text-gray-500 cursor-not-allowed': disabled,
      'w-full': fullWidth,
      'text-sm': size === 'sm',
      'text-base': size === 'md',
      'text-lg': size === 'lg',
    }
  );

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={disabled || isLoading}
      className={buttonClasses}
    >
      {isLoading ? 'Loading...' : children}
    </button>
  );
};

export default Button;