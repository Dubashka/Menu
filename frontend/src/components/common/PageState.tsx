import { ReactNode } from 'react';

interface Props {
  title: string;
  description: string;
  action?: ReactNode;
}

export const PageState = ({ title, description, action }: Props) => (
  <div className="card-surface flex min-h-[240px] flex-col items-center justify-center px-6 py-10 text-center">
    <h2 className="mb-2 text-xl font-semibold">{title}</h2>
    <p className="mb-5 max-w-xl text-sm text-stone-500 dark:text-stone-400">{description}</p>
    {action}
  </div>
);