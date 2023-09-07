---
title: FlexMeasures
description: Use FlexMeasures flexible energy asset in Home Assistant 
ha_category:
  - Energy
ha_release: "2023.9"
ha_iot_class: Cloud Polling
ha_codeowners:
  - '@victorgarcia98'
  - '@GustaafL'
  - '@Flix6x'
ha_domain: flexmeasures
ha_platforms:
  - sensor
ha_integration_type: integration
ha_config_flow: true
ha_quality_scale: silver
---




The `flexmeasures` integration offers an integration with [FlexMeasures](https://flexmeasures.io/) instances to schedule flexible energy assets.

FlexMeasures can be used to schedule batteries, EV's, heat storage, and other assets. The current integration only support car batteries and batteries optimizations. Shiftable energy assets like dishwashing machines are currently not supported in the integration. The integration offers the following sensor and services:

- A sensor for flexible asset schedules
- A service to retrieve a schedule
- A service to post measurements to a FlexMeasures instance
- A service to change an S2 control type



To add this integration the following configuration input is needed:

```yaml
# Example configuration.yaml entry
flexmeasures:
  host: "FLEXMEASURES_INSTANCE"
  username: "USERNAME"
  password: "PASSWORD"
  power_sensor: "POWER_SENSOR_ID"
  consumption_price_sensor: "CONSUMPTION_PRICE_SENSOR_ID"
  production_price_sensor: "PRODUCTION_PRICE_SENSOR_ID"
  soc_sensor: "STATE_OF_CHARGE_SENSOR_ID"
  rm_discharge_sensor: "RESOURCE_MANAGER_DISCHARGE_SENSOR_ID"
  schedule_duration: "SCHEDULE_DURATION"
  soc_unit: "STATE_OF_CHARGE_UNIT"
  soc_min: "STATE_OF_CHARGE_MINIMUM"
  soc_max: "STATE_OF_CHARGE_MAXIMUM"
```

{% configuration %}
host:
  description: URI of the FlexMeasures instance, for instance (flexmeasures.io)
  required: true
  type: string
username:
  description: The username associated with the FlexMeasures instance account.
  required: true
  type: string
password:
  description: The password with the FlexMeasures instance account.
  required: true
  type: string
power_sensor:
  description: The power sensor that will be scheduled to draw or supply power.
  required: true
  type: integer
consumption_price_sensor:
  description: The price sensor for the consumption of power to use for the optimization.
  required: true
  type: integer
production_price_sensor:
  description: The price sensor for the production of power to use for the optimization (this can be the same as the consumption price sensor).
  required: true
  type: integer
soc_sensor:
  description: The state of charge sensor of the flexible energy asset.
  required: true
  type: integer
rm_discharge_sensor:
  description: The resource manager discharge sensor.
  required: true
  type: integer
schedule_duration:
  description: The duration for which the schedules should be calculated in hours.
  required: true
  default: 24
  type: integer
soc_unit:
  description: The state of charge unit of energy.
  required: true
  default: kWh
  type: string
soc_min:
  description: The minimal state of charge that the flexible energy asset is allowed to reach.
  required: true
  type: float
soc_max:
  description: The maximum state of charge that the flexible energy asset is allowed to reach.
  required: true
  type: float
{% endconfiguration %}

{% include integrations/config_flow.md %}

## Schedule Sensor

The Flexmeasures Schedule sensor shows the values of the power draw or supply at the start of each interval. It contains a startdatetime, unit of measurement, and a device class as well. The schedule is automatically shifted up to be in line with the sensor resolution. 

```yaml
schedule:
  - start: '2023-09-04T17:45:00+02:00'
    value: -0.5
  - start: '2023-09-04T18:00:00+02:00'
    value: -0.5
start: '2023-09-04T17:45:00+02:00'
unit_of_measurement: MWh
device_class: energy
friendly_name: FlexMeasures Schedule
```

## The scheduling service

For a schedule to be calculated a `soc_at_start` is required. All other variables needed to calculate a new schedule were provided in the configuration. The following `yaml` file will trigger a schedule and update the sensor:

```yaml
service: flexmeasures.trigger_and_get_schedule
data:
  soc_at_start: "FLOAT_SOC_AT_START"
```

## Automate scheduling

The intended usage of FlexMeasures is letting the schedules and Home Assistant optimize the flexible energy assets without user interaction. Automations can be used to trigger new schedules when new information is available that would impact the schedule. Some examples of events that should trigger the request of new schedules are when the battery/asset is connected, when new prices are available, and periodically to match the executed schedule to the calculated schedule. The user will need to provide a Home Assistant entity as a `soc_at_start` to be used for triggering a schedule. This is an example `yaml` for the action set in the automations:

```yaml
service: flexmeasures.trigger_and_get_schedule
data:
  soc_at_start: "\{\{ state_attr('SENSOR_TYPE.SENSOR', 'SENSOR_ATTRIBUTES') }}"
```

## Posting measurement data

FlexMeasures needs data to calculate the optimal schedules for flexible assets. This data can be posted to the FlexMeasures instance using the `flexmeasures` integration. To post data the following `yaml` can be used:

```yaml
service: flexmeasures.post_measurements
data:
  sensor_id: SENSOR_TO_POST_DATA_TO_INT
  start: "DATETIME_STRING_OF_FIRST_DATA_POINT"
  duration: "DATETIME_DURATION_STRING_FOR_THE_COLLECTED_VALUES"
  unit: "SENSOR_UNIT_OF_THE_VALUES"
  prior: "DATETIME_STRING_AT_WHICH_THE_VALUES_WERE_RECORDED_OR_FORECASTED"
```

##S2 Protocol

The S2 Protocol is a flexibility description protocol that allows a resource manager share their preferences with solutions that optimize energy assets (the Customer Energy Managers).

This integration allows to have FlexMeasures exposed as a Customer Energy Manager just in HomeAssistant. That way, users can change the control type of a resource manager in HA interface.
Changing the control type

A user can use the service change_control_type to change the control type of the resource manager, for example:

```yaml
service: flexmeasures.change_control_type
data:
  control_type: "FILL_RATE_BASED_CONTROL"
```
