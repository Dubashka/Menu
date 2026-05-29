import { ButtonHTMLAttributes, PropsWithChildren } from 'react';
import clsx from 'clsx';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
}

export const Button = ({ children, className, variant = 'primary', ...props }: PropsWithChildren<ButtonProps>) => (
  <button
    className={clsx(
      'inline-flex items-center justify-center rounded-2xl px-4 py-3 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-60',
      variant === 'primary' && 'bg-teal-700 text-white hover:bg-teal-800',
      variant === 'secondary' && 'bg-stone-900 text-white hover:bg-stone-700 dark:bg-stone-100 dark:text-stone-950 dark:hover:bg-white',
      variant === 'ghost' && 'border border-stone-300 bg-white hover:bg-stone-100 dark:border-stone-700 dark:bg-stone-900 dark:hover:bg-stone-800',
      variant === 'danger' && 'bg-rose-700 text-white hover:bg-rose-800',
      className
    )}
    {...props}
  >
    {children}
  </button>
);