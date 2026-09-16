<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\StudentController;

Route::get('/', function () {
    return redirect()->route('students.index');
});

Route::get('/login', [AuthController::class, 'showLogin'])
    ->name('login');

Route::post('/login', [AuthController::class, 'login'])
    ->name('login.store');

Route::post('/logout', [AuthController::class, 'logout'])
    ->middleware('auth')
    ->name('logout');

Route::middleware('auth')->group(function () {

    Route::get('/students', [StudentController::class, 'index'])
        ->name('students.index');

    Route::post('/students', [StudentController::class, 'store'])
        ->name('students.store');

    Route::put('/students/{student}', [StudentController::class, 'update'])
        ->name('students.update');

    Route::delete('/students/{student}', [StudentController::class, 'destroy'])
        ->name('students.destroy');
});