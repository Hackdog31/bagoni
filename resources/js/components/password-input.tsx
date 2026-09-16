import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

type Props = React.InputHTMLAttributes<HTMLInputElement>;

export default function PasswordInput({ className = '', ...props }: Props) {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="relative">
            <input
                {...props}
                type={showPassword ? 'text' : 'password'}
                className={`w-full rounded-lg border border-gray-300 px-4 py-3 pr-12 outline-none focus:border-blue-500 ${className}`}
            />

            <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
            >
                {showPassword ? (
                    <EyeOff size={20} />
                ) : (
                    <Eye size={20} />
                )}
            </button>
        </div>
    );
}