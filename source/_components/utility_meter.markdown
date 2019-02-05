---
layout: page
title: "Utility Meter"
description: "Instructions on how to integrate the Utility Meter into Home Assistant."
date: 2019-01-02
sidebar: true
comments: false
sharing: true
footer: true
ha_category: Sensor 
ha_release: 0.87
ha_iot_class: "Local Push"
logo: energy_meter.png
ha_qa_scale: internal
---

The `utility meter` component provides functionality to track consumptions of various utilities (e.g., energy, gas, water, heating). 

From a user perspective, utility meters operate in cycles (usually monthly) for billing purposes. This sensor will track a source sensor values, automatically resetting the meter based on the configured cycle. On reset an attribute will store the previous meter value, providing the means for comparison operations (e.g., "did I spend more or less this month?") or billing estimation (e.g., through a sensor template that multiplies the metered value per the charged unit amount).

Some utility providers have different tariffs according to time/resource availability/etc. The utility meter enables you to define the various tariffs supported by your utility provider and accounts your consumptions in accordance. When tariffs are defined a new entity will show up indicating the current tariff. In order to change the tariff, the user must call a service, usually through an automation that can be based in time or other external source (eg. a REST sensor).


## {% linkable_title Configuration %}

To enable the Utility Meter Sensor in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
utility_meter:
  energy:
    source: sensor.energy_in_kwh
```

{% configuration %}
source:
  description: The entity ID of the sensor providing utility readings (energy, water, gas, heating).
  required: true
  type: string
cycle:
  description: How often to reset the counter. Valid values are `hourly`, `daily`, `weekly`, `monthly` and `yearly`.
  required: true
  type: string
offset:
  description: Cycle reset occur at the beginning of the period (0 minutes, 0h00 hours, Monday, day 1, January). This option enables the offsetting of these beginnings.
  required: false
  default: 0
  type: integer
tariffs:
  description: List of tariffs supported by the utility meter.
  required: false
  default: [] 
  type: list 
{% endconfiguration %}

# {% linkable_title Services %}

### {% linkable_title Service `utility_meter.reset` %}

Reset the Utility Meter. All sensors tracking tariffs will be reset to 0.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | no | String or list of strings that point at `entity_id`s of utility_meters.

### {% linkable_title Service `utility_meter.next_tariff` %}

Change the current tariff to the next in the list. 
This service must be called by the user for the tariff switching logic to occur (e.g. using an automation)

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | no | String or list of strings that point at `entity_id`s of utility_meters.

### {% linkable_title Service `utility_meter.select_tariff` %}

Change the current tariff to the given tariff. 
This service must be called by the user for the tariff switching logic to occur (e.g. using an automation)

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | no | String or list of strings that point at `entity_id`s of utility_meters.
| `tariff` | no | String that is equal to one of the defined tariffs.

# {% linkable_title Advanced Configuration %}

The following configuration shows an example where 2 utility_meters (`daily_energy` and `monthly_energy`) track daily and monthly energy consumptions.

Both track the same sensor (`sensor.energy`) which continously monitors the energy consumed.

4 different sensors will be created, 2 per utility meter and corresponding to each tariff. 
Sensor `sensor.daily_energy_peak`, `sensor.daily_energy_offpeak`, `sensor.monthly_energy_peak` and `sensor.monthly_energy_offpeak` will automatically be created to track the consumption in each tariff for the given cycle. 

`utility_meter.daily_energy` and `utility_meter.monthly_energy` entities will track the current tariff and provide a service to change the tariff.

```yaml
utility_meter:
  daily_energy:
    source: sensor.energy
    cycle: daily 
    tariffs:
      - peak
      - offpeak
  monthly_energy:
    source: sensor.energy
    cycle: monthly
    tariffs:
      - peak
      - offpeak
```

Assuming your energy provider tariffs are time based according to:
- *peak*: from 9h00 to 21h00
- *offpeak*: from 21h00 to 9h00 next day 

a time based automation can be used:

```yaml
automation:  
  trigger:
    - platform: time
      at: '09:00:00'
    - platform: time
      at: '21:00:00'
  action:
    - service: utility_meter.next_tariff
      entity_id: utility_meter.daily_energy 
    - service: utility_meter.next_tariff
      entity_id: utility_meter.monthly_energy
``` 
