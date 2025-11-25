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

{% include integrations/config_flow.md %}

## Sensors

The integration provides the following sensors:

### Electricity

| Sensor                                  | Description                                         | Enabled by default |
| --------------------------------------- | --------------------------------------------------- | ------------------ |
| Current electricity price               | Current hourly electricity price per kWh with VAT   | Yes                |
| Next electricity price                  | Next hour's electricity price per kWh               | No                 |
| Average electricity price today         | Average of all hourly electricity prices for today  | Yes                |
| Lowest electricity price today          | Minimum electricity price for today                 | No                 |
| Highest electricity price today         | Maximum electricity price for today                 | No                 |
| Current electricity price excl. VAT     | Current hourly price excluding VAT                  | No                 |
| Current electricity VAT                 | VAT component of the current price                  | No                 |
| Current electricity market price        | Spot market component of the current price          | No                 |
| Current electricity purchasing fee      | Supplier purchasing fee component                   | No                 |
| Current electricity tax                 | Tax component of the current price                  | No                 |

### Gas

| Sensor                              | Description                                     | Enabled by default |
| ----------------------------------- | ----------------------------------------------- | ------------------ |
| Current gas price                   | Current daily gas price per m³ with VAT         | Yes                |
| Next gas price                      | Next day's gas price per m³                     | No                 |
| Current gas price excl. VAT         | Current daily price excluding VAT               | No                 |
| Current gas VAT                     | VAT component of the current price              | No                 |
| Current gas market price            | Spot market component of the current price      | No                 |
| Current gas purchasing fee          | Supplier purchasing fee component               | No                 |
| Current gas tax                     | Tax component of the current price              | No                 |

## Data updates

The API is polled every 12 hours to fetch price data. Each call fetches all hourly prices for today and tomorrow (when available). Tomorrow's prices typically appear after 12:00 CET for electricity and 19:00 CET for gas.

Sensors update on the hour using cached API data, so they advance to the current price without additional API calls between polls.

## Examples

### Smart EV charging

Charge your electric vehicle when electricity prices are lowest:

{% raw %}

```yaml
alias: Charge EV at lowest price
triggers:
  - trigger: template
    value_template: >-
      {{ states('sensor.essent_current_electricity_price') ==
      states('sensor.essent_lowest_electricity_price_today') }}

conditions: []
actions:
  - action: switch.turn_on
    target:
      entity_id: switch.ev_charger
mode: single
```

{% endraw %}

## Troubleshooting

### Sensors show "Unavailable" or "Unknown"

If your sensors are showing unavailable or unknown states, check the following:

1. **Network connectivity**: Verify that Home Assistant can reach `essent.nl`
   - Check your network and firewall settings
   - Verify internet connectivity

2. **API service status**: Essent's API may be temporarily unavailable
   - Check {% my logs title="Settings → System → Logs" %} for error messages
   - Open `https://www.essent.nl/api/public/tariffmanagement/dynamic-prices/v1/` in a browser or via `curl`; a JSON response confirms the service is reachable, while HTTP errors mean the API is down or blocked by your network
   - Wait and check if data returns within an hour

### Prices don't match my Essent account

The integration displays base prices from Essent's public API. Your actual billing may differ due to:

- Individual contract adjustments
- Additional fees specific to your account
- Rounding differences

For billing-accurate prices, refer to your Essent customer portal.

## Removing the integration

{% include integrations/remove_device_service.md %}
