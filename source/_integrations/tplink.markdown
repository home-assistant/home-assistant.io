---
title: TP-Link Kasa Smart
description: Instructions on integrating TP-Link Smart Home Devices to Home Assistant.
ha_category:
  - Hub
  - Switch
  - Light
ha_release: 0.89
ha_iot_class: Local Polling
ha_config_flow: true
ha_codeowners:
  - '@rytilahti'
  - '@thegardenmonkey'
ha_domain: tplink
ha_platforms:
  - light
  - switch
---

The `tplink` integration allows you to control your [TP-Link Smart Home Devices](https://www.tp-link.com/kasa-smart/) such as smart plugs and smart bulbs.

There is currently support for the following device types within Home Assistant:

- **Light**
- **Switch**

In order to activate the support, you will have to enable the integration inside the configuration panel.
The supported devices in your network are automatically discovered, but if you want to control devices residing in other networks you will need to configure them manually as shown below.

## Supported Devices

This integration supports devices that are controllable with the [KASA app](https://www.tp-link.com/us/kasa-smart/kasa.html).
The following devices are known to work with this component.

### Plugs

Plugs are type `switch` when autodiscovery has been disabled.

- HS100
- HS103
- HS105
- HS110 (This device is capable of reporting energy usage data to template sensors)
- KP105
- KP115

### Strip (Multi-Plug)

- HS107 (indoor 2-outlet)
- HS300 (powerstrip 6-outlet) (This device is capable of reporting energy usage data to template sensors)
- KP303 (powerstrip 3-outlet)
- KP400 (outdoor 2-outlet)
- KP200 (indoor 2-outlet)

### Wall Switches

- HS200
- HS210
- HS220 (acts as a light)

### Bulbs

- LB100
- LB110
- LB120
- LB130
- LB230
- KL110
- KL120
- KL130

## Configuration

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
strip:
  description: List of multi-outlet on/off switch devices.
  required: false
  type: list
  keys:
    host:
      description: Hostname or IP address of the device.
      required: true
      type: string
switch:
  description: List of on/off switch devices.
  required: false
  type: list
  keys:
    host:
      description: Hostname or IP address of the device.
      required: true
      type: string
dimmer:
  description: List of dimmable switch devices.
  required: false
  type: list
  keys:
    host:
      description: Hostname or IP address of the device.
      required: true
      type: string
{% endconfiguration %}

## Manual configuration example

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
  dimmer:
    - host: 192.168.200.5
    - host: 192.168.200.6
  strip:
    - host: 192.168.200.7
    - host: 192.168.200.8
```

## Extracting Energy Sensor data

Devices that are confirmed to support Consumption Reading;
1. HS110
2. HS300
3. KP115

In order to get the power consumption readings from a TP-Link HS110 device, you'll have to create a [template sensor](/integrations/template/).
In the example below, change all of the `my_tp_switch`'s to match your device's entity ID (without the domain). For example, if your entity is `switch.whale_heater` then replace `my_tp_switch` with `whale_heater`:

{% raw %}

```yaml
sensor:
  - platform: template
    sensors:
      my_tp_switch_amps:
        friendly_name_template: "{{ state_attr('switch.my_tp_switch','friendly_name') }} Current"
        value_template: "{{ state_attr('switch.my_tp_switch','current_a') | float }}"
        unit_of_measurement: "A"
      my_tp_switch_watts:
        friendly_name_template: "{{ state_attr('switch.my_tp_switch','friendly_name') }} Current Consumption"
        value_template: "{{ state_attr('switch.my_tp_switch','current_power_w') | float }}"
        unit_of_measurement: "W"
      my_tp_switch_total_kwh:
        friendly_name_template: "{{ state_attr('switch.my_tp_switch','friendly_name') }} Total Consumption"
        value_template: "{{ state_attr('switch.my_tp_switch','total_energy_kwh') | float }}"
        unit_of_measurement: "kWh"
      my_tp_switch_volts:
        friendly_name_template: "{{ state_attr('switch.my_tp_switch','friendly_name') }} Voltage"
        value_template: "{{ state_attr('switch.my_tp_switch','voltage') | float }}"
        unit_of_measurement: "V"
      my_tp_switch_today_kwh:
        friendly_name_template: "{{ state_attr('switch.my_tp_switch','friendly_name') }} Today's Consumption"
        value_template: "{{ state_attr('switch.my_tp_switch','today_energy_kwh') | float }}"
        unit_of_measurement: "kWh"
```

{% endraw %}
