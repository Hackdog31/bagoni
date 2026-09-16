<?php

namespace App\Http\Controllers;

use App\Models\Student;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StudentController extends Controller
{
    public function index()
    {
        return Inertia::render('Students/Index', [
            'students' => Student::latest()->get(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'first_name' => 'required|string|max:100',
            'last_name' => 'required|string|max:100',
            'birthday' => 'required|date|before:today',
            'email' => 'required|email|unique:students,email',
            'program' => 'required|string|max:60',
            'gender' => 'required|string|max:60',
            'year_level' => 'required|integer|min:1|max:4',
        ]);

        Student::create($validated);

        return redirect()
            ->route('students.index')
            ->with('success', 'Student added successfully.');
    }

    public function update(Request $request, Student $student)
    {
        $validated = $request->validate([
            'first_name' => 'required|string|max:100',
            'last_name' => 'required|string|max:100',
            'birthday' => 'required|date|before:today',
            'email' => 'required|email|unique:students,email,' . $student->id,
            'program' => 'required|string|max:60',
            'gender' => 'required|string|max:60',
            'year_level' => 'required|integer|min:1|max:4',
        ]);

        $student->update($validated);

        return redirect()
            ->route('students.index')
            ->with('success', 'Student updated successfully.');
    }

    public function destroy(Student $student)
    {
        $student->delete();

        return redirect()
            ->route('students.index')
            ->with('success', 'Student deleted successfully.');
    }
}