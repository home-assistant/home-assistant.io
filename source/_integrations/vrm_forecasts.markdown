---
title: Victron VRM Forecasts
description: Instructions for implementation of Victron VRM Forecasts into Home Assistant.
ha_category:
  - Energy
ha_release: 2025.5
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@AndyTempel'
ha_domain: vrm_forecasts
ha_platforms:
  - sensor
ha_integration_type: service
---

The Victron VRM Forecasts integration pulls solar production and consumption forecasts from [Victron Energy](https://www.victronenergy.com/) <abbr title="Victron Remote Monitoring">VRM</abbr> portal into Home Assistant. It provides <abbr title="from the day before">day‑ahead</abbr>, next‑hour, and six‑day outlooks for both production and consumption, plus peak‑time predictions. It fetches forecasts from the day before, today, next hour, tomorrow, and provides six-day outlooks once you have at least 30 days of VRM history.

---

## Prerequisites

- **Victron VRM installation** with a solar system and all consumption routed through inverters or a grid meter.
- **At least 30 days of data** in VRM before forecasts appear.
- **VRM access token** (keep this secret!). Create one in the VRM Portal at **Preferences → Integrations → Access tokens** or use [this link](https://vrm.victronenergy.com/access-tokens).
- **VRM Site ID**: found under **Settings → General** in your site’s VRM Portal page.
{% hint style="important" %}
Your VRM access token grants full access to your VRM portal, including system control and data retrieval. Treat it like a password:

- Do not share it.
- Rotate it immediately if you suspect compromise.
{% endhint %}

---

{% include integrations/config_flow.md %}

---

## Data updates

The Victron VRM Forecasts fetches fresh data from the VRM API every 60 minutes.

## Sensor Entities

### Solar Production Forecast

- `sensor.energy_production_estimate_yesterday`: Estimated energy production — Yesterday
- `sensor.energy_production_estimate_today`: Estimated energy production — Today
- `sensor.energy_production_estimate_today_remaining`: Remaining production — Today
- `sensor.energy_production_estimate_tomorrow`: Estimated energy production — Tomorrow
- `sensor.energy_production_current_hour`: Production — Current hour
- `sensor.energy_production_next_hour`: Production — Next hour
- `sensor.power_highest_peak_time_yesterday`: Peak production time — Yesterday
- `sensor.power_highest_peak_time_today`: Peak production time — Today
- `sensor.power_highest_peak_time_tomorrow`: Peak production time — Tomorrow

### Consumption Forecast

- `sensor.energy_consumption_estimate_yesterday`: Estimated energy consumption — Yesterday
- `sensor.energy_consumption_estimate_today`: Estimated energy consumption — Today
- `sensor.energy_consumption_estimate_today_remaining`: Remaining consumption — Today
- `sensor.energy_consumption_estimate_tomorrow`: Estimated energy consumption — Tomorrow
- `sensor.energy_consumption_current_hour`: Consumption — Current hour
- `sensor.energy_consumption_next_hour`: Consumption — Next hour
- `sensor.consumption_highest_peak_time_yesterday`: Peak consumption time — Yesterday
- `sensor.consumption_highest_peak_time_today`: Peak consumption time — Today
- `sensor.consumption_highest_peak_time_tomorrow`: Peak consumption time — Tomorrow

---

## Adding to the Energy Dashboard

1. Go to **Dashboards** in the settings.
2. Select the **Energy** dashboard.
3. Under **Solar panels**, click the edit button of your solar installation.
4. Select **Forecast production** and choose previously set up VRM Forecasts.
5. Save; your dashboard will show forecasted values.

---

## Troubleshooting

- **No sensors**: Confirm you completed the UI flow and see no errors in logs.
- **Forecasts not available**: Verify you have ≥30 days of VRM data.
- **Invalid auth**: Regenerate your token in VRM Portal and update the integration.
- **Token expired or insufficient scopes**: Ensure your access token is still valid and includes the required scopes (read:forecast, read:site).
- **API errors in Home Assistant logs**: Inspect `home-assistant.log` for VRM API fetch errors (timeouts, 401/403 responses) to pinpoint connectivity or permission issues.
- **Site not found**: Make sure you've entered the correct site/installation ID.

---

## Useful links

1. [VRM JSON API v2 documentation](https://vrm-api-docs.victronenergy.com/#/)
2. [VRM Portal manual](https://www.victronenergy.com/media/pg/VRM_Portal_manual/en/introduction.html)
3. [Victron VRM Portal](https://vrm.victronenergy.com/)
