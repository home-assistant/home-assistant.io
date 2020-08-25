---
title: GoalZero
description: Instructions on how to integrate Goal Zero Yeti with Home Assistant
ha_category:
  - Energy
ha_release: 0.115
ha_domain: goalzero
---

This `goalzero` sensor and switch platforms pulls data from a Wifi enabled Yeti.

The switch platform creates a switch for the 12V, 5V, and AC outputs.

## Configuration

To use your Goal Zero sensor in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
switch:
  - platform: goalzero
    host: 192.168.0.10
```
```yaml
# Example configuration.yaml ent
sensor:
  - platform: goalzero
    host: 192.168.0.10
```

{% configuration %}
host:
  required: true
  type: string
  description: The IP address of the Goal Zero Yeti.
monitored_conditions:
  required: false
  type: list
  description: Conditions to display on the frontend.
  keys:
    backlight:
      description: Whether the LCD backlight is on.
    app_online:
      description: Whether the phone app is in use.
    wattsIn:
      description: Current watts in.
    ampsIn:
      description: Current amps in.
    wattsOut:
      description: Current watts out.
    ampsOut:
      description: Current amps out.
    whOut:
      description: Total watt/hours spent.
    whStored:
      description: Watt/hours remaining.
    volts:
      description: Battery voltage.
    socPercent:
      description: Percent battery remaining.
    isCharging:
      description: Whether the battery is charging.
    timeToEmptyFull:
      description: Time to empty with discharging. Time to full when charging.
    temperature:
      description: Battery temperature.
    wifiStrength:
      description: Wifi Strength.
    timestamp:
      description: System time up in seconds.
{% endconfiguration %}

## Examples

In this section you find a real-life example of how to use these sensors and switches.

### Get Battery Percentage

```yaml
# Example configuration.yaml entry
switch:
  - platform: goalzero
    name: Yeti
    host: 192.168.0.10
```
```yaml
# Example configuration.yaml entry
sensor:
  - platform: goalzero
    name: Yeti
    host: 192.168.0.10
    monitored_variables:
      - 'socPercent'
```
