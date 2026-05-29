import { InputHTMLAttributes, TextareaHTMLAttributes } from 'react';

export const TextField = ({ label, error, ...props }: InputHTMLAttributes<HTMLInputElement> & { label: string; error?: string }) => (
  <div>
    <label className="label-base">{label}</label>
    <input className="input-base" {...props} />
    {error ? <p className="mt-2 text-xs text-rose-600">{error}</p> : null}
  </div>
);

export const TextAreaField = ({ label, error, ...props }: TextareaHTMLAttributes<HTMLTextAreaElement> & { label: string; error?: string }) => (
  <div>
    <label className="label-base">{label}</label>
    <textarea className="input-base min-h-[120px]" {...props} />
    {error ? <p className="mt-2 text-xs text-rose-600">{error}</p> : null}
  </div>
);