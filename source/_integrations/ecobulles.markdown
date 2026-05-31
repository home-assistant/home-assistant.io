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

Ecobulles devices inject food-grade CO2 into the water network to reduce limescale deposits without using salt. The integration connects to the Ecobulles cloud account used by the official mobile app and exposes water usage, CO2 injection time, device status, and diagnostic information.

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
- **CO2 mass in bottle**: The mass of CO2 contained in the bottle, in kilograms. This is the CO2 weight only, not the total weight of the metal cylinder.
- **Micrometric screw setting**: The value shown on the Ecobulles micrometric screw. This is used only for the estimated CO2 bottle usage sensor.

Advanced options are collapsed by default:

- **CO2 pressure**: Gas pressure setting, stored as metadata for the estimate.
- **Minimum CO2 dose**: Lower CO2 dose assumption in mg/L.
- **Maximum CO2 dose**: Upper CO2 dose assumption in mg/L.
- **Reference CO2 pulse**: Expected valve-open time for one liter of water, in milliseconds. Ecobulles Expert devices are typically configured around 1500 ms/L.
- **Polling interval**: How often Home Assistant asks the Ecobulles cloud for fresh data. The minimum value is 30 seconds.

## Options

After setup, the integration can be reconfigured from the integration page.

The options flow also includes **Enable raw CO2 debug sensor**. When enabled, Home Assistant creates an additional diagnostic sensor exposing the untouched CO2 value returned by the Ecobulles cloud API.

## Data updates

This integration polls the Ecobulles cloud. The default polling interval is 120 seconds.

If the cloud API is unavailable or returns incomplete data, entities are marked unavailable until the next successful update. When Home Assistant can reach Ecobulles but the response is missing required usage or device data, the integration creates a repair issue with diagnostic guidance.

## Entities

The integration creates one Home Assistant device per Ecobulles config entry.

### Water sensors

| Entity | Unit | Description |
| --- | --- | --- |
| Water usage | L | Water used with the current CO2 bottle. This mirrors the Ecobulles water counter for the active bottle cycle. |
| Water usage before current CO2 bottle | L | Water usage accumulated from completed bottle cycles. This increases when Home Assistant detects that the Ecobulles water counter has reset after a bottle change. |
| Total water usage | L | Monotonic lifetime water usage calculated as completed bottle-cycle water plus current bottle-cycle water. |

The Ecobulles water counter resets when the CO2 bottle is changed. Home Assistant stores completed bottle cycles locally so the **Total water usage** sensor remains monotonic.

### CO2 sensors

| Entity | Unit | Description |
| --- | --- | --- |
| CO2 injection time | s | Cumulative CO2 electrovalve open time. The Ecobulles API exposes this value in milliseconds; Home Assistant converts it to seconds. |
| Estimated CO2 bottle usage | % | Estimated percentage of the configured CO2 bottle that has been consumed. |
| Raw CO2 value |  | Optional diagnostic sensor exposing the untouched raw CO2 value from the Ecobulles API. This sensor is disabled unless the raw CO2 debug option is enabled. |

The **Estimated CO2 bottle usage** sensor is an estimate, not a measured scale reading. It uses the configured bottle CO2 mass, the micrometric screw setting, the reference pulse duration, and Ecobulles public dose guidance. The sensor exposes the assumptions used by the calculation as state attributes.

### Diagnostic sensors

| Entity | Description |
| --- | --- |
| Install date | Installation date reported by Ecobulles. |
| Last date receive | Last communication timestamp reported by Ecobulles. |
| Activated | Device activation status. |
| Locked | Device lock status. |
| Suspended | Device suspension status. |
| Active alerts | Number of currently active alerts reported by Ecobulles. Alert details are available as state attributes. |

## Examples

### Notify when Ecobulles reports an active alert

{% raw %}

```yaml
alias: Ecobulles active alert
triggers:
  - trigger: numeric_state
    entity_id: sensor.ecobulles_active_alerts
    above: 0
actions:
  - action: notify.mobile_app_phone
    data:
      title: Ecobulles alert
      message: >
        Ecobulles is reporting {{ states('sensor.ecobulles_active_alerts') }}
        active alert(s). Check the sensor attributes for details.
```

{% endraw %}

### Notify when estimated CO2 bottle usage is high

{% raw %}

```yaml
alias: Ecobulles CO2 bottle nearly empty
triggers:
  - trigger: numeric_state
    entity_id: sensor.ecobulles_estimated_co2_bottle_usage
    above: 90
actions:
  - action: notify.mobile_app_phone
    data:
      title: Ecobulles CO2 bottle
      message: The estimated CO2 bottle usage is above 90%.
```

{% endraw %}

## Known limitations

- The integration depends on the Ecobulles cloud API and cannot update while the cloud service or internet connection is unavailable.
- The Ecobulles cloud API does not currently expose an explicit product model field.
- CO2 bottle usage is estimated from the API's cumulative valve-open time and configuration assumptions. It is not a direct measurement of the bottle weight.
- Water usage across bottle changes is tracked locally by Home Assistant. If the integration storage is removed, completed bottle-cycle accounting starts again from the current Ecobulles counter.

## Troubleshooting

### Cannot connect or invalid authentication

Check that the email address and password work in the Ecobulles mobile app. If the credentials changed, use the Home Assistant reauthentication flow.

### Entities are unavailable

The integration may be unable to reach the Ecobulles cloud or the cloud response may be temporarily incomplete. Check the official Ecobulles app first. If the issue persists, download diagnostics from the Home Assistant integration page before reporting an issue.

### Estimated CO2 bottle usage looks wrong

The estimate depends on the configured CO2 bottle mass and micrometric screw setting. Verify that the configured bottle mass is the CO2 content only, not the total metal cylinder weight.

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
