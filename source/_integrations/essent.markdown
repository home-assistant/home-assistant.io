---
title: Essent
description: Monitor dynamic energy prices from Essent Netherlands
ha_category:
  - Energy
ha_release: 2025.12
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@jaapp'
ha_domain: essent
ha_platforms:
  - diagnostics
  - sensor
ha_integration_type: service
ha_quality_scale: silver
---

The **Essent** {% term integration %} monitors dynamic energy prices for Essent customers in the Netherlands with variable pricing contracts.

Price data is fetched from Essent's public API and requires no authentication. The integration provides real-time electricity and gas pricing information, updated hourly.

{% note %}
This is a community integration using Essent's public API, not officially provided by Essent.
{% endnote %}

{% note %}
This integration is specifically for customers with an Essent dynamic pricing contract in the Netherlands.
{% endnote %}

{% include integrations/config_flow.md %}

## Sensors

The integration provides the following sensors:

### Electricity

The following sensors are created for electricity prices:

- **Electricity current price** - Current hourly electricity price per kWh including VAT
- **Electricity next price** - Next hour's electricity price per kWh
- **Electricity average today** - Average of all hourly electricity prices for today
- **Electricity lowest price today** - Minimum electricity price for today with time window (disabled by default)
- **Electricity highest price today** - Maximum electricity price for today with time window (disabled by default)

The **current price** and **next price** sensors include detailed price breakdown attributes:

- `price_ex_vat` - Price excluding VAT
- `vat` - VAT amount
- `market_price` - Spot market price component
- `purchasing_fee` - Supplier purchasing fee
- `tax` - Energy tax component
- `start_time` - Tariff period start time
- `end_time` - Tariff period end time

The **average price** sensor includes:

- `min_price` - Lowest price for today
- `max_price` - Highest price for today

The **lowest price** and **highest price** sensors include:

- `start` - Time window start for the min/max price
- `end` - Time window end for the min/max price

### Gas

The following sensors are created for gas prices:

- **Gas current price** - Current daily gas price per m³ including VAT
- **Gas next price** - Next day's gas price per m³

Gas **current price** and **next price** sensors include the same detailed price breakdown attributes as electricity sensors (price components, VAT, and time windows). Gas prices use daily tariffs, so the same price applies for the entire day.

## Data updates

The API is called once per hour at a random minute offset (0-59) to distribute server load. Each call fetches all hourly prices for today and tomorrow (when available). Tomorrow's prices typically appear after 12:00 CET for electricity and 19:00 CET for gas.

Sensors update on the hour using cached API data, so they advance to the current price without additional API calls.

## Data source

Prices are fetched from Essent's public API endpoint:

`https://www.essent.nl/api/public/tariffmanagement/dynamic-prices/v1/`

## Known limitations

- **Geographic limitation**: Netherlands only
- **Contract type**: Designed for Essent dynamic pricing contracts
- **Data availability**: Current day and next day only (when available)
- **No historical data**: Past pricing data is not stored or available

## Troubleshooting

### Sensors show "Unavailable" or "Unknown"

If your sensors are showing unavailable or unknown states, check the following:

1. **Timezone configuration**: Ensure Home Assistant's timezone is set correctly
   - Go to {% my general title="Settings → System → General" %}
   - Set timezone to `Europe/Amsterdam` or your local timezone

2. **Network connectivity**: Verify that Home Assistant can reach `essent.nl`
   - Check your network and firewall settings
   - Verify internet connectivity

3. **API service status**: Essent's API may be temporarily unavailable
   - Check {% my logs title="Settings → System → Logs" %} for error messages
   - Wait and check if data returns within an hour

### Prices don't match my Essent account

The integration displays base prices from Essent's public API. Your actual billing may differ due to:

- Individual contract adjustments
- Additional fees specific to your account
- Rounding differences

For billing-accurate prices, refer to your Essent customer portal.

## Removing the integration

{% include integrations/remove_device_service.md %}
