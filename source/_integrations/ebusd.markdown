---
title: ebusd
description: The ebusd integration allows the integration between eBUS heating system and Home Assistant.
ha_category:
  - Sensor
ha_iot_class: Local Polling
ha_release: 0.88
ha_domain: ebusd
ha_platforms:
  - sensor
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

Integration between the [ebusd](https://github.com/john30/ebusd/) daemon (used for communication with the eBUS heating systems), and Home Assistant. The ebusd integrations uses the sensor integration.

## Configuration

Enable the sensor by adding the following to your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

```yaml
# Example configuration.yaml entry
ebusd:
  host: 127.0.0.1
  circuit: "700"
```

{% configuration %}
host:
  description: This is the IP address of your ebus daemon, e.g., `127.0.0.1`.
  required: true
  type: string
circuit:
  description: The heating circuit name to monitor, e.g., '700', 'ehp' or 'bai'.
  required: true
  type: string
port:
  description: The port your ebus daemon uses.
  type: integer
  required: false
  default: 8888
name:
  description: The name to use when displaying this ebusd instance.
  type: string
  required: false
  default: ebusd
monitored_conditions:
  description: List of conditions to monitor. Note that not all monitored_conditions listed here can be supported by your circuit. This integration maps limited set of keys to circuit specific ebusd values.
  type: list
  required: false
  keys:
    ActualFlowTemperatureDesired:
      description: Heating circuit flow temperature desired.
    MaxFlowTemperatureDesired:
      description: Heating circuit maximum flow temperature.
    MinFlowTemperatureDesired:
      description: Heating circuit minimum flow temperature.
    PumpStatus:
      description: Heating circuit pump status.
    HCSummerTemperatureLimit:
      description: Heating circuit summer temperature limit.
    HolidayTemperature:
      description: Heating circuit holiday temperature.
    HWTemperature:
      description: Hot water circuit actual temperature.
    HWTemperatureDesired:
      description: Hot water circuit desired temperature.
    HWTimerMonday:
      description: Hot water circuit monday timer.
    HWTimerTuesday:
      description: Hot water circuit tuesday timer.
    HWTimerWednesday:
      description: Hot water circuit wednesday timer.
    HWTimerThursday:
      description: Hot water circuit thursday timer.
    HWTimerFriday:
      description: Hot water circuit friday timer.
    HWTimerSaturday:
      description: Hot water circuit saturday timer.
    HWTimerSunday:
      description: Hot water circuit sunday timer.
    WaterPressure:
      description: Water pressure (bar).
    Zone1RoomZoneMapping:
      description: Room controller assignment zone 1.
    Zone1NightTemperature:
      description: Heating circuit night temperature desired on zone 1.
    Zone1DayTemperature:
      description: Heating circuit day temperature desired on zone 1.
    Zone1HolidayTemperature:
      description: Heating circuit holiday temperature desired on zone 1.
    Zone1RoomTemperature:
      description: Actual room temperature on zone 1.
    Zone1ActualRoomTemperatureDesired:
      description: Actual room temperature desired on zone 1.
    Zone1TimerMonday:
      description: Heating circuit monday timer on zone 1.
    Zone1TimerTuesday:
      description: Heating circuit tuesday timer on zone 1.
    Zone1TimerWednesday:
      description: Heating circuit wednesday timer on zone 1.
    Zone1TimerThursday:
      description: Heating circuit thursday timer on zone 1.
    Zone1TimerFriday:
      description: Heating circuit friday timer on zone 1.
    Zone1TimerSaturday:
      description: Heating circuit saturday timer on zone 1.
    Zone1TimerSunday:
      description: Heating circuit sunday timer on zone 1.
    Zone1OperativeMode:
      description: Heating circuit operative mode (on/off/day/night).
    ContinuosHeating:
      description: Continuous heating.
    PowerEnergyConsumptionLastMonth:
      description: Power energy consumption from last month.
    PowerEnergyConsumptionThisMonth:
      description: Power energy consumption from the actual month.
    HotWaterTemperature:
      description: Hot water circuit temperature.
    StorageTemperature:
      description: Boiler temperature.
    DesiredStorageTemperature:
      description: Target boiler temperature.
    OutdoorsTemperature:
      description: Temperature used for weather dependent calculations.
    AverageIgnitionTime:
      description: Average flame ignition time (seconds).
    MaximumIgnitionTime:
      description: Maximum flame ignition time (seconds).
    MinimumIgnitionTime:
      description: Minimum flame ignition time (seconds).
    ReturnTemperature:
      description: Temperature returned into heater from water circuit.
    DesiredFlowTemperature:
      description: Target heat temperature.
    FlowTemperature:
      description: Out temperature.
{% endconfiguration %}
