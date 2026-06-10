---
title: TRMNL
description: Instructions on how to integrate TRMNL with Home Assistant.
ha_category:
  - Sensor
  - Switch
  - Time
ha_release: 2026.4
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@joostlek'
ha_domain: trmnl
ha_platforms:
  - diagnostics
  - sensor
  - switch
  - time
ha_integration_type: hub
ha_quality_scale: platinum
---

The **TRMNL** {% term integration %} allows you to monitor your [TRMNL](https://usetrmnl.com/) e-paper (e-ink) displays in Home Assistant. TRMNL devices are low-power e-ink displays that show content such as calendars, weather, and custom dashboards at a glance.

With this integration, you can track the battery level of your TRMNL devices and automate your home around them. For example, you could get a notification when the battery is running low, or align the sleep schedule of your display with your own.

## Supported devices

The following TRMNL hardware devices are supported:

- TRMNL (OG)
- TRMNL (X)

## Prerequisites

To use this integration, you need a TRMNL developer license.

1. Open [your TRMNL account settings](https://trmnl.com/account).
2. Copy your API key. It starts with `user_`.

{% include integrations/config_flow.md %}

{% configuration_basic %}
API key:
    description: "The API key for your TRMNL account."
{% endconfiguration_basic %}

## Supported functionality

The **TRMNL** integration provides the following entities for each TRMNL device on your account.

### Sensors

- **Battery**: The current battery level of the device, in percent.
- **Battery voltage**: The current battery voltage of the device, in volts (V). This entity is disabled by default.
- **Signal strength**: The raw Wi-Fi received signal strength indicator (RSSI) of the device, in dBm. This entity is disabled by default.
- **Wi-Fi strength**: The Wi-Fi connection quality of the device, shown as a percentage derived from the RSSI value. This entity is disabled by default.

### Switches

- **Sleep mode**: Enables or disables the sleep schedule on the device. When enabled, the device will sleep between the **Sleep start time** and **Sleep end time**.

### Time

- **Sleep start time**: The time at which the device enters sleep mode.
- **Sleep end time**: The time at which the device wakes up from sleep mode.

## Examples

### Send a notification when the battery is low

This automation sends a notification to your phone when the battery level of your TRMNL device drops below 20%.

{% details "Example YAML configuration" %}

```yaml
alias: "Notify when TRMNL battery is low"
description: >
  Send a notification when the TRMNL battery level
  drops below 20%.
triggers:
  - trigger: numeric_state
    entity_id: sensor.your_trmnl_battery
    below: 20
actions:
  - action: notify.send_message
    target:
      entity_id: notify.my_device
    data:
      title: "TRMNL battery low"
      message: "Your TRMNL battery is below 20%. Time to charge it."
```

{% enddetails %}

## Data updates

The integration {% term polling polls %} the TRMNL API every hour to update the device and entity states, including sensor readings and the **Sleep mode** switch.

## Known limitations

- The integration does not support sending custom content to the display. It only allows you to monitor the device status and control the sleep schedule.

## Troubleshooting

### Setup fails with an authentication error

#### Symptom: "Invalid authentication"

When adding the integration, the setup fails with an authentication error.

##### Description

This most commonly happens when the wrong API key is used. The integration requires your _account_ API key (which starts with `user_`), not the device-level token that is shown in the individual device settings.

##### Resolution

1. Open [your TRMNL account settings](https://trmnl.com/account).
2. Copy the API key shown there. Make sure it starts with `user_`.
3. Re-enter this key in the integration setup.

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
