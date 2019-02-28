---
layout: page
title: "TP-Link Smart Home Devices"
description: "Instructions on integrating TP-Link Smart Home Devices to Home Assistant."
date: 2018-09-12 13:00
sidebar: true
comments: false
sharing: true
footer: true
logo: tp-link.png
ha_category: Hub
featured: false
ha_release: 0.89
ha_iot_class: "Local Polling"
redirect_from:
  - /components/switch.tplink/
  - /components/light.tplink/
---

The `tplink` component allows you to control your [TP-Link Smart Home Devices](https://www.tp-link.com/kasa-smart/) such as smart plugs and smart bulbs.

In order to activate the support, you will have to enable the integration inside the config panel.
The supported devices in your network are automatically discovered, but if you want to control devices residing in other networks you will need to configure them manually as shown below.

## {% linkable_title Supported Devices %}

This component supports devices that are controllable with the [KASA app](https://www.tp-link.com/us/kasa-smart/kasa.html).
The following devices are known to work with this component.

### {% linkable_title Plugs %}

- HS100
- HS103
- HS105
- HS110

### {% linkable_title Wall Switches %}

- HS200
- HS210
- HS220 (acts as a light)

### {% linkable_title Bulbs %}

- LB100
- LB110
- LB120
- LB130
- LB230
- KL110
- KL120
- KL130

## {% linkable_title Configuration %}

```yaml
# Example configuration.yaml
tplink:
```

{% configuration %}
discovery:
  description: Whether to do automatic discovery of devices.
  required: false
  type: boolean
  default: true
light:
  description: List of light devices.
  required: false
  type: list
  keys:
    host:
      description: Hostname or IP address of the device.
      required: true
      type: string
switch:
  description: List of switch devices.
  required: false
  type: list
  keys:
    host:
      description: Hostname or IP address of the device.
      required: true
      type: string
{% endconfiguration %}

## {% linkable_title Manual configuration example %}

```yaml
# Example configuration.yaml entry with manually specified addresses
tplink:
  discovery: false
  light:
    - host: 192.168.200.1
    - host: 192.168.200.2
  switch:
    - host: 192.168.200.3
    - host: 192.168.200.4
```

## {% linkable_title Extracting Energy Sensor data %}

In order to get the power consumption readings from supported devices, you'll have to create a [template sensor](/components/switch.template/).
In the example below, change all of the `my_tp_switch`'s to match your device's entity ID.

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

