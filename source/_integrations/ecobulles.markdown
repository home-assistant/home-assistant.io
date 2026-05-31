---
title: Ecobulles
description: Instructions on how to integrate Ecobulles CO2 anti-limescale devices with Home Assistant.
ha_category:
  - Sensor
ha_release: 2026.7
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@jul-fls'
ha_domain: ecobulles
ha_platforms:
  - sensor
ha_integration_type: hub
---

The **Ecobulles** {% term integration %} allows you to monitor Ecobulles CO2 anti-limescale systems from Home Assistant.

Ecobulles devices inject food-grade CO2 into the water network to reduce limescale deposits without using salt. The integration connects to the Ecobulles cloud account used by the official mobile app and exposes the current water counter and cumulative CO2 injection time reported by Ecobulles.

## Supported devices

The following Ecobulles product families are expected to be supported:

- Ecobulles Expert
- Ecobulles Équilibre

The Ecobulles cloud API does not currently expose an explicit model field. Home Assistant displays the model when it can infer it from the device serial number. Otherwise, the device is shown as a generic Ecobulles device.

## Prerequisites

Before setting up the integration, make sure you have:

- An Ecobulles device connected to the Ecobulles cloud.
- The email address and password used to sign in to the Ecobulles mobile app.

{% include integrations/config_flow.md %}

## Configuration parameters

During setup, Home Assistant asks for the following information:

- **Email**: The email address used by the Ecobulles mobile app.
- **Password**: The password used by the Ecobulles mobile app.

## Data updates

This integration polls the Ecobulles cloud every 120 seconds.

If the cloud API is unavailable or returns incomplete usage data, entities are marked unavailable until the next successful update.

## Entities

The integration creates one Home Assistant device per Ecobulles config entry.

| Entity | Unit | Description |
| --- | --- | --- |
| Water usage | L | Current water counter reported by the Ecobulles cloud. |
| CO2 injection time | s | Cumulative CO2 electrovalve open time. The Ecobulles API exposes this value in milliseconds; Home Assistant converts it to seconds. |

The Ecobulles water counter may reset when the CO2 bottle is changed. The initial Home Assistant integration exposes the current counter reported by Ecobulles and does not reconstruct lifetime water usage locally.

## Example automation

### Notify when the Ecobulles water counter is high

{% raw %}

```yaml
alias: Ecobulles water counter high
trigger:
  - trigger: numeric_state
    entity_id: sensor.ecobulles_water_usage
    above: 80000
action:
  - action: notify.mobile_app_phone
    data:
      title: Ecobulles water usage
      message: The Ecobulles water counter is above 80 m³ for the current CO2 bottle cycle.
```

{% endraw %}

## Known limitations

- The integration depends on the Ecobulles cloud API and cannot update while the cloud service or internet connection is unavailable.
- The Ecobulles cloud API does not currently expose an explicit product model field.
- The Ecobulles water usage sensor exposes the current water counter reported by the Ecobulles cloud. Extended lifetime accounting across CO2 bottle changes is intentionally not part of the initial integration PR.
- CO2 injection time is the cumulative electrovalve open time reported by the Ecobulles cloud. It is not a direct measurement of CO2 bottle weight.

## Troubleshooting

### Cannot connect or invalid authentication

Check that the email address and password work in the Ecobulles mobile app.

### Entities are unavailable

The integration may be unable to reach the Ecobulles cloud or the cloud response may be temporarily incomplete. Check the official Ecobulles app first. If the issue persists, check the Home Assistant logs before reporting an issue.

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
