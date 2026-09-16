import { Head, router } from '@inertiajs/react';
import { useState } from 'react';

type Student = {
    id: number;
    first_name: string;
    last_name: string;
    birthday: string;
    email: string;
    program: string;
    gender: string;
    year_level: number;
};

type Props = {
    students: Student[];
};

export default function Index({ students }: Props) {
    const [showModal, setShowModal] = useState(false);
    const [editingStudent, setEditingStudent] = useState<Student | null>(null);
    const [search, setSearch] = useState('');

    const [form, setForm] = useState({
        first_name: '',
        last_name: '',
        birthday: '',
        email: '',
        program: '',
        gender: '',
        year_level: '',
    });

    const resetForm = () => {
        setForm({
            first_name: '',
            last_name: '',
            birthday: '',
            email: '',
            program: '',
            gender: '',
            year_level: '',
        });
    };

    const openAddModal = () => {
        setEditingStudent(null);
        resetForm();
        setShowModal(true);
    };

    const openEditModal = (student: Student) => {
        setEditingStudent(student);

        setForm({
            first_name: student.first_name,
            last_name: student.last_name,
            birthday: student.birthday,
            email: student.email,
            program: student.program,
            gender: student.gender,
            year_level: String(student.year_level),
        });

        setShowModal(true);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const data = {
            ...form,
            year_level: Number(form.year_level),
        };

        if (editingStudent) {
            router.put(`/students/${editingStudent.id}`, data, {
                onSuccess: () => {
                    setShowModal(false);
                    resetForm();
                },
            });
        } else {
            router.post('/students', data, {
                onSuccess: () => {
                    setShowModal(false);
                    resetForm();
                },
            });
        }
    };

    const deleteStudent = (id: number) => {
        if (confirm('Are you sure you want to delete this student?')) {
            router.delete(`/students/${id}`);
        }
    };

    const filteredStudents = students.filter((student) =>
        `${student.first_name} ${student.last_name} ${student.email} ${student.program}`
            .toLowerCase()
            .includes(search.toLowerCase())
    );

    return (
        <>
            <Head title="Student Management" />

            <div className="min-h-screen bg-gray-100 p-6">
                <div className="mx-auto max-w-7xl">

                    {/* Header */}
                    <div className="mb-8 flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-800">
                                Student Management
                            </h1>

                            <p className="mt-1 text-gray-500">
                                Manage student records
                            </p>
                        </div>

                        <button
                            onClick={openAddModal}
                            className="rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white shadow hover:bg-blue-700"
                        >
                            + Add Student
                        </button>
                    </div>

                    {/* Search */}
                    <div className="mb-6 rounded-xl bg-white p-4 shadow">
                        <input
                            type="text"
                            placeholder="Search student..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                        />
                    </div>

                    {/* Table */}
                    <div className="overflow-hidden rounded-xl bg-white shadow">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-800 text-white">
                                    <tr>
                                        <th className="px-6 py-4 text-left">ID</th>
                                        <th className="px-6 py-4 text-left">Name</th>
                                        <th className="px-6 py-4 text-left">Birthday</th>
                                        <th className="px-6 py-4 text-left">Email</th>
                                        <th className="px-6 py-4 text-left">Program</th>
                                        <th className="px-6 py-4 text-left">Gender</th>
                                        <th className="px-6 py-4 text-left">Year</th>
                                        <th className="px-6 py-4 text-center">Actions</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {filteredStudents.length > 0 ? (
                                        filteredStudents.map((student) => (
                                            <tr
                                                key={student.id}
                                                className="border-b hover:bg-gray-50"
                                            >
                                                <td className="px-6 py-4">
                                                    {student.id}
                                                </td>

                                                <td className="px-6 py-4 font-semibold">
                                                    {student.first_name}{' '}
                                                    {student.last_name}
                                                </td>

                                                <td className="px-6 py-4">
                                                    {student.birthday}
                                                </td>

                                                <td className="px-6 py-4">
                                                    {student.email}
                                                </td>

                                                <td className="px-6 py-4">
                                                    {student.program}
                                                </td>

                                                <td className="px-6 py-4">
                                                    {student.gender}
                                                </td>

                                                <td className="px-6 py-4">
                                                    {student.year_level}
                                                </td>

                                                <td className="px-6 py-4">
                                                    <div className="flex justify-center gap-2">
                                                        <button
                                                            onClick={() =>
                                                                openEditModal(student)
                                                            }
                                                            className="rounded-lg bg-yellow-500 px-3 py-2 text-sm font-semibold text-white hover:bg-yellow-600"
                                                        >
                                                            Edit
                                                        </button>

                                                        <button
                                                            onClick={() =>
                                                                deleteStudent(student.id)
                                                            }
                                                            className="rounded-lg bg-red-600 px-3 py-2 text-sm font-semibold text-white hover:bg-red-700"
                                                        >
                                                            Delete
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td
                                                colSpan={8}
                                                className="px-6 py-10 text-center text-gray-500"
                                            >
                                                No students found.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            {/* Add/Edit Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="w-full max-w-2xl rounded-2xl bg-white p-6 shadow-2xl">

                        <div className="mb-6 flex items-center justify-between">
                            <h2 className="text-2xl font-bold text-gray-800">
                                {editingStudent
                                    ? 'Edit Student'
                                    : 'Add Student'}
                            </h2>

                            <button
                                onClick={() => setShowModal(false)}
                                className="text-2xl text-gray-500 hover:text-gray-800"
                            >
                                ×
                            </button>
                        </div>

                        <form onSubmit={handleSubmit}>

                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

                                <div>
                                    <label className="mb-1 block font-medium">
                                        First Name
                                    </label>

                                    <input
                                        type="text"
                                        value={form.first_name}
                                        onChange={(e) =>
                                            setForm({
                                                ...form,
                                                first_name: e.target.value,
                                            })
                                        }
                                        className="w-full rounded-lg border px-4 py-3"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="mb-1 block font-medium">
                                        Last Name
                                    </label>

                                    <input
                                        type="text"
                                        value={form.last_name}
                                        onChange={(e) =>
                                            setForm({
                                                ...form,
                                                last_name: e.target.value,
                                            })
                                        }
                                        className="w-full rounded-lg border px-4 py-3"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="mb-1 block font-medium">
                                        Birthday
                                    </label>

                                    <input
                                        type="date"
                                        value={form.birthday}
                                        onChange={(e) =>
                                            setForm({
                                                ...form,
                                                birthday: e.target.value,
                                            })
                                        }
                                        className="w-full rounded-lg border px-4 py-3"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="mb-1 block font-medium">
                                        Email
                                    </label>

                                    <input
                                        type="email"
                                        value={form.email}
                                        onChange={(e) =>
                                            setForm({
                                                ...form,
                                                email: e.target.value,
                                            })
                                        }
                                        className="w-full rounded-lg border px-4 py-3"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="mb-1 block font-medium">
                                        Program
                                    </label>

                                    <input
                                        type="text"
                                        value={form.program}
                                        placeholder="BSIT"
                                        onChange={(e) =>
                                            setForm({
                                                ...form,
                                                program: e.target.value,
                                            })
                                        }
                                        className="w-full rounded-lg border px-4 py-3"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="mb-1 block font-medium">
                                        Gender
                                    </label>

                                    <select
                                        value={form.gender}
                                        onChange={(e) =>
                                            setForm({
                                                ...form,
                                                gender: e.target.value,
                                            })
                                        }
                                        className="w-full rounded-lg border px-4 py-3"
                                        required
                                    >
                                        <option value="">
                                            Select Gender
                                        </option>
                                        <option value="Male">
                                            Male
                                        </option>
                                        <option value="Female">
                                            Female
                                        </option>
                                        <option value="Other">
                                            Other
                                        </option>
                                    </select>
                                </div>

                                <div>
                                    <label className="mb-1 block font-medium">
                                        Year Level
                                    </label>

                                    <select
                                        value={form.year_level}
                                        onChange={(e) =>
                                            setForm({
                                                ...form,
                                                year_level: e.target.value,
                                            })
                                        }
                                        className="w-full rounded-lg border px-4 py-3"
                                        required
                                    >
                                        <option value="">
                                            Select Year
                                        </option>
                                        <option value="1">
                                            1st Year
                                        </option>
                                        <option value="2">
                                            2nd Year
                                        </option>
                                        <option value="3">
                                            3rd Year
                                        </option>
                                        <option value="4">
                                            4th Year
                                        </option>
                                    </select>
                                </div>

                            </div>

                            <div className="mt-6 flex justify-end gap-3">

                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowModal(false)
                                    }
                                    className="rounded-lg bg-gray-200 px-5 py-3 font-semibold hover:bg-gray-300"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    className="rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
                                >
                                    {editingStudent
                                        ? 'Update Student'
                                        : 'Add Student'}
                                </button>

                            </div>

                        </form>
                    </div>
                </div>
            )}
        </>
    );
}