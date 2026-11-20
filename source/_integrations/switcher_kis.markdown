---
title: Switcher
description: Integrate Switcher devices.
ha_category:
  - Climate
  - Cover
  - Sensor
  - Switch
ha_release: 0.93
ha_iot_class: Local Push
ha_codeowners:
  - '@thecode'
  - '@YogevBokobza'
ha_domain: switcher_kis
ha_platforms:
  - button
  - climate
  - cover
  - diagnostics
  - light
  - sensor
  - switch
ha_config_flow: true
ha_integration_type: hub
ha_quality_scale: silver
---

The **Switcher** {% term integration %} allows you to control your [Switcher Devices](https://www.switcher.co.il/).

Supported devices:

- Switcher Power Plug
- Switcher Touch (from firmware 1.51)
- Switcher V2 (Espressif chipset - from firmware 3.21)
- Switcher V2 (Qualcomm chipset - from firmware 72.32)
- Switcher V4
- Switcher Mini
- Switcher Breeze
- Switcher Runner
- Switcher Runner S11
- Switcher Runner S12
- Switcher Light SL01
- Switcher Light SL01 Mini
- Switcher Light SL02
- Switcher Light SL02 Mini
- Switcher Light SL03
- Switcher Heater

Devices that require a token:

- Switcher Runner S11
- Switcher Runner S12
- Switcher Light SL01
- Switcher Light SL01 Mini
- Switcher Light SL02
- Switcher Light SL02 Mini
- Switcher Light SL03
- Switcher Heater

If you completed the integration setup but are still unable to control the device, please make sure your device's firmware is up-to-date.

## Prerequisites

Before the integration can find a device, you need to connect it to your network using the Switcher app.

To enhance security, certain Switcher devices require a token for operation. To integrate your token-based Switcher devices with Home Assistant, you'll need the following information:

- **The username of your Switcher Account**: To find the username, open the Switcher app.
- **Local control key token**: To find the local control key token, browse to the
  [Switcher GetKey API][token], enter your Switcher account username (which is an email address), and press
  **Send Me The Code**.

  The token will be sent to you by email. It will look something like this: `zvVvd7JxtN7CgvkD1Psujw==`

[token]: https://switcher.co.il/GetKey/

{% include integrations/config_flow.md %}

## Buttons

For Switcher Breeze the integration provides the following buttons:

- For devices that are also controlled in other ways or often go out of sync with Switcher Breeze, there are `Assume on` & `Assume off` buttons which you can use to can tell Switcher Breeze if your device is currently running or not without sending a new command to the device.

- For devices which do not support swing status for the vertical swing, the integration provides separate `Vertical swing on` & `Vertical swing off` buttons.

## Covers

For Switcher cover control devices (Switcher Runner, Switcher Runner S11, Switcher Runner S12) the integration allows you to control its covers open/close state, set specific covers position and get information about the cover direction (UP/DOWN/STOP).

## Lights

For Switcher light control devices (Switcher Runner S11, Switcher Runner S12, and Switcher Lights), the integration allows you to control its lights on/off state.
  
## Sensors

For Switcher power control devices (Switcher Power Plug, Switcher Touch, Switcher V2/V4, Switcher Heater), the integration provides the following sensors:

- **Shutdown time**: The date and time when the device will turn off, either by auto shutdown or by a timer. The sensor is unknown when no timer is running. Not available for Switcher Power Plug.
- **Auto-off**: The auto shutdown time limit configured on the device, shown in minutes by default. This sensor is disabled by default. Not available for Switcher Power Plug.
- **Electric current**: The electric current in amperes, for example 12.5 A.
- **Power consumption**: The power consumption in watts, for example 2756 W.

For Switcher Breeze, the integration provides the following sensor:

- **Current temperature**: The current temperature in degrees Celsius, for example 25.0 °C.

## Switches

For Switcher cover control devices (Switcher Runner, Switcher Runner S11, Switcher Runner S12), the integration allows you to control its child lock state; ON means locked, and OFF means unlocked.

{% include integrations/actions.md %}

## Examples

### Show the remaining time as a countdown

The **Shutdown time** sensor shows when the device will turn off. If you prefer a countdown in `HH:MM:SS` format, you can create a [template sensor](/integrations/template/) based on the **Shutdown time** sensor. The example below updates every 5 seconds and shows `00:00:00` when no timer is running. Replace `sensor.water_heater_shutdown_time` with the entity ID of your **Shutdown time** sensor.

Add the following to your {% term "`configuration.yaml`" %}:
{% include integrations/restart_ha_after_config_inclusion.md %}

```yaml
template:
  - triggers:
      - trigger: time_pattern
        seconds: "/5"
      - trigger: state
        entity_id: sensor.water_heater_shutdown_time
    sensor:
      - name: "Water heater remaining time"
        unique_id: water_heater_remaining_time
        icon: mdi:av-timer
        state: >
          {% set entity = 'sensor.water_heater_shutdown_time' %}
          {% set s = 0 %}
          {% if has_value(entity) %}
            {% set left = states(entity) | as_datetime - now() %}
            {% set s = [left.total_seconds() | int, 0] | max %}
          {% endif %}
          {{ '%02d:%02d:%02d' % (s // 3600, s % 3600 // 60, s % 60) }}
```

## Notes

Make sure that Home Assistant host's firewall allows incoming traffic on UDP ports 10002, 10003, 20002 & 20003 and outgoing connections to Switcher device(s) on TCP ports 9957 & 10000.
If Home Assistant and the Switcher device(s) are not on the same network, you will also need to have their traffic properly forwarded between the two networks.

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
