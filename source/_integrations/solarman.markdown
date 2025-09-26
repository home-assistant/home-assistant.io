---
title: Solarman
description: Instructions on how to integrate your Solarman device with Home Assistant.
ha_release: 2025.8
ha_category:
  - Energy
ha_iot_class: Local Polling
ha_codeowners:
  - '@solarmanpv'
ha_platforms:
  - sensor
  - switch
ha_domain: solarman
ha_integration_type: integration
---

The Solarman integration {% term integration %} enables direct local communication between Home Assistant and your [Solarman](https://www.solarmanpv.com/) devices. This solution provides real-time monitoring of energy production and consumption while enabling device control, all through secure local communication.

## Use cases

- Monitor energy usage in real time.
- Control devices remotely.
- Automate schedules for your appliances.


## Supported devices

Currently, the integration supports the following devices:

- SP-2W-EU: Smart Plug for energy monitoring (power consumption, voltage, current) and remote outlet control.
- P1-2W: P1 Meter Reader for monitoring operating status and consumption data of P1 meter.
- MR1-D5-W/MR1-D5-WR: Smart Meter for bidirectional energy metering in residential and small commercial and industrial scenarios.


## Prerequisites

1. Connect your Solarman device and Home Assistant to the same local network.
2. Ensure the Solarman device is powered on and has acquired a network IP address. You can get the IP from app or your router.
3. Enable the device's API through app.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Host:
  description: "The IP address of your device. You can find it in your router or in app."
Host:
  description: "The TCP port of the device, 8080 by deault."
Scan Interval:
  description: "The polling interval in seconds."
{% endconfiguration_basic %}


## Supported functionality

The Solarman integration mainly provides sensors about what your device is measuring.

### SP-2W-EU

- Power (W)
- Voltage (V)
- Current (A)
- Positive Active Energy (kWh)
- Reverse Active Energy (kWh)

SP-2W-EU also has a switch to control the outlet state.

- Switch: Controls the outlet state of the plug.

### P1-2W

- SN
- device_version
- device_type
- total_act_energy_LT
- total_act_energy_NT
- total_act_ret_energy_LT
- total_act_ret_energy_NT
- a_current
- b_current
- c_current
- a_voltage
- b_voltage
- c_voltage
- total_act_power
- total_act_ret_power
- a_act_power
- b_act_power
- c_act_power
- a_act_ret_power
- b_act_ret_power
- c_act_ret_power
- total_gas

### MR1-D5-W/MR1-D5-WR

- SN
- voltage
- current
- active power
- apparent power
- reactive power
- power factor
- frequency
- total_act_energy
- total_act_ret_energy


## Data updates

The **Solarman integration** integration {% term polling polls %} data from the device every 30 seconds by default. You can define it by changing Scan Interval during integration setup.


## Examples

### Turning on switch at sunset

{% raw %}

```yaml

alias: Turn on switch at sunset
triggers:
  - trigger: sun
    event: sunset
actions:
  - action: switch.turn_on
    target:
      entity_id: switch.smart_plug_smart_plug
    data: {}

```

{% endraw %}


## Known limitations

The integration does not provide the ability to configure the devices, which can instead be done via the manufacturer's app.


## Troubleshooting

### Cannot add device or obtain data

1. Ensure the device is powered on and functioning normally.
2. Confirm both the device and Home Assistant are connected to the same local network.
3. Ensure the device's IP address is correct and hasn't changed.
4. Check the device's settings in app to ensure that the API is enabled.

Check the Home Assistant logs for more information.


## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}
