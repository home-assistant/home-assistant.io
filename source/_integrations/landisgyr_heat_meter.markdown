---
title: Landis+Gyr Heat Meter
description: Instructions on how to integrate your Landis+Gyr Heat Meter device into Home Assistant.
ha_category:
  - Energy
  - Sensor
ha_iot_class: Local Polling
ha_config_flow: true
ha_release: 2022.7
ha_domain: landisgyr_heat_meter
ha_codeowners:
  - '@vpathuis'
ha_platforms:
  - sensor
ha_integration_type: integration
---

The Landis+Gyr Heat Meter integration for Home Assistant allows you to read the meter values from Ultraheat devices by Landis & Gyr. These devices are commonly used for district heating. The integration has been tested with the Landis & Gyr Ultraheat 50 (UH50) type LUGCUH50. Other models are likely to work as well.

The device is read through the optical interface. An (USB) IR reader is needed and connected to Home Assistant.

<img src='/images/integrations/landisgyr_heat_meter/usb_ir_reader.png' />

<div class='note warning'>
Every time the Heat Meter values are read, battery time of the device will supposedly go down by about 30 minutes. To prevent battery drain, the integration will not poll automatically.
</div>


{% include integrations/config_flow.md %}

The integration will create the following sensors:

- heat usage gj
- volume usage m3
- ownership number
- volume previous year m3

Further data that is read from the device is added as diagnostic entities: 

- heat previous year gj
- error number
- device number
- measurement period minutes
- power max kw
- power max previous year kw
- flow rate max m3ph
- flow rate max previous year m3ph
- flow temperature max c
- return temperature max c
- flow temperature max previous year c
- return temperature max previous year c
- operating hours
- fault hours
- fault hours previous year
- yearly set day
- monthly set day
- meter date time
- measuring range m3ph
- settings and firmware
- flow hours

## Polling the device

Polling is not automatic (see battery warning). This means that after adding the integration all values will initially be unknown.
To read the values from the device, create an automation that will update one of the entities. The other entities will be updated as well.

```yaml
alias: Heat Meter daily update
description: ''
trigger:
  - platform: time
    at: '23:30:00'
condition: []
action:
  - service: homeassistant.update_entity
    data: {}
    target:
      entity_id: sensor.heat_meter_heat_usage_gj
mode: single
```
