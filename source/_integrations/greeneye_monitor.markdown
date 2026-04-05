---
title: GreenEye Monitor (GEM)
description: Instructions on how to integrate your GreenEye Monitor within Home Assistant.
ha_category:
  - Energy
  - Hub
  - Sensor
ha_release: 0.82
ha_iot_class: Local Push
ha_codeowners:
  - '@jkeljo'
ha_domain: greeneye_monitor
ha_platforms:
  - sensor
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

The [GreenEye Monitor (GEM)](https://www.brultech.com/greeneye/) {% term integration %} for Home Assistant allows you to create sensors for the various data channels of the GEM. Each current transformer (CT) channel, pulse counter, and temperature sensor appears in Home Assistant as a sensor, and can be used in automations.

Configure your GEM(s) to produce binary-format packets (for example, "Bin32 NET" for a 32-channel GEM with some channels configured for net metering) and send them to an unused port on your Home Assistant machine. (These settings are in the "Packet Send" and "Network" pages of the GEM UI.) Then specify that port and information about your monitor(s) and the data channels you wish to monitor in your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

```yaml
# Example configuration.yaml entry
greeneye_monitor:
  port: 8000
  monitors:
    - serial_number: "YOUR_SERIAL_NUMBER"
      channels:
        - number: 1
          name: total_power
        - number: 2
          name: solar_panels_power
          net_metering: true
      pulse_counters:
        - number: 1
          name: sprinklers_water_usage
          counted_quantity: "gal"
          counted_quantity_per_pulse: 1
          time_unit: "min"
      temperature_sensors:
        temperature_unit: "C"
        sensors:
          - number: 1
            name: back_porch_temperature
      voltage:
        - number: 1
          name: house_volts
```

By default, GEM will send updates every 5 seconds. That's a lot of data, and the databases used by the [`recorder`](/integrations/recorder) integration for history don't do well with that much data, so it is recommended to configure the [`influxdb`](/integrations/influxdb) integration and exclude the GEM sensors from `recorder`.

{% configuration %}
port:
  description: The port on which Home Assistant should listen for packets from your GEM. Must match the port set in the "Network" tab of the GEM setup UI.
  required: true
  type: string
monitors:
  description: The list of monitors that should appear in Home Assistant. Data from other monitors will be ignored.
  required: false
  type: list
  keys:
    serial_number:
      description: Your 8-digit GEM serial number, as it appears in the UI.
      required: true
      type: string
    channels:
      description: The list of channels that should appear in Home Assistant for this monitor. Data from other channels will be ignored.
      required: false
      type: list
      keys:
        number:
          description: The channel number as it appears in the GEM UI.
          required: true
          type: integer
        name:
          description: The name that should be used for this channel's sensor in Home Assistant.
          required: true
          type: string
        net_metering:
          description: Set to `true` if the channel is configured for net metering in the GEM, otherwise `false`.
          required: false
          type: boolean
          default: false
    voltage:
      description: Configuration for voltage sensor
      required: false
      keys:
        number:
          description: A channel number that exists in the GEM. There is only one voltage sensor on current models of the GEM.
          required: true
          type: integer
        name:
          description: The name that should be used for the voltage sensor in Home Assistant.
          required: true
          type: string
    temperature_sensors:
      description: Configuration for temperature sensors
      required: false
      keys:
        temperature_unit:
          description: The unit of measure to use for the temperature (F or C)
          type: string
          required: true
        sensors:
          description: The list of temperature sensors that should appear in Home Assistant for this monitor. Data from other sensors will be ignored.
          required: true
          type: list
          keys:
            number:
              description: The sensor number as it appears in the GEM UI.
              required: true
              type: integer
            name:
              description: The name that should be used for this sensor in Home Assistant.
              required: true
              type: string
    pulse_counters:
      description: The list of pulse counters that should appear in Home Assistant for this monitor. Data from other pulse counters will be ignored.
      required: false
      type: list
      keys:
        number:
          description: The pulse counter's number as it appears in the GEM UI.
          required: true
          type: integer
        name:
          description: The name that should be used for this pulse counter in Home Assistant.
          required: true
          type: string
        counted_quantity:
          description: The unit being counted by this pulse counter (e.g., gal, L)
          required: true
          type: string
        counted_quantity_per_pulse:
          description: The number of the counted quantity represented by each pulse.
          required: false
          type: float
          default: 1.0
        time_unit:
          description: The time unit to use when computing rates (s, min, or h)
          required: false
          type: string
          default: s
{% endconfiguration %}
