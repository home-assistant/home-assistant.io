---
title: WiLight
description: Instructions on how to integrate WiLight devices into Home Assistant.
logo: wilight.png
ha_category:
  - Cover
  - Fan
  - Light
  - Switch
ha_release: 0.109
ha_iot_class: Local Push
ha_domain: wilight
---

The [WiLight](http://www.wilight.com.br) is a family of networkable devices for home automation.


There is currently support for the following device types within Home Assistant:

- [Cover](#cover)
- [Fan](#fan)
- [Light](#light)
- [Switch](#switch)

## Cover

This `WiLight` cover platform allow to you control WiLight cover (shade) devices.

## Fan

This `WiLight` fan platform allow to you control WiLight ceiling fan devices.

## Light

This `WiLight` light platform allow to you control WiLight light switch devices, dimmer or on/off.

## Switch

This `WiLight` switch platform allow to you control WiLight switch devices, for irrigation valves.

### Configuration

To enable it, add the following lines to your `configuration.yaml`:

```yaml
# Example configuration.yaml entry
wilight:
  devices:
    - id: NUM_SERIAL
      host: IP_ADDRESS
      type: TYPE
      mode: MODE_TYPE
```

{% configuration %}
id:
  description: "Device serial number. Use the following format: `000000000033`."
  required: true
  type: string
host:
  description: The hostname/IP address to connect to.
  required: true
  type: string
type:
  description: "Device type. Choose one from: `0100`, `0102`, `0103`, `0104`, `0105` or `0107`."
  required: true
  type: string
mode:
  description: "Mode of Device type. Depending on type of Device."
  required: true
  type: string
items:
  description: Friendly names of 1 to 3 items of WiLight device. If not configured, item name will be `'WL' + WiLight's id + '_{item_index}'`. e.g 'WL000000000033_1'
  required: false
  type: map
  keys:
    item_1:
      description: Friendly names of item 1
      required: false
      type: string
    item_2:
      description: Friendly names of item 2
      required: false
      type: string
    item_3:
      description: Friendly names of item 3
      required: false
      type: string
{% endconfiguration %}


  | WiLight Model | Type   | Mode     | item_1 type | item_2 type | item_2 type |
  | ------------- | ------ | -------- | ----------- | ----------- | ----------- |
  | I-100         | `0100` | 1abcde10 | light       | light       | light       |
  | I-102         | `0102` | 1ab00010 | light       | light       | light       |
  | C-103         | `0103` | 10       | cover       | n/a         | n/a         |
  | V-104         | `0104` | 10       | light       | fan         | n/a         |
  | R-105         | `0105` | 10       | switch      | switch      | n/a         |
  | I-107         | `0107` | 00010    | light       | n/a         | n/a         |

  Where:

  - a = item_2 enabled (1) / disabled (0);
  - b = item_3 enabled (1) / disabled (0);
  - c = item_1 dimmer (1) / on-off (0);
  - d = item_2 dimmer (1) / on-off (0);
  - e = item_3 dimmer (1) / on-off (0).

Example configuration for Model I-102 with item_2 and item_3 enabled:

```yaml
wilight:
  devices:
    - id: '000000000033'
      host: 192.168.1.5
      type: '0102'
      mode: '11100010'
      # friendly name of items - optional
      # if not set, item name will be 'WL' + WiLight's id + '_{item_index}'. e.g 'WL000000000033_1'
      items:
        item_1: 'Celling light'
        item_2: 'Door light'
        item_3: 'Stair light'
```
