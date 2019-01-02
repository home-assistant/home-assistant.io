---
layout: page
title: "Utility Meter Sensor"
description: "Instructions on how to integrate Utility Meter Sensor into Home Assistant."
date: 2019-01-02
sidebar: true
comments: false
sharing: true
footer: true
ha_category: Sensor 
ha_release: 0.85
ha_iot_class: "Local Push"
logo: energy_meter.png
ha_qa_scale: internal
---

An `utility meter` sensor provides functionality to track consumptions of various utilities (e.g. energy, gas, water, heating). 

From an user perspective, utility meters operate in cycles (usually monthly) for billing purposes. This sensor will track a source sensor values, automatically resetting the meter based on the configured cycle. On reset an attribute will store the previous meter value, providing the means for comparison operations (e.g. "did I spend more or less this month?") or billing estimation (e.g. through a sensor template that multiplies the metered value per the charged unit amount).

Services to reset and start/pause the meter support complex scenarios such as peak energy tariffs in which during the operation cycle the meter might need to be paused for some time. In these complex scenarios you might need more then one utility meter (e.g. an utility meter for peak hours and a different one for off peak hours).

## {% linkable_title Configuration %}

To enable the Utility Meter Sensor in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: utility_meter 
    source: sensor.energy
    cycle: monthly
```

{% configuration %}
source:
  description: The entity ID of the sensor providing utility readings (energy, water, gas, heating).
  required: true
  type: string
name:
  description: Name to use in the frontend.
  required: false
  default: \<source entity ID\> meter
  type: string
cycle:
  description: How often to reset the counter. Valid values are `hourly`, `daily`, `weekly`, `monthly` and `yearly`.
  required: true
  type: string
offset:
  description: Cycle reset occur at the beginning of the period (0 minutes, 0h00 hours, monday, day 1, January). This option enables the offsetting of these beginnigs.
  required: false
  default: 0
  type: integer
paused:
  description: Utility meters will start collecting information upon creation. If this option is set to true, the meter will start paused.
  required: false
  default: false
  type: boolean 
{% endconfiguration %}

# {% linkable_title Services %}

### {% linkable_title Service `utility_meter_reset` %}

Reset the Utility Meter.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_ids` | no | list of entity_id from utility_meter's to reset 

### {% linkable_title Service `utility_meter_start_pause` %}

This service will toggle the utility meter (collecting vs paused).

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_ids` | no | list of entity_ids of utility_meter's to start/pause 

