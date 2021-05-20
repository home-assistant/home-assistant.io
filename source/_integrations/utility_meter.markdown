---
title: Utility Meter
description: Instructions on how to integrate the Utility Meter into Home Assistant.
ha_category:
  - Sensor
ha_release: 0.87
ha_iot_class: Local Push
ha_quality_scale: internal
ha_codeowners:
  - '@dgomes'
ha_domain: utility_meter
ha_platforms:
  - sensor
---

The `utility meter` integration provides functionality to track consumptions of various utilities (e.g., energy, gas, water, heating).

From a user perspective, utility meters operate in cycles (usually monthly) for billing purposes. This sensor will track a source sensor values, automatically resetting the meter based on the configured cycle. On reset an attribute will store the previous meter value, providing the means for comparison operations (e.g., "did I spend more or less this month?") or billing estimation (e.g., through a sensor template that multiplies the metered value per the charged unit amount).

Some utility providers have different tariffs according to time/resource availability/etc. The utility meter enables you to define the various tariffs supported by your utility provider and accounts your consumptions in accordance. When tariffs are defined a new entity will show up indicating the current tariff. In order to change the tariff, the user must call a service, usually through an automation that can be based in time or other external source (eg. a REST sensor).

<div class='note'>
Sensors created with this integration are persistent, so values are retained across restarts of Home Assistant. The first cycle for each sensor will be incomplete; a sensor tracking daily usage will start to be accurate the next day after the integration was activated. A sensor tracking monthly usage will present accurate data starting the first of the next month after being added to Home Assistant.
</div>

## Configuration

To enable the Utility Meter Sensor in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
utility_meter:
  energy:
    source: sensor.energy_in_kwh
    cycle: monthly
```

{% configuration %}
source:
  description: The entity ID of the sensor providing utility readings (energy, water, gas, heating).
  required: true
  type: string
cycle:
  description: How often to reset the counter. Valid values are `quarter-hourly`, `hourly`, `daily`, `weekly`, `monthly`, `bimonthly`, `quarterly` and `yearly`. Cycle value `bimonthly` will reset the counter once in two months.
  required: true
  type: string
offset:
  description: "Cycle reset occur at the beginning of the period (0 minutes, 0h00 hours, Monday, day 1, January). This option enables the offsetting of these beginnings. Supported formats: `offset: 'HH:MM:SS'`, `offset: 'HH:MM'` and Time period dictionary (see example below)."
  required: false
  default: 0
  type: time
  type: integer
net_consumption:
  description: Set this to True if you would like to treat the source as a net meter. This will allow your counter to go both positive and negative.
  required: false
  default: false
  type: boolean
tariffs:
  description: List of tariffs supported by the utility meter.
  required: false
  default: []
  type: list
{% endconfiguration %}

### Time period dictionary example

```yaml
offset:
  # At least one of these must be specified:
  days: 1
  hours: 0
  minutes: 0
```

## Services

Some of the services are only available if tariffs are configured.

### Service `utility_meter.reset`

Reset the Utility Meter. All sensors tracking tariffs will be reset to 0.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | no | String or list of strings that point at `entity_id`s of utility_meters.

### Service `utility_meter.calibrate`

Calibrate the Utility Meter. Change the value of a given sensor.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | no | String or list of strings that point at `entity_id`s of utility_meters.
| `value` | no | Number | Value to calibrate the sensor with | 

### Service `utility_meter.next_tariff`

Change the current tariff to the next in the list.
This service must be called by the user for the tariff switching logic to occur (e.g.,  using an automation)

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | no | String or list of strings that point at `entity_id`s of utility_meters.

### Service `utility_meter.select_tariff`

Change the current tariff to the given tariff.
This service must be called by the user for the tariff switching logic to occur (e.g.,  using an automation)

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | no | String or list of strings that point at `entity_id`s of utility_meters.
| `tariff` | no | String that is equal to one of the defined tariffs.

# Advanced Configuration

The following configuration shows an example where 2 utility_meters (`daily_energy` and `monthly_energy`) track daily and monthly energy consumptions.

Both track the same sensor (`sensor.energy`) which continuously monitors the energy consumed.

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
      at: "09:00:00"
    - platform: time
      at: "21:00:00"
  action:
    - service: utility_meter.next_tariff
      target:
        entity_id: utility_meter.daily_energy
    - service: utility_meter.next_tariff
      target:
        entity_id: utility_meter.monthly_energy
```

## Advanced Configuration for DSMR users

When using the [DSMR component](/integrations/dsmr) to get data from the utility meter, each tariff (peak and off-peak) has a separate sensor. Additionally, there is a separate sensor for gas consumption. The meter switches automatically between tariffs, so an automation is not necessary in this case. But, you do have to setup a few more instances of the `utility_meter` component.

If you want to create a daily and monthly sensor for each tariff, you have to track separate sensors:

- `sensor.energy_consumption_tarif_1` for tarif 1 power (for example off-peak)
- `sensor.energy_consumption_tarif_2` for tarif 2 power (for example peak)
- `sensor.gas_consumption` for gas consumption

So, tracking daily and monthly consumption for each sensor, will require setting up 6 entries under the `utility_meter` component.

```yaml
utility_meter:
  daily_energy_offpeak:
    source: sensor.energy_consumption_tarif_1
    cycle: daily
  daily_energy_peak:
    source: sensor.energy_consumption_tarif_2
    cycle: daily
  daily_gas:
    source: sensor.gas_consumption
    cycle: daily
  monthly_energy_offpeak:
    source: sensor.energy_consumption_tarif_1
    cycle: monthly
  monthly_energy_peak:
    source: sensor.energy_consumption_tarif_2
    cycle: monthly
  monthly_gas:
    source: sensor.gas_consumption
    cycle: monthly
```

Additionally, you can add template sensors to compute daily and monthly total usage.

{% raw %}

```yaml
sensor:
  - platform: template
    sensors:
      daily_energy:
        friendly_name: Daily Energy
        unit_of_measurement: kWh
        value_template: "{{ states('sensor.daily_energy_offpeak')|float + states('sensor.daily_energy_peak')|float }}"
      monthly_energy:
        friendly_name: Monthly Energy
        unit_of_measurement: kWh
        value_template: "{{ states('sensor.monthly_energy_offpeak')|float + states('sensor.monthly_energy_peak')|float }}"
```

{% endraw %}
