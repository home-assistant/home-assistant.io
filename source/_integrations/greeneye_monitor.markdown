---
title: GreenEye Monitor (GEM)
description: Instructions on how to integrate your GreenEye Monitor within Home Assistant.
logo: brultech.png
ha_category:
  - Hub
  - Sensor
  - Energy
ha_release: 0.82
ha_iot_class: Local Push
ha_codeowners:
  - '@jkeljo'
ha_domain: greeneye_monitor
ha_platforms:
  - sensor
---

The [GreenEye Monitor (GEM)](https://www.brultech.com/greeneye/) integration for Home Assistant allows you to create sensors for the various data channels of the GEM. Each current transformer (CT) channel, pulse counter, and temperature sensor appears in Home Assistant as a sensor, and can be used in automations.

This integration does not (yet) support the Energy dashboard and long-term statistics, but we're working on it! 

<div class='note'>
The UI configuration currently does not allow specifying what quantity is being measured by the GEM's pulse counters. If that is needed, use the YAML configuration instead for now.
</div>

{% include integrations/config_flow.md %}

### Configuration details
Set up {{ name }} using the UI as follows:

- Specify an unused port number in the configuration UI
- Configure the GEM(s) to send binary-format packets (for example, "Bin32 NET" for a 32-channel GEM with some channels configured for net metering) to that port on your Home Assistant machine. (These settings are in the "Packet Send" and "Network" pages of the GEM UI.) 
- Home Assistant will automatically add entities for all devices on all GEMs that send data to that port
- Use the Home Assistant entities configuration screen to give entities more meaningful names and disable any that are not needed
- By default, GEM will send updates every 5 seconds. That's a lot of data, and the databases used by the [`recorder`](/integrations/recorder) integration for history don't do well with that much data, so it is recommended to configure the [`influxdb`](/integrations/influxdb) integration and exclude the GEM sensors from `recorder`.

## Migrating from the YAML configuration

If you previously set up {{ name }} via `configuration.yaml`, and you don't need the ability to specify what quantity is being measured by the pulse counters, you may migrate to using the UI configuration instead. This will allow {{ name }} to appear in the list of installed integrations, and will unlock other functionality (such as the Energy dashboard and long-term statistics) in future releases.

Follow these steps to migrate from YAML configuration to UI configuration:

- Run the UI configuration as described above, specifying the same port number that was specified in the YAML configuration
- {{ name }} will then appear in the list of installed integrations. Existing entities will remain unchanged. New entities may be created for sensors that were not previously configured; these entities can be renamed or disabled via Home Assistant's entities configuration UI.

## YAML configuration (don't use this unless you need it)

<div class='note'>
The YAML configuration is being replaced by UI configuration (described above). The only difference between the two right now is that the YAML configuration is able to specify what quantity is being measured by a GEM's pulse counters. If you don't need that, use the UI configuration instead.
</div>

Then specify that port and information about your monitor(s) and the data channels you wish to monitor in your `configuration.yaml`:

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
