---
title: A. O. Smith
description: Instructions on how to integrate your A. O. Smith water heater with Home Assistant.
ha_category:
  - Water heater
ha_release: 2024.1
ha_iot_class: Cloud Polling
ha_domain: aosmith
ha_config_flow: true
ha_codeowners:
  - '@bdr99'
ha_platforms:
  - diagnostics
  - sensor
  - water_heater
ha_integration_type: integration
---

The A. O. Smith integration allows you to control a compatible A. O. Smith iCOMM-enabled water heater from Home Assistant.

Before using this integration, your water heater must be connected to a Wi-Fi network and linked to your account using the A. O. Smith mobile app ([iOS](https://apps.apple.com/us/app/a-o-smith/id456489822)/[Android](https://play.google.com/store/apps/details?id=com.aosmith.warrantycheck)).

## Known compatible models

- EE9-40R55DV
- EE9-40H55DV
- EE9-50R55DV
- EE9-50H55DV
- EE12-50R55DVF
- EE12-50H55DVF
- EE12-55H55DVF
- HPS10-50H45DV
- HPS10-66H45DV
- HPS10-80H45DV
- HPSX-50-DHPT
- HPSX-50-DHPT 2
- HPSX-66-DHPT
- HPSX-66-DHPT 2
- HPSX-80-DHPT
- HPSX-80-DHPT 2
- HPTS-50
- HPTS-66
- HPTS-80
- HPV10-50H01DV
- HPV10-66H01DV
- HPV10-80H01DV

Water heaters that can be controlled using the A. O. Smith mobile app should be compatible with this integration. If your water heater is not detected by the integration, but it can be controlled using the mobile app, please [open an issue on GitHub](https://github.com/home-assistant/core/issues/new?template=bug_report.yml&integration_name=A.%20O.%20Smith&integration_link=https%3A%2F%2Fwww.home-assistant.io%2Fintegrations%2Faosmith) so that support can be added. Similarly, if your water heater is working with this integration, but its model number is not listed here, please [open a documentation issue](https://github.com/home-assistant/home-assistant.io/issues/new?template=feedback.yml&url=https%3A%2F%2Fwww.home-assistant.io%2Fintegrations%2Faosmith) so it can be added to the list.

{% include integrations/config_flow.md %}

## Platforms

### Water heater

The water heater entity offers the following capabilities:
- Adjust target temperature
- Change operation mode
- Enable/disable away mode (will set the water heater to "vacation" mode)

#### Operation modes

This table shows the supported operation modes. The available modes will depend on your specific water heater model.

| Mode displayed in A. O. Smith app  | Mode displayed in Home Assistant | Mode name for `water_heater.set_operation_mode` action |
| ---------------------------------- | -------------------------------- | ------------------------------------------------------ |
| Electric/Standard                  | Electric                         | `electric`                                             |
| Hybrid                             | Eco                              | `eco`                                                  |
| Heat Pump                          | Heat Pump                        | `heat_pump`                                            |
| Vacation                           | N/A - use away mode              | N/A - use `water_heater.set_away_mode`                 |

### Sensor

The following sensor entities are available:
- Hot water availability (percentage)
- Energy usage

## Disclaimer

This integration is not affiliated with or endorsed by A. O. Smith.
