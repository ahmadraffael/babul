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
                'customer' => $row[3],
                'invoice_made' => $row[4],
                'payment_method' => $row[5],
                'invoice_paid' => $row[6],

                'price_before' => (int) ($row[7] ?? 0),
                'price_after' => (int) ($row[32] ?? 0),

                'admin_fee' => (int) ($row[24] ?? 0),
                'service_fee' => (int) ($row[25] ?? 0),
                'transaction_fee' => (int) ($row[27] ?? 0),
                'campaign_fee' => (int) ($row[28] ?? 0),

                'shipping_provider' => $row[36] ?? null,
                'courier' => $row[37] ?? null,

                'is_refund' => (
                    (($row[9] ?? 0) > 0) ||
                    (($row[39] ?? 0) > 0)
                ) ? 1 : 0,

                'platform' => 'shopee'
            ]);
        }
    }
}