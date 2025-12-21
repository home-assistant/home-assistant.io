---
title: Generic hygrostat
description: Virtual hygrostat device
ha_category:
  - Helper
  - Humidifier
ha_release: 2021.8
ha_domain: generic_hygrostat
ha_quality_scale: internal
ha_codeowners:
  - '@Shulyaka'
ha_iot_class: Local Polling
ha_platforms:
  - humidifier
ha_integration_type: helper
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_config_flow: true
---

The `generic_hygrostat` humidifier {% term integration %} is a virtual hygrostat implemented in Home Assistant. It uses a sensor and a switch connected to a humidifier or dehumidifier under the hood. When in humidifier mode, if the measured humidity is less than the target humidity, the humidifier will be turned on and turned off when the required humidity is reached. When in dehumidifier mode, if the measured humidity is greater than the target humidity, the dehumidifier will be turned on and turned off when required humidity is reached. One Generic Hygrostat entity can only control one switch. If you need to activate two switches, one for a humidifier and one for a dehumidifier, you will need two Generic Hygrostat entities.

{% include integrations/config_flow.md %}

{% note %}
Configuration using our user interface provides a more limited subset of options, making this integration more accessible while covering most use cases.

If you need more specific features for your use case, the manual [YAML-configuration section](#yaml-configuration) of this integration might provide them.
{% endnote %}

## YAML configuration

Alternatively, this integration can be configured and set up manually via YAML
as well. To enable the generic hygrostat in your installation, add the
following to your {% term "`configuration.yaml`" %} file:

```yaml
# Example configuration.yaml entry
generic_hygrostat:
  - name: Bedroom
    humidifier: switch.humidifier_plug
    target_sensor: sensor.outside_humidity
```

{% configuration %}
name:
  description: Name of hygrostat.
  required: true
  default: Generic Hygrostat
  type: string
unique_id:
  description: An ID that uniquely identifies this humidifier. Set this to a unique value to allow customization through the UI.
  required: false
  type: string
humidifier:
  description: "`entity_id` for humidifier or dehumidifier switch, must be a toggle device."
  required: true
  type: string
target_sensor:
  description: "`entity_id` for a humidity sensor, target_sensor.state must be humidity."
  required: true
  type: string
min_humidity:
  description: Set minimum set point available.
  required: false
  default: 0
  type: float
max_humidity:
  description: Set maximum set point available.
  required: false
  default: 100
  type: float
target_humidity:
  description: Set initial target humidity. This value will be used as a fallback when the previous setpoint is not available.
  required: false
  type: float
device_class:
  description: Whether the switch specified in the *humidifier* option to be treated as a humidifier or a dehumidifier device. Must be either "humidifier" or "dehumidifier"
  required: false
  type: string
  default: "humidifier"
min_cycle_duration:
  description: Set a minimum amount of time that the switch specified in the *humidifier* option must be in its current state prior to being switched either off or on.
  required: false
  type: [time, integer]
dry_tolerance:
  description: Set a minimum amount of difference between the humidity read by the sensor specified in the *target_sensor* option and the target humidity that must change prior to being switched on. For example, if the target humidity is 45 and the tolerance is 3 the humidifier will start when the sensor equals or goes below 42. It is advised to set this parameter equal or above your sensor precision. This parameter is only used on *target_sensor* changes and is ignored on initialization, on manual operation or `humidifier.turn_on` action.
  required: false
  default: 3
  type: float
wet_tolerance:
  description: Set a minimum amount of difference between the humidity read by the sensor specified in the *target_sensor* option and the target humidity that must change prior to being switched off. For example, if the target humidity is 45 and the tolerance is 3 the humidifier will stop when the sensor equals or goes above 48. It is advised to set this parameter equal or above your sensor precision. This parameter is only used on *target_sensor* changes and is ignored on initialization, on manual operation or `humidifier.turn_on` action.
  required: false
  default: 3
  type: float
keep_alive:
  description: Set a keep-alive interval. If set, the switch specified in the *humidifier* option will be triggered every time the interval elapses. Use with humidifiers and dehumidifiers that shut off if they don't receive a signal from their remote for a while. Use also with switches that might lose state. The keep-alive call is done with the current valid humidifier integration state (either on or off).
  required: false
  type: [time, integer]
initial_state:
  description: Set the initial state. This value is used as a fallback when a previous state is not available.
  required: false
  type: boolean
  default: false
away_humidity:
  description: "Set the humidity used by `away` mode. If this is not specified, the mode feature will not be available."
  required: false
  type: integer
away_fixed:
  description: "If this parameter is set to `True`, the target humidity for the `away` mode is fixed at `away_humidity` level and cannot be changed. An attempt to set the target humidity will effectively set the humidity for the `normal` mode. This can be used to independently control mode and target humidity."
  required: false
  type: boolean
  default: false
sensor_stale_duration:
  description: If the *target_sensor* does not update its value within this period, it is considered unavailable until the next update. When the sensor is unavailable, the *humidifier* is turned off for safety reasons.
  required: false
  type: [time, integer]
{% endconfiguration %}

Time for `min_cycle_duration` and `keep_alive` must be set as "hh:mm:ss" or it must contain at least one of the following entries: `days:`, `hours:`, `minutes:`, `seconds:` or `milliseconds:`. Alternatively, it can be an integer that represents time in seconds.

## Full YAML configuration example

To be added to the {% term "`configuration.yaml`" %} file.

```yaml
generic_hygrostat:
  - name: Bedroom
    humidifier: switch.humidifier_plug
    target_sensor: sensor.outside_humidity
    min_humidity: 30
    max_humidity: 70
    target_humidity: 50
    dry_tolerance: 3
    wet_tolerance: 0
    device_class: "humidifier"
    min_cycle_duration:
      seconds: 5
    keep_alive:
      minutes: 3
    initial_state: true
    away_humidity: 35
    away_fixed: True
    sensor_stale_duration: 00:15:00
```
