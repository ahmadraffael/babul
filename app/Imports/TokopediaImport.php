<?php

namespace App\Imports;

use App\Models\Transaction;
use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\ToCollection;

class TokopediaImport implements ToCollection

{
    public function collection(Collection $rows)
    {
        foreach ($rows->slice(1) as $row) {

            if (!$row[43]) continue; // Buyer Username

            Transaction::create([
                'customer' => $row[AR],
                'product' => $row[H] ?? null,
                'buy_qtt' => (int) ($row[J] ?? 0),  
                'location_city' => $row[AX] ?? null,
                'location_regency' => $row[AW] ?? null,

                'invoice_made' => $row[AD],
                'payment_method' => $row[BC],
                'invoice_paid' => $row[AE],

                'price_before' => (int) ($row[L] ?? 0),
                'price_discount' => (int) ($row[N] ?? 0),
                'fees' => 
                    (int) ($row['Y'] ?? 0) +
                    (int) ($row['AA'] ?? 0),
                'price_after' => (int) ($row[AC] ?? 0),

                'cost_fee' => (int) ($row[R] ?? 0),
                'cost_fee_after' => (int) ($row[T] ?? 0),
                'shipping_provider' => $row[AP] ?? null,

                'is_refund' => ($row[D] > 0) ? 1 : 0,

                'platform' => 'tokopedia',
            ]);
        }
    }
}