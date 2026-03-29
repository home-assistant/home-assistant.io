---
title: ista Nederland (mijn.ista.nl)
description: Instructions on how to integrate mijn.ista.nl energy monitoring into Home Assistant.
ha_category:
  - Energy
  - Sensor
ha_release: "2025.9"
ha_iot_class: Cloud Polling
ha_codeowners:
  - '@aalaei'
ha_domain: mijn_ista
ha_config_flow: true
ha_platforms:
  - diagnostics
  - sensor
ha_integration_type: hub
---

The **ista Nederland** {% term integration %} connects your [mijn.ista.nl](https://mijn.ista.nl) account to Home Assistant. ista is an energy monitoring service used in Dutch residential buildings to track heating, hot water, and cold water consumption per apartment.

The integration polls the mijn.ista.nl cloud API and exposes consumption data as sensors — both annual totals and monthly breakdowns — along with per-meter readings and building averages.

## Prerequisites

You need an active [mijn.ista.nl](https://mijn.ista.nl) account. If your building uses ista meters, your property manager will have provided you with login credentials.

{% include integrations/config_flow.md %}

## Configuration

During setup you will be asked for:

| Field | Description |
|---|---|
| **Username or email** | The email address used to log in to mijn.ista.nl |
| **Password** | Your mijn.ista.nl password |
| **Update interval** | How often (in hours) Home Assistant polls for new data (1–24 h, default 24 h) |

The update interval can be changed later via {% my integrations title="**Settings** > **Devices & services**" %} without re-adding the integration.

## Data update

The integration polls the mijn.ista.nl API on a configurable interval (default: every 24 hours). ista typically updates consumption data once per day. Setting a shorter interval will not produce more frequent data from ista's side, but ensures Home Assistant picks up any updates promptly once they are available.

## Use cases

- Track annual heating and water consumption in your apartment and compare it to the previous year.
- Monitor monthly usage trends and detect unusual consumption spikes.
- Include ista consumption data in the Home Assistant [Energy Dashboard](/docs/energy/).
- Compare your apartment's consumption against the building average.

## Supported functionality

For each property linked to your account, the following sensors are created.

### Annual sensors (per service)

| Sensor | Description |
|---|---|
| `{Service} Current` | Total consumption for the current billing year |
| `{Service} Previous` | Total consumption for the previous billing year |
| `{Service} Change` | Year-over-year change (%) |
| `{Service} Building Avg` | Building-wide annual average (normalised) |
| `{Service} {serial_nr}` | Annual consumption for a specific physical meter |

### Monthly sensors (per service)

| Sensor | Description |
|---|---|
| `{Service} Month` | Consumption in the most recent complete month; prior months available as attributes |
| `{Service} Month Avg` | Building-wide average for the most recent complete month |
| `{Service} {serial_nr} Month` | Monthly consumption for a specific physical meter |

### Temperature sensors

| Sensor | Description |
|---|---|
| `Temperature` | Average outdoor temperature during the current billing period (from KNMI via ista) |
| `Temperature Previous` | Average outdoor temperature during the previous billing period |

Services depend on which meters are installed in your building. Common services include **Heating** (Gigajoule), **Hot water** (m³), and **Cold water** (m³). Electricity may be available for some buildings.

## Examples

### Energy Dashboard

Annual heating sensors with state class `total` and device class `energy` can be added directly to the [Energy Dashboard](/docs/energy/).

### Automation: alert on high monthly consumption

```yaml
automation:
  - alias: "Alert on high heating usage"
    trigger:
      - platform: numeric_state
        entity_id: sensor.ista_nl_heating_month
        above: 10
    action:
      - service: notify.mobile_app
        data:
          message: "Heating usage this month is above 10 GJ."
```

## Known limitations

- **Data lag**: ista updates consumption data approximately once per day. Real-time readings are not available.
- **Current month**: The current (in-progress) month may show no data or partial data until the month closes.
- **KNMI temperature**: The outdoor temperature sensors rely on KNMI data processed by ista. The current month's temperature is often `Unavailable` until the data is finalised.
- **Dutch API**: Service descriptions are always returned in Dutch by the API regardless of language setting. The integration translates the known service names (Verwarming → Heating, Warm water → Hot water, etc.) when Home Assistant is set to English.
- **Single account per property**: Each mijn.ista.nl account is tied to a specific property. If you have multiple properties, add a separate integration entry for each account.

## Troubleshooting

### Integration shows "Authentication failed" after working previously

Your mijn.ista.nl session has expired or your password has changed. Go to {% my integrations title="**Settings** > **Devices & services**" %}, find the ista Nederland integration, and use **Re-authenticate** to enter new credentials.

### All sensors are "Unavailable"

The integration could not reach the mijn.ista.nl API. Check your internet connection and verify that [mijn.ista.nl](https://mijn.ista.nl) is accessible. Home Assistant logs (under **Settings** > **System** > **Logs**) will show the specific error.

### Current month sensor shows "Unavailable"

This is expected at the start of a new billing month before ista publishes data. The sensor will recover once ista processes the first readings of the month.
