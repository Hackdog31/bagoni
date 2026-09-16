import { Head, useForm } from '@inertiajs/react';

export default function Login() {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        post('/login');
    };

    return (
        <>
            <Head title="Login" />

            <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
                <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
                    <div className="mb-8 text-center">
                        <h1 className="text-3xl font-bold text-gray-800">
                            Student Management System
                        </h1>

                        <p className="mt-2 text-gray-500">
                            Login to continue
                        </p>
                    </div>

                    <form onSubmit={submit} className="space-y-5">

                        <div>
                            <label className="mb-2 block font-medium text-gray-700">
                                Email
                            </label>

                            <input
                                type="email"
                                value={data.email}
                                onChange={(e) =>
                                    setData('email', e.target.value)
                                }
                                placeholder="Enter your email"
                                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                                required
                            />

                            {errors.email && (
                                <p className="mt-1 text-sm text-red-600">
                                    {errors.email}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="mb-2 block font-medium text-gray-700">
                                Password
                            </label>

                            <input
                                type="password"
                                value={data.password}
                                onChange={(e) =>
                                    setData('password', e.target.value)
                                }
                                placeholder="Enter your password"
                                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                                required
                            />

                            {errors.password && (
                                <p className="mt-1 text-sm text-red-600">
                                    {errors.password}
                                </p>
                            )}
                        </div>

                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                checked={data.remember}
                                onChange={(e) =>
                                    setData('remember', e.target.checked)
                                }
                                className="h-4 w-4"
                            />

                            <label className="text-sm text-gray-600">
                                Remember me
                            </label>
                        </div>

                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:opacity-50"
                        >
                            {processing ? 'Logging in...' : 'Login'}
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}