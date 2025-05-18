---
title: Rehlko
description: Support for Rehlko devices (formerly Oncue and Kohler Energy)
ha_category:
  - Sensor
ha_iot_class: Cloud Polling
ha_release: 2025.5
ha_config_flow: true
ha_codeowners:
  - '@bdraco'
  - '@peterager'
ha_dhcp: true
ha_domain: rehlko
ha_platforms:
  - sensor
ha_integration_type: integration
ha_quality_scale: silver
---

The **Rehlko** (formerly Kohler Energy Management) {% term integration %} allows you to monitor the status of your [enabled Kohler generator](https://www.kohlerhomeenergy.rehlko.com/kohler-energy-management-app) through Home Assistant. This integration replaces the legacy Oncue integration.

{% include integrations/config_flow.md %}

## Required manual input

To configure a Rehlko (Kohler Energy Management) account, enter the following information:

{% configuration_basic %}

email:
  description: "The email used to log in to the Rehlko (Kohler Energy Management) application."
password:
  description: "The password used to log in to the Rehlko (Kohler Energy Management) application."

{% endconfiguration_basic %}

The integration uses your generator's name as the device name and within your entity names. To change this name, it is recommended to do so in the Kohler app before configuring the integration.

## Sensors

The sensors exposed by this integration depend on the specific instrumentation installed on your generator and transfer switch. Sensor availability can vary significantly—even between units of the same model.

### Status sensors

Status sensors provide information about the overall state of the generator.

> **Note:** This list of values is not complete. If you observe new values, please report them by opening an issue.

| Sensor ID         | Values                                | Description                     |
|-------------------|--------------------------------------|---------------------------------|
| `generator_status` | ReadyToRun, RunningExercise, ...     | Indicates the current generator status. |
| `engine_state`     | Standby, PerformingVariableSpeedExercise, ... | Displays the current engine state. |
| `power_source`     | Utility, ...                        | The source of power for the home. |

## Tested generators

These are the generator models that have been tested:

- [38RCLB](https://resources.kohler.com/power/kohler/residential/pdf/tp6908.pdf)
- [26RCA](https://www.kohlerhomeenergy.rehlko.com/products/home+generators/26rca)
- [20RESA](https://resources.kohler.com/power/kohler/residential/pdf/tp6804.pdf)
- [20RCA](https://www.kohlerhomeenergy.rehlko.com/products/home+generators/20rca)
- [14RESA](https://www.kohler.com/content/dam/kohler-com-NA/Lifestyle/PDF/PDF-tp6803.pdf)

## Removing the integration

This integration follows the standard integration removal process; no extra steps are required.

{% include integrations/remove_device_service.md %}
