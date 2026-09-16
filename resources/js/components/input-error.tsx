import { usePage } from '@inertiajs/react';

type Props = {
    message?: string;
    className?: string;
};

export default function InputError({ message, className = '' }: Props) {
    const { errors } = usePage().props;

    return (
        <div className={className}>
            {message && (
                <p className="mt-1 text-sm text-red-600">
                    {message}
                </p>
            )}
        </div>
    );
}