---
layout: page
title: "TP-Link Switch"
description: "Instructions on how to integrate TP-Link switches into Home Assistant."
date: 2016-07-13 08:00
sidebar: true
comments: false
sharing: true
footer: true
logo: tp-link.png
ha_category: Switch
ha_iot_class: "Local Polling"
ha_release: "0.24"
---

The `tplink` switch platform allows you to control the state of your [TP-Link smart switch](http://www.tp-link.com/en/products/list-5258.html).

Supported units:

- HS100
- HS103
- HS105
- HS110
- HS200

## {% linkable_title Configuration %}

To use your TP-Link switch or socket in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
switch:
  - platform: tplink
    host: IP_ADDRESS
```

{% configuration %}
name:
  description: The name to use when displaying this switch.
  required: false
  type: string
  default: TP-Link Switch
host:
  description: "The IP address of your TP-Link switch, eg. `192.168.1.32`."
  required: true
  type: string
enable_leds:
  description: If the LEDs on the switch (WiFi and power) should be lit.
  required: false
  type: boolean
{% endconfiguration %}

## {% linkable_title Adding multiple switches %}

You may need to add [multiple switches](https://community.home-assistant.io/t/multiple-tp-link-switches/6935) and the config would need to include multiple switches separately.

```yaml
# Example configuration.yaml entry
switch:
  - platform: tplink
    host: FIRST_IP_ADDRESS
  - platform: tplink
    host: SECOND_IP_ADDRESS
```

## {% linkable_title Configure Energy Sensors %} ##

In order to get the power consumption readings from the HS110, you'll have to create a [template sensor](/components/switch.template/). In the example below, change all of the `my_tp_switch`'s to match your switch's entity ID.

{% raw %}
```yaml
sensor:
  - platform: template
    sensors:
      my_tp_switch_amps:
        friendly_name_template: "{{ states.switch.my_tp_switch.name}} Current"
        value_template: '{{ states.switch.my_tp_switch.attributes["current_a"] | float }}'
        unit_of_measurement: 'A'
      my_tp_switch_watts:
        friendly_name_template: "{{ states.switch.my_tp_switch.name}} Current Consumption"
        value_template: '{{ states.switch.my_tp_switch.attributes["current_power_w"] | float }}'
        unit_of_measurement: 'W'
      my_tp_switch_total_kwh:
        friendly_name_template: "{{ states.switch.my_tp_switch.name}} Total Consumption"
        value_template: '{{ states.switch.my_tp_switch.attributes["total_energy_kwh"] | float }}'
        unit_of_measurement: 'kWh'
      my_tp_switch_volts:
        friendly_name_template: "{{ states.switch.my_tp_switch.name}} Voltage"
        value_template: '{{ states.switch.my_tp_switch.attributes["voltage"] | float }}'
        unit_of_measurement: 'V'
      my_tp_switch_today_kwh:
        friendly_name_template: "{{ states.switch.my_tp_switch.name}} Today's Consumption"
        value_template: '{{ states.switch.my_tp_switch.attributes["today_energy_kwh"] | float }}'
        unit_of_measurement: 'kWh'
```
{% endraw %}
