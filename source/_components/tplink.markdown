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
ha_release: TBD
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
switch:
  description: List of switch devices.
  required: false
  type: list
{% endconfiguration %}

## Configuration

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
