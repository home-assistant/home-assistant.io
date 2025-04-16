---
title: STIEBEL ELTRON
description: Instructions on how to integrate STIEBEL ELTRON integral ventilation and heat pump units into Home Assistant.
ha_category:
  - Climate
ha_release: 0.92
ha_iot_class: Local Polling
ha_codeowners:
  - '@fucm'
ha_domain: stiebel_eltron
ha_platforms:
  - climate
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

The `stiebel_eltron` {% term integration %} lets you control integral ventilation or heat pump units of [STIEBEL ELTRON](https://www.stiebel-eltron.com).

It requires the following components:

- Compatible STIEBEL ELTRON unit (see "Compatibility overview" in [Software Documentation Modbus TCP/IP](https://www.stiebel-eltron.ch/content/dam/ste/ch/de/downloads/kundenservice/smart-home/Modbus/Modbus%20Bedienungsanleitung.pdf))
- [ISG web](https://www.stiebel-eltron.com/en/home/products-solutions/renewables/controller_energymanagement/internet_servicegateway/isg_web.html), with the [Modbus module](https://www.stiebel-eltron.ch/de/home/service/smart-home/modbus.html) enabled
- IP network connection to the ISG web

## Supported units

By now, the following units are tested:

- LWZ 504e
- LWZ 404eco
- LWZ 304
- LWZ 304 Trend

## HVAC modes

The following HVAC modes are supported. The STIEBEL ELTRON modes are mapped and configurable as follows:

- Auto (HVAC_MODE_AUTO): Automatic mode
- Manual (HVAC_MODE_HEAT): Manual mode
- Off (HVAC_MODE_OFF): DHW mode (domestic hot water mode, heating is switched off)

## Preset modes

The following preset modes are supported. The STIEBEL ELTRON modes are mapped and configurable as follows:

- Eco mode (PRESET_ECO)
- Day mode (PRESET_DAY)
- Setback mode (PRESET_SETBACK)
- Emergency mode (PRESET_EMERGENCY)

## Configuration

To enable this integration, add the following lines to your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

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

{% important %}
This integration requires the [Modbus](/integrations/modbus/) integration to be set up to work
{% endimportant %}

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
