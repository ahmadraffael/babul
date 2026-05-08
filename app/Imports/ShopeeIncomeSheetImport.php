<?php

namespace App\Imports;

use App\Models\Transaction;
use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\ToCollection;
use Maatwebsite\Excel\Concerns\WithChunkReading;

class ShopeeIncomeSheetImport implements ToCollection, WithChunkReading
{
    public function chunkSize(): int
    {
        return 100;
    }

    public function collection(Collection $rows)
    {
        foreach ($rows->slice(6) as $row) {

            if (!isset($row[3]) || !$row[3]) continue;

            if ($rows->count() < 7) {
                throw new \Exception("Format salah");
            }

            Transaction::create([
                'customer' => $row[41],
                'product' => $row[12] ?? null,
                'buy_qtt' => (int) ($row[17] ?? 0),  
                'location_city' => $row[45] ?? null,
                'location_regency' => $row[46] ?? null,

                'invoice_made' => $row[8],
                'payment_method' => $row[10],
                'invoice_paid' => $row[9],

                'price_before' => (int) ($row[15] ?? 0),
                'price_discount' => (int) ($row[16] ?? 0),
                'fees' => (int) ($row[16] ?? 0),
                'price_after' => (int) ($row[37] ?? 0),

                'cost_fee' => (int) ($row[35] ?? 0),
                'cost_fee_after' => (int) ($row[35] ?? 0),
                'shipping_provider' => $row[4] ?? null,

                'is_refund' => ($row[2] > 0) ? 1 : 0,

                'platform' => 'shopee',
            ]);
        }
    }
}