---
title: Utility Meter
description: Instructions on how to integrate the Utility Meter into Home Assistant.
ha_category:
  - Helper
  - Sensor
ha_release: 0.87
ha_iot_class: Local Push
ha_quality_scale: internal
ha_config_flow: true
ha_codeowners:
  - '@dgomes'
ha_domain: utility_meter
ha_platforms:
  - diagnostics
  - select
  - sensor
ha_integration_type: helper
---

The **Utility Meter** {% term integration %} provides functionality to track consumptions of various utilities (e.g., energy, gas, water, heating).

From a user perspective, utility meters operate in cycles (usually monthly) for billing purposes. This sensor will track a source sensor values, automatically resetting the meter based on the configured cycle. On reset an attribute will store the previous meter value, providing the means for comparison operations (e.g., "did I spend more or less this month?") or billing estimation (e.g., through a sensor template that multiplies the metered value per the charged unit amount).

Some utility providers have different tariffs according to time/resource availability/etc. The utility meter enables you to define the various tariffs supported by your utility provider and accounts for your consumption accordingly. When tariffs are defined a new {% term entity %} will show up, indicating the current tariff. In order to change the tariff, the user must perform an action, usually through an automation that can be based on time or other external sources (for example, a REST sensor).

{% note %}
Sensors created with this {% term integration %} are persistent, so values are retained across restarts of Home Assistant. The first cycle for each sensor will be incomplete; a sensor tracking daily usage will start to be accurate the next day after the {% term integration %} was activated. A sensor tracking monthly usage will present accurate data starting the first of the next month after being added to Home Assistant.
{% endnote %}

{% include integrations/config_flow.md %}
{% configuration_basic %}
Name:
  description: The name the sensor should have. It can be changed again later.
Input sensor:
  description: The sensor entity providing utility readings (energy, water, gas, heating).
Meter reset cycle:
  description: >
    How often to reset the counter. If the offered reset cycles do not match
    your use case, consider using the YAML configuration below, which allows
    for creating CRON-style patterns.
Meter reset offset:
  description: >
    Cycle reset occur at the beginning of the period. This option enables
    the offsetting of these beginnings, counted in days. If you need a more
    fine-grained offset, consider using the YAML configuration below, which
    allows for that.
Supported tariffs:
  description: >
    A list of supported tariffs, leave empty if only a single tariff is needed.
Net consumption:
  description: >
    Enable this if you would like to treat the source as a net meter.
    This will allow your counter to go both positive and negative.
Delta values:
  description: >
    Enable this if the source values are delta values since the last reading instead of absolute values. When this option is enabled, each new value received will be added as-is to the utility meter instead of adding the _difference_ between the new value and previous value.
