---
title: WiLight
description: Instructions on how to integrate WiLight devices into Home Assistant.
logo: wilight.png
ha_category:
  - Switch
ha_release: 0.109
ha_iot_class: Local Push
ha_domain: wilight
---

The [WiLight](http://www.wilight.com.br) is a family of networkable devices for home automation.


There is currently support for the following device types within Home Assistant:

- [Switch](#switch)

## Switch

This `WiLight` switch platform allow to you control WiLight [devices](http://www.wilight.com.br/).

### Configuration

To enable it, add the following lines to your `configuration.yaml`:

```yaml
# Example configuration.yaml entry
switch:
  - platform: wilight
    host: IP_ADDRESS
    id: 'NUM_SERIAL'
    type: 'TYPE'
    mode: 'MODE_TYPE'
```

{% configuration %}
host:
  description: The hostname/IP address to connect to.
  required: true
  type: string
id:
  description: "Device serial number. Use the following format: `000000000033`."
  required: true
  type: string
type:
  description: "Device type. Choose one from: `0100`, `0102` or `0103`."
  required: true
  type: string
mode:
  description: "Mode of Device type. Depending on type of Device."
  required: true
  type: string
slots:
  description: Friendly names of 1 to 3 slots of WiLight device. If not configured, slot name will be `'WL' + last 6 numbers of WiLight's id + '_{slot_index}'`. e.g 'WL000033_1'
  required: false
  type: map
  keys:
    slot_1:
      description: Friendly names of slot 1
      required: false
      type: string
    slot_2:
      description: Friendly names of slot 2
      required: false
      type: string
    slot_3:
      description: Friendly names of slot 3
      required: false
      type: string
{% endconfiguration %}


  | WiLight Model | Type   | Mode     |
  | ------------- | ------ | -------- |
  | I-100         | `0100` | 1ab00010 |
  | I-102         | `0102` | 1abcde10 |

  Where:

  - a = slot_2 enabled (1) / disabled (0);
  - b = slot_3 enabled (1) / disabled (0);
  - c = slot_1 dimmer (1) / on-off (0);
  - d = slot_2 dimmer (1) / on-off (0);
  - e = slot_3 dimmer (1) / on-off (0).

Example configuration for Model I-100 with slot_2 and slot_3 enabled:

```yaml
switch:
  - platform: wilight
    host: 192.168.1.5
    id: '000000000033'
    type: '0100'
    mode: '11100010'
    slots:
      # friendly name of slots - optional
      # if not set, slot name will be 'WL' + last 6 numbers of WiLight's id + '_{slot_index}'. e.g 'WL000033_1'
      slot_1: 'Celling light'
      slot_2: 'Door light'
      slot_3: 'Stair light'
```
