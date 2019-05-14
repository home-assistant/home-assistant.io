<?php

namespace Mjfreeway\DateRangeStats\ReportBuilders\OklahomaMonthly\Common;

use Lib\Conversions\Conversion;
use Mjfreeway\DateRangeStats\ReportBuilders\Common\BaseQuantitySoldBuilder;
use Mjfreeway\DateRangeStats\Traits\DataHelperTrait;
use Mjfreeway\DateRangeStats\Traits\InventoryTrait;
use Mjfreeway\DateRangeStats\Traits\OklahomaTrait;
use Mjfreeway\DateRangeStats\Traits\SupplyChainTrait;

abstract class QuantitySoldBuilder extends BaseQuantitySoldBuilder
{
    use OklahomaTrait;

    /**
     * @return array
     * @throws \Exception
     */
    public function build()
    {
        $data = [];

        $this->initConfig();

        $this->loadTransfers();
        $this->loadTransfersByType();
        $this->loadItemMasters();

        // Calculate data, grouped by partner types and report categories
        foreach($this->report_rows as $report_key => $report_row) {
            foreach($this->partner_types as $partner_type) {
                $transfers = $this->transfers_by_type[$partner_type];
                $qty_by_item_masters = $this->getQtyByItemMasters($transfers, $report_row['subcategories']);
                foreach($qty_by_item_masters as $item_master_id => $qty) {
                    $item_master = array_get($this->item_masters, $item_master_id);
                    $path_prefix = "{$report_key}.{$partner_type}";
                    foreach($report_row['params'] as $param) {
                        if ($param === 'count') {
                            $this->addToArray($data, $path_prefix.".count", $qty);
                        }
                        if ($param === 'weight') {
                            $this->addToArray($data, $path_prefix.".weight", $qty);
                        }
                        if ($param === 'product_net_weight') {
                            $val = $this->getWeightFromProductNetWeight($item_master, $qty);
                            $this->addToArray($data, $path_prefix.".weight", $val);
                        }
                    }
                }
            }
        }

        $this->calculateRowsTotals($data);

        return $data;
    }
}
