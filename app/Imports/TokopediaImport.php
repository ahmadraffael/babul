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
                'customer' => $row[43],

                'invoice_made' => $row[29],
                'invoice_paid' => $row[30],

                'price_before' => (int) $row[28],

                'price_after' => 
                    (int) $row[28]
                    - (int) $row[24] 
                    - (int) $row[25]
                    - (int) $row[22], 
                'admin_fee' => (int) $row[25],
                'service_fee' => (int) $row[24],
                'transaction_fee' => 0,
                'campaign_fee' => 0,

                'shipping_provider' => $row[41],
                'courier' => $row[41],

                'payment_method' => $row[54],

                'is_refund' => ($row[22] > 0) ? 1 : 0,

                'platform' => 'tokopedia',
            ]);
        }
    }
}