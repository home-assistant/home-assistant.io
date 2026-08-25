---
title: Ecosmart
description: Instructions on how to integrate Ecosmart wholesale electricity prices into Home Assistant.
ha_category:
  - Energy
  - Sensor
ha_release: "2026.9"
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@Daryn-L'
ha_domain: ecosmart
ha_platforms:
  - sensor
ha_integration_type: service
ha_quality_scale: bronze
related:
  - url: https://www.ecosmart.co.nz/electricity/api/home-assistant/
    title: Ecosmart API documentation
---

[Ecosmart](https://www.ecosmart.co.nz/) is a New Zealand electricity retailer that passes the half-hourly wholesale (spot) price of electricity straight through to its customers.

The **Ecosmart** {% term integration %} brings that price, and the published forward curve, into Home Assistant, so you can move consumption into the cheap half hours.

Ecosmart publishes the price signal. It never controls your inverter, battery, or charger.

## Prerequisites

You need an Ecosmart electricity account with at least one connected property, and an API key that you create yourself.

To create a key, open the Ecosmart app and go to **More** > **Settings** > **Advanced** > **API keys**.

{% important %}
Creating a new key disables the previous one. If you already use your Ecosmart API key somewhere else, creating a key for Home Assistant stops that other tool working. Creating a key elsewhere later stops Home Assistant working until you remove the integration and add it again with the new key.
{% endimportant %}

If your switch to Ecosmart has not completed yet, a key can already exist while no connection point is attached to it. Setup then reports that the key has no connection points. Try again once the property is live.

{% include integrations/config_flow.md %}

{% configuration_basic %}
API key:
  description: "The API key you created in the Ecosmart app under **More** > **Settings** > **Advanced** > **API keys**."
{% endconfiguration_basic %}

## Supported functionality

The integration creates one service device for every <abbr title="Installation Control Point">ICP</abbr> the API key can reach. An ICP is the fifteen-character number that identifies a New Zealand electricity connection, and it appears on your bill. If you have several properties, you get one device per property, each named by its ICP and modeled by its grid exit point, which is the substation where the local network draws power off the national grid.

Every device carries two sensors. Both report cents per kWh including <abbr title="goods and services tax">GST</abbr>, the unit New Zealand power bills are written in. Prices can be negative when the market is oversupplied. That is genuine, and the sensors pass it straight through.

### Sensors

- **Spot price**
  - **Description**: The wholesale price at your grid exit point right now.
  - **Attributes**:
    - `price_cents_per_kwh_excl_gst`: the same price excluding GST.
    - `price_dollars_per_mwh`: the same price in dollars per megawatt hour, the unit the wholesale market itself quotes.
    - `observed_at`: when the market published this price, in <abbr title="Coordinated Universal Time">UTC</abbr>.
    - `gst_rate_percent`: the GST rate applied.
- **Forecast price**
  - **Description**: The forecast price for the half hour now in progress, taken from the published forward schedules.
  - **Attributes**:
    - `points`: the whole published curve, up to 48 hours ahead. Each point carries `starts_at`, `trading_date`, `trading_period`, `schedule`, and the price including GST, excluding GST, and in dollars per megawatt hour.
    - `covered_hours`: how far the curve actually reaches. This is usually well short of 48 hours, and it is the number to trust. Do not assume the requested horizon.
    - `published_at`: when the schedule behind the forecast was published, in UTC.
  - **Remarks**: The `points` attribute is excluded from the recorder. It holds up to 96 entries, it is republished every half hour, and once superseded it has no value worth storing.

## Data updates

The integration {% term polling polls %} the Ecosmart API for each grid exit point rather than for each ICP, so several properties behind the same substation share one request.

- The spot price is republished by the market roughly every five minutes and is polled on the same cadence.
- The forecast is polled every 30 minutes.

## Known limitations

Neither sensor guesses. When it does not have a value it can stand behind, it reports `unavailable`, and your automations should handle that.

- The spot price is unavailable when the most recent published price is stale, or carries no value. A price more than about fifteen minutes old must never be what tells a battery to charge.
- The forecast price is unavailable when the market has published nothing reaching this far ahead.
- Both sensors are unavailable while the Ecosmart API cannot be reached, and they recover on the next successful poll.

Re-authentication is not supported yet. If a newer key has replaced the one Home Assistant holds, remove the integration and add it again with the current key.

## Troubleshooting

### Setup reports that the key has no connection points

The key is valid, but no property is attached to it yet. This is normal while a switch to Ecosmart is still in progress. Try again once the property is live.

### The sensors stopped updating and the entry reports an authentication failure

The API key was replaced. Creating a key anywhere else disables the key Home Assistant is using. Remove the integration, create a new key in the Ecosmart app, and add the integration again. Entity IDs are derived from the ICP, so they come back identical and your automations keep working.

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}

Removing the integration does not revoke the API key. To revoke it, create a new key in the Ecosmart app, which disables the old one.
