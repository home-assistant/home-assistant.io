---
title: Kingspan Watchman SENSiT
description: Instructions on how to integrate Kingspan Watchman SENSiT sensors into Home Assistant.
ha_categories:
  - energy
  - sensors
ha_release: 2026.11
ha_iot_class: cloud_polling
ha_domain: watchman
ha_platforms:
  - sensor
ha_integration_type: device
ha_codeowners:
  - '@masaccio'
ha_config_flow: true
ha_quality_scale: bronze
---

The **Kingspan Watchman SENSiT** {% term integration %} allows you to monitor heating oil levels and consumption rates from Kingspan Watchman SENSiT ultrasonic tank monitors via Kingspan's cloud service.

## Supported devices

This integration supports ultrasonic oil tank level monitors connected to the **Kingspan Watchman SENSiT** cloud platform shared by the KNECT Pro mobile app.

- Accounts with multiple tanks are supported automatically; each tank appears as a separate device in Home Assistant.

## Prerequisites

- An active KNECT Pro account with at least one registered tank sensor.
- The email address and password used to sign in to the KNECT Pro mobile app.

{% include integrations/config_flow.md %}

### Configuration parameters

- **Username**: The email address registered with your Kingspan account.
- **Password**: The password for your Kingspan account.

## Options

Options for Kingspan Watchman SENSiT can be configured via the user interface.

{% include integrations/option_flow.md %}

- **Usage window**: The number of recent days used to calculate the rolling usage rate and the forecast empty duration. Default: `14` days.
- **Oil energy density**: The conversion factor used to calculate thermal power output from oil consumption, in `kWh/L`. The default of `9.8` assumes a gross calorific value of `10.35 kWh/L` for heating oil at `95%` boiler efficiency.

## Supported functionality

### Sensors

For each tank registered on your account, the integration creates the following sensor entities:

- **Oil Level** (`L`): The current volume of oil remaining in the tank, measured in liters.
- **Tank Percentage Full** (`%`): The current fill level as a percentage of total tank capacity, rounded to one decimal place.
- **Tank Capacity** (`L`): The configured total capacity of the tank in liters *(diagnostic entity)*.
- **Last Reading Date**: The timestamp when the tank monitor last reported a reading to Kingspan's cloud service *(diagnostic entity)*.
- **Current Usage** (`L/h`): The rolling average volume-flow rate of oil consumption in liters per hour, calculated from level drops over the configured **Usage window**. Tank refills are automatically excluded from this calculation.
- **Forecast Empty** (`d`): The estimated number of days until the tank is empty based on the current oil level and the rolling **Current Usage** rate. Reports `0` when the usage rate is `0` or insufficient history is available.
- **Current Energy Usage** (`kW`): The rolling average thermal power output in kilowatts, calculated by multiplying **Current Usage** (`L/h`) by the configured **Oil energy density** (`kWh/L`). This entity represents instantaneous average power (`kW`) rather than cumulative energy (`kWh`) and is **disabled by default**.

## Data updates

- **Home Assistant polling interval**: This integration uses cloud polling and fetches updated tank data from the Kingspan API every **8 hours**.
- **Device upload frequency**: The Watchman SENSiT tank transmitter typically uploads new ultrasonic level readings to Kingspan's cloud service **once per day**. Because of this hardware reporting cadence, sensor states in Home Assistant normally change once every 24 hours rather than on every 8-hour poll.

## Examples

{% include docs/paste_yaml_tip.md %}

### Low oil level notification

Send a mobile notification when your tank level drops below 20% full.

- **When**: The **Tank Percentage Full** sensor drops below `20`.
- **Then do**: Send a notification to your mobile device with the current percentage and oil level.

{% details "YAML configuration" %}

{% raw %}
```yaml
automation:
  - alias: "Notify when heating oil is low"
    triggers:
      - trigger: numeric_state
        entity_id: sensor.my_tank_tank_percentage_full
        below: 20
    actions:
      - action: notify.mobile_app_phone
        data:
          title: "Heating oil low"
          message: >
            Oil level is down to {{ states('sensor.my_tank_tank_percentage_full') }}%
            ({{ states('sensor.my_tank_oil_level') }} L).
```
{% endraw %}

{% enddetails %}

### Alert when estimated days remaining drops below a threshold

Send a reminder to order heating oil when the **Forecast Empty** sensor drops below 14 days.

- **When**: The **Forecast Empty** sensor is above `0` and drops below `14`.
- **Then do**: Send a notification to your mobile device with the estimated days remaining and current oil level.

{% details "YAML configuration" %}

{% raw %}
```yaml
automation:
  - alias: "Remind to order heating oil"
    triggers:
      - trigger: numeric_state
        entity_id: sensor.my_tank_forecast_empty
        above: 0
        below: 14
    actions:
      - action: notify.mobile_app_phone
        data:
          title: "Order heating oil"
          message: >
            Approximately {{ states('sensor.my_tank_forecast_empty') }} days of
            heating oil remaining ({{ states('sensor.my_tank_oil_level') }} L).
```
{% endraw %}

{% enddetails %}

### Tracking cumulative energy consumption

Because **Current Energy Usage** reports average power in `kW` rather than cumulative energy in `kWh`, enable the **Current Energy Usage** entity and create an [Integral sensor helper](/integrations/integration/) (using the **Left Riemann sum** method and `hours` time unit) to track cumulative heating energy in `kWh` for use in the Home Assistant Energy dashboard.

## Known limitations

- **Cloud-only access**: The Watchman SENSiT monitor communicates exclusively with Kingspan's cloud servers; local polling is not supported.
- **No real-time readings**: Because the tank unit only transmits once per day and Home Assistant polls every 8 hours, immediate changes after burner operation or an oil delivery are not reflected until the next device upload and poll cycle.
- **Usage rate and forecast initialization**: Automatic refill detection ignores level increases greater than 10% between consecutive readings. Until at least two decreasing readings fall within the configured **Usage window**, **Current Usage**, **Current Energy Usage**, and **Forecast Empty** report `0`.

## Troubleshooting

### Authentication failed repair issue

If your Kingspan password changes or your account credentials become invalid, Home Assistant creates a repair issue and pauses updates. Remove the integration entry and add it again with your updated credentials to restore updates.

### Sensors show unavailable or zero usage after setup

- If a newly installed tank has not yet uploaded readings to Kingspan's cloud service, setup will retry automatically until data becomes available.
- If a tank has been physically replaced or removed from your Kingspan account, you can delete the stale device directly from its device page in Home Assistant once it is no longer returned by the API.

## Removing the integration

This integration follows standard integration removal. No additional steps or cleanup are required on your Kingspan Watchman SENSiT account.

{% include integrations/remove_device_service.md %}