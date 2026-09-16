import * as React from 'react';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({
    className = '',
    children,
    ...props
}: ButtonProps) {
    return (
        <button
            {...props}
            className={`inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition hover:bg-blue-700 disabled:opacity-50 ${className}`}
        >
            {children}
        </button>
    );
}