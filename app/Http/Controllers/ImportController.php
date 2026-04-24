<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use Illuminate\Http\Request;
use Maatwebsite\Excel\Facades\Excel;
use App\Imports\ShopeeImport;
use App\Imports\TokopediaImport;

class ImportController extends Controller
{
    public function index()
    {
        return inertia('dashboard', [
            'data' => Transaction::all()
        ]);
    }

    public function analytics()
    {
        $data = Transaction::all();
        return inertia('analytics', [
            'data' => $data
        ]);
    }

    public function importPage()
    {
        return inertia('import-data');
    }

    public function import(Request $request)
    {
        try {
            ini_set('memory_limit', '512M');

            $platform = $request->platform;

            if ($platform == 'shopee') {
                Excel::import(new ShopeeImport, $request->file('file'));
            }

            if ($platform == 'tokopedia') {
                Excel::import(new TokopediaImport, $request->file('file'));
            }

            return redirect('/transactions')->with('success', 'Import berhasil');

        } catch (\Exception $e) {

            return redirect('/transactions')->with('error', 'waduh, filenya ga cocok. Coba lagi');
        }
    }

    public function transactions()
    {
        $data = \App\Models\Transaction::latest()->get();
        return inertia('transactions', ['data' => $data]);
    }

    public function deleteAll()
    {
        Transaction::truncate();
        return redirect('/')->with('success', 'Semua data dihapus');
    }
}