Periodically resetting:
  description: >
    Enable this if the source sensor state is expected to reset to 0, for example, a smart plug that resets on boot.
    When this option is disabled (for example, if the source sensor is a domestic utility meter that never resets during the device's lifetime), the _difference_ between the new value and the last valid value is added to the utility meter, which avoids the loss of a meter reading after the source sensor becomes available after being unavailable.
Sensor always available:
  description: >
    If activated, the sensor will always be available with the last totalized value, even if the source entity is unavailable or unknown.
    You need to understand that with this option activated, when the source entity becomes unavailable, the utility meter sensor will have the last totalized value and will not change until the source entity returns to a valid state.
{% endconfiguration_basic %}

If the meter reset cycle and reset offsets are to limited for your use case,
consider using the YAML configuration below, which support CRON-style patterns
that provide a greater flexibility.

## YAML configuration

Alternatively, this {% term integration %} can be configured and set up manually via YAML
instead. To enable the Integration sensor in your installation, add the
following to your {% term "`configuration.yaml`" %} file:

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
name:
  description: The friendly name to use in the GUI. 
  required: false
  type: string
unique_id:
    description: An ID that uniquely identifies the utility_meter. Set this to a unique value to allow customization through the UI.
    required: false
    type: string
cycle:
  description: How often to reset the counter. Valid values are `quarter-hourly`, `hourly`, `daily`, `weekly`, `monthly`, `bimonthly`, `quarterly` and `yearly`. Cycle value `bimonthly` will reset the counter once in two months.
  required: false
  type: string
offset:
  description: "Cycle reset occur at the beginning of the period (0 minutes, 0h00 hours, Monday, day 1, January). This option enables the offsetting of these beginnings. Supported formats: `offset: 'HH:MM:SS'`, `offset: 'HH:MM'` and Time period dictionary (see example below)."
  required: false
  default: 0
  type: time
  type: integer
cron:
  description: This option is *mutually exclusive* of `cycle` and `offset`. It provides an advanced method of defining when should the counter be reset. It follows common [crontab syntax](https://crontab.guru) but extended to support more advanced scheduling. See the [croniter](https://github.com/kiorky/croniter) library.
  required: true
  type: string
delta_values:
  description: Set this to True if the source values are delta values since the last reading instead of absolute values. When this option is enabled, each new value received will be added as-is to the utility meter instead of adding the _difference_ between the new value and previous value. For example, you should enable this when the source sensor returns readings like "1", "0.5", "0.75" versus "1", "1.5", "2.25".
  required: false
  default: false
  type: boolean
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
periodically_resetting:
  description: Enable this if the source sensor state is expected to reset to 0, for example, a smart plug that resets on boot. When this option is disabled (for example, if the source sensor is a domestic utility meter that never resets during the device's lifetime), the _difference_ between the new value and the last valid value is added to the utility meter, which avoids the loss of a meter reading after the source sensor becomes available after being unavailable.
  required: false
  default: true
  type: boolean
always_available:
  description: If activated, the sensor will always be available with the last totalized value, even if the source entity is unavailable or unknown.
  required: false
  default: false
  type: boolean
{% endconfiguration %}

{% important %}
When using the `offset` configuration parameter, the defined period must not be longer than 28 days.
{% endimportant %}

### Time period dictionary example

```yaml
offset:
  # At least one of these must be specified:
  days: 1
  hours: 0
  minutes: 0
```

## Actions

Some of the actions are only available if tariffs are configured.

### Action `utility_meter.reset`

Reset the Utility Meter. All sensors tracking tariffs will be reset to 0.

| Data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | no | String or list of strings that point at `entity_id`s of utility_meters.

### Action `utility_meter.calibrate`

Calibrate the Utility Meter. Change the value of a given sensor.

| Data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | no | String or list of strings that point at `entity_id`s of utility_meters.
| `value` | no | Number | Value to calibrate the sensor with | 

## Advanced configuration

The following configuration shows an example where 2 utility_meters (`daily_energy` and `monthly_energy`) track daily and monthly energy consumptions.

Both track the same sensor (`sensor.energy`) which continuously monitors the energy consumed.

4 different sensors will be created, 2 per utility meter and corresponding to each tariff.
Sensor `sensor.daily_energy_peak`, `sensor.daily_energy_offpeak`, `sensor.monthly_energy_peak` and `sensor.monthly_energy_offpeak` will automatically be created to track the consumption in each tariff for the given cycle.

The `select.daily_energy` and `select.monthly_energy` select entities will track the current tariff and allow changing the tariff.

```yaml
utility_meter:
  daily_energy:
    source: sensor.energy
    name: Daily Energy
    cycle: daily
    tariffs:
      - peak
      - offpeak
  monthly_energy:
    source: sensor.energy
    name: Monthly Energy
    cycle: monthly
    tariffs:
      - peak
      - offpeak
```

Assuming your energy provider tariffs are time based according to:

- *peak*: from 9h00 to 21h00
- *offpeak*: from 21h00 to 9h00 next day

a time based automation can be used:

{% raw %}

```yaml
automation:
  triggers:
    - trigger: time
      at: "09:00:00"
      variables:
        tariff: "peak"
    - trigger: time
      at: "21:00:00"
      variables:
        tariff: "offpeak"
  actions:
    - action: select.select_option
      target:
        entity_id: select.daily_energy
      data:
        option: "{{ tariff }}"
    - action: select.select_option
      target:
        entity_id: select.monthly_energy
      data:
        option: "{{ tariff }}"
```

{% endraw %}

Assuming your utility provider cycle is offset from the last day of the month

- cycles at 17h00 on the last day of the month

a cron(extended syntax used for last day of month) based utility meter can be used:

```yaml
utility_meter:
  monthly_energy:
    source: sensor.energy
    name: Monthly Energy
    cron: "0 17 L * *"
```

## Advanced configuration for DSMR users

When using the [DSMR integration](/integrations/dsmr) to get data from the utility meter, each tariff (peak and off-peak) has a separate sensor. Additionally, there is a separate sensor for gas consumption. The meter switches automatically between tariffs, so an automation is not necessary in this case. But, you do have to setup a few more instances of the `utility_meter` {% term integration %}.

If you want to create a daily and monthly sensor for each tariff, you have to track separate sensors:

- `sensor.energy_consumption_tarif_1` for tarif 1 power (for example off-peak)
- `sensor.energy_consumption_tarif_2` for tarif 2 power (for example peak)
- `sensor.gas_consumption` for gas consumption

So, tracking daily and monthly consumption for each sensor, will require setting up 6 entries under the `utility_meter` {% term integration %}.

```yaml
utility_meter:
  daily_energy_offpeak:
    source: sensor.energy_consumption_tarif_1
    name: Daily Energy (Offpeak)
    cycle: daily
  daily_energy_peak:
    source: sensor.energy_consumption_tarif_2
    name: Daily Energy (Peak)
    cycle: daily
  daily_gas:
    source: sensor.gas_consumption
    name: Daily Gas
    cycle: daily
  monthly_energy_offpeak:
    source: sensor.energy_consumption_tarif_1
    name: Monthly Energy (Offpeak)
    cycle: monthly
  monthly_energy_peak:
    source: sensor.energy_consumption_tarif_2
    name: Monthly Energy (Peak)
    cycle: monthly
  monthly_gas:
    source: sensor.gas_consumption
    name: Monthly Gas
    cycle: monthly
```

Additionally, you can add template sensors to compute daily and monthly total usage. Important note, in these examples,
we use the `is_number()` [function](/docs/configuration/templating/#numeric-functions-and-filters) to verify the values
returned from the sensors are numeric. If this evalutes to false, `None` is returned.

{% raw %}

```yaml
template:
  - sensor:
    - name: 'Daily Energy Total'
      device_class: energy
      unit_of_measurement: kWh
      state: >
        {% if is_number(states('sensor.daily_energy_offpeak')) and is_number(states('sensor.daily_energy_peak')) %}
          {{ states('sensor.daily_energy_offpeak') | float + states('sensor.daily_energy_peak') | float }}
        {% else %}
          None
        {% endif %}

    - name: 'Monthly Energy Total'
      device_class: energy
      unit_of_measurement: kWh
      state: >
        {% if is_number(states('sensor.monthly_energy_offpeak')) and is_number(states('sensor.monthly_energy_peak')) %}
          {{ states('sensor.monthly_energy_offpeak') | float + states('sensor.monthly_energy_peak') | float }}
        {% else %}
          None
        {% endif %}
```

{% endraw %}
