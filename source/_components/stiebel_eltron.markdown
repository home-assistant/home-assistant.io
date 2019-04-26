---
layout: page
title: "STIEBEL ELTRON"
description: "Instructions on how to integrate STIEBEL ELTRON integral ventilation and heat pump units into Home Assistant."
date: 2019-04-14 21:00 +0200
sidebar: true
comments: false
sharing: true
footer: true
logo: stiebel_eltron.png
ha_category:
  - Climate
ha_release: 0.92
ha_iot_class: Local Polling
---

The `stiebel_eltron` component lets you control integral ventilation or heat pump units of [STIEBEL ELTRON](https://www.stiebel-eltron.com).

It requires the following components:

- Compatible STIEBEL ELTRON unit (see "Compatibility overview" in [Software Documentation Modbus TCP/IP](https://www.stiebel-eltron.ch/content/dam/ste/ch/de/downloads/kundenservice/smart-home/Modbus/Modbus%20Bedienungsanleitung.pdf))
- [ISG web](https://www.stiebel-eltron.com/en/home/products-solutions/renewables/controller_energymanagement/internet_servicegateway/isg_web.html), with the [Modbus module](https://www.stiebel-eltron.ch/de/home/service/smart-home/modbus.html) enabled
- IP network connection to the ISG web

## {% linkable_title Supported units %}

By now, the following units are tested:

- LWZ504e
- LWZ304

## {% linkable_title Operation modes %}

Only the standard HA operation modes are supported. The STIEBEL ELTRON modes are mapped and configurable as follows:

- Auto (STATE_AUTO): Automatic mode
- Eco (STATE_ECO): Standby mode
- Manual (STATE_MANUAL): Manual mode
- Off (STATE_OFF): DHW mode (domestic hot water mode, heating is switched off)

The HA operation mode 'On' is displayed, if the following STIEBEL ELTRON modes are configured directly on the unit:

- On (STATE_ON): Day mode, Setback mode or Emergency operation

## {% linkable_title Configuration %}

To enable this component, add the following lines to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
stiebel_eltron:
  name: LWZ504e
```

{% configuration %}
name:
  description: Displayed name of the unit.
  required: false
  default: Unnamed Device
  type: string
hub:
  description: The name of the hub where this slave is located.
  required: false
  default: default
  type: string
{% endconfiguration %}

<p class='note'>
This component requires the [Modbus](/components/modbus/) component to be set up to work
</p>

Full configuration example including modbus setup shown below:

```yaml
# Full example configuration.yaml entry
modbus:
  type: tcp
  host: YOUR_ISGWEB_IP
  port: 502

stiebel_eltron:
  name: LWZ504e
```
